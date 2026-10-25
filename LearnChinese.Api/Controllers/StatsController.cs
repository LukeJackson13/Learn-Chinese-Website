using LearnChinese.Api.Models;
using LearnChinese.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearnChinese.Api.Controllers
{
    [ApiController]
    [Route("api/stats")]
    public class StatsController : ControllerBase
    {
        private readonly VocabularyService _vocabulary;

        public StatsController(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        [HttpGet]
        public Stats Get()
        {
            var words = _vocabulary.GetAll();
            var correct = words.Sum(w => w.CorrectCount);
            var total = words.Sum(w => w.TimesReviewed);

            return new Stats(
                TotalWords: words.Count,
                WordsReviewed: words.Count(w => w.TimesReviewed > 0),
                Accuracy: total == 0 ? 0 : (int)Math.Round(100.0 * correct / total),
                // Same word all day, changes tomorrow.
                WordOfTheDay: words.Count > 0 ? words[DateTime.Today.DayOfYear % words.Count] : null,
                TroubleWords: words
                    .Where(w => w.IncorrectCount > 0)
                    .OrderByDescending(w => w.IncorrectCount - w.CorrectCount)
                    .Take(5)
                    .ToList());
        }

        public record Stats(int TotalWords, int WordsReviewed, int Accuracy, Word? WordOfTheDay, IReadOnlyList<Word> TroubleWords);
    }
}
