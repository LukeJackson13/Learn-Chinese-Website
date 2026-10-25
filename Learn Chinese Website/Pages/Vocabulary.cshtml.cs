using System.ComponentModel.DataAnnotations;
using Learn_Chinese_Website.Helpers;
using Learn_Chinese_Website.Models;
using Learn_Chinese_Website.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public class VocabularyModel : PageModel
    {
        private readonly VocabularyService _vocabulary;

        public VocabularyModel(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        [BindProperty(SupportsGet = true)]
        public string? Search { get; set; }

        [BindProperty(SupportsGet = true)]
        public string? Category { get; set; }

        [BindProperty]
        public NewWordInput Input { get; set; } = new();

        public IReadOnlyList<Word> Words { get; private set; } = Array.Empty<Word>();
        public IReadOnlyList<string> Categories { get; private set; } = Array.Empty<string>();

        public void OnGet() => LoadWords();

        public IActionResult OnPostAdd()
        {
            if (!ModelState.IsValid)
            {
                LoadWords();
                return Page();
            }

            _vocabulary.Add(new Word
            {
                Hanzi = Input.Hanzi.Trim(),
                Pinyin = PinyinHelper.ToToneMarks(Input.Pinyin),
                English = Input.English.Trim(),
                Category = string.IsNullOrWhiteSpace(Input.Category) ? "General" : Input.Category.Trim(),
            });

            TempData["Message"] = $"Added {Input.Hanzi.Trim()}.";
            return RedirectToPage(new { Category = Input.Category });
        }

        public IActionResult OnPostDelete(Guid id)
        {
            _vocabulary.Delete(id);
            return RedirectToPage(new { Search, Category });
        }

        private void LoadWords()
        {
            Categories = _vocabulary.GetCategories();
            IEnumerable<Word> words = _vocabulary.GetAll();

            if (!string.IsNullOrEmpty(Category))
                words = words.Where(w => w.Category == Category);

            if (!string.IsNullOrWhiteSpace(Search))
            {
                var s = Search.Trim();
                words = words.Where(w =>
                    w.Hanzi.Contains(s) ||
                    w.Pinyin.Contains(s, StringComparison.OrdinalIgnoreCase) ||
                    w.English.Contains(s, StringComparison.OrdinalIgnoreCase));
            }

            Words = words.ToList();
        }

        public class NewWordInput
        {
            [Required, Display(Name = "Characters")]
            public string Hanzi { get; set; } = "";

            [Required, Display(Name = "Pinyin")]
            public string Pinyin { get; set; } = "";

            [Required, Display(Name = "English")]
            public string English { get; set; } = "";

            public string? Category { get; set; }
        }
    }
}
