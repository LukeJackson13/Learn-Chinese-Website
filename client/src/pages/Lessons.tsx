import { Link } from 'react-router'
import { bookTitle, lessons } from '../data/lessons'

export function Lessons() {
  return (
    <>
      <h1 className="page-title">Lessons</h1>
      <p className="lead">Dialogues and pronunciation drills from your textbooks. Listen to each line or word, then say it yourself.</p>

      <div className="grid grid-2">
        {lessons.map(l => {
          const lineCount = l.scenes.reduce((n, s) => n + s.lines.length, 0)
          const treeCount = l.familyTree
            ? l.familyTree.children.length + l.familyTree.sides.reduce((n, s) => n + s.grandparents.length + s.relatives.length + 1, 0)
            : 0
          const wordCount = treeCount + (l.practice ?? []).reduce((n, p) => n + p.groups.reduce((m, g) => m + g.words.length + (g.head ? 1 : 0), 0), 0)
          return (
            <Link key={l.id} to={`/lessons/${l.id}`} className="card link-card">
              <span className="link-card-icon" aria-hidden="true">{l.number}</span>
              <span className="link-card-body">
                <span className="link-card-title"><span className="hanzi">{l.title}</span> · {l.english}</span>
                <span className="small muted"><span className="hanzi">{bookTitle(l.book)}</span>, Lesson {l.number}</span>
                <span className="small muted">
                  {l.scenes.length} {l.scenes.length === 1 ? 'dialogue' : 'dialogues'} · {lineCount} lines
                  {wordCount > 0 && ` · ${wordCount} practice words`}
                </span>
              </span>
              <span className="link-card-arrow" aria-hidden="true">→</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
