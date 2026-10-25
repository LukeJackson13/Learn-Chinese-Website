// Text-to-speech using the browser's built-in Chinese voices.
// Prefers Taiwan voices (TOCFL listening is Taiwan Mandarin), then "Natural"/"Online" ones, which sound clearest.

const synth: SpeechSynthesis | undefined = typeof window !== 'undefined' ? window.speechSynthesis : undefined
const VOICE_KEY = 'voice'

function score(v: SpeechSynthesisVoice) {
  let n = 0
  if (/zh[-_]TW/i.test(v.lang)) n += 100
  else if (/zh[-_]CN|cmn/i.test(v.lang)) n += 50
  else if (/^zh/i.test(v.lang)) n += 30
  if (/natural|online|neural/i.test(v.name)) n += 40
  if (/google/i.test(v.name)) n += 20
  return n
}

export const speechSupported = !!synth

export function getChineseVoices(): SpeechSynthesisVoice[] {
  if (!synth) return []
  return synth.getVoices().filter(v => /^(zh|cmn)/i.test(v.lang)).sort((a, b) => score(b) - score(a))
}

export function getSavedVoiceName(): string | null {
  try { return localStorage.getItem(VOICE_KEY) } catch { return null }
}

export function saveVoiceName(name: string) {
  try { localStorage.setItem(VOICE_KEY, name) } catch { /* storage unavailable */ }
}

function currentVoice() {
  const voices = getChineseVoices()
  const saved = getSavedVoiceName()
  return voices.find(v => v.name === saved) ?? voices[0] ?? null
}

// Keep the audio output awake so the start of the first sound is not cut off.
let keepAlive: AudioContext | null = null
function wakeAudio() {
  if (keepAlive) {
    if (keepAlive.state === 'suspended') void keepAlive.resume()
    return
  }
  try {
    keepAlive = new AudioContext()
    const osc = keepAlive.createOscillator()
    const gain = keepAlive.createGain()
    osc.frequency.value = 20
    gain.gain.value = 0.0005
    osc.connect(gain).connect(keepAlive.destination)
    osc.start()
  } catch { /* no Web Audio */ }
}

interface SpeakOptions {
  rate?: number
  // Spoken silently first: the first syllable after the engine starts often comes out wrong.
  warmUp?: string
  onEnd?: () => void
}

export function speak(text: string, { rate = 0.8, warmUp, onEnd }: SpeakOptions = {}) {
  if (!synth || !text) return
  const firstTime = !keepAlive
  wakeAudio()
  synth.cancel()

  const voice = currentVoice()
  const make = (t: string) => {
    const u = new SpeechSynthesisUtterance(t)
    u.lang = voice?.lang ?? 'zh-TW'
    if (voice) u.voice = voice
    return u
  }

  const utterance = make(text)
  utterance.rate = rate
  utterance.onend = utterance.onerror = () => onEnd?.()

  setTimeout(() => {
    if (warmUp) {
      const w = make(warmUp)
      w.volume = 0
      w.rate = 1.3
      synth.speak(w)
    }
    synth.speak(utterance)
  }, firstTime ? 600 : 150)
}

// Calls back whenever the browser's voice list loads or changes.
export function onVoicesChanged(callback: () => void): () => void {
  if (!synth) return () => {}
  synth.addEventListener('voiceschanged', callback)
  const timer = setTimeout(callback, 800)
  return () => {
    synth.removeEventListener('voiceschanged', callback)
    clearTimeout(timer)
  }
}
