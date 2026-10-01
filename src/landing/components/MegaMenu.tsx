import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { NavLink, NavMenu } from '../content/navigation'

/** Moves focus between links in a menu with the arrow keys. */
export function useArrowKeyFocus<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])
    if (!items.length) return
    e.preventDefault()
    const i = items.indexOf(document.activeElement as HTMLElement)
    let next = 0
    if (e.key === 'End') next = items.length - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i < 0 ? 0 : (i + 1) % items.length
    else next = i <= 0 ? items.length - 1 : i - 1
    items[next].focus()
  }
  return { ref, onKeyDown }
}

function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      to={link.to}
      onClick={onNavigate}
      className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 text-[14px] text-[color:var(--ink-900)] transition-colors hover:bg-[rgba(36,71,209,0.06)] hover:text-[color:var(--brand)]"
    >
      {link.dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: link.dot }} />}
      {link.label}
    </Link>
  )
}

function ExploreLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      to={link.to}
      onClick={onNavigate}
      className="mt-1 inline-flex items-center gap-1 self-start text-[14px] font-semibold text-[color:var(--brand)] hover:underline"
    >
      {link.label}
      <ArrowUpRight size={14} strokeWidth={2.2} />
    </Link>
  )
}

/** Full-width mega menu panel, Scalefusion style: product cards or headed link columns. */
export function MegaPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const { ref, onKeyDown } = useArrowKeyFocus<HTMLDivElement>()

  return (
    <div
      ref={ref}
      id={`menu-${menu.id}`}
      role="region"
      aria-label={`${menu.label} menu`}
      onKeyDown={onKeyDown}
      className="lp-menu-in absolute inset-x-0 top-full border-t border-[color:var(--line)] bg-white shadow-[0_30px_50px_-24px_rgba(15,23,41,0.25)]"
    >
      <div className="lp-container py-6 pb-8">
        {menu.layout === 'cards' ? (
          <div className="grid grid-cols-3 gap-4">
            {menu.groups.map((g) => (
              <div key={g.title} className="flex flex-col gap-3 rounded-[10px] bg-[#F5F6F8] p-5">
                <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">{g.title}</span>
                {g.description && <p className="text-[13.5px] leading-relaxed text-[color:var(--ink-600)]">{g.description}</p>}
                {g.explore && <ExploreLink link={g.explore} onNavigate={onNavigate} />}
                <div className="mt-1 flex flex-col border-t border-[#E4E7EC] pt-3">
                  {g.links.map((l) => (
                    <MenuLink key={l.label} link={l} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid items-start gap-7"
            style={{
              gridTemplateColumns:
                menu.id === 'solutions'
                  ? 'minmax(0,1fr) minmax(0,1fr) minmax(0,2fr) minmax(0,1fr)'
                  : `repeat(${menu.groups.length + (menu.promos?.length ?? 0) + (menu.id === 'about' ? 1 : 0)}, minmax(0,1fr))`,
            }}
          >
            {menu.groups.map((g) => (
              <div key={g.title} className="flex flex-col">
                <span className="mb-2 border-b border-[#E4E7EC] pb-3 text-[15px] font-semibold text-[color:var(--brand)]">
                  {g.title}
                </span>
                <div className={g.links.length > 6 ? 'grid grid-cols-2 gap-x-4' : 'flex flex-col'}>
                  {g.links.map((l) => (
                    <MenuLink key={l.label} link={l} onNavigate={onNavigate} />
                  ))}
                </div>
                {g.explore && <ExploreLink link={g.explore} onNavigate={onNavigate} />}
              </div>
            ))}
            {menu.id === 'about' && <div aria-hidden />}
            {menu.promos?.map((p) => (
              <div
                key={p.title}
                className="flex min-h-[170px] flex-col justify-end gap-2 rounded-[14px] p-[22px]"
                style={{ background: 'linear-gradient(145deg, #0B1426 0%, #1B2F7A 60%, #2447D1 100%)' }}
              >
                <span className="text-[17px] font-bold leading-tight text-white">{p.title}</span>
                <span className="text-[12.5px] leading-normal text-white/75">{p.text}</span>
                <Link
                  to={p.cta.to}
                  onClick={onNavigate}
                  className="mt-2 inline-flex h-[34px] items-center gap-1.5 self-start rounded-md bg-white px-3.5 text-[13px] font-semibold text-[#1B2F7A]"
                >
                  {p.cta.label}
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** Compact dropdown (Contact Us), anchored under its trigger. */
export function SmallPanel({ links, onNavigate, id }: { links: NavLink[]; onNavigate: () => void; id: string }) {
  const { ref, onKeyDown } = useArrowKeyFocus<HTMLDivElement>()
  return (
    <div
      ref={ref}
      id={id}
      onKeyDown={onKeyDown}
      className="lp-menu-in absolute left-0 top-full min-w-[200px] border border-[color:var(--line)] bg-white py-1.5 shadow-[0_16px_30px_-16px_rgba(15,23,41,0.3)]"
    >
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to}
          onClick={onNavigate}
          className="block px-4 py-2.5 text-[14px] text-[color:var(--ink-900)] hover:bg-[color:var(--surface-alt)] hover:text-[color:var(--brand)]"
        >
          {l.label}
        </Link>
      ))}
    </div>
  )
}
