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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)] // no words to quiz
        public ActionResult<QuizQuestion> GetQuestion(QuizMode mode = QuizMode.HanziToEnglish, string? category = null, Guid? previous = null)
        {
            var question = _quiz.NextQuestion(mode, category, previous);
            return question == null ? NoContent() : question;
        }

        // Checks the answer on the server, records it, and returns the full word to show.
        [HttpPost("answer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<QuizAnswerResult> Answer(QuizAnswerRequest request)
        {
            var word = _vocabulary.Get(request.WordId);
            if (word == null) return NotFound();

            var correct = request.ChosenId == request.WordId;
            _vocabulary.RecordAnswer(word.Id, correct);
            return new QuizAnswerResult(correct, word);
        }

        public record QuizAnswerRequest(Guid WordId, Guid ChosenId);

        public record QuizAnswerResult(bool Correct, Word Word);
    }
}
