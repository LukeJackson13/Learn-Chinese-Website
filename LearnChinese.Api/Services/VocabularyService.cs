using System.Text.Json;
using LearnChinese.Api.Data;
using LearnChinese.Api.Models;

namespace LearnChinese.Api.Services
{
    /// <summary>
    /// Stores your vocabulary in App_Data/words.json and adds any built-in word packs (see WordPacks) not yet added.
    /// </summary>
    public class VocabularyService
    {
        private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
        private readonly string _filePath;
        private readonly string _packsPath;
        private readonly object _lock = new();
        private List<Word> _words;

        public VocabularyService(string dataDir)
        {
            Directory.CreateDirectory(dataDir);
            _filePath = Path.Combine(dataDir, "words.json");
            _packsPath = Path.Combine(dataDir, "packs.json");
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
            var wordsExisted = File.Exists(_filePath);
            var words = wordsExisted
                ? JsonSerializer.Deserialize<List<Word>>(File.ReadAllText(_filePath)) ?? new List<Word>()
                : new List<Word>();

            // Track which built-in packs have been added, so new packs reach existing word lists
            // and words you deleted from a pack don't come back.
            var applied = File.Exists(_packsPath)
                ? JsonSerializer.Deserialize<HashSet<string>>(File.ReadAllText(_packsPath)) ?? new HashSet<string>()
                : wordsExisted ? new HashSet<string> { WordPacks.StarterName } : new HashSet<string>();

            var changed = !wordsExisted;
            foreach (var pack in WordPacks.All.Where(p => !applied.Contains(p.Name)))
            {
                var existing = words.Select(w => (w.Hanzi, w.Category)).ToHashSet();
                words.AddRange(pack.ToWords().Where(w => !existing.Contains((w.Hanzi, w.Category))));
                applied.Add(pack.Name);
                changed = true;
            }

            if (changed)
            {
                File.WriteAllText(_filePath, JsonSerializer.Serialize(words, JsonOptions));
                File.WriteAllText(_packsPath, JsonSerializer.Serialize(applied, JsonOptions));
            }
            return words;
        }

        private void Save() => File.WriteAllText(_filePath, JsonSerializer.Serialize(_words, JsonOptions));
    }
}
