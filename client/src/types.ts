// Short names for the API's types. They come from src/generated/api.d.ts, which is generated
// from the C# API's swagger.json, so they always match the back end. Regenerate with `npm run generate:api`.

import type { components } from './generated/api'

type Schemas = components['schemas']

export type Word = Schemas['Word']
export type NewWord = Schemas['CreateWordRequest']
export type QuizMode = Schemas['QuizMode']
export type QuizOption = Schemas['QuizOption']
export type QuizQuestion = Schemas['QuizQuestion']
export type AnswerResult = Schemas['QuizAnswerResult']
export type Stats = Schemas['Stats']
