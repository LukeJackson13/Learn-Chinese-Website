import { useEffect, useLayoutEffect, useRef } from 'react'

// Listens for key presses anywhere on the page, ignoring typing in inputs and selects.
// The handler can change every render; the listener always calls the latest one.
export function useKeyboard(handler: (e: KeyboardEvent) => void) {
  const latest = useRef(handler)
  useLayoutEffect(() => {
    latest.current = handler
  })

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
      latest.current(e)
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])
}
