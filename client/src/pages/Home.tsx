import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { SpeakButton } from '../components/SpeakButton'
import type { Stats } from '../types'

const sections = [
  { to: '/flashcards', icon: '卡', title: 'Flashcards', description: 'Flip through your words; the ones you miss come back more often.' },
  { to: '/quiz', icon: '考', title: 'Quiz', description: 'Multiple choice: hanzi to English, English to hanzi, or pinyin.' },
  { to: '/vocabulary', icon: '詞', title: 'Vocabulary', description: 'Browse the TOCFL Band A list by theme and add your own words.' },
  { to: '/tones', icon: '聲', title: 'Tones', description: 'The four tones, tone pairs, pinyin finals and tone change rules.' },
  { to: '/pronunciation', icon: '音', title: 'Pronunciation', description: 'Every initial and final with audio, for self-study.' },
]

// Outside apps. Plain https links open the installed app on a phone and the website on a PC.
const resources = [
  { href: 'https://www.duolingo.com/learn', icon: '🦉', title: 'Duolingo', description: 'Keep the streak going with today\'s lesson.' },
  { href: 'https://www.yoyochinese.com', icon: '🎬', title: 'Yoyo Chinese', description: 'Video lessons on grammar, listening and conversation.' },
]

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
        {stats.troubleWords.length > 0 && (
          <div className="card">
            <h2 className="card-title">Words you keep missing</h2>
            <ul className="plain-list">
              {stats.troubleWords.map(w => (
                <li key={w.id}>
                  <span className="hanzi">{w.hanzi}</span> <span className="pinyin">{w.pinyin}</span> · {w.english}{' '}
                  <span className="muted small">({w.incorrectCount} ✗ / {w.correctCount} ✓)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h2 className="section-title">Study</h2>
      <div className="grid grid-2">
        {sections.map(s => (
          <Link key={s.to} to={s.to} className="card link-card">
            <span className="link-card-icon hanzi" aria-hidden="true">{s.icon}</span>
            <span className="link-card-body">
              <span className="link-card-title">{s.title}</span>
              <span className="small muted">{s.description}</span>
            </span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Other apps</h2>
      <div className="grid grid-2">
        {resources.map(r => (
          <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="card link-card">
            <span className="link-card-icon" aria-hidden="true">{r.icon}</span>
            <span className="link-card-body">
              <span className="link-card-title">{r.title}</span>
              <span className="small muted">{r.description}</span>
            </span>
            <span className="link-card-arrow" aria-hidden="true">↗</span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </>
  )
}
