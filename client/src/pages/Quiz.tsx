import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { api } from '../api'
import { CategorySelect } from '../components/CategorySelect'
import { SpeakButton } from '../components/SpeakButton'
import { useKeyboard } from '../hooks'
import type { AnswerResult, QuizMode, QuizQuestion } from '../types'

const modes: { value: QuizMode; label: string }[] = [
  { value: 'HanziToEnglish', label: 'Characters → English' },
  { value: 'EnglishToHanzi', label: 'English → Characters' },
  { value: 'HanziToPinyin', label: 'Characters → Pinyin' },
]

export function Quiz() {
  const [params, setParams] = useSearchParams()
  const mode = (params.get('mode') as QuizMode | null) ?? 'HanziToEnglish'
  const category = params.get('category') ?? ''

  // undefined = loading, null = no words to quiz
  const [question, setQuestion] = useState<QuizQuestion | null | undefined>(undefined)
  const [chosenId, setChosenId] = useState<string | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [score, setScore] = useState({ asked: 0, correct: 0 })
  // Bumped by "Next question"; previous stops the same word coming up twice in a row.
  const [round, setRound] = useState<{ n: number; previous?: string }>({ n: 0 })

  // New question whenever the mode, category or round changes. Ignores responses that arrive after a newer request.
  useEffect(() => {
    let cancelled = false
    api.getQuestion(mode, category, round.previous).then(q => {
      if (cancelled) return
      setChosenId(null)
      setResult(null)
      setQuestion(q)
    })
    return () => { cancelled = true }
  }, [mode, category, round])

  const next = () => setRound(r => ({ n: r.n + 1, previous: question?.wordId }))

  async function choose(optionId: string) {
    if (!question || result) return
    setChosenId(optionId)
    const answer = await api.answerQuestion(question.wordId, optionId)
    setResult(answer)
    setScore(s => ({ asked: s.asked + 1, correct: s.correct + (answer.correct ? 1 : 0) }))
  }

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  useKeyboard(e => {
    if (!question) return
    if (result && e.key === 'Enter') { next(); return }
    const n = Number(e.key)
    if (n >= 1 && n <= question.options.length) void choose(question.options[n - 1].id)
  })

  function optionClass(id: string) {
    if (!result || !question) return 'btn quiz-option'
    if (id === question.wordId) return 'btn quiz-option btn-success'
    if (id === chosenId) return 'btn quiz-option btn-danger'
    return 'btn quiz-option'
  }

  return (
    <>
      <h1 className="page-title">Quiz</h1>

      <div className="toolbar">
        <select className="input" value={mode} onChange={e => setParam('mode', e.target.value)} aria-label="Quiz mode">
          {modes.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
        <CategorySelect value={category} onChange={c => setParam('category', c)} />
        {score.asked > 0 && <span className="muted">{score.correct}/{score.asked} correct</span>}
      </div>

      {question === undefined ? <p className="muted">Loading…</p> : question === null ? (
        <p className="alert">No words to quiz. <Link to="/vocabulary">Add some vocabulary</Link> first.</p>
      ) : (
        <div className="card quiz-card center">
          <div className={mode === 'EnglishToHanzi' ? 'huge prompt' : 'hanzi hanzi-xl'}>{question.prompt}</div>

          {result && (
            <p className={`alert ${result.correct ? 'alert-success' : 'alert-error'}`}>
              {result.correct ? '正確! Correct!' : 'Not quite.'}{' '}
              <span className="hanzi big">{result.word.hanzi}</span> <span className="pinyin">{result.word.pinyin}</span> · {result.word.english}{' '}
              <SpeakButton text={result.word.hanzi} />
            </p>
          )}

          <div className="stack">
            {question.options.map((o, i) => (
              <button key={o.id} type="button" className={`${optionClass(o.id)} ${mode === 'EnglishToHanzi' ? 'hanzi' : ''}`}
                      disabled={!!result} onClick={() => choose(o.id)}>
                <span className="key-hint">{i + 1}</span> {o.text}
              </button>
            ))}
          </div>

          {result && (
            <button type="button" className="btn btn-primary next" onClick={next}>Next question (Enter) →</button>
          )}
        </div>
      )}
    </>
  )
}
