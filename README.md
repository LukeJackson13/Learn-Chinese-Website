# Learn Chinese

A small ASP.NET Core Razor Pages site for studying Mandarin: vocabulary list, flashcards, quiz, tones guide and pinyin pronunciation cards.

## Run it

You need the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```
dotnet run --project "Learn Chinese Website"
```

Then open http://localhost:5097. Or open `Learn Chinese Website.sln` in Visual Studio and press F5.

Comes with ~340 TOCFL Band A words (traditional characters, Taiwan usage), split into A1 and A2 across five themes: self and family, numbers/dates/time, household, food and restaurants, and daily activities. Pick a theme from the category filter on Flashcards or Quiz.

Your words and scores are saved to `Learn Chinese Website/App_Data/words.json`, which is created on first run and isn't checked in. Built-in word lists live in `Data/WordPacks.cs`.

Listen buttons use the browser's built-in speech. Microsoft Edge on Windows has the best Chinese voices.
