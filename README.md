# Learn Chinese

A self-study app for Mandarin: vocabulary list, flashcards, quiz, tones guide and pinyin pronunciation cards.

**Stack:** React 19 + TypeScript (Vite, React Router) front end, ASP.NET Core 8 Web API back end, xUnit tests.

Comes with ~340 TOCFL Band A words (traditional characters, Taiwan usage), split into A1 and A2 across five themes: self and family, numbers/dates/time, household, food and restaurants, and daily activities. Pick a theme from the category filter on Flashcards or Quiz.

## Project layout

| Folder | What's in it |
|---|---|
| `client/` | React app. Pages in `src/pages`, typed API client in `src/api.ts` (types generated into `src/generated/`), text-to-speech in `src/speech.ts` |
| `LearnChinese.Api/` | Web API. Controllers in `Controllers/`, logic in `Services/`, built-in word lists in `Data/WordPacks.cs` |
| `LearnChinese.Api.Tests/` | xUnit tests for the pinyin converter, vocabulary storage and quiz logic |

## Run it

You need the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) and [Node.js](https://nodejs.org) (LTS).

**One-off: build the React app** (it's served by the API):

```
cd client
npm install
npm run build
cd ..
dotnet run --project LearnChinese.Api
```

Then open http://localhost:5097. API docs (Swagger) are at http://localhost:5097/swagger.

**While developing** (hot reload), run these in two terminals and open http://localhost:5173:

```
dotnet run --project LearnChinese.Api
```

```
cd client
npm run dev
```

**Tests:** `dotnet test`

## Generated API types

The React app's API types aren't written by hand. `client/src/generated/api.d.ts` is generated from the API's Swagger document by [openapi-typescript](https://openapi-ts.dev), and `client/src/api.ts` uses [openapi-fetch](https://openapi-ts.dev/openapi-fetch/), so URLs, parameters, request bodies and responses are all type-checked against the C# back end.

After changing a controller or model, with the API running on port 5097:

```
cd client
npm run generate:api
npm run build
```

Any React code that no longer matches the API then fails the build. The generator runs through `npx` at a pinned version because it doesn't yet support TypeScript 6 as a project dependency.

## API

| Method | Route | |
|---|---|---|
| GET | `/api/words?category=&search=` | List words |
| GET | `/api/words/categories` | List categories |
| POST | `/api/words` | Add a word (pinyin like `ni3 hao3` is converted to `nǐ hǎo`) |
| DELETE | `/api/words/{id}` | Delete a word |
| POST | `/api/words/{id}/answers` | Record a flashcard result |
| GET | `/api/quiz/question?mode=&category=&previous=` | Next quiz question |
| POST | `/api/quiz/answer` | Check and record a quiz answer |
| GET | `/api/stats` | Totals, accuracy, word of the day, trouble words |

Your words and scores are saved to `LearnChinese.Api/App_Data/words.json`, which is created on first run and isn't checked in.

Listen buttons use the browser's built-in speech. Microsoft Edge on Windows has the best Chinese voices.
