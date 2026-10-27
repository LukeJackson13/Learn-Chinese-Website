import { useRef, useState, type Ref } from 'react'
import { allFinals, finalGroups, type FinalExample, type PinyinFinal } from '../data/finals'
import { speak } from '../speech'
import { SpeakButton } from './SpeakButton'

// Tone of a single tone-marked syllable (5 = neutral, no mark).
function toneOf(pinyin: string): number {
  const marks = ['āēīōūǖĀĒĪŌŪǕ', 'áéíóúǘÁÉÍÓÚǗ', 'ǎěǐǒǔǚǍĚǏǑǓǙ', 'àèìòùǜÀÈÌÒÙǛ']
  const index = marks.findIndex(set => [...pinyin].some(c => set.includes(c)))
  return index < 0 ? 5 : index + 1
}

function Example({ example }: { example: FinalExample }) {
  return (
    <li className="final-example">
      <span className="hanzi final-example-hanzi">{example.hanzi}</span>
      <span className={`final-example-pinyin tone-text-${toneOf(example.pinyin)}`}>{example.pinyin}</span>
      <span className="muted small">{example.english}</span>
      <SpeakButton text={example.hanzi} />
    </li>
  )
}

function FinalDetail({ final, ref }: { final: PinyinFinal; ref: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className="card final-detail" aria-live="polite">
      <div className="final-detail-head">
        <span className="final-big">{final.label}</span>
        <button type="button" className="btn btn-sm" onClick={() => speak(final.examples[0].hanzi, { rate: 0.6, warmUp: final.examples[0].hanzi })}>🔊 Listen</button>
      </div>
      <p className="final-tip">{final.tip}</p>
      <ul className="final-examples">
        {final.examples.map(e => <Example key={e.hanzi} example={e} />)}
      </ul>
      {final.spelling && <p className="final-spelling"><strong>Spelling:</strong> {final.spelling}</p>}
    </div>
  )
}

const rules: { title: string; body: string; examples: FinalExample[] }[] = [
  {
    title: 'y and w when there\'s no initial',
    body: 'A syllable never starts with i, u or ü. Replace i with y (ia → ya) or add y if i is the only vowel (in → yin). Replace u with w (ua → wa) or add w (u → wu). ü becomes yu (üe → yue).',
    examples: [{ hanzi: '音', pinyin: 'yīn', english: 'in → yin' }, { hanzi: '我', pinyin: 'wǒ', english: 'uo → wo' }, { hanzi: '月', pinyin: 'yuè', english: 'üe → yue' }],
  },
  {
    title: 'Hidden vowels: iu, ui, un',
    body: 'Three finals lose a vowel in writing after a consonant: iou → iu, uei → ui, uen → un. The vowel is still faintly there, which is why ui sounds like "way" and not "wee". With no initial, the full form comes back: you, wei, wen.',
    examples: [{ hanzi: '六', pinyin: 'liù', english: 'iou → iu' }, { hanzi: '對', pinyin: 'duì', english: 'uei → ui' }, { hanzi: '春', pinyin: 'chūn', english: 'uen → un' }],
  },
  {
    title: 'ü drops its dots after j, q, x and y',
    body: 'j, q, x and y can only ever be followed by ü, so the dots are left off: ju, qu, xu, yu are all ü sounds. After n and l both u and ü are possible, so the dots stay.',
    examples: [{ hanzi: '去', pinyin: 'qù', english: 'written u, said ü' }, { hanzi: '女', pinyin: 'nǚ', english: 'woman' }, { hanzi: '努', pinyin: 'nǔ', english: 'to strive' }],
  },
  {
    title: 'i after z, c, s, zh, ch, sh, r isn\'t "ee"',
    body: 'In zi, ci, si the i is a buzz; in zhi, chi, shi, ri it\'s a curled "rr". The written i is just a placeholder because every syllable needs a vowel.',
    examples: [{ hanzi: '四', pinyin: 'sì', english: 'four (not "see")' }, { hanzi: '是', pinyin: 'shì', english: 'to be (not "she")' }],
  },
  {
    title: 'ian sounds like "yen"',
    body: 'In ian (and üan), the a is raised to an "e" sound. Compare an, where the a stays open.',
    examples: [{ hanzi: '天', pinyin: 'tiān', english: 'sky ("tyen")' }, { hanzi: '安', pinyin: 'ān', english: 'safe ("ahn")' }],
  },
  {
    title: 'e changes with its neighbours',
    body: 'On its own or after a consonant, e is the throaty "uh" (喝 hē). In ie and üe it\'s a clear "eh" (謝 xiè). In ei it\'s the "ay" of "say" (給 gěi).',
    examples: [{ hanzi: '喝', pinyin: 'hē', english: '"huh"' }, { hanzi: '謝', pinyin: 'xiè', english: '"syeh"' }, { hanzi: '給', pinyin: 'gěi', english: '"gay"' }],
  },
  {
    title: 'Front -n vs back -ng',
    body: '-n ends with the tongue tip touching behind your top teeth; -ng ends with the back of the tongue raised and the mouth open. Getting this wrong changes the word.',
    examples: [{ hanzi: '心', pinyin: 'xīn', english: 'heart' }, { hanzi: '星', pinyin: 'xīng', english: 'star' }, { hanzi: '晚', pinyin: 'wǎn', english: 'late' }, { hanzi: '王', pinyin: 'wáng', english: 'king' }],
  },
]

export function PinyinFinals() {
  const [selectedId, setSelectedId] = useState(allFinals[0].id)
  const selected = allFinals.find(f => f.id === selectedId) ?? allFinals[0]
  const detailRef = useRef<HTMLDivElement>(null)

  function choose(final: PinyinFinal) {
    setSelectedId(final.id)
    speak(final.examples[0].hanzi, { rate: 0.6, warmUp: final.examples[0].hanzi })
    // On narrow screens the detail panel sits below all the chips, so bring it into view.
    if (window.matchMedia('(max-width: 760px)').matches) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <section>
      <h2 className="section-title">Pinyin finals</h2>
      <p className="muted">
        A syllable is an initial (consonant) plus a final. Mandarin has about 38 finals. Click one to hear it in a real word,
        with tips on how to say it and how it's spelled.
      </p>

      <div className="finals-layout">
        <div className="finals-groups">
          {finalGroups.map(group => (
            <div key={group.title} className="finals-group">
              <h3 className="eyebrow">{group.title}</h3>
              <p className="small muted finals-group-desc">{group.description}</p>
              <div className="finals-chips">
                {group.finals.map(f => (
                  <button key={f.id} type="button" className="final-chip" aria-pressed={f.id === selected.id} onClick={() => choose(f)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <FinalDetail final={selected} ref={detailRef} />
      </div>

      <h3 className="subsection-title">Spelling and sound rules</h3>
      <ol className="finals-rules">
        {rules.map(rule => (
          <li key={rule.title} className="card">
            <h4 className="card-title">{rule.title}</h4>
            <p className="small">{rule.body}</p>
            <ul className="final-examples inline">
              {rule.examples.map(e => <Example key={e.hanzi} example={e} />)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
