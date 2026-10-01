import * as React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
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
      } else if (tries++ < 20) {
        window.setTimeout(tick, 50)
      }
    }
    tick()
  }, [pathname, hash])

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
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
