import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { lessons, speakerNames, type DialogueScene } from '../data/lessons'
import { speak, stopSpeaking } from '../speech'
import { NotFound } from './NotFound'

const NORMAL_RATE = 0.8
const SLOW_RATE = 0.5

interface Playing {
  scene: number
  line: number
}

interface SceneProps {
  scene: DialogueScene
  index: number
  playing: Playing | null
  playingScene: boolean
  showPinyin: boolean
  showEnglish: boolean
  onPlayLine: (line: number, rate: number) => void
  onPlayScene: () => void
  onStop: () => void
}

function Scene({ scene, index, playing, playingScene, showPinyin, showEnglish, onPlayLine, onPlayScene, onStop }: SceneProps) {
  const firstSpeaker = scene.lines[0].speaker
  return (
    <section className="card dialogue">
      <div className="section-head">
        <h2 className="card-title">{index + 1}. {scene.title}</h2>
        {playingScene
          ? <button type="button" className="btn btn-sm" onClick={onStop}>■ Stop</button>
          : <button type="button" className="btn btn-sm btn-primary" onClick={onPlayScene}>▶ Play dialogue</button>}
      </div>
      <ol className="dialogue-lines">
        {scene.lines.map((l, i) => {
          const active = playing?.scene === index && playing.line === i
          return (
            <li key={i} className={`dialogue-line${l.speaker === firstSpeaker ? '' : ' dialogue-line-right'}${active ? ' is-playing' : ''}`}>
              <span className="dialogue-speaker">
                <span className="hanzi">{l.speaker}</span>
                {speakerNames[l.speaker] && <span className="muted"> {speakerNames[l.speaker]}</span>}
              </span>
              <div className="dialogue-bubble">
                <div className="hanzi dialogue-hanzi">{l.hanzi}</div>
                {showPinyin && <div className="pinyin">{l.pinyin}</div>}
                {showEnglish && <div className="small muted">{l.english}</div>}
                <div className="dialogue-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => onPlayLine(i, NORMAL_RATE)} aria-label={`Play ${l.hanzi}`}>🔊 Listen</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => onPlayLine(i, SLOW_RATE)} aria-label={`Play ${l.hanzi} slowly`}>🐢 Slow</button>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function LessonPage() {
  const { id } = useParams()
  const lesson = lessons.find(l => l.id === id)
  const [showPinyin, setShowPinyin] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const [slow, setSlow] = useState(false)
  const [playing, setPlaying] = useState<Playing | null>(null)
  const [sceneRunning, setSceneRunning] = useState<number | null>(null)
  // Bumped whenever playback starts or stops, so callbacks from an older run are ignored.
  const run = useRef(0)

  useEffect(() => () => { run.current++; stopSpeaking() }, [])

  if (!lesson) return <NotFound />

  function stop() {
    run.current++
    stopSpeaking()
    setPlaying(null)
    setSceneRunning(null)
  }

  function playLine(scene: number, line: number, rate: number) {
    const current = ++run.current
    const text = lesson!.scenes[scene].lines[line].hanzi
    setSceneRunning(null)
    setPlaying({ scene, line })
    speak(text, { rate, warmUp: text, onEnd: () => { if (run.current === current) setPlaying(null) } })
  }

  function playScene(scene: number) {
    const current = ++run.current
    const lines = lesson!.scenes[scene].lines
    const rate = slow ? SLOW_RATE : NORMAL_RATE
    setSceneRunning(scene)
    const next = (i: number) => {
      if (run.current !== current) return
      if (i >= lines.length) {
        setPlaying(null)
        setSceneRunning(null)
        return
      }
      setPlaying({ scene, line: i })
      speak(lines[i].hanzi, {
        rate,
        warmUp: i === 0 ? lines[i].hanzi : undefined,
        onEnd: () => { if (run.current === current) setTimeout(() => next(i + 1), 700) },
      })
    }
    next(0)
  }

  return (
    <>
      <p className="small"><Link to="/lessons">← All lessons</Link></p>
      <h1 className="page-title">
        Lesson {lesson.number} <span className="hanzi">{lesson.title}</span> <small className="muted">{lesson.english}</small>
      </h1>
      <p className="lead">
        Play a dialogue to hear it all the way through, then go line by line: listen, use 🐢 Slow if you need it, and repeat out loud.
        Hide the pinyin or English to test yourself.
      </p>

      <div className="dialogue-toolbar">
        <label><input type="checkbox" checked={showPinyin} onChange={e => setShowPinyin(e.target.checked)} /> Show pinyin</label>
        <label><input type="checkbox" checked={showEnglish} onChange={e => setShowEnglish(e.target.checked)} /> Show English</label>
        <label><input type="checkbox" checked={slow} onChange={e => setSlow(e.target.checked)} /> Play dialogues slowly</label>
      </div>

      {lesson.scenes.map((scene, i) => (
        <Scene key={scene.title} scene={scene} index={i} playing={playing} playingScene={sceneRunning === i}
               showPinyin={showPinyin} showEnglish={showEnglish}
               onPlayLine={(line, rate) => playLine(i, line, rate)} onPlayScene={() => playScene(i)} onStop={stop} />
      ))}

      <p className="small muted">From {lesson.book}.</p>
    </>
  )
}
