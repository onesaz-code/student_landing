import * as React from 'react'
import {
  BookOpen,
  CalendarCheck,
  CircleHelp,
  Crosshair,
  FileCheck2,
  IndianRupee,
  Landmark,
  MessageSquare,
  Phone,
  ScanLine,
  TabletSmartphone,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { GROUP_COLORS, MODULES } from '../content/home'

const ICONS: Record<string, LucideIcon> = {
  lms: BookOpen,
  desc: FileCheck2,
  omr: ScanLine,
  qbank: CircleHelp,
  attendance: CalendarCheck,
  erp: Landmark,
  payments: IndianRupee,
  mdm: TabletSmartphone,
  video: Video,
  sms: MessageSquare,
  adaptive: Crosshair,
  'ai-calling': Phone,
}

// Ring geometry (px, in the 750 × 750 ring box)
const BOX = 750
const C = BOX / 2
const R = 312
const SPOKE = 278

/**
 * "Inside the platform": twelve modules on a ring around a centre card.
 * Click or arrow keys select a module. Under 760 px the ring becomes a two-column list.
 */
export function PlatformModulesSection({ id = 'platform-modules' }: { id?: string }) {
  const [active, setActive] = React.useState(1)
  const nodeRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const n = MODULES.length
  const cur = MODULES[active]

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
    setActive(next)
    nodeRefs.current[next]?.focus()
  }

  const centre = (
    <>
      <span className="text-[14px] text-[color:var(--ink-600)]">
        {cur.group} · {cur.name}
      </span>
      <span className="font-[family-name:var(--font-display)] text-[22px] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)]">
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
        <div className="relative shrink-0 max-[899px]:[zoom:.82] max-[759px]:hidden" style={{ width: BOX, height: BOX }}>
          <div
            className="absolute rounded-full border-[1.5px] border-dashed border-[#DCE3F5]"
            style={{ left: 117, top: 117, width: 516, height: 516 }}
          />

          {MODULES.map((m, i) => {
            const on = i === active
            const deg = (i / n) * 360 - 90
            return (
              <div
                key={`spoke-${m.key}`}
                aria-hidden
                className="absolute origin-[0_50%] rounded-sm transition-[background,height] duration-[250ms]"
                style={{
                  left: C,
                  top: C,
                  width: SPOKE,
                  height: on ? 4 : 1.5,
                  marginTop: on ? -2 : -0.75,
                  background: on ? 'var(--brand)' : '#DCE3F5',
                  transform: `rotate(${deg}deg)`,
                }}
              />
            )
          })}

          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              left: 210,
              top: 210,
              width: 330,
              height: 330,
              background: 'radial-gradient(circle, rgba(36,71,209,.10), rgba(36,71,209,0) 70%)',
            }}
          />
          <div
            key={cur.key}
            aria-live="polite"
            className="lp-fade absolute z-[1] flex flex-col items-center justify-center gap-3 rounded-full border border-[#E8ECF5] bg-white px-10 text-center shadow-[0_30px_60px_-30px_rgba(20,40,110,.25)]"
            style={{ left: 220, top: 220, width: 310, height: 310 }}
          >
            {centre}
          </div>

          <div role="group" aria-label="Platform modules">
            {MODULES.map((m, i) => {
              const on = i === active
              const a = (i / n) * Math.PI * 2 - Math.PI / 2
              const x = Math.round(C + R * Math.cos(a))
              const y = Math.round(C + R * Math.sin(a))
              const size = on ? 80 : 68
              const Icon = ICONS[m.key]
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
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className="absolute z-[2] flex items-center justify-center rounded-full transition-[transform,box-shadow,background,width,height,margin] duration-200 hover:-translate-y-0.5 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[rgba(36,71,209,.35)]"
                    style={{
                      left: x,
                      top: y,
                      width: size,
                      height: size,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                      background: on ? 'var(--brand)' : '#fff',
                      color: on ? '#fff' : 'var(--ink-600)',
                      border: on ? '1px solid var(--brand)' : '1px solid #E3E7EF',
                      boxShadow: on ? '0 16px 32px -12px rgba(36,71,209,.55)' : '0 4px 12px -8px rgba(15,23,41,.15)',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </button>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute w-40 text-center text-[14px]"
                    style={{
                      left: x,
                      top: y + size / 2 + 10,
                      marginLeft: -80,
                      fontWeight: on ? 600 : 500,
                      color: on ? 'var(--ink-900)' : 'var(--ink-600)',
                    }}
                  >
                    {m.label}
                  </span>
                </React.Fragment>
              )
            })}
          </div>
        </div>
        <p className="text-[15px] text-[#667085] max-[759px]:hidden">Use the arrow keys to move around the ring.</p>

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
