import * as React from 'react'

const LETTERS = ['A', 'B', 'C', 'D']
/** Sample sheet: [marked option, correct option] for each question. */
const ANSWERS: [number, number][] = [
  [0, 0],
  [2, 2],
  [1, 1],
  [3, 1],
  [1, 1],
  [0, 0],
]
const SCORE = ANSWERS.filter(([m, k]) => m === k).length

/** Steps: 0 aligning, 1 sheet detected, 2 answers marked, 3 result shown. */
const STEP_MS = [500, 800, 900]
const HOLD_MS = 3200

function Sheet({ checked, compact = false }: { checked: boolean; compact?: boolean }) {
  return (
    <div className={`rounded-[8px] bg-white ${compact ? 'p-2' : 'p-3 shadow-[0_14px_30px_-18px_rgba(15,23,41,.45)]'}`}>
      <div className={`mb-1.5 flex justify-between ${compact ? 'text-[8.5px]' : 'text-[10px]'} text-[#667085]`}>
        <span className="font-medium text-[#0F1729]">Kabir Mehta · Roll 22</span>
        <span>Science</span>
      </div>
      {ANSWERS.map(([marked, key], q) => (
        <div
          key={q}
          className={`grid grid-cols-[14px_repeat(4,minmax(0,1fr))] items-center ${compact ? 'gap-0.5 py-[2px]' : 'gap-1 py-[3px]'}`}
        >
          <span className={`${compact ? 'text-[8px]' : 'text-[9.5px]'} text-[#667085]`}>{q + 1}</span>
          {LETTERS.map((l, o) => {
            const filled = o === marked
            const ring = checked && filled ? (marked === key ? 'ok' : 'wrong') : null
            return (
              <span key={l} className="flex justify-center">
                <span
                  className={`flex items-center justify-center rounded-full border transition-shadow duration-300 ${compact ? 'h-[11px] w-[11px] text-[6px]' : 'h-[14px] w-[14px] text-[7.5px]'} ${
                    filled ? 'border-[#1F2430] bg-[#1F2430] text-white' : 'border-[#B8C0CC] text-[#98A2B3]'
                  }`}
                  style={{
                    boxShadow:
                      ring === 'ok' ? '0 0 0 2.5px rgba(31,157,99,.6)' : ring === 'wrong' ? '0 0 0 2.5px rgba(226,75,74,.65)' : 'none',
                  }}
                >
                  {l}
                </span>
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/**
 * OMR product page demo: a teacher scans a paper answer sheet with the ONESAZ app. The camera frames
 * the sheet, the corners lock on, answers are marked and the result card slides up.
 * With reduced motion it shows the result straight away.
 */
export default function OmrPhoneDemo() {
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(3)
      return
    }
    const timers: number[] = []
    const run = () => {
      setStep(0)
      let t = 0
      STEP_MS.forEach((ms, i) => {
        t += ms
        timers.push(window.setTimeout(() => setStep(i + 1), t))
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const locked = step >= 1
  const corner = `absolute h-4 w-4 border-[3px] transition-colors duration-300 ${locked ? 'border-[#34D399]' : 'border-white/80'}`

  return (
    <div aria-hidden className="relative flex min-h-[440px] items-center justify-center max-[479px]:min-h-[400px]">
      {/* Paper sheet on the desk, behind the phone */}
      <div className="absolute left-[2%] top-1/2 w-[46%] -translate-y-1/2 -rotate-6 max-[479px]:hidden">
        <Sheet checked={false} />
      </div>

      {/* Phone */}
      <div className="relative z-[1] w-[232px] rounded-[32px] bg-[#111] p-2 shadow-[0_28px_50px_-22px_rgba(15,23,41,.6)] max-[379px]:w-[214px] min-[480px]:ml-[30%]">
        <div className="relative h-[420px] overflow-hidden rounded-[25px] bg-[#1A1D24] max-[379px]:h-[390px]">
          <div className="absolute inset-x-0 top-0 z-[2] mx-auto h-3.5 w-16 rounded-b-[10px] bg-[#111]" />

          {/* Camera top bar */}
          <div className="absolute inset-x-0 top-5 z-[2] text-center text-[11px] font-medium text-white">
            {step === 0 ? 'Align the answer sheet' : step === 1 ? 'Sheet detected ✓' : 'Reading answers'}
          </div>

          {/* Camera view of the sheet */}
          <div className="absolute inset-x-5 top-14">
            <div className={`transition-transform duration-500 ${locked ? 'scale-100' : 'scale-[.96] -rotate-2'}`}>
              <Sheet checked={step >= 2} compact />
            </div>
            <span className={`${corner} -left-2 -top-2 border-b-0 border-r-0`} />
            <span className={`${corner} -right-2 -top-2 border-b-0 border-l-0`} />
            <span className={`${corner} -bottom-2 -left-2 border-r-0 border-t-0`} />
            <span className={`${corner} -bottom-2 -right-2 border-l-0 border-t-0`} />
          </div>

          {/* Shutter */}
          <div
            className={`absolute bottom-6 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border-4 border-white/80 bg-white/20 transition-opacity duration-300 ${step === 3 ? 'opacity-0' : ''}`}
          />

          {/* Result card */}
          <div
            className={`absolute inset-x-3 bottom-3 rounded-[16px] bg-white p-3.5 transition-all duration-500 ease-out ${
              step === 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#0F1729]">Kabir Mehta</span>
              <span className="text-[10.5px] text-[#667085]">Roll 22 · Science</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold leading-none text-[#0F1729]">
                {SCORE}/{ANSWERS.length}
              </span>
              <span className="text-[12px] text-[#667085]">{Math.round((SCORE / ANSWERS.length) * 100)}%</span>
            </div>
            <div className="mt-2 flex gap-1.5 text-[10.5px]">
              <span className="rounded-full bg-[#E7F5EE] px-2 py-0.5 text-[#1F7A4F]">{SCORE} correct</span>
              <span className="rounded-full bg-[#FDECEA] px-2 py-0.5 text-[#B42318]">{ANSWERS.length - SCORE} wrong</span>
            </div>
            <div className="mt-2.5 border-t border-[#EEF0F4] pt-2 text-[11px] text-[#1F7A4F]">✓ Saved and sent to parent</div>
          </div>
        </div>
      </div>
    </div>
  )
}
