import { Link } from 'react-router'
import { soundFamilies } from '../data/soundFamilies'
import { toneOf } from '../pinyin'

export function Sounds() {
  return (
    <>
      <h1 className="page-title">Sound families</h1>
      <p className="lead">
        Many characters share a sound. Learning them together helps you tell them apart by tone, meaning and the words they build.
      </p>

      <div className="grid grid-2">
        {soundFamilies.map(f => {
          const wordCount = f.characters.reduce((n, c) => n + c.words.length, 0)
          return (
            <Link key={f.id} to={`/sounds/${f.id}`} className="card link-card family-card">
              <span className="link-card-body">
                <span className="family-card-sound">{f.sound}</span>
                <span className="family-card-chars hanzi">
                  {f.characters.map(c => <span key={c.hanzi} className={`tone-text-${toneOf(c.pinyin)}`}>{c.hanzi}</span>)}
                </span>
                <span className="small muted">{f.summary}</span>
                <span className="small muted">{f.characters.length} characters · {wordCount} words</span>
              </span>
              <span className="link-card-arrow" aria-hidden="true">→</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
