using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public class PronunciationModel : PageModel
    {
        public record SoundCard(string Hanzi, string Pinyin, string Label, string Tip, string Word, string Gloss);

        public record SoundSection(string Title, IReadOnlyList<SoundCard> Cards);

        // Add new sounds here. Word is played inside a real word, Gloss is its pinyin + meaning.
        public IReadOnlyList<SoundSection> Sections { get; } = new[]
        {
            new SoundSection("Numbers", new[]
            {
                new SoundCard("四", "sì", "4 · falling tone", "\"suh\", not \"see\". A sharp drop, like a firm \"No!\"", "四月", "sì yuè · April"),
                new SoundCard("七", "qī", "7 · high flat tone", "\"chee\", lips in a smile. \"Say chee-se!\"", "七月", "qī yuè · July"),
            }),
            new SoundSection("Initials: zh and z", new[]
            {
                new SoundCard("中", "zhōng", "zh", "zh is close to \"j\" as in \"jerk\". Tongue tip curled back a little.", "中文", "zhōngwén · Chinese"),
                new SoundCard("在", "zài", "z", "z is \"dz\" as in \"kids\". No curl.", "在家", "zài jiā · at home"),
                new SoundCard("字", "zì", "zi", "\"dzuh\", a buzz. Not \"zee\".", "漢字", "hànzì · characters"),
            }),
            new SoundSection("Syllables: cheng, sheng, hui", new[]
            {
                new SoundCard("城", "chéng", "city", "\"chuhng\", with a puff of air on the ch.", "城市", "chéngshì · city"),
                new SoundCard("生", "shēng", "life, born", "\"shuhng\". Rhymes with cheng.", "學生", "xuésheng · student"),
                new SoundCard("會", "huì", "can, will", "\"hway\". hui is short for \"huei\".", "我會說中文", "wǒ huì shuō zhōngwén · I can speak Chinese"),
            }),
        };

        public void OnGet()
        {
        }
    }
}
