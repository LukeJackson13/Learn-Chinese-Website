using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learn_Chinese_Website.Pages
{
    public class TonesModel : PageModel
    {
        public record Tone(int Number, string Name, string Mark, string Description, string Example, string Hanzi, string Meaning);

        public IReadOnlyList<Tone> Tones { get; } = new[]
        {
            new Tone(1, "First tone", "ā", "High and flat. Hold it steady, like singing one note.", "mā", "妈", "mother"),
            new Tone(2, "Second tone", "á", "Rising, like asking \"what?\" in English.", "má", "麻", "hemp"),
            new Tone(3, "Third tone", "ǎ", "Dips low then rises. In normal speech it often just stays low.", "mǎ", "马", "horse"),
            new Tone(4, "Fourth tone", "à", "Sharp and falling, like a firm \"No!\"", "mà", "骂", "to scold"),
            new Tone(5, "Neutral tone", "a", "Short and light, with no mark.", "ma", "吗", "question particle"),
        };

        public void OnGet()
        {
        }
    }
}
