import { Link, useParams } from 'react-router'
import { SpeakButton } from '../components/SpeakButton'
import { soundFamilies, type SoundCharacter } from '../data/soundFamilies'
import { toneOf } from '../pinyin'
import { NotFound } from './NotFound'

function CharacterCard({ character }: { character: SoundCharacter }) {
  const tone = toneOf(character.pinyin)
  return (
    <section className={`card sound-char tone-border-${tone}`}>
      <div className="sound-char-head">
        <span className="hanzi sound-char-hanzi">{character.hanzi}</span>
        <div className="stack-tight">
          <span className={`sound-char-pinyin tone-text-${tone}`}>{character.pinyin} <SpeakButton text={character.hanzi} /></span>
          <span>{character.meaning}</span>
          {character.simplified && <span className="small muted">Simplified: <span className="hanzi">{character.simplified}</span></span>}
        </div>
      </div>
      {character.note && <p className="small muted">{character.note}</p>}
      <ul className="sound-words">
        {character.words.map(word => (
          <li key={word.hanzi} className="sound-word">
            <span className="sound-word-head">
              <span className="hanzi sound-word-hanzi">{word.hanzi}</span>
              {word.simplified && <span className="small muted hanzi">{word.simplified}</span>}
              <span className="pinyin">{word.pinyin}</span>
            </span>
            <span className="sound-word-meaning">
              {word.english}
              {word.literal && <span className="small muted"> · lit. "{word.literal}"</span>}
            </span>
            <span className="sound-word-speak"><SpeakButton text={word.hanzi} /></span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SoundFamily() {
  const { id } = useParams()
  const family = soundFamilies.find(f => f.id === id)
  if (!family) return <NotFound />

  return (
    <>
      <p className="small"><Link to="/sounds">← All sound families</Link></p>
      <h1 className="page-title">{family.sound} <small className="muted hanzi">{family.characters.map(c => c.hanzi).join(' ')}</small></h1>
      <p className="lead">{family.summary}</p>

      <div className="grid grid-2">
        {family.characters.map(c => <CharacterCard key={c.hanzi} character={c} />)}
      </div>
    </>
  )
}
