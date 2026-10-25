import createClient from 'openapi-fetch'
import type { paths } from './generated/api'
import type { NewWord, QuizMode } from './types'

// Typed client generated from the API's swagger.json: URLs, query/path parameters,
// request bodies and responses are all checked against the C# back end at compile time.
const client = createClient<paths>()

// openapi-fetch returns { data, error, response } instead of throwing; pages expect a throw on failure.
async function unwrap<T>(call: Promise<{ data?: T; error?: unknown; response: Response }>): Promise<T> {
  const { data, error, response } = await call
  if (error !== undefined || !response.ok) throw new Error(`${response.url} failed: ${response.status}`)
  return data as T
}

// Empty strings mean "no filter"; leave them out of the URL.
const optional = (value?: string) => value || undefined

export const api = {
  getStats: () => unwrap(client.GET('/api/stats')),

  getWords: (category?: string, search?: string) =>
    unwrap(client.GET('/api/words', { params: { query: { category: optional(category), search: optional(search) } } })),
  getCategories: () => unwrap(client.GET('/api/words/categories')),
  addWord: (word: NewWord) => unwrap(client.POST('/api/words', { body: word })),
  deleteWord: (id: string) => unwrap(client.DELETE('/api/words/{id}', { params: { path: { id } } })),
  recordAnswer: (id: string, correct: boolean) =>
    unwrap(client.POST('/api/words/{id}/answers', { params: { path: { id } }, body: { correct } })),

  // Resolves to null when there are no words to quiz (the API answers 204 No Content).
  getQuestion: async (mode: QuizMode, category?: string, previous?: string) =>
    (await unwrap(client.GET('/api/quiz/question', {
      params: { query: { mode, category: optional(category), previous: optional(previous) } },
    }))) ?? null,
  answerQuestion: (wordId: string, chosenId: string) =>
    unwrap(client.POST('/api/quiz/answer', { body: { wordId, chosenId } })),
}
