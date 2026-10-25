import { useEffect, useState } from 'react'
import { getChineseVoices, getSavedVoiceName, onVoicesChanged, saveVoiceName, speak, speechSupported } from '../speech'

interface SoundCard {
  hanzi: string
  pinyin: string
  label: string
  tip: string
  word: string
  gloss: string
}

// Add new sounds here. "word" is played inside a real word; "gloss" is its pinyin and meaning.
const sections: { title: string; cards: SoundCard[] }[] = [
  {
    title: 'Numbers',
    cards: [
      { hanzi: '四', pinyin: 'sì', label: '4 · falling tone', tip: '"suh", not "see". A sharp drop, like a firm "No!"', word: '四月', gloss: 'sì yuè · April' },
      { hanzi: '七', pinyin: 'qī', label: '7 · high flat tone', tip: '"chee", lips in a smile. "Say chee-se!"', word: '七月', gloss: 'qī yuè · July' },
    ],
  },
  {
    title: 'Initials: zh and z',
    cards: [
      { hanzi: '中', pinyin: 'zhōng', label: 'zh', tip: 'zh is close to "j" as in "jerk". Tongue tip curled back a little.', word: '中文', gloss: 'zhōngwén · Chinese' },
      { hanzi: '在', pinyin: 'zài', label: 'z', tip: 'z is "dz" as in "kids". No curl.', word: '在家', gloss: 'zài jiā · at home' },
      { hanzi: '字', pinyin: 'zì', label: 'zi', tip: '"dzuh", a buzz. Not "zee".', word: '漢字', gloss: 'hànzì · characters' },
    ],
  },
  {
    title: 'Syllables: cheng, sheng, hui',
    cards: [
      { hanzi: '城', pinyin: 'chéng', label: 'city', tip: '"chuhng", with a puff of air on the ch.', word: '城市', gloss: 'chéngshì · city' },
      { hanzi: '生', pinyin: 'shēng', label: 'life, born', tip: '"shuhng". Rhymes with cheng.', word: '學生', gloss: 'xuésheng · student' },
      { hanzi: '會', pinyin: 'huì', label: 'can, will', tip: '"hway". hui is short for "huei".', word: '我會說中文', gloss: 'wǒ huì shuō zhōngwén · I can speak Chinese' },
    ],
  },
]

// Leading pause stops the first sound being clipped; repeating with pauses gives a longer, clearer sample.
const plays = [
  { label: 'Play', rate: 0.75, text: (c: SoundCard) => '，' + [c.hanzi, c.hanzi, c.hanzi].join('。　'), outline: false },
  { label: 'Slow', rate: 0.45, text: (c: SoundCard) => `，${c.hanzi}。　${c.hanzi}`, outline: true },
  { label: 'Word', rate: 0.7, text: (c: SoundCard) => `，${c.word}。　${c.word}`, outline: true },
]

function VoicePicker() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selected, setSelected] = useState<string | null>(getSavedVoiceName())

  useEffect(() => {
    const load = () => setVoices(getChineseVoices())
    load()
    return onVoicesChanged(load)
  }, [])

  const current = voices.find(v => v.name === selected) ?? voices[0]

  let note = 'Looking for a Chinese voice on this device…'
  let warn = false
  if (!speechSupported) { note = 'This browser cannot play speech. Use the Real voice links instead.'; warn = true }
  else if (current) note = 'Tip: voices with "Natural" or "Online" in the name sound clearest. Turn your device volume up, as browser voices play fairly quietly.'
  else if (speechSynthesis.getVoices().length) { note = 'No Chinese voice found. Open this page in Microsoft Edge, or use the Real voice links.'; warn = true }

  return (
    <>
      <div className="toolbar">
        <label className="inline-label" htmlFor="voice">Voice</label>
        <select id="voice" className="input" disabled={!voices.length} value={current?.name ?? ''}
                onChange={e => { setSelected(e.target.value); saveVoiceName(e.target.value) }}>
          {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
        </select>
      </div>
      <p className={`small ${warn ? 'warn' : 'muted'}`}>{note}</p>
    </>
  )
}

export function Pronunciation() {
  const [playing, setPlaying] = useState<string | null>(null)

  function play(key: string, text: string, rate: number, warmUp: string) {
    setPlaying(key)
    speak(text, { rate, warmUp, onEnd: () => setPlaying(p => (p === key ? null : p)) })
  }

  return (
    <div className="pron">
      <h1 className="page-title">Pinyin Sound Cards</h1>
      <p className="muted">Play says the sound three times. Slow stretches it out. Word plays it inside a real word. Real voice opens recordings by native speakers.</p>
      <VoicePicker />

      {sections.map(section => (
        <section key={section.title} className="pron-section">
          <h2 className="eyebrow">{section.title}</h2>
          {section.cards.map(card => (
            <div key={card.hanzi} className="sound-card">
              <div className="han">{card.hanzi}</div>
              <div className="info">
                <div className="py">{card.pinyin}<small>{card.label}</small></div>
                <div className="tip">{card.tip}</div>
                <div className="gloss">Word: <b>{card.word}</b> · {card.gloss}</div>
              </div>
              <div className="btns">
                {plays.map(p => {
                  const key = `${card.hanzi}-${p.label}`
                  return (
                    <button key={p.label} type="button" className={`pill ${p.outline ? 'pill-outline' : ''}`}
                            aria-pressed={playing === key} aria-label={`${p.label} ${card.hanzi}`}
                            onClick={() => play(key, p.text(card), p.rate, card.hanzi)}>
                      <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z" /></svg>{p.label}
                    </button>
                  )
                })}
                <a className="real" href={`https://forvo.com/word/${encodeURIComponent(card.hanzi)}/#zh`} target="_blank" rel="noopener">Real voice ↗</a>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
