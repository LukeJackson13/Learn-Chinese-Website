// Shapes returned by LearnChinese.Api. Keep in sync with the C# models.

export interface Word {
  id: string
  hanzi: string
  pinyin: string
  english: string
  category: string
  correctCount: number
  incorrectCount: number
  added: string
  lastReviewed: string | null
  timesReviewed: number
  practiceWeight: number
}

export interface NewWord {
  hanzi: string
  pinyin: string
  english: string
  category?: string
}

export type QuizMode = 'HanziToEnglish' | 'EnglishToHanzi' | 'HanziToPinyin'

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  wordId: string
  mode: QuizMode
  prompt: string
  options: QuizOption[]
}

export interface AnswerResult {
  correct: boolean
  word: Word
}

export interface Stats {
  totalWords: number
  wordsReviewed: number
  accuracy: number
  wordOfTheDay: Word | null
  troubleWords: Word[]
}
