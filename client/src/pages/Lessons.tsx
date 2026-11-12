import { Link } from 'react-router'
import { lessons } from '../data/lessons'

export function Lessons() {
  return (
    <>
      <h1 className="page-title">Lessons</h1>
      <p className="lead">Dialogues from your textbook. Listen to each line, then say it yourself.</p>

      <div className="grid grid-2">
        {lessons.map(l => {
          const lineCount = l.scenes.reduce((n, s) => n + s.lines.length, 0)
          return (
            <Link key={l.id} to={`/lessons/${l.id}`} className="card link-card">
              <span className="link-card-icon" aria-hidden="true">{l.number}</span>
              <span className="link-card-body">
                <span className="link-card-title"><span className="hanzi">{l.title}</span> · {l.english}</span>
                <span className="small muted">{l.book}</span>
                <span className="small muted">{l.scenes.length} dialogues · {lineCount} lines</span>
              </span>
              <span className="link-card-arrow" aria-hidden="true">→</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
