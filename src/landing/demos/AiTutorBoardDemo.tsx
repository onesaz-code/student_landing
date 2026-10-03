import * as React from 'react'
import { Pause, Volume2 } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/**
 * Lesson beats, in order: what appears on the board at each beat and what the tutor says.
 * Board items: 'triangle', 'right-angle', side labels 'a' | 'b' | 'c', and equation lines 'e1'..'e3'.
 */
const BEATS: { show: string[]; says: string; ms: number }[] = [
  { show: ['triangle'], says: 'Here’s a right-angled triangle.', ms: 1500 },
  { show: ['right-angle', 'a', 'b'], says: 'Its two shorter sides are 3 cm and 4 cm.', ms: 1400 },
  { show: ['c'], says: 'Let’s find the longest side, c.', ms: 1200 },
  { show: ['e1'], says: 'By Pythagoras’ theorem, c² = 3² + 4².', ms: 1300 },
  { show: ['e2'], says: 'That gives c² = 9 + 16, which is 25.', ms: 1300 },
  { show: ['e3'], says: 'The square root of 25 is 5, so c = 5 cm.', ms: 1400 },
]
const HOLD_MS = 2800
const LESSON_SECONDS = 214

/**
 * AI Tutor product page demo: the tutor teaches at a whiteboard like a short lesson video. It draws a
 * right-angled triangle, labels the sides and works through Pythagoras line by line while the caption
 * shows what it is saying. With reduced motion it shows the finished board.
 */
export default function AiTutorBoardDemo() {
  const [beat, setBeat] = React.useState(-1)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(BEATS.length - 1)
      return
    }
    const timers: number[] = []
    const run = () => {
      setBeat(-1)
      let t = 900
      BEATS.forEach((b, i) => {
        timers.push(window.setTimeout(() => setBeat(i), t))
        t += b.ms
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const visible = new Set(BEATS.slice(0, beat + 1).flatMap((b) => b.show))
  const on = (key: string) => (visible.has(key) ? 1 : 0)
  const progress = (beat + 1) / BEATS.length
  const seconds = Math.round(progress * LESSON_SECONDS)
  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  const hand = 'font-[family-name:"Chalkboard_SE","Segoe_Print","Comic_Sans_MS",cursive]'

  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Lesson header */}
      <div className="flex items-center justify-between gap-2 text-[12px] text-[#0F1729]">
        <span className="flex items-center gap-2 font-semibold">
          <OnesazMark size={20} />
          AI Tutor · Pythagoras’ theorem
        </span>
        <span className="text-[11px] text-[#667085]">Maths · Class 8</span>
      </div>

      {/* Whiteboard */}
      <div className="relative overflow-hidden rounded-[14px] border-[10px] border-[#3B4252] bg-white shadow-[0_22px_44px_-26px_rgba(15,23,41,.55)]">
        <svg
          viewBox="0 0 400 220"
          className={`block h-auto w-full [&_rect]:transition-opacity [&_rect]:duration-500 [&_text]:transition-opacity [&_text]:duration-500 ${hand}`}
        >
          <path
            d="M50 180 L50 50 L223 180 Z"
            fill="none"
            stroke="#24324A"
            strokeWidth="3"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={visible.has('triangle') ? 0 : 1}
            style={{ transition: 'stroke-dashoffset 1.3s ease' }}
          />
          <rect x="50" y="165" width="15" height="15" fill="none" stroke="#24324A" strokeWidth="2" opacity={on('right-angle')} />
          <text x="6" y="122" fontSize="18" fill="#2447D1" opacity={on('a')}>
            3 cm
          </text>
          <text x="116" y="206" fontSize="18" fill="#2447D1" opacity={on('b')}>
            4 cm
          </text>
          <text x="142" y="104" fontSize="18" fill="#C2412D" opacity={on('c')}>
            c = ?
          </text>
          <text x="248" y="72" fontSize="17" fill="#24324A" opacity={on('e1')}>
            c² = 3² + 4²
          </text>
          <text x="248" y="110" fontSize="17" fill="#24324A" opacity={on('e2')}>
            c² = 9 + 16 = 25
          </text>
          <text x="248" y="150" fontSize="20" fill="#12805C" opacity={on('e3')}>
            c = 5 cm ✓
          </text>
        </svg>
      </div>

      {/* Player bar: what the tutor is saying, with progress */}
      <div className="rounded-[14px] bg-[#0F1729] px-3.5 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
            <OnesazMark size={20} />
          </span>
          <p key={beat} className="lp-fade min-h-[36px] flex-1 text-[12.5px] leading-[1.45]">
            {beat >= 0 ? BEATS[beat].says : 'The lesson is starting…'}
          </p>
          <span className="flex h-6 items-end gap-[3px]">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="lp-wave w-[3px] rounded-full bg-[#3FBBEE]" style={{ animationDelay: `${i * 110}ms` }} />
            ))}
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 text-[10.5px] text-white/70">
          <Pause size={13} className="text-white" />
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <span
              className="block h-full rounded-full bg-[#3FBBEE] transition-[width] duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
          <span className="tabular-nums">{clock} / 3:34</span>
          <Volume2 size={13} className="text-white" />
        </div>
      </div>
    </div>
  )
}
