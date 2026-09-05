import { useEffect, useRef, useState } from 'react'
import HomePage from '../pages/HomePage'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'projects', label: 'Side Projects' },
]

function SiteLayout() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') {
      return 'dark'
    }

    const applied = document.documentElement.getAttribute('data-theme')
    return applied === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#07090f' : '#f6f7fb')
  }, [theme])

  const [isTopbarVisible, setIsTopbarVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('')
  const topbarRef = useRef<HTMLDivElement>(null)

  // Hide-on-scroll-down plus the hairline progress meter, in one rAF-throttled pass.
  useEffect(() => {
    let previousY = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const currentY = window.scrollY

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, currentY / scrollable)) : 0
      topbarRef.current?.style.setProperty('--scroll-progress', String(progress))

      if (currentY <= 40) {
        setIsTopbarVisible(true)
      } else if (currentY > previousY + 6) {
        setIsTopbarVisible(false)
      } else if (currentY < previousY - 6) {
        setIsTopbarVisible(true)
      }

      previousY = currentY
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal-on-enter for anything marked .reveal.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  // Highlight the nav entry for whichever section owns the upper viewport.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (section): section is HTMLElement => section !== null,
    )

    if (!sections.length || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveSection('')
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  return (
    <div className="page">
      <header className="hero" id="top">
        <div
          ref={topbarRef}
          className={`topbar ${isTopbarVisible ? 'is-visible' : 'is-hidden'}`}
        >
          <span className="topbar-progress" aria-hidden="true" />
          <button className="brand" type="button" aria-label="Go to top" onClick={handleScrollToTop}>
            <img src="/images/me.jpg" alt="" />
          </button>
          <div className="topbar-actions">
            <nav className="nav" aria-label="Sections">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : undefined}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle light and dark theme"
              title="Toggle light and dark theme"
            >
              <span className="toggle-icon icon-sun" aria-hidden="true">
                ☀︎
              </span>
              <span className="toggle-icon icon-moon" aria-hidden="true">
                ☾
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <HomePage />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Jeff Tan — React · TypeScript · Vite</p>
        <button className="footer-top" type="button" onClick={handleScrollToTop}>
          Back to top ↑
        </button>
      </footer>
    </div>
  )
}

export default SiteLayout
