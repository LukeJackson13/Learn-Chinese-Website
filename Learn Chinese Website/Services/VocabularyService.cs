using System.Text.Json;
using Learn_Chinese_Website.Models;

namespace Learn_Chinese_Website.Services
{
    /// <summary>
    /// Stores your vocabulary in App_Data/words.json. Seeds it with HSK 1 starter words on first run.
    /// </summary>
    public class VocabularyService
    {
        private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
        private readonly string _filePath;
        private readonly object _lock = new();
        private List<Word> _words;

        public VocabularyService(IWebHostEnvironment env)
        {
            var dataDir = Path.Combine(env.ContentRootPath, "App_Data");
            Directory.CreateDirectory(dataDir);
            _filePath = Path.Combine(dataDir, "words.json");
            _words = Load();
        }

        public IReadOnlyList<Word> GetAll()
        {
            lock (_lock) return _words.OrderBy(w => w.Category).ThenBy(w => w.Pinyin).ToList();
        }

        public Word? Get(Guid id)
        {
            lock (_lock) return _words.FirstOrDefault(w => w.Id == id);
        }

        public IReadOnlyList<string> GetCategories()
        {
            lock (_lock) return _words.Select(w => w.Category).Distinct().OrderBy(c => c).ToList();
        }

        public void Add(Word word)
        {
            lock (_lock)
            {
                _words.Add(word);
                Save();
            }
        }

        public void Delete(Guid id)
        {
            lock (_lock)
            {
                _words.RemoveAll(w => w.Id == id);
                Save();
            }
        }

        public void RecordAnswer(Guid id, bool correct)
        {
            lock (_lock)
            {
                var word = _words.FirstOrDefault(w => w.Id == id);
                if (word == null) return;

                if (correct) word.CorrectCount++;
                else word.IncorrectCount++;
                word.LastReviewed = DateTime.UtcNow;
                Save();
            }
        }

        /// <summary>Picks a word at random, favouring ones you get wrong.</summary>
        public Word? PickForPractice(string? category = null, Guid? exclude = null)
        {
            lock (_lock)
            {
                var pool = _words
                    .Where(w => string.IsNullOrEmpty(category) || w.Category == category)
                    .Where(w => w.Id != exclude)
                    .ToList();
                if (pool.Count == 0) return null;

                var total = pool.Sum(w => Math.Max(w.PracticeWeight, 0.2));
                var roll = Random.Shared.NextDouble() * total;
                foreach (var word in pool)
                {
                    roll -= Math.Max(word.PracticeWeight, 0.2);
                    if (roll <= 0) return word;
                }
                return pool[^1];
            }
        }

        private List<Word> Load()
        {
            if (File.Exists(_filePath))
            {
                var json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<Word>>(json) ?? new List<Word>();
            }

            var seed = SeedWords();
            File.WriteAllText(_filePath, JsonSerializer.Serialize(seed, JsonOptions));
            return seed;
        }

        private void Save() => File.WriteAllText(_filePath, JsonSerializer.Serialize(_words, JsonOptions));

        private static List<Word> SeedWords()
        {
            (string hanzi, string pinyin, string english, string category)[] seed =
            {
                ("你好", "nǐ hǎo", "hello", "Greetings"),
                ("谢谢", "xièxie", "thank you", "Greetings"),
                ("不客气", "bú kèqi", "you're welcome", "Greetings"),
                ("再见", "zàijiàn", "goodbye", "Greetings"),
                ("对不起", "duìbuqǐ", "sorry", "Greetings"),
                ("没关系", "méi guānxi", "it doesn't matter", "Greetings"),
                ("我", "wǒ", "I / me", "People"),
                ("你", "nǐ", "you", "People"),
                ("他", "tā", "he / him", "People"),
                ("她", "tā", "she / her", "People"),
                ("我们", "wǒmen", "we / us", "People"),
                ("朋友", "péngyou", "friend", "People"),
                ("老师", "lǎoshī", "teacher", "People"),
                ("学生", "xuésheng", "student", "People"),
                ("一", "yī", "one", "Numbers"),
                ("二", "èr", "two", "Numbers"),
                ("三", "sān", "three", "Numbers"),
                ("四", "sì", "four", "Numbers"),
                ("五", "wǔ", "five", "Numbers"),
                ("六", "liù", "six", "Numbers"),
                ("七", "qī", "seven", "Numbers"),
                ("八", "bā", "eight", "Numbers"),
                ("九", "jiǔ", "nine", "Numbers"),
                ("十", "shí", "ten", "Numbers"),
                ("是", "shì", "to be", "Verbs"),
                ("有", "yǒu", "to have", "Verbs"),
                ("吃", "chī", "to eat", "Verbs"),
                ("喝", "hē", "to drink", "Verbs"),
                ("去", "qù", "to go", "Verbs"),
                ("来", "lái", "to come", "Verbs"),
                ("看", "kàn", "to look / watch", "Verbs"),
                ("说", "shuō", "to speak", "Verbs"),
                ("喜欢", "xǐhuan", "to like", "Verbs"),
                ("学习", "xuéxí", "to study", "Verbs"),
                ("水", "shuǐ", "water", "Food & Drink"),
                ("茶", "chá", "tea", "Food & Drink"),
                ("米饭", "mǐfàn", "cooked rice", "Food & Drink"),
                ("今天", "jīntiān", "today", "Time"),
                ("明天", "míngtiān", "tomorrow", "Time"),
                ("昨天", "zuótiān", "yesterday", "Time"),
                ("中国", "Zhōngguó", "China", "Places"),
                ("家", "jiā", "home / family", "Places"),
                ("大", "dà", "big", "Adjectives"),
                ("小", "xiǎo", "small", "Adjectives"),
                ("好", "hǎo", "good", "Adjectives"),
            };

            return seed.Select(s => new Word { Hanzi = s.hanzi, Pinyin = s.pinyin, English = s.english, Category = s.category }).ToList();
        }
    }
}
