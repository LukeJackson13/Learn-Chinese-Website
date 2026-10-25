using Learn_Chinese_Website.Models;
using Learn_Chinese_Website.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public class FlashcardsModel : PageModel
    {
        private readonly VocabularyService _vocabulary;

        public FlashcardsModel(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        [BindProperty(SupportsGet = true)]
        public string? Category { get; set; }

        public IReadOnlyList<Word> Words { get; private set; } = Array.Empty<Word>();
        public IReadOnlyList<string> Categories { get; private set; } = Array.Empty<string>();

        public void OnGet()
        {
            Categories = _vocabulary.GetCategories();
            Words = _vocabulary.GetAll()
                .Where(w => string.IsNullOrEmpty(Category) || w.Category == Category)
                .ToList();
        }

        // Called from the page's JavaScript when you mark a card "Got it" or "Missed".
        public IActionResult OnPostRecord(Guid id, bool correct)
        {
            _vocabulary.RecordAnswer(id, correct);
            return new NoContentResult();
        }
    }
}
