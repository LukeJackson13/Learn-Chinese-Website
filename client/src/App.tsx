import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Flashcards } from './pages/Flashcards'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Pronunciation } from './pages/Pronunciation'
import { Quiz } from './pages/Quiz'
import { Tones } from './pages/Tones'
import { Vocabulary } from './pages/Vocabulary'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="tones" element={<Tones />} />
        <Route path="pronunciation" element={<Pronunciation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
