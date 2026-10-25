using Learn_Chinese_Website.Models;
using Learn_Chinese_Website.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public enum QuizMode
    {
        HanziToEnglish,
        EnglishToHanzi,
        HanziToPinyin,
    }

    public class QuizModel : PageModel
    {
        private const int OptionCount = 4;
        private readonly VocabularyService _vocabulary;

        public QuizModel(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        [BindProperty(SupportsGet = true)]
        public QuizMode Mode { get; set; }

        [BindProperty(SupportsGet = true)]
        public string? Category { get; set; }

        public IReadOnlyList<string> Categories { get; private set; } = Array.Empty<string>();
        public Word? Question { get; private set; }
        public IReadOnlyList<Word> Options { get; private set; } = Array.Empty<Word>();

        // Set after answering.
        public Guid? ChosenId { get; private set; }
        public bool? WasCorrect { get; private set; }

        public IActionResult OnGet(Guid? previous)
        {
            Categories = _vocabulary.GetCategories();
            Question = _vocabulary.PickForPractice(Category, previous);
            if (Question == null) return Page();

            Options = BuildOptions(Question);
            return Page();
        }

        public IActionResult OnPost(Guid questionId, Guid chosenId, string optionIds)
        {
            Categories = _vocabulary.GetCategories();
            Question = _vocabulary.Get(questionId);
            if (Question == null) return RedirectToPage(new { Mode, Category });

            // Show the same options again, this time with the answer revealed.
            Options = optionIds.Split(',')
                .Select(id => Guid.TryParse(id, out var g) ? _vocabulary.Get(g) : null)
                .OfType<Word>()
                .ToList();

            ChosenId = chosenId;
            WasCorrect = chosenId == questionId;
            _vocabulary.RecordAnswer(questionId, WasCorrect.Value);
            return Page();
        }

        public string Prompt(Word w) => Mode switch
        {
            QuizMode.EnglishToHanzi => w.English,
            _ => w.Hanzi,
        };

        public string OptionText(Word w) => Mode switch
        {
            QuizMode.HanziToEnglish => w.English,
            QuizMode.EnglishToHanzi => w.Hanzi,
            QuizMode.HanziToPinyin => w.Pinyin,
            _ => w.English,
        };

        private List<Word> BuildOptions(Word answer)
        {
            var all = _vocabulary.GetAll();
            // Prefer distractors from the same category so the quiz isn't too easy.
            // Skip any whose displayed answer matches the real one (e.g. 他 and 她 are both "tā").
            var distractors = all
                .Where(w => w.Id != answer.Id && OptionText(w) != OptionText(answer))
                .OrderBy(w => w.Category == answer.Category ? 0 : 1)
                .ThenBy(_ => Random.Shared.Next())
                .DistinctBy(OptionText)
                .Take(OptionCount - 1);

            return distractors.Append(answer).OrderBy(_ => Random.Shared.Next()).ToList();
        }
    }
}
