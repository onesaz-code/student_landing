import * as React from 'react'
import { Check, ScanLine, X } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** The student's answer, split into the sentences the rubric checks (sample content). */
const ANSWER = [
  { text: 'Photosynthesis is how green plants make their own food. ', rubric: 0 },
  { text: 'They use sunlight, water and carbon dioxide ', rubric: 1 },
  { text: 'and give out oxygen.', rubric: 2 },
]
const ANSWER_LENGTH = ANSWER.reduce((n, s) => n + s.text.length, 0)

/** The teacher's rubric for this question. The last point is missing from the answer. */
const RUBRIC = [
  { label: 'Correct definition', marks: 2, of: 2 },
  { label: 'Names all three inputs', marks: 1, of: 1 },
  { label: 'Names the output', marks: 1, of: 1 },
  { label: 'Explains chlorophyll', marks: 0, of: 1 },
]
const TOTAL = RUBRIC.reduce((n, r) => n + r.marks, 0)
const OUT_OF = RUBRIC.reduce((n, r) => n + r.of, 0)

const STEPS = [
  'Ananya writes her answer',
  'Her teacher scans the sheet',
  'ONESAZ checks it against the rubric',
  'The teacher approves the mark',
  'Ananya gets her mark and feedback',
]

/** Phase: 0 writing, 1 scanning, 2 checking, 3 approving, 4 feedback. */
type Phase = 0 | 1 | 2 | 3 | 4

const CHAR_MS = 22
const SCAN_MS = 1800
const CHECK_MS = 650
const APPROVE_MS = 1900
const FEEDBACK_MS = 3800

/**
 * Descriptive Evaluation tour demo: the whole journey of one written answer. Ananya writes it on paper,
 * her teacher scans the sheet, ONESAZ checks it point by point against the rubric and suggests a mark,
 * the teacher approves it, and Ananya gets her mark with feedback. With reduced motion it shows the end.
 */
export default function DescriptiveStoryDemo() {
  const [phase, setPhase] = React.useState<Phase>(0)
  const [typed, setTyped] = React.useState(0)
  const [checked, setChecked] = React.useState(0)
  const [approved, setApproved] = React.useState(false)
  // Side by side when the demo has room, stacked when it doesn't (the tour column can be narrow)
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
      setPhase(4)
      setTyped(ANSWER_LENGTH)
      setChecked(RUBRIC.length)
      setApproved(true)
      return
    }
    const timers: number[] = []
    const at = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const run = () => {
      setPhase(0)
      setTyped(0)
      setChecked(0)
      setApproved(false)
      let t = 400
      for (let i = 1; i <= ANSWER_LENGTH; i++) at(() => setTyped(i), t + i * CHAR_MS)
      t += ANSWER_LENGTH * CHAR_MS + 600
      at(() => setPhase(1), t)
      t += SCAN_MS
      at(() => setPhase(2), t)
      RUBRIC.forEach((_, i) => at(() => setChecked(i + 1), t + CHECK_MS * (i + 1)))
      t += CHECK_MS * (RUBRIC.length + 1) + 300
      at(() => setPhase(3), t)
      at(() => setApproved(true), t + 1100)
      t += APPROVE_MS
      at(() => setPhase(4), t)
      at(run, t + FEEDBACK_MS)
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const hand = 'font-[family-name:"Bradley_Hand","Segoe_Print","Chalkboard_SE","Comic_Sans_MS",cursive]'
  let offset = 0

  return (
    <div ref={rootRef} aria-hidden className="flex flex-col gap-3 text-[11.5px] text-[#0F1729]">
      {/* Progress through the five steps */}
      <div className="rounded-[14px] bg-white px-3.5 py-3 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i < phase || (i === 4 && phase === 4) ? 'bg-[#12B76A]' : i === phase ? 'bg-[#2447D1]' : 'bg-[#E6E9EF]'
              }`}
            />
          ))}
        </div>
        <div key={phase} className="lp-fade mt-2 flex items-center justify-between gap-2">
          <span className="font-semibold">{STEPS[phase]}</span>
          <span className="shrink-0 text-[10.5px] text-[#667085]">
            Step {phase + 1} of {STEPS.length}
          </span>
        </div>
      </div>

      <div className={`grid gap-3 ${wide ? 'grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : 'grid-cols-1'}`}>
        {/* The answer sheet */}
        <div className="relative overflow-hidden rounded-[14px] bg-[#FFFDF7] p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.45)] ring-1 ring-[#EDE6D6]">
          <div className="flex items-center justify-between gap-2 border-b border-[#EDE6D6] pb-2 text-[10.5px] text-[#667085]">
            <span>
              <span className="font-semibold text-[#0F1729]">Q4.</span> What is photosynthesis?
            </span>
            <span className="shrink-0">5 marks</span>
          </div>
          <p
            className={`mt-2 min-h-[124px] text-[13.5px] leading-[26px] text-[#24324A] ${hand} bg-[repeating-linear-gradient(transparent_0_25px,#DCE6F2_25px_26px)]`}
          >
            {ANSWER.map((s) => {
              const shown = s.text.slice(0, Math.max(0, typed - offset))
              offset += s.text.length
              const lit = phase >= 2 && checked > s.rubric
              return (
                <span key={s.rubric} className={`rounded-[3px] transition-colors duration-500 ${lit ? 'bg-[#CDF3E1]' : ''}`}>
                  {shown}
                </span>
              )
            })}
            {phase === 0 && typed < ANSWER_LENGTH && <span className="ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-[#24324A]" />}
          </p>
          <div className="mt-1 text-right text-[10px] text-[#98A2B3]">Ananya · Class 8B</div>

          {/* Scanning overlay */}
          {phase === 1 && (
            <div className="lp-fade absolute inset-0 bg-[#0F1729]/10">
              {(
                [
                  'left-2 top-2 border-l-2 border-t-2',
                  'right-2 top-2 border-r-2 border-t-2',
                  'bottom-2 left-2 border-b-2 border-l-2',
                  'bottom-2 right-2 border-b-2 border-r-2',
                ] as const
              ).map((c) => (
                <span key={c} className={`absolute h-5 w-5 rounded-[3px] border-[#08C5A7] ${c}`} />
              ))}
              <span className="lp-scan absolute inset-x-3 h-[2px] bg-[#08C5A7] shadow-[0_0_12px_#08C5A7]" />
              <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0F1729] px-2.5 py-1 text-[10.5px] text-white">
                <ScanLine size={12} /> Scanning the answer sheet…
              </span>
            </div>
          )}

          {/* Feedback on Ananya's phone */}
          {phase === 4 && (
            <div className="lp-fade absolute inset-x-2.5 bottom-2.5 rounded-[12px] bg-white p-2.5 shadow-[0_12px_28px_-10px_rgba(15,23,41,.45)] ring-1 ring-[#E6E9EF]">
              <div className="flex items-center gap-2">
                <OnesazMark size={18} />
                <span className="font-semibold">Science test · Q4</span>
                <span className="ml-auto text-[10px] text-[#667085]">now</span>
              </div>
              <div className="mt-1.5 text-[11px] leading-[1.45] text-[#344054]">
                <span className="font-semibold text-[#0F1729]">
                  {TOTAL} / {OUT_OF}.
                </span>{' '}
                Good definition, with the right inputs and output. Explain the role of chlorophyll to get full marks.
              </div>
            </div>
          )}
        </div>

        {/* The rubric and the teacher's approval */}
        <div className="flex flex-col rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <OnesazMark size={18} />
              Rubric · Q4
            </span>
            <span className="whitespace-nowrap text-[10.5px] text-[#667085]">Set by the teacher</span>
          </div>
          <div className="mt-2 flex-1">
            {RUBRIC.map((r, i) => {
              const done = checked > i
              const full = r.marks === r.of
              return (
                <div key={r.label} className="flex items-center gap-2 border-b border-[#F0F2F5] py-1.5 last:border-0">
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      !done ? 'border-[1.5px] border-[#CBD2DE]' : full ? 'bg-[#12B76A] text-white' : 'bg-[#F04438] text-white'
                    }`}
                  >
                    {done && (full ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />)}
                  </span>
                  <span className={`flex-1 transition-colors ${done ? 'text-[#0F1729]' : 'text-[#98A2B3]'}`}>{r.label}</span>
                  <span className={`tabular-nums font-semibold ${!done ? 'text-[#D0D5DD]' : full ? 'text-[#0F1729]' : 'text-[#D92D20]'}`}>
                    {done ? r.marks : '–'}/{r.of}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#F0F2F5] pt-2.5">
            <span>
              <span className="block text-[10px] text-[#667085]">{approved ? 'Final mark' : 'Suggested mark'}</span>
              <span className="text-[18px] font-semibold tabular-nums">{checked === RUBRIC.length ? `${TOTAL} / ${OUT_OF}` : '– / 5'}</span>
            </span>
            <span
              className={`flex items-center gap-1 rounded-[9px] px-3 py-1.5 text-[11px] font-semibold text-white transition-all duration-300 ${
                approved
                  ? 'bg-[#12B76A]'
                  : phase === 3
                    ? 'scale-105 bg-[#2447D1] shadow-[0_0_0_4px_rgba(36,71,209,.18)]'
                    : 'bg-[#2447D1] opacity-40'
              }`}
            >
              {approved ? (
                <>
                  <Check size={12} strokeWidth={3} /> Approved
                </>
              ) : (
                'Approve'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
