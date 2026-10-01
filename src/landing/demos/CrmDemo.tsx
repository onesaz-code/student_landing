import type { ReactNode } from 'react'
import './crm.css'
import { DemoWindow } from './DemoWindow'

const MONO = 'font-[family-name:var(--font-mono)]'
const INDIGO = '#4F46E5'
const ELLIPSIS = 'overflow-hidden text-ellipsis whitespace-nowrap'

const STAGES = [
  { full: 'New enquiry', short: 'New', count: 18 },
  { full: 'Contacted', short: 'Called', count: 11 },
  { full: 'Campus visit', short: 'Visit', count: 6 },
  { full: 'Admitted', short: 'Joined', count: null },
]

/** Other leads sitting in each column (below the moving lead). */
const COLUMNS = [
  [
    { name: 'Arjun K.', sub: 'Class 8' },
    { name: 'Sana M.', sub: 'Class 3' },
  ],
  [{ name: 'Vikram R.', sub: 'Class 11' }],
  [{ name: 'Neha P.', sub: 'Class 6' }],
  [{ name: 'Rahul D.', sub: 'Class 9' }],
]

const ACTIVITY = [
  {
    cls: 'crm-a0',
    dot: '#1F9D63',
    text: 'WhatsApp brochure sent automatically',
  },
  {
    cls: 'crm-a1',
    dot: INDIGO,
    text: 'Call done · campus visit booked for Sat, 11 am',
  },
  { cls: 'crm-a2', dot: '#1F9D63', text: 'Fee paid · admission confirmed' },
]

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
      <span
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white"
        style={{ background: INDIGO }}
      >
        {n}
      </span>
      {children}
    </span>
  )
}

export default function CrmDemo() {
  return (
    <div className="crm-root" aria-hidden>
      <DemoWindow title="ONESAZ CRM" meta="Admissions office" bodyClassName="flex flex-col gap-4">
        {/* 1. Pipeline board */}
        <div className="flex min-w-0 flex-col gap-2">
          <span className="flex flex-wrap items-center justify-between gap-2">
            <Step n={1}>Admissions 2026–27</Step>
            <span className={`${MONO} text-[10px] tracking-[.04em] text-[#98A2B3]`}>COUNSELLOR · MS. RAO</span>
          </span>

          <div className="rounded-xl border border-[#EDF0F5] bg-[#F7F8FB] px-2 py-3">
            <div className="grid grid-cols-4">
              {STAGES.map((s, i) => (
                <span
                  key={s.full}
                  className="flex min-w-0 items-center justify-between gap-1 border-b-2 px-1 pb-2 text-[11px] font-semibold text-[#3F4758]"
                  style={{
                    borderBottomColor: i === STAGES.length - 1 ? INDIGO : '#E4E7EC',
                  }}
                >
                  <span className={ELLIPSIS}>
                    <span className="max-[639px]:hidden">{s.full}</span>
                    <span className="hidden max-[639px]:inline">{s.short}</span>
                  </span>
                  <span className={`${MONO} text-[10px] text-[#7C879B]`}>
                    {s.count ?? (
                      <span className="inline-grid shrink-0 justify-items-end">
                        <span className="crm-n0 [grid-area:1/1]">42</span>
                        <span className="crm-n1 [grid-area:1/1]">43</span>
                      </span>
                    )}
                  </span>
                </span>
              ))}
            </div>

            {/* Moving lead */}
            <div className="relative mb-1.5 mt-2 h-[52px]">
              <span className="crm-lead absolute top-0 box-border w-1/4 px-1">
                <span
                  className="flex min-w-0 flex-col gap-0.5 rounded-lg border-[1.5px] bg-white p-2 shadow-[0_8px_18px_-10px_rgba(79,70,229,.6)]"
                  style={{ borderColor: INDIGO }}
                >
                  <span className={`${ELLIPSIS} text-[11.5px] font-bold text-[#0F1729]`}>Priya S.</span>
                  <span className={`${ELLIPSIS} text-[9.5px] max-[639px]:hidden`} style={{ color: INDIGO }}>
                    Class 6 · Website
                  </span>
                </span>
              </span>
            </div>

            <div className="grid grid-cols-4">
              {COLUMNS.map((col, i) => (
                <span key={i} className="flex min-w-0 flex-col gap-1.5 px-1">
                  {col.map((lead) => (
                    <span
                      key={lead.name}
                      className="flex min-w-0 flex-col gap-0.5 rounded-lg border border-[#EDF0F5] bg-white px-2 py-[7px]"
                    >
                      <span className={`${ELLIPSIS} text-[11px] font-semibold text-[#5B6478]`}>{lead.name}</span>
                      <span className={`${ELLIPSIS} text-[9.5px] text-[#98A2B3] max-[639px]:hidden`}>{lead.sub}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Activity log */}
        <div className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-[#EDF0F5] bg-white p-3.5">
          <Step n={2}>Priya S. · activity</Step>
          <span className="flex min-h-[70px] flex-col gap-2">
            {ACTIVITY.map((a) => (
              <span key={a.cls} className={`${a.cls} flex items-center gap-2 text-[12px] text-[#0F1729]`}>
                <span className="h-2 w-2 shrink-0 rounded-[4px]" style={{ background: a.dot }} />
                {a.text}
              </span>
            ))}
          </span>
        </div>
      </DemoWindow>
    </div>
  )
}
