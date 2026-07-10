import { useEffect, useState } from 'react'
import HomePage from '../pages/HomePage'

function SiteLayout() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const [isTopbarVisible, setIsTopbarVisible] = useState(true)

  useEffect(() => {
    let previousY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY <= 40) {
        setIsTopbarVisible(true)
      } else if (currentY > previousY + 6) {
        setIsTopbarVisible(false)
      } else if (currentY < previousY - 6) {
        setIsTopbarVisible(true)
      }

      previousY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  return (
    <div className="page">
      <header className="hero" id="top">
        <div className={`topbar ${isTopbarVisible ? 'is-visible' : 'is-hidden'}`}>
          <button className="brand" type="button" aria-label="Go to top" onClick={handleScrollToTop}>
            <img src="/images/me.jpg" alt="Logo" />
          </button>
          <div className="topbar-actions">
            <nav className="nav">
              <a href="#about">About</a>
              <a href="#education">Education</a>
              <a href="#experience">Work Experience</a>
              <a href="#projects">Side Projects</a>
            </nav>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀︎' : '☾'}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <HomePage />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Jeff Tan · Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default SiteLayout
