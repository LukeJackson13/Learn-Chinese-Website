import { SpeakButton } from '../components/SpeakButton'

const tones = [
  { n: 1, name: 'First tone', mark: 'ā', description: 'High and flat. Hold it steady, like singing one note.', pinyin: 'mā', hanzi: '媽', meaning: 'mother' },
  { n: 2, name: 'Second tone', mark: 'á', description: 'Rising, like asking "what?" in English.', pinyin: 'má', hanzi: '麻', meaning: 'hemp' },
  { n: 3, name: 'Third tone', mark: 'ǎ', description: 'Dips low then rises. In normal speech it often just stays low.', pinyin: 'mǎ', hanzi: '馬', meaning: 'horse' },
  { n: 4, name: 'Fourth tone', mark: 'à', description: 'Sharp and falling, like a firm "No!"', pinyin: 'mà', hanzi: '罵', meaning: 'to scold' },
  { n: 5, name: 'Neutral tone', mark: 'a', description: 'Short and light, with no mark.', pinyin: 'ma', hanzi: '嗎', meaning: 'question particle' },
]

export function Tones() {
  return (
    <>
      <h1 className="page-title">Tones guide</h1>
      <p className="lead">Mandarin has four tones plus a neutral tone. The same syllable means different things depending on its tone.</p>

      <div className="grid grid-5">
        {tones.map(t => (
          <div key={t.n} className={`card center tone tone-${t.n}`}>
            <h2 className="card-title">{t.name}</h2>
            <div className="tone-mark">{t.mark}</div>
            <p className="small">{t.description}</p>
            <div className="hanzi huge">{t.hanzi}</div>
            <div className="pinyin">{t.pinyin} · {t.meaning}</div>
            <SpeakButton text={t.hanzi} label="Listen" />
          </div>
        ))}
      </div>

      <h2 className="section-title">Tone change rules</h2>
      <ul>
        <li><strong>Two 3rd tones in a row:</strong> the first becomes 2nd tone. 你好 nǐ hǎo is said <em>ní hǎo</em>.</li>
        <li><strong>不 bù:</strong> becomes 2nd tone before a 4th tone. 不是 is said <em>bú shì</em>.</li>
        <li><strong>一 yī:</strong> becomes 4th tone before tones 1–3 (一天 <em>yì tiān</em>) and 2nd tone before a 4th tone (一個 <em>yí ge</em>).</li>
      </ul>

      <h2 className="section-title">Where does the tone mark go?</h2>
      <ol>
        <li>If there's an <strong>a</strong> or <strong>e</strong>, it takes the mark: hǎo, xiè.</li>
        <li>In <strong>ou</strong>, the <strong>o</strong> takes it: dōu.</li>
        <li>Otherwise the last vowel takes it: guì, liù.</li>
      </ol>
    </>
  )
}
