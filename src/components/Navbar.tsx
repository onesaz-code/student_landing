import * as React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Button, IconButton, Tooltip, TooltipProvider, useTheme } from '@onesaz/ui'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Menu, X, Moon, Sun } from 'lucide-react'
import { Button as OnesazButton } from '@onesaz/ui'


const BRAND_LOGO_SRC = '/images/a7e1abaeef1b895c7157156ca5f0a1b9c2638b12.png'

/** Sized to fit a shorter bar; light scale offsets PNG padding. */
const brandLogoClassName =
  'h-[calc(var(--navbar-height)-14px)] w-auto max-w-[min(88vw,300px)] origin-left scale-[1.05] object-contain object-left sm:max-w-[340px] sm:scale-[1.06] md:max-w-[400px] md:scale-[1.07]'

/** Sections that sync with scroll position and hash navigation (Pricing is shown but not linked). */
const SCROLL_SECTION_IDS = ['hero', 'features', 'modules', 'resources'] as const
type ScrollSectionId = (typeof SCROLL_SECTION_IDS)[number]

type NavLink =
  | { name: string; connected: true; section: ScrollSectionId }
  | { name: string; connected: false }

const navLinks: NavLink[] = [
  { name: 'Home', section: 'hero', connected: true },
  { name: 'Features', section: 'features', connected: true },
  { name: 'Solutions', section: 'modules', connected: true },
  { name: 'Pricing', connected: false },
  { name: 'Resources', section: 'resources', connected: true },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('hero')
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    if (!isHome) return
    const t = sessionStorage.getItem('scrollToSection')
    if (!t) return
    sessionStorage.removeItem('scrollToSection')
    let n = 0
    const id = setInterval(() => {
      const el = document.getElementById(t)
      if (el) { clearInterval(id); el.scrollIntoView({ behavior: 'smooth' }) }
      if (++n > 25) clearInterval(id)
    }, 100)
    return () => clearInterval(id)
  }, [isHome])

  React.useEffect(() => {
    if (!isHome) return
    const navbarOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height').trim()
      const n = parseFloat(raw)
      return Number.isFinite(n) ? n : 64
    }
    const updateActiveFromScroll = () => {
      const y = navbarOffset() + 12
      let current: ScrollSectionId = 'hero'
      for (const id of SCROLL_SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= y) current = id
      }
      setActiveSection(current)
    }
    updateActiveFromScroll()
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll)
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [isHome])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const goSection = (e: React.MouseEvent, section: ScrollSectionId) => {
    e.preventDefault()
    setMobileOpen(false)
    setActiveSection(section)
    if (isHome) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else {
      sessionStorage.setItem('scrollToSection', section)
      navigate('/')
    }
  }

  return (
    <TooltipProvider>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b shadow-sm' : 'bg-transparent'}`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto flex h-full items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex min-h-0 shrink-0 items-center py-0" onClick={() => setMobileOpen(false)} aria-label="Acadhub home">
            <img
              src={BRAND_LOGO_SRC}
              alt="Acadhub"
              width={400}
              height={96}
              className={brandLogoClassName}
              decoding="async"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => {
              if (!l.connected) {
                return (
                  <span
                    key={l.name}
                    className="text-[16px] font-medium py-1 text-[var(--muted-foreground)] cursor-default select-none"
                  >
                    {l.name}
                  </span>
                )
              }
              const active = isHome && activeSection === l.section
              return (
                <a
                  key={l.name}
                  href={`#${l.section}`}
                  onClick={(e) => goSection(e, l.section)}
                  className={`text-[16px] font-medium transition-colors relative py-1 ${active ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
                >
                  {l.name}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-[var(--accent)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Tooltip content={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                {resolvedTheme === 'dark' ? <Sun className="" /> : <Moon className="" />}
              </IconButton>
            </Tooltip>
            <OnesazButton className="text-base rounded-md bg-[#6933d3] text-white" variant="contained" size="sm">Sign in</OnesazButton>
            <OnesazButton className="text-base rounded-md text-black" variant="outlined" size="sm" endIcon={<ArrowRight className="h-3.5 w-3.5" />}>Get a Demo</OnesazButton>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <Tooltip content={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton variant="ghost" size="sm" aria-label="Theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </IconButton>
            </Tooltip>
            <IconButton variant="ghost" size="sm" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconButton>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-[80vw] max-w-xs z-50 md:hidden bg-[var(--card)] border-l shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b">
                  <span className="flex min-w-0 items-center">
                    <img
                      src={BRAND_LOGO_SRC}
                      alt="Acadhub"
                      width={400}
                      height={96}
                      className="h-11 w-auto max-w-[min(100%,240px)] origin-left scale-105 object-contain object-left sm:h-12 sm:max-w-[260px]"
                      decoding="async"
                    />
                  </span>
                  <IconButton variant="ghost" size="sm" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                    <X className="w-4 h-4" />
                  </IconButton>
                </div>
                <div className="flex-1 p-4 space-y-1">
                  {navLinks.map((l, i) =>
                    !l.connected ? (
                      <span
                        key={l.name}
                        className="block px-3 py-2.5 text-sm font-medium rounded-lg text-[var(--muted-foreground)] cursor-default"
                      >
                        {l.name}
                      </span>
                    ) : (
                      <motion.a
                        key={l.name}
                        href={`#${l.section}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${isHome && activeSection === l.section ? 'text-[var(--accent)] bg-[var(--accent-bg)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]'}`}
                        onClick={(e) => goSection(e, l.section)}
                      >
                        {l.name}
                      </motion.a>
                    ),
                  )}
                </div>
                <div className="p-4 border-t space-y-2">
                  <OnesazButton className="text-base rounded-md text-black" variant="outlined" size="sm" fullWidth>Sign in</OnesazButton>
                  <Button fullWidth size="sm">Get a Demo</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}
