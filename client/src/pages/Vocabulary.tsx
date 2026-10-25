import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { api } from '../api'
import { CategorySelect } from '../components/CategorySelect'
import { SpeakButton } from '../components/SpeakButton'
import type { NewWord, Word } from '../types'

const emptyForm: NewWord = { hanzi: '', pinyin: '', english: '', category: '' }

export function Vocabulary() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const search = params.get('search') ?? ''

  const [words, setWords] = useState<Word[] | null>(null)
  const [form, setForm] = useState<NewWord>(emptyForm)
  const [message, setMessage] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    api.getWords(category, search).then(setWords).catch(() => setWords([]))
  }, [category, search, refreshKey])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  async function addWord(e: FormEvent) {
    e.preventDefault()
    const added = await api.addWord(form)
    setMessage(`Added ${added.hanzi} (${added.pinyin}).`)
    setForm({ ...emptyForm, category: form.category })
    setRefreshKey(k => k + 1)
  }

  async function deleteWord(word: Word) {
    if (!confirm(`Delete ${word.hanzi}?`)) return
    await api.deleteWord(word.id)
    setWords(ws => ws?.filter(w => w.id !== word.id) ?? null)
  }

  const field = (key: keyof NewWord) => ({
    value: form[key] ?? '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value }),
  })

  return (
    <>
      <h1 className="page-title">Vocabulary</h1>

      {message && <p className="alert alert-success">{message}</p>}

      <form className="card" onSubmit={addWord}>
        <h2 className="card-title">Add a word</h2>
        <div className="form-row">
          <label>Characters<input className="input hanzi" placeholder="你好" required {...field('hanzi')} /></label>
          <label>Pinyin<input className="input" placeholder="ni3 hao3 or nǐ hǎo" required {...field('pinyin')} /></label>
          <label>English<input className="input" placeholder="hello" required {...field('english')} /></label>
          <label>Category<input className="input" placeholder="General" {...field('category')} /></label>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
        <p className="muted small">Type pinyin with tone numbers (e.g. <code>xie4 xie5</code>, <code>lv4</code> for lǜ) and it's converted to tone marks.</p>
      </form>

      <div className="toolbar">
        <input className="input grow" type="search" placeholder="Search characters, pinyin or English"
               value={search} onChange={e => setParam('search', e.target.value)} />
        <CategorySelect value={category} onChange={c => setParam('category', c)} refreshKey={refreshKey} />
      </div>

      {words === null ? <p className="muted">Loading…</p> : (
        <>
          <p className="muted">{words.length} word(s)</p>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Characters</th><th>Pinyin</th><th>English</th><th>Category</th><th>Score</th><th /></tr>
              </thead>
              <tbody>
                {words.map(w => (
                  <tr key={w.id}>
                    <td className="hanzi big">{w.hanzi}</td>
                    <td className="pinyin nowrap">{w.pinyin} <SpeakButton text={w.hanzi} /></td>
                    <td>{w.english}</td>
                    <td><span className="badge">{w.category}</span></td>
                    <td className="muted small nowrap">{w.correctCount} ✓ / {w.incorrectCount} ✗</td>
                    <td className="right"><button type="button" className="btn btn-danger btn-sm" onClick={() => deleteWord(w)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
