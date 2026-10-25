# Learn Chinese

A small ASP.NET Core Razor Pages site for studying Mandarin: vocabulary list, flashcards, quiz, tones guide and pinyin pronunciation cards.

## Run it

You need the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```
dotnet run --project "Learn Chinese Website"
```

Then open http://localhost:5097. Or open `Learn Chinese Website.sln` in Visual Studio and press F5.

Your words and scores are saved to `Learn Chinese Website/App_Data/words.json`, which is created with starter HSK 1 words on first run and isn't checked in.

Listen buttons use the browser's built-in speech. Microsoft Edge on Windows has the best Chinese voices.
