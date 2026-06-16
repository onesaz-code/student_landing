import * as React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  TopBarBrand, TopBarNav, TopBarNavItem, TopBarSection,
  IconButton, Tooltip, TooltipProvider, useTheme,
  Button as OnesazButton,
} from '@onesaz/ui'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { mdmBrand } from '../data/mdmSiteContent'

const BRAND_LOGO_SRC = '/images/a7e1abaeef1b895c7157156ca5f0a1b9c2638b12.png'

const brandLogoClassName =
  'h-[calc(var(--navbar-height)-14px)] w-auto max-w-[min(88vw,300px)] origin-left scale-[1.05] object-contain object-left sm:max-w-[340px] sm:scale-[1.06] md:max-w-[400px] md:scale-[1.07]'

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

type SolutionType = 'lms' | 'erp' | 'mdm'

export function Navbar({
  activeSolution = 'mdm',
  onSolutionChange,
}: {
  activeSolution?: SolutionType
  onSolutionChange?: (value: SolutionType) => void
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('hero')
  const [featuresMenuOpen, setFeaturesMenuOpen] = React.useState(false)
  const featuresMenuRef = React.useRef<HTMLDivElement | null>(null)
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

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!featuresMenuRef.current) return
      if (!featuresMenuRef.current.contains(event.target as Node)) {
        setFeaturesMenuOpen(false)
      }
    }
    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [])

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

  const setSolution = (next: SolutionType) => {
    onSolutionChange?.(next)
    setFeaturesMenuOpen(false)
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

            {/* Brand */}
            <TopBarBrand
              href="/"
              logo={
                <img
                  src={BRAND_LOGO_SRC}
                  alt="Acadhub"
                  width={400}
                  height={96}
                  className={brandLogoClassName}
                  decoding="async"
                />
              }
              className="flex min-h-0 shrink-0 items-center py-0"
              onClick={() => setMobileOpen(false)}
            />

            {/* Desktop nav links */}
            <TopBarNav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => {
                // Features — custom dropdown
                if (l.connected && l.name === 'Features') {
                  const active = isHome && activeSection === l.section
                  return (
                    <div key={l.name} className="relative" ref={featuresMenuRef}>
                      <button
                        type="button"
                        onClick={() => setFeaturesMenuOpen((v) => !v)}
                        className={`inline-flex items-center gap-1 text-[15px] font-medium transition-all px-3 py-1.5 rounded-lg ${active ? 'bg-[var(--muted)] text-[var(--foreground)] font-semibold' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/60'}`}
                      >
                        Features
                        <ChevronDown className={`h-4 w-4 transition-transform ${featuresMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {featuresMenuOpen && (
                        <div className="absolute w-[300px] left-0 top-[calc(100%+8px)] z-50 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg">
                          {([
                            { id: 'mdm', label: 'MDM (Mobile Device Management)' },
                            { id: 'lms', label: 'LMS (Learning Management)' },
                            { id: 'erp', label: 'ERP (Enterprise Resource Planning)' },
                          ] as const).map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${activeSolution === item.id ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]'}`}
                              onClick={(e) => {
                                goSection(e as unknown as React.MouseEvent, 'hero')
                                setSolution(item.id)
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                // Non-linked items (Pricing)
                if (!l.connected) {
                  return (
                    <TopBarNavItem
                      key={l.name}
                      className="text-[15px] font-medium px-3 py-1.5 rounded-lg text-[var(--muted-foreground)] cursor-default select-none"
                      onClick={(e) => e.preventDefault()}
                    >
                      {l.name}
                    </TopBarNavItem>
                  )
                }

                // Scroll-linked items
                const active = isHome && activeSection === l.section
                return (
                  <TopBarNavItem
                    key={l.name}
                    href={`#${l.section}`}
                    active={active}
                    onClick={(e) => goSection(e as React.MouseEvent, l.section)}
                    className={`text-[15px] font-medium transition-all px-3 py-1.5 rounded-lg ${active ? 'bg-[var(--muted)] text-[var(--foreground)] font-semibold' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/60'}`}
                  >
                    {l.name}
                  </TopBarNavItem>
                )
              })}
            </TopBarNav>

            {/* Desktop right actions */}
            <TopBarSection align="right" className="hidden md:flex items-center gap-2">
              <Tooltip content={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                <IconButton variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                  {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
                </IconButton>
              </Tooltip>
              <OnesazButton
                type="button"
                className="text-base rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                size="sm"
                onClick={() => window.location.assign(mdmBrand.signInUrl)}
              >
                Sign in
              </OnesazButton>
              {activeSolution !== 'mdm' && (
                <OnesazButton
                  className="text-base rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-bg)]"
                  size="sm"
                  endIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Get a Demo
                </OnesazButton>
              )}
            </TopBarSection>

            {/* Mobile: theme + hamburger */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-[80vw] max-w-xs z-50 md:hidden bg-[var(--card)] border-l shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                  <img src={BRAND_LOGO_SRC} alt="Acadhub" width={400} height={96} className="h-11 w-auto max-w-[min(100%,240px)] origin-left scale-105 object-contain object-left" decoding="async" />
                  <IconButton variant="ghost" size="sm" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                    <X className="w-4 h-4" />
                  </IconButton>
                </div>
                <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navLinks.map((l, i) =>
                    !l.connected ? (
                      <span key={l.name} className="block px-3 py-2.5 text-sm font-medium rounded-lg text-[var(--muted-foreground)] cursor-default">
                        {l.name}
                      </span>
                    ) : l.name === 'Features' ? (
                      <motion.div key={l.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="space-y-1 rounded-lg border border-[var(--border)] p-2">
                        <div className="px-1 text-xs font-semibold text-[var(--muted-foreground)]">Features</div>
                        {([
                          { id: 'mdm', label: 'MDM' },
                          { id: 'lms', label: 'LMS' },
                          { id: 'erp', label: 'ERP' },
                        ] as const).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${activeSolution === item.id ? 'text-[var(--accent)] bg-[var(--accent-bg)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]'}`}
                            onClick={(e) => { setSolution(item.id); goSection(e as unknown as React.MouseEvent, 'hero'); setMobileOpen(false) }}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.a
                        key={l.name}
                        href={`#${l.section}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${isHome && activeSection === l.section ? 'text-[var(--accent)] bg-[var(--accent-bg)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]'}`}
                        onClick={(e) => goSection(e as unknown as React.MouseEvent, l.section)}
                      >
                        {l.name}
                      </motion.a>
                    )
                  )}
                </div>
                <div className="p-4 border-t border-[var(--border)] space-y-2">
                  <OnesazButton
                    type="button"
                    className="text-base rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                    size="sm"
                    fullWidth
                    onClick={() => { setMobileOpen(false); window.location.assign(mdmBrand.signInUrl) }}
                  >
                    Sign in
                  </OnesazButton>
                  {activeSolution !== 'mdm' && (
                    <OnesazButton
                      className="text-base rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-bg)]"
                      size="sm"
                      fullWidth
                    >
                      Get a Demo
                    </OnesazButton>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}
