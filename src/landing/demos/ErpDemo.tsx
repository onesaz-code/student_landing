import type { ReactNode } from 'react'
import { DemoWindow } from './DemoWindow'

const GREEN = '#34B27A'
const AMBER = '#F2C06B'

/** 16 attendance cells; indices 3 and 11 are absent. */
const ATTENDANCE = Array.from({ length: 16 }, (_, i) => (i === 3 || i === 11 ? AMBER : GREEN))

const PIPELINE = [
  { label: 'Enquiry', cards: 3, done: false },
  { label: 'Applied', cards: 2, done: false },
  { label: 'Interview', cards: 1, done: false },
  { label: 'Admitted', cards: 2, done: true },
]

function Card({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#EDF0F5] bg-white p-4">
      <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] bg-[#1F7A4F] text-[11px] font-bold text-white">
          {step}
        </span>
        {title}
      </span>
      {children}
    </div>
  )
}

export default function ErpDemo() {
  return (
    <div aria-hidden>
      <DemoWindow title="ONESAZ ERP" meta="Admin view" bodyClassName="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 max-[639px]:grid-cols-1 max-[639px]:gap-4">
          <Card step={1} title="Today’s attendance">
            <div className="grid grid-cols-[repeat(8,16px)] gap-1.5">
              {ATTENDANCE.map((bg, i) => (
                <span key={i} className="h-4 w-4 rounded-[5px]" style={{ background: bg }} />
              ))}
            </div>
            <span className="flex flex-wrap gap-x-3.5 gap-y-1 text-[11.5px] text-[#667085]">
              <span>● Present</span>
              <span className="text-[#B7791F]">● Absent · parents alerted</span>
            </span>
          </Card>

          <Card step={2} title="Fee collection">
            <span className="block h-2.5 rounded-[5px] bg-[#FBEFD9]">
              <span className="block h-2.5 w-[72%] rounded-[5px]" style={{ background: GREEN }} />
            </span>
            <span className="flex justify-between text-[11.5px] text-[#667085]">
              <span>Collected</span>
              <span>Reminders sent</span>
            </span>
          </Card>
        </div>

        <Card step={3} title="Admissions pipeline">
          <div className="grid grid-cols-4 gap-2.5 max-[479px]:grid-cols-2 max-[479px]:gap-x-3 max-[479px]:gap-y-3">
            {PIPELINE.map((col) => (
              <div key={col.label} className="flex min-w-0 flex-col gap-1.5">
                <span className="truncate text-[11px] text-[#667085]">{col.label}</span>
                {Array.from({ length: col.cards }, (_, i) => (
                  <span key={i} className="block h-[18px] rounded-[5px]" style={{ background: col.done ? GREEN : '#E3E8F4' }} />
                ))}
              </div>
            ))}
          </div>
        </Card>
      </DemoWindow>
    </div>
  )
}
