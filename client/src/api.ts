import type { AnswerResult, NewWord, QuizMode, QuizQuestion, Stats, Word } from './types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
  })
  if (!response.ok) throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${response.status}`)
  return (response.status === 204 ? null : await response.json()) as T
}

function query(params: Record<string, string | undefined | null>) {
  const entries = Object.entries(params).filter((e): e is [string, string] => !!e[1])
  return entries.length ? `?${new URLSearchParams(entries)}` : ''
}

export const api = {
  getStats: () => request<Stats>('/stats'),

  getWords: (category?: string, search?: string) => request<Word[]>(`/words${query({ category, search })}`),
  getCategories: () => request<string[]>('/words/categories'),
  addWord: (word: NewWord) => request<Word>('/words', { method: 'POST', body: JSON.stringify(word) }),
  deleteWord: (id: string) => request<null>(`/words/${id}`, { method: 'DELETE' }),
  recordAnswer: (id: string, correct: boolean) =>
    request<null>(`/words/${id}/answers`, { method: 'POST', body: JSON.stringify({ correct }) }),

  // Returns null when there are no words to quiz.
  getQuestion: (mode: QuizMode, category?: string, previous?: string) =>
    request<QuizQuestion | null>(`/quiz/question${query({ mode, category, previous })}`),
  answerQuestion: (wordId: string, chosenId: string) =>
    request<AnswerResult>('/quiz/answer', { method: 'POST', body: JSON.stringify({ wordId, chosenId }) }),
}
