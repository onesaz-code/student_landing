import * as React from 'react'
import { Check } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Marks per chapter in the teacher's blueprint (sample data). */
const CHAPTERS = [
  { name: 'Laws of motion', marks: 16, color: '#2447D1' },
  { name: 'Gravitation', marks: 12, color: '#6A4BD8' },
  { name: 'Work and energy', marks: 12, color: '#0A94A8' },
]
const TOTAL_MARKS = CHAPTERS.reduce((n, c) => n + c.marks, 0)
const MAX_CHAPTER = Math.max(...CHAPTERS.map((c) => c.marks))
const MIX = [
  { label: 'Easy', share: 40, color: '#12B76A' },
  { label: 'Medium', share: 40, color: '#F79009' },
  { label: 'Hard', share: 20, color: '#F04438' },
]

/** Questions ONESAZ picks for the paper (sample). The second one opens to show its solution. */
const QUESTIONS = [
  { text: 'State Newton’s second law of motion.', marks: 2 },
  { text: 'A 2 kg ball accelerates at 3 m/s². Find the force acting on it.', marks: 3 },
  { text: 'Why does a satellite stay in orbit around the Earth?', marks: 3 },
  { text: 'Define work. When is the work done zero?', marks: 2 },
  { text: 'A 40 kg child climbs 5 m. Find the work done against gravity.', marks: 5 },
]
const FOCUS = 1
const USED_IN = 1240
const CORRECT = 68

const STEPS = [
  'Set the marks for each chapter and the difficulty mix',
  'ONESAZ picks questions from the bank to match',
  'Every question comes with its solution and results',
]

/** Beats within the loop. */
const CHAPTER_MS = 550
const MIX_MS = 900
const GENERATE_MS = 600
const QUESTION_MS = 280
const FOCUS_MS = 1100
const SOLUTION_MS = 4200

/**
 * Question Bank product page demo: the teacher sets a blueprint (marks per chapter and a difficulty mix),
 * ONESAZ generates a paper to match, and one question opens to show its step-by-step solution and how
 * students have done on it. With reduced motion it shows the final state.
 */
export default function QuestionBankBlueprintDemo() {
  const [step, setStep] = React.useState(0)
  const [chapters, setChapters] = React.useState(0)
  const [mix, setMix] = React.useState(false)
  const [generating, setGenerating] = React.useState(false)
  const [questions, setQuestions] = React.useState(0)
  const [solution, setSolution] = React.useState(false)
  const [done, setDone] = React.useState(false)

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
      setStep(2)
      setChapters(CHAPTERS.length)
      setMix(true)
      setQuestions(QUESTIONS.length)
      setSolution(true)
      setDone(true)
      return
    }
    const timers: number[] = []
    const at = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const run = () => {
      setStep(0)
      setChapters(0)
      setMix(false)
      setGenerating(false)
      setQuestions(0)
      setSolution(false)
      setDone(false)
      let t = 500
      CHAPTERS.forEach((_, i) => at(() => setChapters(i + 1), t + CHAPTER_MS * i))
      t += CHAPTER_MS * CHAPTERS.length
      at(() => setMix(true), t)
      t += MIX_MS
      at(() => {
        setStep(1)
        setGenerating(true)
      }, t)
      t += GENERATE_MS
      QUESTIONS.forEach((_, i) => at(() => setQuestions(i + 1), t + QUESTION_MS * i))
      t += QUESTION_MS * QUESTIONS.length
      at(() => {
        setGenerating(false)
        setDone(true)
      }, t)
      t += FOCUS_MS
      at(() => setStep(2), t)
      at(() => setSolution(true), t + 600)
      t += SOLUTION_MS
      at(run, t)
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const planned = CHAPTERS.slice(0, chapters).reduce((n, c) => n + c.marks, 0)
  const focusing = step === 2

  return (
    <div ref={rootRef} aria-hidden className="flex flex-col gap-3 text-[11.5px] text-[#0F1729]">
      {/* Progress through the three steps */}
      <div className="rounded-[14px] bg-white px-3.5 py-3 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i < step || (i === 2 && solution) ? 'bg-[#12B76A]' : i === step ? 'bg-[#2447D1]' : 'bg-[#E6E9EF]'
              }`}
            />
          ))}
        </div>
        <div key={step} className="lp-fade mt-2 flex items-start justify-between gap-2">
          <span className="font-semibold">{STEPS[step]}</span>
          <span className="shrink-0 text-[10.5px] text-[#667085]">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
      </div>

      <div className={`grid items-start gap-3 ${wide ? 'grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]' : 'grid-cols-1'}`}>
        {/* Blueprint */}
        <div className="rounded-[14px] bg-white p-3.5 shadow-[0_18px_40px_-24px_rgba(20,40,110,.45)] ring-1 ring-[#0F1729]/5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <OnesazMark size={20} />
              Paper blueprint
            </span>
            <span className="whitespace-nowrap text-[10.5px] tabular-nums text-[#667085]">
              {planned} / {TOTAL_MARKS} marks
            </span>
          </div>

          <div className="mt-2.5 flex flex-col gap-2">
            {CHAPTERS.map((c, i) => {
              const on = i < chapters
              return (
                <div key={c.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_22px] items-center gap-2">
                  <span className="truncate">{c.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-[#EEF1F7]">
                    <span
                      className="block h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: on ? `${(c.marks / MAX_CHAPTER) * 100}%` : '0%', background: c.color }}
                    />
                  </span>
                  <span className="text-right font-semibold tabular-nums">{on ? c.marks : 0}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-3 text-[10.5px] text-[#667085]">Difficulty mix</div>
          <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-[#EEF1F7]">
            {MIX.map((m, i) => (
              <span
                key={m.label}
                className="h-full transition-[width] duration-500 ease-out"
                style={{ width: mix ? `${m.share}%` : '0%', background: m.color, transitionDelay: mix ? `${i * 200}ms` : '0ms' }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-[#475467]">
            {MIX.map((m) => (
              <span key={m.label} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
                {m.label} {m.share}%
              </span>
            ))}
          </div>

          <span
            className={`mt-3.5 inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[11.5px] font-semibold text-white transition-all duration-300 ${
              done ? 'bg-[#12B76A]' : generating ? 'scale-[.96] bg-[#2447D1]' : 'bg-[#2447D1]'
            }`}
          >
            {done ? (
              <>
                <Check size={13} strokeWidth={3} /> Paper ready
              </>
            ) : generating ? (
              'Generating…'
            ) : (
              'Generate paper'
            )}
          </span>
        </div>

        {/* The generated paper */}
        <div className="relative min-h-[300px] overflow-hidden rounded-[6px] bg-white px-3.5 pb-3 pt-3.5 shadow-[0_22px_44px_-26px_rgba(15,23,41,.55)] ring-1 ring-[#0F1729]/[.06]">
          <div className="text-center text-[12.5px] font-semibold">Greenfield School</div>
          <div className="mt-0.5 text-center text-[10.5px] text-[#667085]">Half-yearly exam · Physics · Class 9</div>
          <div className="mb-1 mt-2 flex justify-between border-b border-t-[1.5px] border-b-[#E6EAF3] border-t-[#0F1729] py-1 text-[10.5px]">
            <span>Time: 1½ hours</span>
            <span>{TOTAL_MARKS} marks</span>
          </div>

          {questions === 0 && <div className="pt-12 text-center text-[10.5px] text-[#98A2B3]">Your paper will appear here</div>}
          {QUESTIONS.slice(0, questions).map((q, i) => (
            <div
              key={q.text}
              className={`lp-fade flex gap-1.5 rounded-[7px] px-1.5 py-1.5 text-[11px] leading-[1.45] transition-all duration-300 ${
                focusing && i === FOCUS ? 'bg-[#F3F6FF] ring-[1.5px] ring-[#2447D1]' : ''
              }`}
            >
              <span className="font-semibold">{i + 1}.</span>
              <span className="flex-1">{q.text}</span>
              <span className="shrink-0 text-[#667085]">[{q.marks}]</span>
            </div>
          ))}

          {/* Solution and results for the highlighted question */}
          <div
            className={`absolute inset-x-2.5 bottom-2.5 rounded-[12px] bg-white p-3 shadow-[0_16px_34px_-14px_rgba(15,23,41,.45)] ring-1 ring-[#E6E9EF] transition-all duration-500 ease-out ${
              solution ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] font-semibold text-[#6A4BD8]">Q2 · Step-by-step solution</span>
              <span className="rounded-full bg-[#FDF3E2] px-2 py-px text-[10px] font-medium text-[#9A6200]">Medium</span>
            </div>
            <div className="mt-1.5 leading-[1.6]">
              F = m × a = 2 kg × 3 m/s² = <span className="font-semibold text-[#1F7A4F]">6 N ✓</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-[10px] bg-[#F6F8FC] px-2.5 py-1.5">
                <div className="text-[10px] text-[#667085]">Used in tests</div>
                <div className="text-[15px] font-semibold tabular-nums">{USED_IN.toLocaleString('en-IN')}</div>
              </div>
              <div className="rounded-[10px] bg-[#F6F8FC] px-2.5 py-1.5">
                <div className="text-[10px] text-[#667085]">Answered correctly</div>
                <div className="text-[15px] font-semibold tabular-nums">{CORRECT}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
