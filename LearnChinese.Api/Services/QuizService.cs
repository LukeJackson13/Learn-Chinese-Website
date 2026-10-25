using LearnChinese.Api.Models;

namespace LearnChinese.Api.Services
{
    public enum QuizMode
    {
        HanziToEnglish,
        EnglishToHanzi,
        HanziToPinyin,
    }

    public record QuizOption(Guid Id, string Text);

    public record QuizQuestion(Guid WordId, QuizMode Mode, string Prompt, IReadOnlyList<QuizOption> Options);

    public class QuizService
    {
        private const int OptionCount = 4;
        private readonly VocabularyService _vocabulary;

        public QuizService(VocabularyService vocabulary)
        {
            _vocabulary = vocabulary;
        }

        public QuizQuestion? NextQuestion(QuizMode mode, string? category, Guid? previous)
        {
            var answer = _vocabulary.PickForPractice(category, previous);
            if (answer == null) return null;

            var prompt = mode == QuizMode.EnglishToHanzi ? answer.English : answer.Hanzi;
            var options = BuildOptions(answer, mode).Select(w => new QuizOption(w.Id, OptionText(w, mode))).ToList();
            return new QuizQuestion(answer.Id, mode, prompt, options);
        }

        public static string OptionText(Word w, QuizMode mode) => mode switch
        {
            QuizMode.EnglishToHanzi => w.Hanzi,
            QuizMode.HanziToPinyin => w.Pinyin,
            _ => w.English,
        };

        private List<Word> BuildOptions(Word answer, QuizMode mode)
        {
            // Prefer distractors from the same category so the quiz isn't too easy.
            // Skip any whose displayed answer matches the real one (e.g. 他 and 她 are both "tā").
            var answerText = OptionText(answer, mode);
            var distractors = _vocabulary.GetAll()
                .Where(w => w.Id != answer.Id && OptionText(w, mode) != answerText)
                .OrderBy(w => w.Category == answer.Category ? 0 : 1)
                .ThenBy(_ => Random.Shared.Next())
                .DistinctBy(w => OptionText(w, mode))
                .Take(OptionCount - 1);

            return distractors.Append(answer).OrderBy(_ => Random.Shared.Next()).ToList();
        }
    }
}
