import * as React from 'react'
import {
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  MessageSquare,
  Phone,
  ReceiptIndianRupee,
  ScanLine,
  TabletSmartphone,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { SEPARATE_TOOLS } from '../content/home'
import { BRAND } from '../content/names'

const TOOL_ICONS: Record<(typeof SEPARATE_TOOLS)[number]['key'], LucideIcon> = {
  learning: BookOpen,
  exams: FileCheck2,
  omr: ScanLine,
  qbank: CircleHelp,
  devices: TabletSmartphone,
  video: Video,
  sms: MessageSquare,
  fees: ReceiptIndianRupee,
  attendance: ClipboardCheck,
  ai: Phone,
}

// Dark plum panel with a soft glow and faint rings, like the reference feature banners
const PANEL_BG =
  'repeating-radial-gradient(circle at 50% 55%, rgba(255,255,255,.028) 0 1px, transparent 1px 84px), radial-gradient(55% 65% at 50% 55%, rgba(128,58,112,.55) 0%, rgba(84,36,78,.32) 42%, rgba(30,21,30,0) 78%), radial-gradient(45% 55% at 100% 0%, rgba(98,64,150,.28) 0%, rgba(98,64,150,0) 70%), #1A1519'
const YELLOW = '#E3DC4B'

type Mode = 'without' | 'with'
type Point = [x: number, y: number, tilt?: number]

/**
 * Where each tool sits, in % of the stage. Without: scattered and tilted. With: tidy rows above the ONESAZ hub.
 * Phones get their own two-column layouts.
 */
const LAYOUT: Record<'wide' | 'narrow', { without: Point[]; with: Point[]; hub: Point; toast: Point }> = {
  wide: {
    without: [
      [16, 14, -5],
      [46, 11, 3],
      [80, 15, -3],
      [22, 36, 5],
      [57, 37, -4],
      [87, 47, 6],
      [15, 60, 3],
      [42, 60, -4],
      [64, 64, 5],
      [84, 83, -6],
    ],
    with: [
      [13, 9],
      [37.7, 9],
      [62.3, 9],
      [87, 9],
      [13, 28],
      [37.7, 28],
      [62.3, 28],
      [87, 28],
      [37.7, 47],
      [62.3, 47],
    ],
    hub: [50, 80],
    toast: [86, 80],
  },
  narrow: {
    // One card per row, zig-zagging, so nothing collides on small phones
    without: [
      [38, 5, -2],
      [62, 14.2, 2],
      [38, 23.4, 2],
      [62, 32.6, -2],
      [38, 41.8, -2],
      [62, 51, 2],
      [38, 60.2, 2],
      [62, 69.4, -2],
      [38, 78.6, -2],
      [62, 87.8, 2],
    ],
    with: [
      [26, 5],
      [74, 5],
      [26, 16],
      [74, 16],
      [26, 27],
      [74, 27],
      [26, 38],
      [74, 38],
      [26, 49],
      [74, 49],
    ],
    hub: [50, 67],
    toast: [50, 87],
  },
}
/** How long each side shows before switching, and how long a click pauses the loop. */
const WITHOUT_MS = 4000
const WITH_MS = 7500
const PAUSE_AFTER_CLICK_MS = 12000

const ATTENDANCE = SEPARATE_TOOLS.findIndex((t) => t.key === 'attendance')
const MESSAGES = SEPARATE_TOOLS.findIndex((t) => t.key === 'sms')

/** Wide layout on tablets and up; true when the stage should use the phone layout. */
function useNarrow() {
  const [narrow, setNarrow] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return narrow
}

/**
 * The live example in "With ONESAZ": attendance is marked, the update travels through the ONESAZ hub,
 * and the parent's WhatsApp message appears. Beats: 0 idle, 1 attendance lit, 2 to the hub, 3 to messages, 4 message shown.
 */
function useStory(active: boolean) {
  const [beat, setBeat] = React.useState(0)
  React.useEffect(() => {
    setBeat(0)
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(4)
      return
    }
    const timers: number[] = []
    const run = () => {
      setBeat(0)
      ;[
        [1, 1000],
        [2, 1700],
        [3, 2700],
        [4, 3500],
      ].forEach(([b, ms]) => timers.push(window.setTimeout(() => setBeat(b), ms)))
      timers.push(window.setTimeout(run, 7200))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [active])
  return beat
}

/** Why ONESAZ: tap between ten separate tools and one connected platform. */
export function WhyOnesazSection({ id = 'why-onesaz' }: { id?: string }) {
  const [mode, setMode] = React.useState<Mode>('without')
  const sectionRef = React.useRef<HTMLElement>(null)
  const pausedUntil = React.useRef(0)

  // Flip between the two sides on its own while the section is on screen: a short look at "without",
  // then long enough on "with" for the WhatsApp example to play. A click pauses it for a while.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = sectionRef.current
    if (!el) return
    let visible = false
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    const t = window.setTimeout(
      function tick() {
        if (visible && Date.now() >= pausedUntil.current) setMode((m) => (m === 'without' ? 'with' : 'without'))
        else t2 = window.setTimeout(tick, 1000)
      },
      mode === 'without' ? WITHOUT_MS : WITH_MS,
    )
    let t2 = 0
    return () => {
      io.disconnect()
      window.clearTimeout(t)
      window.clearTimeout(t2)
    }
  }, [mode])
  const narrow = useNarrow()
  const layout = LAYOUT[narrow ? 'narrow' : 'wide']
  const isWith = mode === 'with'
  const beat = useStory(isWith)
  const points = isWith ? layout.with : layout.without

  // The dot follows attendance → hub → messages
  const dotAt = beat >= 3 ? layout.with[MESSAGES] : beat === 2 ? layout.hub : layout.with[ATTENDANCE]

  return (
    <section ref={sectionRef} id={id} className="bg-white py-14 max-[639px]:py-10">
      <div className="lp-container">
        <div
          className="flex flex-col items-center gap-6 rounded-[28px] px-14 py-9 text-white max-[999px]:px-8 max-[639px]:gap-5 max-[639px]:rounded-[20px] max-[639px]:px-4 max-[639px]:py-10"
          style={{ background: PANEL_BG }}
        >
          <div className="flex max-w-[860px] flex-col items-center gap-3 text-center">
            <span className="lp-eyebrow" style={{ color: YELLOW }}>
              Why ONESAZ is different
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
              Others offer separate tools
              <br />
              <span className="text-[#9DB4FF]">ONESAZ gives you one platform.</span>
            </h2>
          </div>

          {/* Switch */}
          <div className="inline-flex gap-1 rounded-[14px] border border-white/[.12] bg-white/[.07] p-1" role="group" aria-label="Compare">
            {(
              [
                ['without', 'Without ONESAZ'],
                ['with', 'With ONESAZ'],
              ] as const
            ).map(([m, label]) => {
              const on = mode === m
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    pausedUntil.current = Date.now() + PAUSE_AFTER_CLICK_MS
                    setMode(m)
                  }}
                  className={`h-10 rounded-[10px] px-5 text-[14px] font-semibold transition-colors max-[379px]:px-3.5 max-[379px]:text-[13px] ${
                    on
                      ? m === 'with'
                        ? 'bg-[color:var(--brand)] text-white shadow-[0_8px_20px_-8px_rgba(36,71,209,.8)]'
                        : 'bg-[#3A1D25] text-[#FF9C9C]'
                      : 'text-[#C9C2D6] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Stage */}
          <div className="relative h-[330px] w-full max-w-[860px] max-[767px]:h-[560px]" aria-hidden>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {isWith
                ? layout.with.map(([x, y], i) => (
                    <path
                      key={`w${i}`}
                      className="lp-fade"
                      d={`M${x} ${y + 4} C ${x} ${layout.hub[1] - 12}, ${layout.hub[0]} ${layout.hub[1] - 18}, ${layout.hub[0]} ${layout.hub[1] - 6}`}
                      stroke="rgba(143,162,255,.5)"
                      strokeWidth="1.4"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))
                : TANGLE.map(([a, b], i) => {
                    const [x1, y1] = layout.without[a]
                    const [x2, y2] = layout.without[b]
                    return (
                      <path
                        key={`o${i}`}
                        className="lp-fade"
                        d={`M${x1} ${y1} Q ${(x1 + x2) / 2 + 4} ${(y1 + y2) / 2 - 6} ${x2} ${y2}`}
                        stroke="rgba(255,120,120,.45)"
                        strokeWidth="1.4"
                        strokeDasharray="5 6"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
            </svg>

            {/* Tools */}
            {SEPARATE_TOOLS.map((t, i) => {
              const Icon = TOOL_ICONS[t.key]
              const [x, y, tilt = 0] = points[i]
              const lit = isWith && ((i === ATTENDANCE && beat >= 1 && beat < 4) || (i === MESSAGES && beat >= 4))
              return (
                <div
                  key={t.key}
                  className={`absolute z-[2] flex items-center gap-2 rounded-[12px] px-3 py-2.5 text-[13.5px] font-medium transition-[left,top,transform,background-color,border-color,color,box-shadow] duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] max-[767px]:px-2.5 max-[767px]:text-[12.5px] ${
                    isWith
                      ? 'w-[min(196px,23.5%)] whitespace-normal border border-white bg-white leading-tight text-[color:var(--ink-900)] shadow-[0_14px_30px_-16px_rgba(0,0,0,.6)] max-[767px]:w-[45%]'
                      : 'whitespace-nowrap border border-dashed border-[rgba(255,140,140,.45)] bg-white/[.05] text-[#E7DDE9]'
                  } ${lit ? '!shadow-[0_0_0_3px_#E3DC4B,0_14px_30px_-16px_rgba(0,0,0,.6)]' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) rotate(${tilt}deg)` }}
                >
                  <span
                    className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[7px] transition-colors duration-500 ${
                      isWith ? 'bg-[color:var(--brand-tint)] text-[color:var(--brand)]' : 'bg-[rgba(255,140,140,.14)] text-[#F2A9A0]'
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.9} />
                  </span>
                  <span className={isWith ? 'min-w-0' : ''}>{t.label}</span>
                  {!isWith && <span className="text-[10.5px] text-[#FF9C9C] max-[1199px]:hidden">· Vendor {i + 1}</span>}
                </div>
              )
            })}

            {/* ONESAZ hub */}
            <div
              className={`absolute z-[3] flex flex-col items-center rounded-full bg-[linear-gradient(135deg,#2447D1,#6A4BD8)] px-7 py-3 text-center shadow-[0_0_0_8px_rgba(36,71,209,.18),0_24px_50px_-16px_rgba(36,71,209,.9)] transition-[opacity,transform] duration-700 ${
                isWith ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${layout.hub[0]}%`,
                top: `${layout.hub[1]}%`,
                transform: `translate(-50%,-50%) scale(${isWith ? 1 : 0.6})`,
              }}
            >
              <span className="flex items-center gap-2">
                <img src={BRAND.logoSrc} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-full bg-white p-[2px]" />
                <span className="font-[family-name:var(--font-display)] text-[18px] font-bold tracking-[.02em]">{BRAND.name}</span>
              </span>
              <span className="mt-0.5 text-[10px] tracking-[.18em] text-[#C8D1FF]">ONE PLATFORM</span>
            </div>

            {/* The update travelling through ONESAZ */}
            {isWith && beat >= 1 && beat < 4 && (
              <span
                className="absolute z-[4] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left,top] duration-700 ease-in-out"
                style={{ left: `${dotAt[0]}%`, top: `${dotAt[1]}%`, background: YELLOW, boxShadow: `0 0 14px ${YELLOW}` }}
              />
            )}

            {/* The parent's message */}
            <div
              className={`absolute z-[4] w-[220px] rounded-[14px] bg-white px-3.5 py-3 text-[12.5px] text-[color:var(--ink-900)] shadow-[0_20px_40px_-18px_rgba(0,0,0,.7)] transition-opacity duration-500 max-[767px]:w-[86%] ${
                isWith && beat >= 4 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: `${layout.toast[0]}%`, top: `${layout.toast[1]}%`, transform: 'translate(-50%,-50%)' }}
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <MessageSquare size={13} className="text-[#12B76A]" />
                Mrs. Rao · WhatsApp
              </span>
              <span className="mt-0.5 block text-[color:var(--ink-600)]">Ananya was marked absent today at 9:05 AM.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Which tools the red “manual copying” lines join, without ONESAZ. */
const TANGLE: [number, number][] = [
  [0, 3],
  [3, 6],
  [1, 4],
  [4, 7],
  [2, 5],
  [5, 8],
  [6, 7],
  [8, 9],
  [0, 1],
  [7, 8],
]
