import * as React from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { ChevronDown, LogIn, Menu } from 'lucide-react'
import { Logo } from './Logo'
import { MegaPanel, SmallPanel } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import { CONTACT_MENU, MENUS, PRICING_LINK, PYQ_LINK } from '../content/navigation'
import { CTA } from '../content/names'

type OpenId = (typeof MENUS)[number]['id'] | 'contact' | null

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Sticky site header (Scalefusion pattern): logo left, five menus centred,
 * Login and "Book a demo" right. Menus open on hover, click, Enter or Space;
 * close on Esc, outside click or link click. Under 1024 px the menu button opens
 * the mobile drawer.
 */
export function SiteHeader() {
  const [open, setOpen] = React.useState<OpenId>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const headerRef = React.useRef<HTMLElement | null>(null)
  const closeTimer = React.useRef<number | undefined>(undefined)
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})
  const location = useLocation()

  const close = React.useCallback(() => setOpen(null), [])

  // Close menus on navigation
  React.useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  // Shadow once the page scrolls
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc and outside click close the open menu
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerRefs.current[open]?.focus()
        setOpen(null)
      }
    }
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  const hoverOpen = (id: OpenId) => {
    if (!canHover()) return
    window.clearTimeout(closeTimer.current)
    setOpen(id)
  }
  const hoverClose = () => {
    if (!canHover()) return
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(null), 140)
  }
  const keepOpen = () => window.clearTimeout(closeTimer.current)

  // ArrowDown on a menu button opens it and moves focus to its first link
  const focusFirst = React.useRef(false)
  React.useEffect(() => {
    if (open && focusFirst.current) {
      focusFirst.current = false
      document.querySelector<HTMLElement>(`#menu-${open} a[href]`)?.focus()
    }
  }, [open])

  const onTriggerKey = (id: OpenId) => (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusFirst.current = true
      if (open === id) document.querySelector<HTMLElement>(`#menu-${id} a[href]`)?.focus()
      else setOpen(id)
    }
  }

  const openMenu = MENUS.find((m) => m.id === open)

  return (
    <header
      ref={headerRef}
      onMouseLeave={hoverClose}
      onMouseEnter={keepOpen}
      className={`sticky top-0 z-50 h-[var(--header-h)] border-b border-[color:var(--line)] bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_6px_20px_-12px_rgba(15,23,41,0.25)]' : ''
      }`}
    >
      <div className="lp-container flex h-full items-center justify-between gap-6 max-[1099px]:gap-3 max-[399px]:gap-2">
        <Logo />

        <nav aria-label="Main" className="hidden h-full items-stretch gap-0.5 min-[1024px]:flex">
          {MENUS.map((m) => {
            const isOpen = open === m.id
            return (
              <div key={m.id} className="flex items-stretch" onMouseEnter={() => hoverOpen(m.id)}>
                <button
                  ref={(el) => {
                    triggerRefs.current[m.id] = el
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-${m.id}`}
                  onClick={() => setOpen(isOpen ? null : m.id)}
                  onKeyDown={onTriggerKey(m.id)}
                  className={`relative flex items-center gap-1 whitespace-nowrap px-3 text-[15px] font-medium max-[1199px]:px-2.5 max-[1099px]:px-2 max-[1099px]:text-[14.5px] transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:rounded after:bg-[color:var(--brand)] after:transition-transform ${
                    isOpen
                      ? 'text-[color:var(--brand)] after:scale-x-100'
                      : 'text-[#1F2637] after:scale-x-0 hover:text-[color:var(--brand)]'
                  }`}
                >
                  {m.label}
                  <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )
          })}
          {[PRICING_LINK, PYQ_LINK].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onMouseEnter={() => setOpen(null)}
              className={({ isActive }) =>
                `relative flex items-center whitespace-nowrap px-3 text-[15px] font-medium max-[1199px]:px-2.5 max-[1099px]:px-2 max-[1099px]:text-[14.5px] transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded after:bg-[color:var(--brand)] after:transition-transform ${
                  isActive
                    ? 'text-[color:var(--brand)] after:scale-x-100'
                    : 'text-[#1F2637] after:scale-x-0 hover:text-[color:var(--brand)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="relative flex items-stretch" onMouseEnter={() => hoverOpen('contact')}>
            <button
              ref={(el) => {
                triggerRefs.current.contact = el
              }}
              type="button"
              aria-expanded={open === 'contact'}
              aria-controls="menu-contact"
              onClick={() => setOpen(open === 'contact' ? null : 'contact')}
              onKeyDown={onTriggerKey('contact')}
              className={`flex items-center gap-1 whitespace-nowrap px-3 text-[15px] font-medium max-[1199px]:px-2.5 max-[1099px]:px-2 max-[1099px]:text-[14.5px] transition-colors ${
                open === 'contact' ? 'text-[color:var(--brand)]' : 'text-[#1F2637] hover:text-[color:var(--brand)]'
              }`}
            >
              Contact Us
              <ChevronDown size={14} className={`transition-transform ${open === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            {open === 'contact' && <SmallPanel id="menu-contact" links={CONTACT_MENU} onNavigate={close} />}
          </div>
        </nav>

        <div className="flex items-center gap-5 max-[1099px]:gap-3 max-[399px]:gap-1">
          <a
            href={CTA.loginHref}
            className="hidden items-center gap-2 text-[15px] font-semibold text-[color:var(--brand)] hover:text-[color:var(--brand-hover)] min-[1024px]:inline-flex"
          >
            <LogIn size={18} />
            {CTA.login}
          </a>
          <Link to={CTA.demoPath} className="lp-btn lp-btn-primary lp-btn-sm max-[399px]:!px-3 max-[399px]:!text-[13px]">
            {CTA.demo}
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[color:var(--ink-900)] min-[1024px]:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {openMenu && <MegaPanel menu={openMenu} onNavigate={close} />}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
