using LearnChinese.Api.Data;
using LearnChinese.Api.Services;

namespace LearnChinese.Api.Tests
{
    public class VocabularyServiceTests : IDisposable
    {
        private readonly string _dataDir = Path.Combine(Path.GetTempPath(), "LearnChineseTests", Guid.NewGuid().ToString());

        public void Dispose()
        {
            if (Directory.Exists(_dataDir)) Directory.Delete(_dataDir, recursive: true);
        }

        [Fact]
        public void FirstRunAddsEveryWordPack()
        {
            var service = new VocabularyService(_dataDir);

            var expected = WordPacks.All.Sum(p => p.Words.Length);
            Assert.Equal(expected, service.GetAll().Count);
            Assert.Contains(service.GetCategories(), c => c.StartsWith("A1"));
        }

        [Fact]
        public void DeletedWordsStayDeletedAfterRestart()
        {
            var first = new VocabularyService(_dataDir);
            var word = first.GetAll()[0];
            first.Delete(word.Id);

            var restarted = new VocabularyService(_dataDir);

            Assert.Null(restarted.Get(word.Id));
            Assert.DoesNotContain(restarted.GetAll(), w => w.Hanzi == word.Hanzi && w.Category == word.Category);
        }

        [Fact]
        public void AnswersAreSavedAndChangePracticeWeight()
        {
            var service = new VocabularyService(_dataDir);
            var word = service.GetAll()[0];
            var before = word.PracticeWeight;

            service.RecordAnswer(word.Id, correct: false);

            var reloaded = new VocabularyService(_dataDir).Get(word.Id)!;
            Assert.Equal(1, reloaded.IncorrectCount);
            Assert.NotNull(reloaded.LastReviewed);
            Assert.True(reloaded.PracticeWeight > before);
        }

        [Fact]
        public void PickForPracticeRespectsCategoryAndExclude()
        {
            var service = new VocabularyService(_dataDir);
            var category = service.GetCategories()[0];
            var first = service.PickForPractice(category)!;

            for (var i = 0; i < 20; i++)
            {
                var next = service.PickForPractice(category, exclude: first.Id)!;
                Assert.Equal(category, next.Category);
                Assert.NotEqual(first.Id, next.Id);
            }
        }
    }
}
