import * as React from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronDown, LogIn, X } from 'lucide-react'
import { Logo } from './Logo'
import { CONTACT_MENU, MENUS, type NavLink, PRICING_LINK, PYQ_LINK } from '../content/navigation'
import { CTA } from '../content/names'

interface Section {
  id: string
  label: string
  links: NavLink[]
}

const SECTIONS: Section[] = [
  ...MENUS.map((m) => ({
    id: m.id,
    label: m.label,
    links: m.groups.flatMap((g) => [...g.links, ...(g.explore && m.layout === 'columns' ? [g.explore] : [])]),
  })),
  { id: 'contact', label: 'Contact Us', links: CONTACT_MENU },
]

/**
 * Mobile menu (under 1024 px): a full-height drawer where every header menu
 * becomes an accordion, so every mega-menu link is reachable on phones.
 * Esc closes it, body scroll is locked and focus stays inside.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const panelRef = React.useRef<HTMLDivElement | null>(null)
  const closeRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button'))
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="lp fixed inset-0 z-[60]" style={{ background: 'transparent', minHeight: 0 }}>
      <div className="absolute inset-0 bg-[rgba(15,23,41,0.45)]" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="lp-menu-in absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl"
      >
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-[color:var(--line)] px-4">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg"
          >
            <X size={22} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-2">
          {SECTIONS.map((s) => {
            const isOpen = expanded === s.id
            return (
              <div key={s.id} className="border-b border-[#EEF0F3]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                  className="flex h-[52px] w-full items-center justify-between text-[17px] font-medium text-[color:var(--ink-900)]"
                >
                  {s.label}
                  <ChevronDown size={18} className={`text-[color:var(--ink-400)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="flex flex-col pb-3">
                    {s.links.map((l) => (
                      <Link
                        key={`${s.id}-${l.label}`}
                        to={l.to}
                        onClick={onClose}
                        className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-[15px] text-[color:var(--ink-600)] hover:bg-[color:var(--surface-alt)]"
                      >
                        {l.icon && <l.icon size={16} strokeWidth={1.75} aria-hidden className="shrink-0" style={{ color: l.color }} />}
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {[PRICING_LINK, PYQ_LINK].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="flex h-[52px] items-center border-b border-[#EEF0F3] text-[17px] font-medium text-[color:var(--ink-900)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-[color:var(--line)] p-4">
          <Link to={CTA.demoPath} onClick={onClose} className="lp-btn lp-btn-primary w-full">
            {CTA.demo}
          </Link>
          <a href={CTA.loginHref} className="lp-btn lp-btn-secondary w-full">
            <LogIn size={18} />
            {CTA.login}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
