import * as React from 'react'
import { Check, Search } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

const QUERY = 'Newton’s laws'

type Level = 'Easy' | 'Medium' | 'Hard'
/** Search results the teacher picks for the paper (sample questions). */
const QUESTIONS: { text: string; marks: number; level: Level }[] = [
  { text: 'State Newton’s first law, with an example.', marks: 2, level: 'Easy' },
  { text: 'A 2 kg ball accelerates at 3 m/s². Find the force acting on it.', marks: 3, level: 'Medium' },
  { text: 'Why do passengers lurch forward when a bus brakes suddenly?', marks: 3, level: 'Medium' },
  { text: 'A lift accelerates upwards at 2 m/s². Find the apparent weight of a 50 kg person.', marks: 5, level: 'Hard' },
]
const LEVEL_STYLE: Record<Level, { bg: string; fg: string }> = {
  Easy: { bg: '#E7F5EE', fg: '#1F7A4F' },
  Medium: { bg: '#FDF3E2', fg: '#9A6200' },
  Hard: { bg: '#FDECEC', fg: '#B42318' },
}

const TYPE_MS = 70
const RESULTS_MS = 700
const PICK_MS = 800
const HOLD_MS = 3600

/**
 * Question Bank tour demo: a teacher searches the bank, ticks the questions she wants, and each one
 * drops into a ready-to-print exam paper while the marks add up. The paper finishes with options to
 * print it, run it as an online test or download the answer key. With reduced motion it shows the result.
 */
export default function QuestionBankPaperDemo() {
  const [typed, setTyped] = React.useState(0)
  const [showResults, setShowResults] = React.useState(false)
  const [picked, setPicked] = React.useState(0)

  // Side by side when the demo has room, stacked when it doesn't
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [wide, setWide] = React.useState(true)
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWide(e.contentRect.width >= 480))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(QUERY.length)
      setShowResults(true)
      setPicked(QUESTIONS.length)
      return
    }
    const timers: number[] = []
    const at = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const run = () => {
      setTyped(0)
      setShowResults(false)
      setPicked(0)
      let t = 600
      for (let i = 1; i <= QUERY.length; i++) at(() => setTyped(i), t + i * TYPE_MS)
      t += QUERY.length * TYPE_MS + 300
      at(() => setShowResults(true), t)
      t += RESULTS_MS
      QUESTIONS.forEach((_, i) => at(() => setPicked(i + 1), t + PICK_MS * i))
      t += PICK_MS * QUESTIONS.length
      at(run, t + HOLD_MS)
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const total = QUESTIONS.slice(0, picked).reduce((n, q) => n + q.marks, 0)
  const ready = picked === QUESTIONS.length

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`grid gap-3 text-[11.5px] text-[#0F1729] ${wide ? 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : 'grid-cols-1'}`}
    >
      {/* Searching the bank */}
      <div className="rounded-[14px] bg-white p-3.5 shadow-[0_18px_40px_-24px_rgba(20,40,110,.45)] ring-1 ring-[#0F1729]/5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-semibold">
            <OnesazMark size={20} />
            Question Bank
          </span>
          <span className="whitespace-nowrap text-[10.5px] text-[#667085]">10 lakh+ questions</span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-[10px] px-2.5 py-2 ring-1 ring-[#DCE3F5]">
          <Search size={13} className="shrink-0 text-[#98A2B3]" />
          <span className="truncate">{QUERY.slice(0, typed)}</span>
          {typed < QUERY.length && <span className="lp-typing -ml-1.5 h-3.5 w-[1.5px] bg-[#2447D1]" />}
        </div>

        <div className="mt-2 min-h-[15px] text-[10.5px] text-[#667085]">{showResults && '2,431 questions · Class 10 · Physics'}</div>

        <div className="mt-1 flex flex-col gap-1.5">
          {showResults &&
            QUESTIONS.map((q, i) => {
              const on = i < picked
              const style = LEVEL_STYLE[q.level]
              return (
                <div
                  key={q.text}
                  className={`lp-fade flex items-center gap-2 rounded-[10px] px-2.5 py-2 transition-all duration-300 ${
                    on ? 'bg-[#F3F6FF] ring-[1.5px] ring-[#2447D1]' : 'bg-white ring-1 ring-[#E6EAF3]'
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] text-white transition-colors duration-200 ${
                      on ? 'bg-[#2447D1]' : 'ring-[1.5px] ring-inset ring-[#C5CEE0]'
                    }`}
                  >
                    {on && <Check size={10} strokeWidth={3.2} />}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{q.text}</span>
                  <span
                    className="shrink-0 rounded-full px-2 py-px text-[10px] font-medium"
                    style={{ background: style.bg, color: style.fg }}
                  >
                    {q.level}
                  </span>
                </div>
              )
            })}
        </div>
      </div>

      {/* The exam paper */}
      <div className="flex flex-col rounded-[6px] bg-white px-4 pb-3 pt-4 shadow-[0_22px_44px_-26px_rgba(15,23,41,.55)] ring-1 ring-[#0F1729]/[.06]">
        <div className="text-center text-[12.5px] font-semibold">Greenfield School</div>
        <div className="mt-0.5 text-center text-[10.5px] text-[#667085]">Unit Test · Physics · Class 10</div>
        <div className="mb-1 mt-2 flex justify-between border-b border-t-[1.5px] border-b-[#E6EAF3] border-t-[#0F1729] py-1 text-[10.5px]">
          <span>Time: 1 hour</span>
          <span className="tabular-nums">Total: {total} marks</span>
        </div>

        <div className="min-h-[150px] flex-1">
          {QUESTIONS.slice(0, picked).map((q, i) => (
            <div key={q.text} className="lp-fade flex gap-1.5 border-b border-dashed border-[#E6EAF3] py-1.5 text-[11px] leading-[1.45]">
              <span className="font-semibold">{i + 1}.</span>
              <span className="flex-1">{q.text}</span>
              <span className="shrink-0 text-[#667085]">[{q.marks}]</span>
            </div>
          ))}
          {picked === 0 && <div className="pt-6 text-center text-[10.5px] text-[#98A2B3]">Pick questions to add them here</div>}
        </div>

        <div className={`mt-2.5 flex flex-wrap gap-1.5 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <span className="rounded-[9px] bg-[#2447D1] px-3 py-1.5 text-[11px] font-semibold text-white">Print paper</span>
          <span className="rounded-[9px] px-3 py-1.5 text-[11px] font-medium ring-1 ring-[#DCE3F5]">Online test</span>
          <span className="rounded-[9px] px-3 py-1.5 text-[11px] font-medium ring-1 ring-[#DCE3F5]">Answer key</span>
        </div>
      </div>
    </div>
  )
}
