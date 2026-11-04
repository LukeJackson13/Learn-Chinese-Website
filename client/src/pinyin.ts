// Tone of a single tone-marked syllable (5 = neutral, no mark).
export function toneOf(pinyin: string): number {
  const marks = ['āēīōūǖĀĒĪŌŪǕ', 'áéíóúǘÁÉÍÓÚǗ', 'ǎěǐǒǔǚǍĚǏǑǓǙ', 'àèìòùǜÀÈÌÒÙǛ']
  const index = marks.findIndex(set => [...pinyin].some(c => set.includes(c)))
  return index < 0 ? 5 : index + 1
}
