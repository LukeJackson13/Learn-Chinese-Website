import { speak } from '../speech'

export function SpeakButton({ text, label }: { text: string; label?: string }) {
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={() => speak(text, { warmUp: text })} title={`Listen to ${text}`}>
      🔊{label && ` ${label}`}
    </button>
  )
}
