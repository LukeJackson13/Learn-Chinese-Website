namespace LearnChinese.Api.Models
{
    public class Word
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Hanzi { get; set; } = "";
        public string Pinyin { get; set; } = "";
        public string English { get; set; } = "";
        public string Category { get; set; } = "General";
        public int CorrectCount { get; set; }
        public int IncorrectCount { get; set; }
        public DateTime Added { get; set; } = DateTime.UtcNow;
        public DateTime? LastReviewed { get; set; }

        public int TimesReviewed => CorrectCount + IncorrectCount;

        // Words you get wrong more often come up more often in practice.
        public double PracticeWeight => 1.0 + IncorrectCount * 2.0 - Math.Min(CorrectCount, 10) * 0.08;
    }
}
