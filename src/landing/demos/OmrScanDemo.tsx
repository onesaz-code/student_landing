import * as React from 'react'
import { DemoWindow } from './DemoWindow'

const LETTERS = ['A', 'B', 'C', 'D']
/** Sample sheet: [marked option, correct option] for each question. */
const ANSWERS: [number, number][] = [
  [1, 1],
  [2, 2],
  [0, 3],
  [3, 3],
  [1, 1],
  [2, 0],
  [0, 0],
  [3, 3],
  [1, 1],
  [2, 2],
]
const CORRECT = ANSWERS.filter(([m, k]) => m === k).length

const START_MS = 150
const ROW_MS = 230
const HOLD_MS = 3200

/**
 * OMR tour demo: a filled answer sheet is scanned top to bottom. Each answer is ringed green or red
 * (the right option is ringed too), the tally updates live and the score card appears at the end.
 * With reduced motion it shows the finished result.
 */
export default function OmrScanDemo() {
  const [read, setRead] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRead(ANSWERS.length)
      return
    }
    const timers: number[] = []
    const run = () => {
      setRead(0)
      ANSWERS.forEach((_, i) => timers.push(window.setTimeout(() => setRead(i + 1), START_MS + ROW_MS * (i + 1))))
      timers.push(window.setTimeout(run, START_MS + ROW_MS * ANSWERS.length + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const done = read === ANSWERS.length
  const right = ANSWERS.slice(0, read).filter(([m, k]) => m === k).length
  const wrong = read - right

  return (
    <div aria-hidden>
      <DemoWindow
        title="ONESAZ Exams"
        meta="OMR scan · Class 8B"
        bodyClassName="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 max-[479px]:grid-cols-1"
      >
        {/* Answer sheet */}
        <div className="relative overflow-hidden rounded-[10px] border border-[#E6E9EF] bg-white p-3">
          <div className="mb-2 flex justify-between text-[10.5px] text-[#667085]">
            <span className="font-medium text-[#0F1729]">Aanya Sharma · Roll 14</span>
            <span>Maths · Unit test</span>
          </div>
          {ANSWERS.map(([marked, key], q) => {
            const checked = q < read
            return (
              <div key={q} className="grid grid-cols-[18px_repeat(4,minmax(0,1fr))] items-center gap-1 py-[3px]">
                <span className="text-[10px] text-[#667085]">{q + 1}</span>
                {LETTERS.map((l, o) => {
                  const filled = o === marked
                  const ring = checked && filled ? (marked === key ? 'ok' : 'wrong') : checked && o === key && marked !== key ? 'key' : null
                  return (
                    <span key={l} className="flex justify-center">
                      <span
                        className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border text-[7.5px] transition-shadow duration-200 ${
                          filled ? 'border-[#1F2430] bg-[#1F2430] text-white' : 'border-[#B8C0CC] text-[#98A2B3]'
                        }`}
                        style={{
                          boxShadow:
                            ring === 'ok' || ring === 'key'
                              ? '0 0 0 3px rgba(31,157,99,.5)'
                              : ring === 'wrong'
                                ? '0 0 0 3px rgba(226,75,74,.55)'
                                : 'none',
                        }}
                      >
                        {l}
                      </span>
                    </span>
                  )
                })}
              </div>
            )
          })}
          {/* Scan line */}
          {!done && (
            <span
              className="pointer-events-none absolute inset-x-0 h-[3px] bg-[linear-gradient(90deg,transparent,#3FBBEE,transparent)] shadow-[0_0_12px_#3FBBEE] transition-[top] duration-200 ease-linear"
              style={{ top: `${35 + read * 21}px` }}
            />
          )}
        </div>

        {/* Live result */}
        <div className="flex flex-col justify-between gap-3">
          <div>
            <div className="text-[11px] text-[#667085]">{done ? 'Scan complete' : `Reading answers… ${read}/${ANSWERS.length}`}</div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF1F7]">
              <div
                className="h-full rounded-full bg-[#3FBBEE] transition-[width] duration-200"
                style={{ width: `${(read / ANSWERS.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-[10px] bg-[#E7F5EE] px-2.5 py-2">
                <div className="text-[10px] text-[#1F7A4F]">Correct</div>
                <div className="text-[18px] font-semibold text-[#1F7A4F]">{right}</div>
              </div>
              <div className="rounded-[10px] bg-[#FDECEA] px-2.5 py-2">
                <div className="text-[10px] text-[#B42318]">Wrong</div>
                <div className="text-[18px] font-semibold text-[#B42318]">{wrong}</div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-[12px] bg-[#0F1729] px-3.5 py-3 text-white transition-all duration-300 ${done ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
          >
            <div className="text-[10.5px] text-white/70">Score</div>
            <div className="text-[22px] font-semibold leading-tight">
              {CORRECT} / {ANSWERS.length}{' '}
              <span className="text-[13px] font-medium text-white/70">· {Math.round((CORRECT / ANSWERS.length) * 100)}%</span>
            </div>
            <div className="mt-1 text-[11px] text-[#7FD8B0]">✓ Result sent to parent</div>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
