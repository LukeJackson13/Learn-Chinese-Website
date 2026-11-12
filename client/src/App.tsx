import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Flashcards } from './pages/Flashcards'
import { Home } from './pages/Home'
import { LessonPage } from './pages/LessonPage'
import { Lessons } from './pages/Lessons'
import { NotFound } from './pages/NotFound'
import { Pronunciation } from './pages/Pronunciation'
import { Quiz } from './pages/Quiz'
import { SoundFamily } from './pages/SoundFamily'
import { Sounds } from './pages/Sounds'
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
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:id" element={<LessonPage />} />
        <Route path="sounds" element={<Sounds />} />
        <Route path="sounds/:id" element={<SoundFamily />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
