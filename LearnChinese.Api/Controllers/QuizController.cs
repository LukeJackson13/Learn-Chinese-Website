using LearnChinese.Api.Models;
using LearnChinese.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearnChinese.Api.Controllers
{
    [ApiController]
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quiz;
        private readonly VocabularyService _vocabulary;

        public QuizController(QuizService quiz, VocabularyService vocabulary)
        {
            _quiz = quiz;
            _vocabulary = vocabulary;
        }

        [HttpGet("question")]
        public ActionResult<QuizQuestion> GetQuestion(QuizMode mode = QuizMode.HanziToEnglish, string? category = null, Guid? previous = null)
        {
            var question = _quiz.NextQuestion(mode, category, previous);
            return question == null ? NoContent() : question;
        }

        // Checks the answer on the server, records it, and returns the full word to show.
        [HttpPost("answer")]
        public ActionResult<AnswerResult> Answer(AnswerRequest request)
        {
            var word = _vocabulary.Get(request.WordId);
            if (word == null) return NotFound();

            var correct = request.ChosenId == request.WordId;
            _vocabulary.RecordAnswer(word.Id, correct);
            return new AnswerResult(correct, word);
        }

        public record AnswerRequest(Guid WordId, Guid ChosenId);

        public record AnswerResult(bool Correct, Word Word);
    }
}
