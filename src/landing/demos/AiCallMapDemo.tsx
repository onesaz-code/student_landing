import * as React from 'react'
import { Clock3, Phone, PhoneCall, PhoneMissed } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Map drawing space; the container uses the same 16:10 ratio so positions line up. */
const W = 160
const H = 100
const SCHOOL_XY = [80, 50] as const

type Result = 'answered' | 'callback' | 'missed'
/** Parents' homes around the school (sample data): position and how the call went. */
const HOMES: { x: number; y: number; result: Result }[] = [
  { x: 22, y: 32, result: 'answered' },
  { x: 96, y: 24, result: 'answered' },
  { x: 112, y: 14, result: 'callback' },
  { x: 140, y: 26, result: 'answered' },
  { x: 146, y: 56, result: 'answered' },
  { x: 132, y: 84, result: 'missed' },
  { x: 102, y: 88, result: 'answered' },
  { x: 62, y: 86, result: 'callback' },
  { x: 30, y: 82, result: 'answered' },
  { x: 14, y: 54, result: 'answered' },
  { x: 34, y: 38, result: 'answered' },
  { x: 126, y: 40, result: 'answered' },
]
const RESULT_STYLE: Record<Result, { color: string; icon: typeof Phone }> = {
  answered: { color: '#12B76A', icon: PhoneCall },
  callback: { color: '#F79009', icon: Clock3 },
  missed: { color: '#98A2B3', icon: PhoneMissed },
}
/** Campaign totals shown when the round finishes (sample data). */
const TOTAL = 120
const SUMMARY = { answered: 101, callback: 15, missed: 4 }

const RING_MS = 380
const NEXT_MS = 560
const HOLD_MS = 3400

/**
 * AI Calling product page demo: a city map with the school in the middle. Calls arc out to parents'
 * homes one after another; each home rings, then shows whether the parent answered, asked for a call
 * back or missed it. With reduced motion it shows the finished round.
 */
export default function AiCallMapDemo() {
  const [called, setCalled] = React.useState(0)
  const [ringing, setRinging] = React.useState(-1)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCalled(HOMES.length)
      return
    }
    const timers: number[] = []
    const run = () => {
      setCalled(0)
      setRinging(-1)
      HOMES.forEach((_, i) => {
        timers.push(window.setTimeout(() => setRinging(i), 500 + NEXT_MS * i))
        timers.push(
          window.setTimeout(
            () => {
              setRinging(-1)
              setCalled(i + 1)
            },
            500 + NEXT_MS * i + RING_MS,
          ),
        )
      })
      timers.push(window.setTimeout(run, 500 + NEXT_MS * HOMES.length + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const done = called === HOMES.length
  const count = done ? TOTAL : Math.round((called / HOMES.length) * TOTAL)
  const [sx, sy] = SCHOOL_XY

  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Map */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#EEF2F6] shadow-[0_22px_40px_-26px_rgba(20,40,110,.45)]">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
          {/* Streets and parks */}
          <g stroke="#fff" strokeLinecap="round">
            <path d="M0 50 H160" strokeWidth="5" />
            <path d="M80 0 V100" strokeWidth="5" />
            <path d="M0 22 C 50 30, 110 10, 160 20" strokeWidth="3" fill="none" />
            <path d="M0 80 C 60 72, 100 92, 160 78" strokeWidth="3" fill="none" />
            <path d="M34 0 V100" strokeWidth="2.5" />
            <path d="M126 0 V100" strokeWidth="2.5" />
          </g>
          <rect x="88" y="58" width="22" height="14" rx="3" fill="#D7E6D2" />
          <rect x="44" y="26" width="18" height="12" rx="3" fill="#D7E6D2" />

          {/* Call arcs from the school */}
          {HOMES.map((h, i) => {
            const active = i < called || i === ringing
            const mx = (sx + h.x) / 2
            const my = (sy + h.y) / 2 - 14
            return (
              <path
                key={i}
                d={`M${sx} ${sy} Q ${mx} ${my} ${h.x} ${h.y}`}
                fill="none"
                stroke="#3FBBEE"
                strokeWidth="0.9"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={active ? 0 : 1}
                opacity={i < called ? 0.3 : 1}
                style={{ transition: 'stroke-dashoffset .35s ease, opacity .4s' }}
              />
            )
          })}
        </svg>

        {/* Homes */}
        {HOMES.map((h, i) => {
          const isRinging = i === ringing
          const isDone = i < called
          const style = RESULT_STYLE[h.result]
          const Icon = isRinging ? Phone : isDone ? style.icon : null
          return (
            <span
              key={i}
              className="absolute flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[7px] text-white transition-colors duration-300 max-[479px]:h-[18px] max-[479px]:w-[18px]"
              style={{
                left: `${(h.x / W) * 100}%`,
                top: `${(h.y / H) * 100}%`,
                background: isRinging ? '#2447D1' : isDone ? style.color : '#CBD2DE',
                boxShadow: isDone || isRinging ? `0 0 12px ${isRinging ? '#2447D1' : style.color}` : 'none',
              }}
            >
              {isRinging && <span className="lp-ring absolute inset-0 rounded-[7px] border-2 border-[#2447D1]" />}
              {Icon && <Icon size={11} strokeWidth={2.4} className={isRinging ? 'lp-shake' : ''} />}
            </span>
          )
        })}

        {/* School */}
        <div
          className="absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#0F1729] shadow-[0_8px_18px_-8px_rgba(15,23,41,.45)] max-[479px]:gap-1 max-[479px]:px-1.5 max-[479px]:py-1 max-[479px]:text-[9.5px]"
          style={{ left: `${(sx / W) * 100}%`, top: `${(sy / H) * 100}%` }}
        >
          <OnesazMark size={14} />
          Greenfield School
        </div>

        {/* Live counter */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] text-[#0F1729] shadow-[0_4px_10px_-6px_rgba(0,0,0,.3)] max-[479px]:left-1.5 max-[479px]:top-1.5 max-[479px]:px-2 max-[479px]:py-0.5 max-[479px]:text-[9.5px]">
          <PhoneCall size={12} className="text-[#2447D1]" />
          {done ? `${TOTAL} parents called` : `Calling… ${count} of ${TOTAL}`}
        </div>
      </div>

      {/* Legend and results */}
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        {(
          [
            ['answered', 'Answered', SUMMARY.answered],
            ['callback', 'Call back later', SUMMARY.callback],
            ['missed', 'No answer · retry', SUMMARY.missed],
          ] as const
        ).map(([key, label, n]) => {
          const Icon = RESULT_STYLE[key].icon
          return (
            <div key={key} className="rounded-[12px] bg-white px-3 py-2.5 shadow-[0_8px_18px_-14px_rgba(20,40,110,.4)]">
              <span className="flex items-center gap-1.5 text-[#667085]">
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-[5px] text-white"
                  style={{ background: RESULT_STYLE[key].color }}
                >
                  <Icon size={9} strokeWidth={2.6} />
                </span>
                {label}
              </span>
              <span className="mt-1 block text-[18px] font-semibold text-[#0F1729]">{done ? n : '–'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
