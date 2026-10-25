using LearnChinese.Api.Services;

namespace LearnChinese.Api.Tests
{
    public class QuizServiceTests : IDisposable
    {
        private readonly string _dataDir = Path.Combine(Path.GetTempPath(), "LearnChineseTests", Guid.NewGuid().ToString());
        private readonly VocabularyService _vocabulary;
        private readonly QuizService _quiz;

        public QuizServiceTests()
        {
            _vocabulary = new VocabularyService(_dataDir);
            _quiz = new QuizService(_vocabulary);
        }

        public void Dispose()
        {
            if (Directory.Exists(_dataDir)) Directory.Delete(_dataDir, recursive: true);
        }

        [Theory]
        [InlineData(QuizMode.HanziToEnglish)]
        [InlineData(QuizMode.EnglishToHanzi)]
        [InlineData(QuizMode.HanziToPinyin)]
        public void QuestionHasFourDistinctOptionsIncludingTheAnswer(QuizMode mode)
        {
            for (var i = 0; i < 50; i++)
            {
                var question = _quiz.NextQuestion(mode, category: null, previous: null)!;

                Assert.Equal(4, question.Options.Count);
                Assert.Contains(question.Options, o => o.Id == question.WordId);
                Assert.Equal(4, question.Options.Select(o => o.Text).Distinct().Count());
            }
        }

        [Fact]
        public void PromptMatchesMode()
        {
            var question = _quiz.NextQuestion(QuizMode.EnglishToHanzi, null, null)!;
            var word = _vocabulary.Get(question.WordId)!;

            Assert.Equal(word.English, question.Prompt);
            Assert.Equal(word.Hanzi, question.Options.Single(o => o.Id == word.Id).Text);
        }

        [Fact]
        public void NoQuestionForUnknownCategory()
        {
            Assert.Null(_quiz.NextQuestion(QuizMode.HanziToEnglish, "No such category", null));
        }
    }
}
