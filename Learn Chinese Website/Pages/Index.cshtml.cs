using Learn_Chinese_Website.Models;
using Learn_Chinese_Website.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public class IndexModel : PageModel
    {
        private readonly VocabularyService _vocabulary;

        public IndexModel(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        public int TotalWords { get; private set; }
        public int WordsReviewed { get; private set; }
        public int Accuracy { get; private set; }
        public Word? WordOfTheDay { get; private set; }
        public IReadOnlyList<Word> TroubleWords { get; private set; } = Array.Empty<Word>();

        public void OnGet()
        {
            var words = _vocabulary.GetAll();
            TotalWords = words.Count;
            WordsReviewed = words.Count(w => w.TimesReviewed > 0);

            var correct = words.Sum(w => w.CorrectCount);
            var total = words.Sum(w => w.TimesReviewed);
            Accuracy = total == 0 ? 0 : (int)Math.Round(100.0 * correct / total);

            // Same word all day, changes tomorrow.
            if (words.Count > 0)
                WordOfTheDay = words[DateTime.Today.DayOfYear % words.Count];

            TroubleWords = words
                .Where(w => w.IncorrectCount > 0)
                .OrderByDescending(w => w.IncorrectCount - w.CorrectCount)
                .Take(5)
                .ToList();
        }
    }
}
