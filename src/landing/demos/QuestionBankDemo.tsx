import type { ReactNode } from 'react'
import './qb.css'
import { DemoWindow } from './DemoWindow'

const ACCENT = '#0D9488'
const MONO = 'font-[family-name:var(--font-mono)]'

const CHIPS = ['Class 10', 'Physics', 'Light', 'Medium']

const QUESTIONS = [
  {
    q: 'A ray of light hits a plane mirror at 40°. Find the angle of reflection.',
    meta: 'MCQ · 1 mark',
  },
  {
    q: 'State the laws of refraction of light.',
    meta: 'Short answer · 2 marks',
  },
  {
    q: 'Draw a ray diagram for a convex lens with the object beyond 2F.',
    meta: 'Diagram · 3 marks',
  },
  {
    q: 'Why does a pencil look bent in a glass of water?',
    meta: 'Short answer · 2 marks',
  },
]

const PAPER_LINES = ['92%', '70%', '84%', '58%']

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

/** Stacks its children in one grid cell so they can cross-fade without layout shift. */
function Stack({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-grid shrink-0 justify-items-end ${className}`}>{children}</span>
}

const PILL = `${MONO} inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold tracking-[.04em]`

export default function QuestionBankDemo() {
  return (
    <div className="qb-root" aria-hidden>
      <DemoWindow title="ONESAZ Question Bank" meta="Teacher view" bodyClassName="flex flex-col gap-4">
        <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-3 max-[640px]:grid-cols-[minmax(0,1fr)]">
          {/* 1. Find questions */}
          <div className="flex min-w-0 flex-col gap-2">
            <span className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                <Step n={1} />
                Find questions
              </span>
              <Stack>
                <span className="qb-f0 [grid-area:1/1]">
                  <span className={`${PILL} bg-[#F3F4F7] text-[#5B6478]`}>10 lakh+ questions</span>
                </span>
                <span className="qb-f1 [grid-area:1/1]">
                  <span className={`${PILL} bg-[#E6F6F4] text-[#0D9488]`}>1,240 match</span>
                </span>
              </Stack>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {CHIPS.map((c, i) => (
                <span
                  key={c}
                  className={`qb-chip qb-ch${i} rounded-full border border-[#D5DAE3] bg-white px-2.5 py-[5px] text-[11.5px] font-semibold text-[#3F4758]`}
                >
                  {c}
                </span>
              ))}
            </span>
            <div className="rounded-xl border border-[#EDF0F5] bg-white">
              {QUESTIONS.map((item, i) => (
                <div
                  key={item.q}
                  className={`qb-r${i} flex items-center gap-2.5 px-3 py-[9px] ${i < QUESTIONS.length - 1 ? 'border-b border-[#F0F2F6]' : ''}`}
                >
                  <span className="flex min-w-0 grow flex-col gap-0.5">
                    <span className="text-[12px] leading-[1.35] text-[#0F1729]">{item.q}</span>
                    <span className="text-[10.5px] text-[#667085]">{item.meta}</span>
                  </span>
                  <Stack>
                    <span className={`qb-a${i} [grid-area:1/1]`}>
                      <span
                        className={`${MONO} whitespace-nowrap rounded-md border border-[#0D9488] px-2 py-1 text-[10px] font-semibold text-[#0D9488]`}
                      >
                        + Add
                      </span>
                    </span>
                    <span className={`qb-b${i} [grid-area:1/1]`}>
                      <span className={`${MONO} whitespace-nowrap rounded-md bg-[#0D9488] px-2 py-1 text-[10px] font-semibold text-white`}>
                        ✓ Added
                      </span>
                    </span>
                  </Stack>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Test paper */}
          <div className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-[#EDF0F5] bg-white p-[14px]">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
              <Step n={2} />
              Test paper
            </span>
            <span className="flex items-baseline gap-1.5">
              <Stack>
                {[0, 1, 2, 3, 4].map((n) => (
                  <span key={n} className={`qb-p${n} [grid-area:1/1]`}>
                    <b className="text-[22px] text-[#0F1729]">{n}</b>
                  </span>
                ))}
              </Stack>
              <span className="text-[12px] text-[#5B6478]">questions added</span>
            </span>
            <span className="flex flex-col gap-[5px]">
              {PAPER_LINES.map((w, i) => (
                <span key={i} className="block h-[5px] rounded-[3px] bg-[#EEF0F3]" style={{ width: w }} />
              ))}
            </span>
            <span
              className={`qb-gen ${MONO} flex h-[34px] items-center justify-center rounded-lg bg-[#0D9488] text-[11.5px] font-semibold text-white`}
            >
              Create test
            </span>
            <span className="block min-h-4">
              <span className="qb-rd flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1F7A4F]">
                <svg
                  viewBox="0 0 24 24"
                  width={12}
                  height={12}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
                Test ready · sent to Class 10A
              </span>
            </span>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
