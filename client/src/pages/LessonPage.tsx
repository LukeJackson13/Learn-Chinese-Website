import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import {
  bookTitle, lessons, speakerNames,
  type DialogueScene, type FamilyMember, type FamilyTree, type PracticeSection, type PracticeWord,
} from '../data/lessons'
import { speak, stopSpeaking } from '../speech'
import { NotFound } from './NotFound'

const NORMAL_RATE = 0.8
const SLOW_RATE = 0.5

// Something that can be spoken, with a key so the page can highlight it while it plays.
interface PlayItem {
  key: string
  text: string
}

interface Playback {
  playingKey: string | null
  runningList: string | null
  showPinyin: boolean
  showEnglish: boolean
  playOne: (item: PlayItem, rate: number) => void
  playList: (listKey: string, items: PlayItem[]) => void
  stop: () => void
}

function PlayListButton({ listKey, items, playback }: { listKey: string; items: PlayItem[]; playback: Playback }) {
  return playback.runningList === listKey
    ? <button type="button" className="btn btn-sm" onClick={playback.stop}>■ Stop</button>
    : <button type="button" className="btn btn-sm btn-primary" onClick={() => playback.playList(listKey, items)}>▶ Play all</button>
}

function Scene({ scene, id, number, playback }: { scene: DialogueScene; id: string; number: number; playback: Playback }) {
  const firstSpeaker = scene.lines[0].speaker
  const items = scene.lines.map((l, i) => ({ key: `${id}-${i}`, text: l.hanzi }))
  return (
    <section className="card dialogue">
      <div className="section-head">
        <h3 className="card-title">{number}. {scene.title}</h3>
        <PlayListButton listKey={id} items={items} playback={playback} />
      </div>
      <ol className="dialogue-lines">
        {scene.lines.map((l, i) => (
          <li key={i} className={`dialogue-line${l.speaker === firstSpeaker ? '' : ' dialogue-line-right'}${playback.playingKey === items[i].key ? ' is-playing' : ''}`}>
            <span className="dialogue-speaker">
              <span className="hanzi">{l.speaker}</span>
              {speakerNames[l.speaker] && <span className="muted"> {speakerNames[l.speaker]}</span>}
            </span>
            <div className="dialogue-bubble">
              <div className="hanzi dialogue-hanzi">{l.hanzi}</div>
              {playback.showPinyin && <div className="pinyin">{l.pinyin}</div>}
              {playback.showEnglish && <div className="small muted">{l.english}</div>}
              <div className="dialogue-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => playback.playOne(items[i], NORMAL_RATE)} aria-label={`Play ${l.hanzi}`}>🔊 Listen</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => playback.playOne(items[i], SLOW_RATE)} aria-label={`Play ${l.hanzi} slowly`}>🐢 Slow</button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

interface WordTileProps {
  word: PracticeWord
  item: PlayItem
  playback: Playback
  head?: boolean
  image?: string
}

function WordTile({ word, item, playback, head, image }: WordTileProps) {
  return (
    <div className={`word-tile${head ? ' word-tile-head' : ''}${image ? ' word-tile-person' : ''}${playback.playingKey === item.key ? ' is-playing' : ''}`}>
      <button type="button" className="word-tile-play" onClick={() => playback.playOne(item, NORMAL_RATE)} aria-label={`Play ${word.hanzi}, ${word.english}`}>
        {image && <img className="word-tile-img" src={image} alt="" loading="lazy" />}
        <span className="hanzi word-tile-hanzi">{word.hanzi}</span>
        {playback.showPinyin && <span className="pinyin">{word.pinyin}</span>}
        {playback.showEnglish && <span className="small muted">{word.english}</span>}
      </button>
      <button type="button" className="btn btn-ghost btn-sm word-tile-slow" onClick={() => playback.playOne(item, SLOW_RATE)} aria-label={`Play ${word.hanzi} slowly`} title="Play slowly">🐢</button>
    </div>
  )
}

function Practice({ section, index, playback }: { section: PracticeSection; index: number; playback: Playback }) {
  return (
    <section>
      <h2 className="section-title"><span className="hanzi">{section.title}</span> · {section.english}</h2>
      <p className="muted">{section.description}</p>
      {section.examples?.map((e, i) => (
        <div key={i} className="card practice-example">
          <WordTile word={e} item={{ key: `p${index}-ex${i}`, text: e.hanzi }} playback={playback} />
        </div>
      ))}
      {section.scenes && (
        <div className="grid grid-2">
          {section.scenes.map((scene, i) => <Scene key={scene.title} scene={scene} id={`p${index}-scene${i}`} number={i + 1} playback={playback} />)}
        </div>
      )}
      <div className="grid grid-2">
        {section.groups.map((g, gi) => {
          const prefix = `p${index}-g${gi}`
          const headItem = g.head ? { key: `${prefix}-head`, text: g.head.hanzi } : null
          const items = g.words.map((w, wi) => ({ key: `${prefix}-${wi}`, text: w.hanzi }))
          return (
            <div key={gi} className="card word-group">
              <div className="word-group-head">
                {g.head && headItem
                  ? <WordTile word={g.head} item={headItem} playback={playback} head />
                  : <h3 className="card-title word-group-label">{g.label}</h3>}
                <PlayListButton listKey={prefix} items={headItem ? [headItem, ...items] : items} playback={playback} />
              </div>
              <div className="word-tiles">
                {g.words.map((w, wi) => <WordTile key={wi} word={w} item={items[wi]} playback={playback} />)}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function People({ members, keyPrefix, playback }: { members: FamilyMember[]; keyPrefix: string; playback: Playback }) {
  return (
    <div className="family-row">
      {members.map((m, i) => (
        <WordTile key={m.hanzi} word={m} image={m.image} item={{ key: `${keyPrefix}-${i}`, text: m.hanzi }} playback={playback} />
      ))}
    </div>
  )
}

function FamilyTreeView({ tree, playback }: { tree: FamilyTree; playback: Playback }) {
  const toItems = (members: FamilyMember[], keyPrefix: string) => members.map((m, i) => ({ key: `${keyPrefix}-${i}`, text: m.hanzi }))
  return (
    <section>
      <h2 className="section-title"><span className="hanzi">{tree.title.hanzi}</span> · Family tree</h2>
      <p className="muted">
        <span className="hanzi">{tree.title.hanzi}</span> <span className="pinyin">{tree.title.pinyin}</span> means {tree.title.english}.
        Chinese has a different word for each relative, depending on whether they're on your dad's or mom's side and whether they're
        older or younger. Click anyone to hear their title.
      </p>
      <div className="grid grid-2">
        {tree.sides.map((side, si) => {
          const prefix = `tree${si}`
          const items = [
            ...toItems(side.grandparents, `${prefix}-g`),
            ...toItems(side.relatives, `${prefix}-r`),
            ...toItems([side.parent], `${prefix}-p`),
          ]
          return (
            <div key={side.label} className="card family-side">
              <div className="section-head">
                <h3 className="card-title">{side.label}</h3>
                <PlayListButton listKey={prefix} items={items} playback={playback} />
              </div>
              <p className="eyebrow">Grandparents</p>
              <People members={side.grandparents} keyPrefix={`${prefix}-g`} playback={playback} />
              <p className="eyebrow">Their children: {side.parent.english}'s brothers and sisters</p>
              <People members={side.relatives} keyPrefix={`${prefix}-r`} playback={playback} />
              <p className="eyebrow">Your {side.parent.english}</p>
              <People members={[side.parent]} keyPrefix={`${prefix}-p`} playback={playback} />
            </div>
          )
        })}
      </div>
      <div className="card family-side">
        <div className="section-head">
          <h3 className="card-title">You, your brothers and your sisters</h3>
          <PlayListButton listKey="tree-children" items={toItems(tree.children, 'tree-c')} playback={playback} />
        </div>
        <People members={tree.children} keyPrefix="tree-c" playback={playback} />
      </div>
    </section>
  )
}

export function LessonPage() {
  const { id } = useParams()
  const lesson = lessons.find(l => l.id === id)
  const [showPinyin, setShowPinyin] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const [slow, setSlow] = useState(false)
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [runningList, setRunningList] = useState<string | null>(null)
  // Bumped whenever playback starts or stops, so callbacks from an older run are ignored.
  const run = useRef(0)

  useEffect(() => () => { run.current++; stopSpeaking() }, [])

  if (!lesson) return <NotFound />

  const playback: Playback = {
    playingKey,
    runningList,
    showPinyin,
    showEnglish,
    playOne(item, rate) {
      const current = ++run.current
      setRunningList(null)
      setPlayingKey(item.key)
      speak(item.text, { rate, warmUp: item.text, onEnd: () => { if (run.current === current) setPlayingKey(null) } })
    },
    playList(listKey, items) {
      const current = ++run.current
      const rate = slow ? SLOW_RATE : NORMAL_RATE
      setRunningList(listKey)
      const next = (i: number) => {
        if (run.current !== current) return
        if (i >= items.length) {
          setPlayingKey(null)
          setRunningList(null)
          return
        }
        setPlayingKey(items[i].key)
        speak(items[i].text, {
          rate,
          warmUp: i === 0 ? items[i].text : undefined,
          onEnd: () => { if (run.current === current) setTimeout(() => next(i + 1), 700) },
        })
      }
      next(0)
    },
    stop() {
      run.current++
      stopSpeaking()
      setPlayingKey(null)
      setRunningList(null)
    },
  }

  return (
    <>
      <p className="small"><Link to="/lessons">← All lessons</Link></p>
      <h1 className="page-title">
        Lesson {lesson.number} <span className="hanzi">{lesson.title}</span> <small className="muted">{lesson.english}</small>
      </h1>
      <p className="lead">
        Listen to each line or word, use 🐢 if you need it slower, and repeat it out loud. ▶ Play all goes through a whole
        dialogue or group with a pause after each one for you to repeat. Hide the pinyin or English to test yourself.
      </p>

      <div className="dialogue-toolbar">
        <label><input type="checkbox" checked={showPinyin} onChange={e => setShowPinyin(e.target.checked)} /> Show pinyin</label>
        <label><input type="checkbox" checked={showEnglish} onChange={e => setShowEnglish(e.target.checked)} /> Show English</label>
        <label><input type="checkbox" checked={slow} onChange={e => setSlow(e.target.checked)} /> Play all slowly</label>
      </div>

      <h2 className="section-title"><span className="hanzi">情境對話</span> · Dialogue</h2>
      {lesson.scenes.map((scene, i) => <Scene key={scene.title} scene={scene} id={`scene${i}`} number={i + 1} playback={playback} />)}

      {lesson.familyTree && <FamilyTreeView tree={lesson.familyTree} playback={playback} />}

      {lesson.practice?.map((section, i) => <Practice key={section.title} section={section} index={i} playback={playback} />)}

      <p className="small muted">From {bookTitle(lesson.book)}, Lesson {String(lesson.number).padStart(2, '0')}.</p>
    </>
  )
}
