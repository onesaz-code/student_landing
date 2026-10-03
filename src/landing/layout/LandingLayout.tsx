import * as React from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { metaForPath } from '../content/seo'
import '../styles/landing.css'

/** Scroll position for each history entry, so Back returns to the same card. */
const scrollPositions = new Map<string, number>()

/**
 * New pages open at the top, or at the #section in the URL.
 * Back and Forward return to the scroll position of that history entry.
 */
function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()

  React.useEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  React.useEffect(() => {
    const key = location.key
    const save = () => scrollPositions.set(key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      save()
      window.removeEventListener('scroll', save)
    }
  }, [location.key])

  React.useEffect(() => {
    if (navigationType === 'POP') {
      const y = scrollPositions.get(location.key)
      if (y != null) {
        let tries = 0
        const restore = () => {
          window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
          if (tries++ < 8 && Math.abs(window.scrollY - y) > 2) window.setTimeout(restore, 50)
        }
        restore()
        return
      }
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = decodeURIComponent(location.hash.slice(1))
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (tries++ < 60) {
        window.setTimeout(tick, 50)
      }
    }
    tick()
  }, [location.pathname, location.hash, location.key, navigationType])

  return null
}

/** Sets the tab title and the description / link-preview tags for the current page. */
function PageMeta() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    const { title, description } = metaForPath(pathname)
    document.title = title
    const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value)
    set('meta[name="description"]', description)
    set('meta[property="og:title"]', title)
    set('meta[property="og:description"]', description)
    set('meta[name="twitter:title"]', title)
    set('meta[name="twitter:description"]', description)
  }, [pathname])
  return null
}

/** Shared frame for every landing page: header, page content, footer. */
export function LandingLayout() {
  return (
    <div className="lp">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <ScrollManager />
      <PageMeta />
      <SiteHeader />
      <main id="main">
        {/* Inner pages are lazy-loaded; keep the footer below the fold while one loads */}
        <React.Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </React.Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
