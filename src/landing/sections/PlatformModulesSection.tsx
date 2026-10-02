import * as React from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { GROUP_COLORS, MODULES } from '../content/home'

// Ring geometry (px, in the 600 × 600 ring box)
const BOX = 600
const C = BOX / 2
const R = 248
const SPOKE = 222
const DASHED = 412
const GLOW = 264
const CARD = 264
/** The centre text sits in the square that fits inside the centre circle, so it never touches the edge. */
const TEXT_BOX = Math.floor(CARD / Math.SQRT2) - 4
/** Module circle sizes (px): resting and selected. */
const NODE = 78
const NODE_ON = 86
/** Auto tour: seconds per module, and how long it waits after a click before carrying on. */
const TOUR_STEP = 3000
const TOUR_RESUME = 10000

/** Splits a module name over two lines (at the space nearest the middle) so it fits inside its circle. */
function twoLines(label: string): string[] {
  // Keep "&" with the word before it ("Bulk SMS &" / "WhatsApp")
  const words = label
    .split(' ')
    .reduce<string[]>((acc, w) => (w === '&' && acc.length ? [...acc.slice(0, -1), `${acc[acc.length - 1]} &`] : [...acc, w]), [])
  if (words.length < 2) return [label]
  let best = 1
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length)
    if (diff < bestDiff) {
      bestDiff = diff
      best = i
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

/** Travelling light on the orbit: a dot with a short fading trail, as [angle offset in degrees, size, opacity]. */
const TRAIL = Array.from({ length: 7 }, (_, i) => [-i * 2.6, 9 - i, 0.9 - i * 0.12] as const)

/**
 * "Inside the platform": twelve modules on a ring around a centre card.
 * The dashed orbit turns slowly with a light travelling round it, and the ring moves to the next
 * module every few seconds while on screen. Clicking a module (or using the arrow keys) stops the tour;
 * it carries on after a short pause. With reduced motion nothing moves.
 * Under 760 px the ring becomes a two-column list.
 */
export function PlatformModulesSection({ id = 'platform-modules' }: { id?: string }) {
  const [active, setActive] = React.useState(1)
  const nodeRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const ringRef = React.useRef<HTMLDivElement>(null)
  const lastPick = React.useRef(0)
  const n = MODULES.length
  const cur = MODULES[active]

  // Auto tour: next module every TOUR_STEP while the ring is on screen, held for a while after a pick
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      const el = ringRef.current
      if (!el || Date.now() - lastPick.current < TOUR_RESUME) return
      const r = el.getBoundingClientRect()
      // Skip while hidden (display: none on phones) or scrolled out of view
      if (!r.height || r.bottom < 0 || r.top > window.innerHeight) return
      setActive((a) => (a + 1) % n)
    }, TOUR_STEP)
    return () => window.clearInterval(id)
  }, [n])

  const pick = (i: number) => {
    lastPick.current = Date.now()
    setActive(i)
  }

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? (i + 1) % n
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? (i - 1 + n) % n
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? n - 1
              : null
    if (next === null) return
    e.preventDefault()
    pick(next)
    nodeRefs.current[next]?.focus()
  }

  const centre = (
    <>
      <span className="text-[14px] text-[color:var(--ink-600)]">
        {cur.group} · {cur.name}
      </span>
      <span className="font-[family-name:var(--font-display)] text-[20px] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)]">
        {cur.stat}
      </span>
      <span className="text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{cur.desc}</span>
    </>
  )

  return (
    <section id={id} className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col items-center gap-6">
        <SectionHeader
          eyebrow="Inside the platform"
          title="Every solution your institution needs, on one platform."
          lead="Twelve solutions and the ONESAZ mobile app, all sharing one record. Select any one to see what it does."
        />

        {/* Ring (760 px and up) */}
        <div ref={ringRef} className="relative shrink-0 max-[759px]:hidden" style={{ width: BOX, height: BOX }}>
          <div className="absolute inset-0">
            {/* Dashed orbit, turning slowly */}
            <div
              aria-hidden
              className="lp-spin absolute rounded-full border-[1.5px] border-dashed border-[#B9C6EE]"
              style={{ left: C - DASHED / 2, top: C - DASHED / 2, width: DASHED, height: DASHED, animationDuration: '60s' }}
            />
            {/* Light travelling round the orbit */}
            <div
              aria-hidden
              className="lp-spin absolute"
              style={{ left: C - DASHED / 2, top: C - DASHED / 2, width: DASHED, height: DASHED, animationDuration: '11s' }}
            >
              {TRAIL.map(([deg, size, opacity]) => (
                <span
                  key={deg}
                  className="absolute left-1/2 top-1/2 rounded-full bg-[color:var(--brand)]"
                  style={{
                    width: size,
                    height: size,
                    opacity,
                    transform: `rotate(${deg}deg) translateY(${-DASHED / 2}px)`,
                    margin: `${-size / 2}px 0 0 ${-size / 2}px`,
                  }}
                />
              ))}
            </div>

            {MODULES.map((m, i) => {
              const on = i === active
              const deg = (i / n) * 360 - 90
              return (
                <div
                  key={on ? `spoke-${m.key}-on` : `spoke-${m.key}`}
                  aria-hidden
                  className={`absolute origin-[0_50%] rounded-sm ${on ? 'lp-draw' : ''}`}
                  style={
                    {
                      left: C,
                      top: C,
                      width: SPOKE,
                      height: on ? 4 : 1.5,
                      marginTop: on ? -2 : -0.75,
                      background: on ? 'var(--brand)' : '#DCE3F5',
                      transform: `rotate(${deg}deg)`,
                      '--deg': `${deg}deg`,
                    } as React.CSSProperties
                  }
                />
              )
            })}

            <div
              aria-hidden
              className="absolute rounded-full"
              style={{
                left: C - GLOW / 2,
                top: C - GLOW / 2,
                width: GLOW,
                height: GLOW,
                background: 'radial-gradient(circle, rgba(36,71,209,.10), rgba(36,71,209,0) 70%)',
              }}
            />
            <div
              key={cur.key}
              aria-live="polite"
              className="absolute z-[1] flex items-center justify-center rounded-full border border-[#E8ECF5] bg-white shadow-[0_30px_60px_-30px_rgba(20,40,110,.25)]"
              style={{ left: C - CARD / 2, top: C - CARD / 2, width: CARD, height: CARD }}
            >
              <div
                className="lp-fade flex flex-col items-center justify-center gap-2.5 overflow-hidden text-center"
                style={{ width: TEXT_BOX, height: TEXT_BOX }}
              >
                {centre}
              </div>
            </div>

            <div role="group" aria-label="Platform modules">
              {MODULES.map((m, i) => {
                const on = i === active
                const a = (i / n) * Math.PI * 2 - Math.PI / 2
                const x = Math.round(C + R * Math.cos(a))
                const y = Math.round(C + R * Math.sin(a))
                const size = on ? NODE_ON : NODE
                return (
                  <React.Fragment key={m.key}>
                    <button
                      ref={(el) => {
                        nodeRefs.current[i] = el
                      }}
                      type="button"
                      aria-pressed={on}
                      aria-label={m.name}
                      tabIndex={on ? 0 : -1}
                      onClick={() => pick(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className="absolute z-[2] flex flex-col items-center justify-center rounded-full px-1.5 text-center text-[11.5px] font-semibold leading-[1.2] transition-[box-shadow,background,color,width,height,margin] duration-200 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[rgba(36,71,209,.35)]"
                      style={{
                        left: x,
                        top: y,
                        width: size,
                        height: size,
                        marginLeft: -size / 2,
                        marginTop: -size / 2,
                        background: on ? 'var(--brand)' : '#fff',
                        color: on ? '#fff' : 'var(--ink-900)',
                        border: on ? '1px solid var(--brand)' : '1px solid #E3E7EF',
                        boxShadow: on ? '0 16px 32px -12px rgba(36,71,209,.55)' : '0 4px 12px -8px rgba(15,23,41,.15)',
                      }}
                    >
                      {twoLines(m.label).map((line) => (
                        <span key={line} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </button>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
        <p className="text-[15px] text-[#667085] max-[759px]:hidden"></p>

        {/* List (under 760 px) */}
        <div className="hidden w-full flex-col gap-3.5 max-[759px]:flex">
          <div role="group" aria-label="Platform modules" className="grid grid-cols-2 gap-2">
            {MODULES.map((m, i) => {
              const on = i === active
              return (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className="flex min-h-12 items-center gap-2 rounded-[10px] border px-3.5 py-2 text-left text-[14px] font-medium leading-tight max-[379px]:text-[13px]"
                  style={{
                    background: on ? 'var(--brand)' : '#fff',
                    color: on ? '#fff' : 'var(--ink-900)',
                    borderColor: on ? 'var(--brand)' : '#E1E4EA',
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: on ? '#fff' : GROUP_COLORS[m.group] }} />
                  {m.label}
                </button>
              )
            })}
          </div>
          <div
            key={cur.key}
            aria-live="polite"
            className="lp-fade flex flex-col gap-2 rounded-[14px] border border-[color:var(--line)] bg-white p-5 shadow-[0_16px_32px_-24px_rgba(20,40,110,.3)]"
          >
            {centre}
          </div>
        </div>
      </div>
    </section>
  )
}
