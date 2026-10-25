using System.Text;
using System.Text.RegularExpressions;

namespace Learn_Chinese_Website.Helpers
{
    /// <summary>
    /// Converts numbered pinyin ("ni3 hao3", "lv4") into tone-marked pinyin ("nǐ hǎo", "lǜ").
    /// Text that already has tone marks passes through unchanged.
    /// </summary>
    public static class PinyinHelper
    {
        private static readonly Dictionary<char, string> ToneMarks = new()
        {
            ['a'] = "āáǎàa",
            ['e'] = "ēéěèe",
            ['i'] = "īíǐìi",
            ['o'] = "ōóǒòo",
            ['u'] = "ūúǔùu",
            ['ü'] = "ǖǘǚǜü",
        };

        private static readonly Regex Syllable = new(@"([a-zA-ZüÜ:]+)([1-5])", RegexOptions.Compiled);

        public static string ToToneMarks(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return "";

            var normalised = input.Trim()
                .Replace("u:", "ü").Replace("U:", "Ü")
                .Replace("v", "ü").Replace("V", "Ü");

            return Syllable.Replace(normalised, m => ApplyTone(m.Groups[1].Value, m.Groups[2].Value[0] - '0'));
        }

        private static string ApplyTone(string syllable, int tone)
        {
            var lower = syllable.ToLowerInvariant();
            int index;

            // Standard placement rules: a/e always take the mark, "ou" marks the o,
            // otherwise the last vowel takes it.
            if ((index = lower.IndexOf('a')) < 0 && (index = lower.IndexOf('e')) < 0)
            {
                index = lower.Contains("ou") ? lower.IndexOf('o') : lower.LastIndexOfAny(new[] { 'a', 'e', 'i', 'o', 'u', 'ü' });
            }

            if (index < 0) return syllable;

            var vowel = lower[index];
            var marked = ToneMarks[vowel][tone - 1];
            if (char.IsUpper(syllable[index])) marked = char.ToUpperInvariant(marked);

            var sb = new StringBuilder(syllable);
            sb[index] = marked;
            return sb.ToString();
        }
    }
}
