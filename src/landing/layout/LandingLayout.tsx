import * as React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { metaForPath } from '../content/seo'
import '../styles/landing.css'

/**
 * Scrolls to the top on a new page, or to the #section in the URL.
 * Retries briefly so sections rendered after navigation are found.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
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
  }, [pathname, hash])

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
