import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { SpeakButton } from '../components/SpeakButton'
import type { Stats } from '../types'

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getStats().then(setStats).catch(() => setError(true))
  }, [])

  if (error) return <p className="alert alert-error">Can't reach the API. Is LearnChinese.Api running?</p>
  if (!stats) return <p className="muted">Loading…</p>

  const word = stats.wordOfTheDay

  return (
    <>
      <h1 className="page-title">學中文 <small className="muted">Learn Chinese</small></h1>

      <div className="grid grid-3">
        <div className="card stat-card"><div className="stat">{stats.totalWords}</div><div className="muted">words in your list</div></div>
        <div className="card stat-card"><div className="stat">{stats.wordsReviewed}</div><div className="muted">words practised</div></div>
        <div className="card stat-card"><div className="stat">{stats.accuracy}%</div><div className="muted">quiz and flashcard accuracy</div></div>
      </div>

      <div className="grid grid-2">
        {word && (
          <div className="card center">
            <h2 className="card-title muted">Word of the day</h2>
            <div className="hanzi hanzi-xl">{word.hanzi}</div>
            <div className="pinyin big">{word.pinyin} <SpeakButton text={word.hanzi} /></div>
            <div className="big">{word.english}</div>
          </div>
        )}
        <div className="card">
          <h2 className="card-title">Practice</h2>
          <div className="stack">
            <Link className="btn btn-primary" to="/flashcards">Flashcards</Link>
            <Link className="btn" to="/quiz">Quiz</Link>
            <Link className="btn" to="/vocabulary">Manage vocabulary</Link>
            <Link className="btn" to="/pronunciation">Pronunciation</Link>
          </div>
          {stats.troubleWords.length > 0 && (
            <>
              <h3 className="subhead">Words you keep missing</h3>
              <ul className="plain-list">
                {stats.troubleWords.map(w => (
                  <li key={w.id}>
                    <span className="hanzi">{w.hanzi}</span> <span className="pinyin">{w.pinyin}</span> · {w.english}{' '}
                    <span className="muted small">({w.incorrectCount} ✗ / {w.correctCount} ✓)</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}
