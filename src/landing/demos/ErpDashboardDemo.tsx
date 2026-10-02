import * as React from 'react'
import type { ReactNode } from 'react'
import { DemoWindow } from './DemoWindow'

/** Sample data for the demo only. */
const INITIALS = ['AS', 'AN', 'DR', 'KM', 'MP', 'RV', 'SJ', 'TK', 'IK', 'VR', 'NB', 'PS', 'YG', 'HS', 'LM', 'OC']
const ABSENT = [3, 11]
const FEE_TARGET = 1200000
const FEE_START = 780000
const PAYMENTS = [
  { name: 'Aarav S.', amount: 18500 },
  { name: 'Meera P.', amount: 9200 },
  { name: 'Ishaan K.', amount: 22000 },
  { name: 'Diya R.', amount: 14800 },
  { name: 'Kabir M.', amount: 16500 },
]
const REMINDERS = 42
const STAGES = ['Enquiry', 'Applied', 'Interview', 'Admitted']
const PIPELINE_START = [['Kabir M.', 'Sara J.', 'Vivaan T.'], ['Anika B.', 'Reyansh G.'], ['Tara S.'], ['Ishaan K.', 'Aditi P.']]
/** Which column moves its first card one stage on each step. */
const MOVES = [2, 1, 0, 1, 2]

const GREEN = '#5DB37E'
const AMBER = '#E9BE6E'
const inr = (v: number) => `₹${v.toLocaleString('en-IN')}`

function Card({ step, title, children, className = '' }: { step: number; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col rounded-xl border border-[#EEF0F4] bg-white p-4 ${className}`}>
      <span className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1F5F45] text-[10.5px] font-bold text-white">
          {step}
        </span>
        {title}
      </span>
      {children}
    </div>
  )
}

/** Runs `step(i)` every `ms`, `count` times, then waits `hold` and starts again. Shows the last step at once with reduced motion. */
function useLoop(count: number, ms: number, hold: number, step: (i: number) => void, reset: () => void) {
  const stepRef = React.useRef(step)
  const resetRef = React.useRef(reset)
  stepRef.current = step
  resetRef.current = reset
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < count; i++) stepRef.current(i)
      return
    }
    const timers: number[] = []
    const run = () => {
      resetRef.current()
      for (let i = 0; i < count; i++) timers.push(window.setTimeout(() => stepRef.current(i), ms * (i + 1)))
      timers.push(window.setTimeout(run, ms * count + hold))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [count, ms, hold])
}

/**
 * ERP product page demo: the three dashboard cards with sample data that updates live:
 * attendance fills in, fees count up as payments arrive, and applicants move through admissions.
 */
export default function ErpDashboardDemo() {
  const [marked, setMarked] = React.useState(0)
  const [paid, setPaid] = React.useState(0)
  const [pipeline, setPipeline] = React.useState(PIPELINE_START)
  const [moved, setMoved] = React.useState<[number, number] | null>(null)

  useLoop(
    INITIALS.length,
    220,
    3500,
    (i) => setMarked(i + 1),
    () => setMarked(0),
  )
  useLoop(
    PAYMENTS.length,
    1300,
    3200,
    (i) => setPaid(i + 1),
    () => setPaid(0),
  )
  useLoop(
    MOVES.length,
    1500,
    2500,
    (i) =>
      setPipeline((cols) => {
        const from = MOVES[i]
        if (!cols[from].length) return cols
        const next = cols.map((c) => [...c])
        next[from + 1].push(next[from].shift()!)
        setMoved([from + 1, next[from + 1].length - 1])
        return next
      }),
    () => {
      setPipeline(PIPELINE_START)
      setMoved(null)
    },
  )

  const present = INITIALS.slice(0, marked).filter((_, i) => !ABSENT.includes(i)).length
  const absent = INITIALS.slice(0, marked).filter((_, i) => ABSENT.includes(i)).length
  const allMarked = marked === INITIALS.length
  const collected = FEE_START + PAYMENTS.slice(0, paid).reduce((sum, p) => sum + p.amount, 0)
  const last = paid ? PAYMENTS[paid - 1] : null

  return (
    <div aria-hidden>
      <DemoWindow title="ONESAZ ERP" meta="Admin view" bodyClassName="grid grid-cols-2 gap-3 max-[639px]:grid-cols-1">
        <Card step={1} title="Today’s attendance">
          <div className="grid grid-cols-8 gap-1">
            {INITIALS.map((x, i) => (
              <span
                key={x}
                className="flex aspect-square items-center justify-center rounded-[5px] text-[8px] font-semibold text-white transition-colors duration-300"
                style={{ background: i < marked ? (ABSENT.includes(i) ? AMBER : GREEN) : '#E6E9EF' }}
              >
                {x}
              </span>
            ))}
          </div>
          <span className="mt-2.5 flex justify-between text-[11px] text-[#667085]">
            <span>
              <b className="font-semibold text-[#0F1729]">{present}</b> present
            </span>
            <span>
              <b className="font-semibold text-[#9A6200]">{absent}</b> absent
            </span>
          </span>
          <span
            className={`mt-2 self-start rounded-md bg-[#E7F5EE] px-2 py-0.5 text-[11px] text-[#1F7A4F] transition-opacity duration-300 ${allMarked ? 'opacity-100' : 'opacity-0'}`}
          >
            ✓ Parents of absent students alerted
          </span>
        </Card>

        <Card step={2} title="Fee collection">
          <span className="text-[20px] font-semibold text-[#0F1729]">{inr(collected)}</span>
          <span className="text-[11px] text-[#667085]">collected of {inr(FEE_TARGET)} · Term 2</span>
          <span className="my-2.5 block h-2 overflow-hidden rounded-full bg-[#FBEFD9]">
            <span
              className="block h-full rounded-full transition-[width] duration-500"
              style={{ width: `${(collected / FEE_TARGET) * 100}%`, background: GREEN }}
            />
          </span>
          <span className="flex justify-between gap-2 text-[11px] text-[#667085]">
            <span>{last ? `Last: ${last.name} · ${inr(last.amount)} UPI` : 'Waiting for payments'}</span>
            <span className="whitespace-nowrap">
              Reminders: <b className="font-semibold text-[#0F1729]">{paid === PAYMENTS.length ? REMINDERS : 0}</b>
            </span>
          </span>
        </Card>

        <Card step={3} title="Admissions pipeline" className="col-span-2 max-[639px]:col-span-1">
          <div className="grid grid-cols-4 gap-2.5 max-[479px]:grid-cols-2">
            {STAGES.map((stage, c) => (
              <div key={stage} className="flex min-w-0 flex-col gap-1.5">
                <span className="flex justify-between text-[11px] text-[#667085]">
                  {stage}
                  <span>{pipeline[c].length}</span>
                </span>
                {pipeline[c].map((name, r) => (
                  <span
                    key={name}
                    className="truncate rounded-[6px] px-2 py-1 text-[10.5px] transition-shadow duration-300"
                    style={{
                      background: c === 3 ? GREEN : '#EEF1F7',
                      color: c === 3 ? '#fff' : '#3F4758',
                      boxShadow: moved && moved[0] === c && moved[1] === r ? '0 0 0 1.5px #2447D1' : 'none',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </DemoWindow>
    </div>
  )
}
