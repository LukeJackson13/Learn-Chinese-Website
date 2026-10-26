import { useState } from 'react'
import { firstTones, secondTones, toneNames, tonePairs, type ToneNumber, type TonePairWord } from '../data/tonePairs'
import { speak } from '../speech'

const cellKey = (first: ToneNumber, second: ToneNumber) => `${first}-${second}`

// Picks a different word for every cell (when the cell has more than one).
function shuffled(current: Record<string, number>): Record<string, number> {
  const next: Record<string, number> = {}
  for (const first of firstTones) {
    for (const second of secondTones) {
      const key = cellKey(first, second)
      const count = tonePairs[first][second].length
      const now = current[key] ?? 0
      next[key] = count > 1 ? (now + 1 + Math.floor(Math.random() * (count - 1))) % count : 0
    }
  }
  return next
}

function Pinyin({ word, first, second }: { word: TonePairWord; first: ToneNumber; second: ToneNumber }) {
  return (
    <span className="pair-pinyin">
      <span className={`tone-text-${first}`}>{word.pinyin[0]}</span>
      <span className={`tone-text-${second}`}>{word.pinyin[1]}</span>
    </span>
  )
}

export function TonePairs() {
  const [picks, setPicks] = useState<Record<string, number>>({})
  const [playing, setPlaying] = useState<string | null>(null)

  function play(key: string, word: TonePairWord) {
    setPlaying(key)
    speak(word.hanzi, { rate: 0.7, warmUp: word.hanzi, onEnd: () => setPlaying(p => (p === key ? null : p)) })
  }

  return (
    <section>
      <div className="section-head">
        <h2 className="section-title">Tone pairs</h2>
        <button type="button" className="btn btn-sm" onClick={() => setPicks(shuffled(picks))}>↻ Refresh for more</button>
      </div>
      <p className="muted">
        Most words have two syllables, so practise tones in pairs. Rows are the tone of the first syllable, columns the second.
        Click a word to hear it.
      </p>

      <div className="table-wrap">
        <table className="tone-pairs">
          <thead>
            <tr>
              <th scope="col">Word set</th>
              {secondTones.map(t => <th key={t} scope="col"><span className={`tone-dot tone-bg-${t}`} />{toneNames[t]}</th>)}
            </tr>
          </thead>
          <tbody>
            {firstTones.map(first => (
              <tr key={first}>
                <th scope="row"><span className={`tone-dot tone-bg-${first}`} />{toneNames[first]}</th>
                {secondTones.map(second => {
                  const key = cellKey(first, second)
                  const words = tonePairs[first][second]
                  const word = words[(picks[key] ?? 0) % words.length]
                  return (
                    <td key={second}>
                      <button type="button" className="pair" aria-pressed={playing === key}
                              aria-label={`Play ${word.hanzi}, ${word.pinyin.join('')}, ${word.english}`}
                              onClick={() => play(key, word)}>
                        <span className="pair-word">
                          <span className="hanzi pair-hanzi">{word.hanzi}</span>
                          <Pinyin word={word} first={first} second={second} />
                          <span className="pair-play" aria-hidden="true">▶</span>
                        </span>
                        <span className="pair-english">{word.english}</span>
                        {first === 3 && second === 3 && <span className="pair-note">said as 2nd + 3rd</span>}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
