using System.ComponentModel.DataAnnotations;
using LearnChinese.Api.Helpers;
using LearnChinese.Api.Models;
using LearnChinese.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearnChinese.Api.Controllers
{
    [ApiController]
    [Route("api/words")]
    public class WordsController : ControllerBase
    {
        private readonly VocabularyService _vocabulary;

        public WordsController(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        [HttpGet]
        public IEnumerable<Word> GetWords(string? category, string? search)
        {
            IEnumerable<Word> words = _vocabulary.GetAll();

            if (!string.IsNullOrEmpty(category))
                words = words.Where(w => w.Category == category);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim();
                words = words.Where(w =>
                    w.Hanzi.Contains(s) ||
                    w.Pinyin.Contains(s, StringComparison.OrdinalIgnoreCase) ||
                    w.English.Contains(s, StringComparison.OrdinalIgnoreCase));
            }

            return words;
        }

        [HttpGet("categories")]
        public IEnumerable<string> GetCategories() => _vocabulary.GetCategories();

        [HttpPost]
        public ActionResult<Word> AddWord(CreateWordRequest request)
        {
            var word = new Word
            {
                Hanzi = request.Hanzi.Trim(),
                Pinyin = PinyinHelper.ToToneMarks(request.Pinyin),
                English = request.English.Trim(),
                Category = string.IsNullOrWhiteSpace(request.Category) ? "General" : request.Category.Trim(),
            };
            _vocabulary.Add(word);
            return CreatedAtAction(nameof(GetWords), word);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteWord(Guid id)
        {
            if (_vocabulary.Get(id) == null) return NotFound();
            _vocabulary.Delete(id);
            return NoContent();
        }

        // Records a flashcard or quiz result so weak words come up more often.
        [HttpPost("{id:guid}/answers")]
        public IActionResult RecordAnswer(Guid id, AnswerRequest request)
        {
            if (_vocabulary.Get(id) == null) return NotFound();
            _vocabulary.RecordAnswer(id, request.Correct);
            return NoContent();
        }

        public record CreateWordRequest([Required] string Hanzi, [Required] string Pinyin, [Required] string English, string? Category);

        public record AnswerRequest(bool Correct);
    }
}
