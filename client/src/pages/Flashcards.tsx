import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { api } from '../api'
import { CategorySelect } from '../components/CategorySelect'
import { useKeyboard } from '../hooks'
import { speak } from '../speech'
import type { Word } from '../types'

const weight = (w: Word) => Math.max(w.practiceWeight, 0.2)

// Weighted random pick, favouring words you miss; never the same card twice in a row.
function pickCard(words: Word[], current: Word | null): Word {
  const pool = words.length > 1 ? words.filter(w => w.id !== current?.id) : words
  let roll = Math.random() * pool.reduce((sum, w) => sum + weight(w), 0)
  for (const w of pool) {
    roll -= weight(w)
    if (roll <= 0) return w
  }
  return pool[pool.length - 1]
}

export function Flashcards() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const [hanziFirst, setHanziFirst] = useState(true)

  const [words, setWords] = useState<Word[] | null>(null)
  const [card, setCard] = useState<Word | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [session, setSession] = useState({ seen: 0, correct: 0 })

  useEffect(() => {
    let cancelled = false
    api.getWords(category).then(ws => {
      if (cancelled) return
      setWords(ws)
      setCard(ws.length ? pickCard(ws, null) : null)
      setFlipped(false)
    })
    return () => { cancelled = true }
  }, [category])

  function flip() {
    if (!card) return
    if (!flipped) speak(card.hanzi, { warmUp: card.hanzi })
    setFlipped(!flipped)
  }

  function answer(correct: boolean) {
    if (!card || !flipped || !words) return
    void api.recordAnswer(card.id, correct)

    // Update the weight locally so this session adapts too.
    const updated = { ...card, practiceWeight: card.practiceWeight + (correct ? -0.08 : 2) }
    const nextWords = words.map(w => (w.id === card.id ? updated : w))
    setWords(nextWords)
    setSession(s => ({ seen: s.seen + 1, correct: s.correct + (correct ? 1 : 0) }))
    setCard(pickCard(nextWords, updated))
    setFlipped(false)
  }

  useKeyboard(e => {
    if (e.code === 'Space') { e.preventDefault(); flip() }
    if (e.key === '1') answer(false)
    if (e.key === '2') answer(true)
  })

  return (
    <>
      <h1 className="page-title">Flashcards</h1>

      <div className="toolbar">
        <CategorySelect value={category} onChange={c => setParams(c ? { category: c } : {}, { replace: true })} />
        <select className="input" value={hanziFirst ? 'hanzi' : 'english'} onChange={e => setHanziFirst(e.target.value === 'hanzi')} aria-label="Card front">
          <option value="hanzi">Show characters first</option>
          <option value="english">Show English first</option>
        </select>
        {session.seen > 0 && <span className="muted">{session.correct}/{session.seen} correct this session</span>}
      </div>

      {words === null ? <p className="muted">Loading…</p> : !card ? (
        <p className="alert">No words yet. <Link to="/vocabulary">Add some vocabulary</Link> first.</p>
      ) : (
        <>
          <button type="button" className="flashcard" onClick={flip} title="Click or press Space to flip">
            {!flipped ? (
              hanziFirst ? <span className="hanzi hanzi-xl">{card.hanzi}</span> : <span className="huge">{card.english}</span>
            ) : (
              <span className="stack-tight">
                <span className="hanzi hanzi-xl">{card.hanzi}</span>
                <span className="pinyin huge">{card.pinyin}</span>
                <span className="big">{card.english}</span>
              </span>
            )}
          </button>

          <div className="button-row">
            <button type="button" className="btn" onClick={() => speak(card.hanzi, { warmUp: card.hanzi })}>🔊 Listen</button>
            <button type="button" className="btn" onClick={flip}>Flip (Space)</button>
          </div>
          <div className="button-row">
            <button type="button" className="btn btn-danger" disabled={!flipped} onClick={() => answer(false)}>✗ Missed (1)</button>
            <button type="button" className="btn btn-success" disabled={!flipped} onClick={() => answer(true)}>✓ Got it (2)</button>
          </div>
          <p className="muted small center">Flip the card, then mark yourself. Cards you miss come back more often.</p>
        </>
      )}
    </>
  )
}
