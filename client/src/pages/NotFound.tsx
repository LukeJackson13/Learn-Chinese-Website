import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="empty">
      <h1>找不到 · Page not found</h1>
      <p><Link to="/">Back to home</Link></p>
    </div>
  )
}
