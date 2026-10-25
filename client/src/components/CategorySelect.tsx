import { useEffect, useState } from 'react'
import { api } from '../api'

interface Props {
  value: string
  onChange: (category: string) => void
  // Bump this to reload the list, e.g. after adding a word in a new category.
  refreshKey?: number
}

export function CategorySelect({ value, onChange, refreshKey }: Props) {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]))
  }, [refreshKey])

  return (
    <select className="input" value={value} onChange={e => onChange(e.target.value)} aria-label="Category">
      <option value="">All categories</option>
      {categories.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}
