import './omr.css'
import { DemoWindow } from './DemoWindow'

const ACCENT = '#C2412D'
const MONO = 'font-[family-name:var(--font-mono)]'
const OPTIONS = ['A', 'B', 'C', 'D'] as const

/** Bubbles filled on the sheet, and whether each answer was correct. */
const SHEET_ROWS: { filled: (typeof OPTIONS)[number]; correct: boolean }[] = [
  { filled: 'A', correct: true },
  { filled: 'D', correct: true },
  { filled: 'C', correct: false },
  { filled: 'B', correct: true },
  { filled: 'A', correct: true },
  { filled: 'D', correct: true },
]

const RANKS = [
  { name: 'Aanya S.', pct: 96, bg: '#FBEFD9', fg: '#9A6400' },
  { name: 'Kabir M.', pct: 91, bg: '#EEF0F4', fg: '#5B6478' },
  { name: 'Diya P.', pct: 88, bg: '#FBEADF', fg: '#9A4A12' },
  { name: 'Rohan D.', pct: 82, bg: '#F3F4F7', fg: '#98A2B3' },
]

function Check({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5 9-10" />
    </svg>
  )
}

function Cross({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function Step({ n }: { n: number }) {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{ background: ACCENT }}
    >
      {n}
    </span>
  )
}

const Corner = ({ className }: { className: string }) => <span className={`absolute h-[7px] w-[7px] bg-[#1B2438] ${className}`} />

export default function OmrDemo() {
  return (
    <div className="omr-root" aria-hidden>
      <DemoWindow title="ONESAZ Exams" meta="Exam cell" bodyClassName="flex flex-col gap-4">
        <div className="grid grid-cols-[178px_minmax(0,1fr)] items-stretch gap-3 max-[640px]:grid-cols-[minmax(0,1fr)]">
          {/* 1. OMR scan */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#EDF0F5] bg-white p-4">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
              <Step n={1} />
              OMR scan
            </span>
            <div className="relative flex flex-col gap-[7px] overflow-hidden rounded-lg border border-[#ECE6D6] bg-[#FFFDF6] px-3 pb-3 pt-[14px] shadow-[0_6px_14px_-10px_rgba(60,40,10,.35)]">
              <Corner className="left-[5px] top-[5px]" />
              <Corner className="right-[5px] top-[5px]" />
              <Corner className="bottom-[5px] left-[5px]" />
              <Corner className="bottom-[5px] right-[5px]" />
              <span className={`${MONO} pl-1 text-[8.5px] tracking-[.08em] text-[#9AA3B2]`}>ROLL 14 · UNIT TEST</span>
              {SHEET_ROWS.map((row, i) => (
                <div key={i} className="flex items-center gap-[7px]">
                  <span className={`${MONO} w-4 text-[9.5px] text-[#667085]`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex gap-[5px]">
                    {OPTIONS.map((opt) => {
                      const on = opt === row.filled
                      return (
                        <span
                          key={opt}
                          className="flex h-[15px] w-[15px] items-center justify-center rounded-full text-[7.5px] font-bold"
                          style={{
                            border: `1.3px solid ${on ? '#1B2438' : '#B9C1CF'}`,
                            background: on ? '#1B2438' : '#fff',
                            color: on ? '#fff' : '#9AA3B2',
                          }}
                        >
                          {opt}
                        </span>
                      )
                    })}
                  </span>
                  <span
                    className={`omr-m${i} flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white`}
                    style={{ background: row.correct ? '#1F9D63' : '#E5484D' }}
                  >
                    {row.correct ? <Check size={10} /> : <Cross size={9} />}
                  </span>
                </div>
              ))}
              <span
                className="omr-tint pointer-events-none absolute inset-x-0 top-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(31,157,99,.07), rgba(31,157,99,.12))',
                }}
              />
              <span
                className="omr-line pointer-events-none absolute -left-1 -right-1 h-[2px] bg-[#22C55E]"
                style={{
                  boxShadow: '0 0 10px 3px rgba(34,197,94,.55), 0 0 2px #fff inset',
                }}
              />
            </div>
            <span className="relative block h-6">
              <span className="omr-stat1 absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FD] px-[9px] py-[5px] text-[10.5px] font-semibold tracking-[.03em] text-[#2447D1]">
                <span className="omr-livedot h-1.5 w-1.5 rounded-full bg-[#2447D1]" />
                Scanning…
              </span>
              <span className="omr-stat2 absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-full bg-[#E7F5EE] px-[9px] py-[5px] text-[10.5px] font-semibold text-[#1F7A4F]">
                <Check size={11} />
                Scanned · 18/20
              </span>
            </span>
          </div>

          {/* 2. Ranks */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#EDF0F5] bg-white p-4">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
              <Step n={2} />
              Unit test · ranks
            </span>
            <div>
              {RANKS.map((r, i) => (
                <div
                  key={r.name}
                  className={`omr-r${i} flex items-center gap-2.5 py-2 ${i < RANKS.length - 1 ? 'border-b border-[#F0F2F6]' : ''}`}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: r.bg, color: r.fg }}
                  >
                    {i + 1}
                  </span>
                  <span className="grow text-[13px] text-[#0F1729]">{r.name}</span>
                  <span className="block h-1.5 w-[70px] overflow-hidden rounded-[3px] bg-[#EEF0F3]">
                    <span
                      className={`omr-b${i} block h-1.5 origin-left rounded-[3px]`}
                      style={{ width: `${r.pct}%`, background: ACCENT }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Results sent */}
        <div className="omr-sent flex items-center gap-3 rounded-xl bg-[#FDEFEC] px-4 py-[14px]">
          <Step n={3} />
          <span className="flex grow flex-col gap-px">
            <span className="text-[13.5px] font-semibold text-[#0F1729]">Results sent to parents</span>
            <span className="text-[12px] text-[#667085]">App, SMS and WhatsApp, the same day</span>
          </span>
          <span className="omr-sentok flex aspect-square h-[26px] w-[26px] flex-none items-center justify-center self-center rounded-full bg-[#1F9D63] text-white">
            <Check size={13} />
          </span>
        </div>
      </DemoWindow>
    </div>
  )
}
