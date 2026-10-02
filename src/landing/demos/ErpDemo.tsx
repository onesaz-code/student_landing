import * as React from 'react'
import { DemoWindow } from './DemoWindow'

/** Class 8B register (sample names). `present: false` is the absent student whose parent gets the alert. */
const REGISTER = [
  { name: 'Aanya Sharma', present: true },
  { name: 'Arjun Nair', present: true },
  { name: 'Diya Reddy', present: false },
  { name: 'Kabir Mehta', present: true },
  { name: 'Meera Pillai', present: true },
  { name: 'Rohan Verma', present: true },
]
const ABSENT = REGISTER.find((s) => !s.present)!

/** Timing (ms): one student marked per step, the alert shortly after the absent mark, then a pause before replaying. */
const STEP = 650
const ALERT_DELAY = 700
const HOLD = 3200

/**
 * ERP demo: the office marks the Class 8B register and, moments after a student is marked absent,
 * the parent's phone shows the WhatsApp alert. With reduced motion it shows the finished state.
 */
export default function ErpDemo() {
  const [marked, setMarked] = React.useState(0)
  const [alerted, setAlerted] = React.useState(false)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMarked(REGISTER.length)
      setAlerted(true)
      return
    }
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const absentIndex = REGISTER.indexOf(ABSENT)

    const run = () => {
      setMarked(0)
      setAlerted(false)
      REGISTER.forEach((_, i) => later(() => setMarked(i + 1), STEP * (i + 1)))
      later(() => setAlerted(true), STEP * (absentIndex + 1) + ALERT_DELAY)
      later(run, STEP * REGISTER.length + HOLD)
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div aria-hidden className="relative pb-6 max-[639px]:pb-[184px]">
      <div className="w-[78%] max-[639px]:w-full">
        <DemoWindow title="ONESAZ ERP" meta="Class 8B · 9:02 am" bodyClassName="flex flex-col !py-2">
          {REGISTER.map((s, i) => {
            const done = i < marked
            return (
              <div key={s.name} className="flex items-center justify-between gap-3 border-b border-[#F1F3F7] py-2.5 last:border-b-0">
                <span className="text-[13.5px] text-[#0F1729]">{s.name}</span>
                <span className="flex gap-1.5">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11.5px] transition-colors duration-300 ${
                      done && s.present ? 'border-[#1F7A4F] bg-[#1F7A4F] text-white' : 'border-[#E3E7EF] text-[#98A2B3]'
                    }`}
                  >
                    Present
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11.5px] transition-colors duration-300 ${
                      done && !s.present ? 'border-[#D97706] bg-[#D97706] text-white' : 'border-[#E3E7EF] text-[#98A2B3]'
                    }`}
                  >
                    Absent
                  </span>
                </span>
              </div>
            )
          })}
        </DemoWindow>
      </div>

      {/* Parent's phone beside the register (below it on phones) */}
      <div className="absolute bottom-0 right-0 h-[236px] w-[128px] rounded-[22px] bg-[#111] p-1.5 shadow-[0_18px_30px_-12px_rgba(0,0,0,.45)] max-[639px]:right-4 max-[639px]:h-[200px] max-[639px]:w-[112px]">
        <div className="relative h-full overflow-hidden rounded-[17px] bg-[#F3F5F9]">
          <div className="mx-auto h-2.5 w-11 rounded-b-lg bg-[#111]" />
          <div className="mt-5 text-center text-[22px] font-semibold text-[#0F1729] max-[479px]:mt-4 max-[479px]:text-[18px]">9:03</div>
          <div className="text-center text-[10px] text-[#667085]">Thursday</div>
          <div
            className={`absolute inset-x-1.5 top-6 rounded-[11px] bg-white p-2 text-[10px] leading-[1.4] text-[#0F1729] shadow-[0_6px_16px_-6px_rgba(0,0,0,.35)] transition-transform duration-500 ease-[cubic-bezier(.2,.9,.3,1.2)] ${
              alerted ? 'translate-y-0' : '-translate-y-[160%]'
            }`}
          >
            <span className="block font-semibold text-[#1F7A4F]">WhatsApp · ONESAZ</span>
            {ABSENT.name} (8B) is marked absent today.
          </div>
        </div>
      </div>
    </div>
  )
}
