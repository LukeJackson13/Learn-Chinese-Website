import { NavLink, Outlet } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/vocabulary', label: 'Vocabulary' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/tones', label: 'Tones' },
  { to: '/pronunciation', label: 'Pronunciation' },
]

export function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand"><span className="hanzi">中文</span> Learn Chinese</NavLink>
          <nav>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav-link">{l.label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="container footer">© 2026 Learn Chinese</footer>
    </>
  )
}
