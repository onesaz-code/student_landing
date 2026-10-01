import type { ReactNode } from 'react'
import './de.css'
import { DemoWindow } from './DemoWindow'

const ACCENT = '#EA580C'
const MONO = 'font-[family-name:var(--font-mono)]'

const RUBRIC = [
  { label: 'Key concept', score: '3/3', ok: true },
  { label: 'Correct process', score: '2/2', ok: true },
  { label: 'Example given', score: '1/1', ok: true },
  { label: 'Labelled diagram', score: '0/2', ok: false },
]

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

function Pill({ bg, fg, children }: { bg: string; fg: string; children: ReactNode }) {
  return (
    <span
      className={`${MONO} inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold tracking-[.04em]`}
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  )
}

const HL = 'rounded-[3px] px-px'

export default function DescriptiveEvaluationDemo() {
  return (
    <div className="de-root" aria-hidden>
      <DemoWindow title="ONESAZ Evaluation" meta="Evaluator view" bodyClassName="flex flex-col gap-4">
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start gap-3 max-[640px]:grid-cols-[minmax(0,1fr)]">
          {/* 1. Answer sheet */}
          <div className="flex min-w-0 flex-col gap-2">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
              <Step n={1} />
              Answer sheet · Roll 14
            </span>
            <div
              className="relative min-w-0 rounded-lg border border-[#ECE6D6] bg-[#FFFDF6] px-[14px] py-3 shadow-[0_6px_14px_-10px_rgba(60,40,10,.35)]"
              style={{
                backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 21px, #E9E2CF 21px 22px)',
              }}
            >
              <span className="mb-1.5 block text-[11px] font-bold text-[#0F1729]">
                Q4. Explain photosynthesis. <span className="font-medium text-[#7C879B]">(8 marks)</span>
              </span>
              <span
                className="block text-[12.5px] leading-[22px] text-[#1E3A8A]"
                style={{
                  fontFamily: "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive",
                }}
              >
                <span className={`de-h0 ${HL}`}>Plants make their own food</span> using{' '}
                <span className={`de-h1 ${HL}`}>sunlight, water and carbon dioxide</span>. This happens in the{' '}
                <span className={`de-h2 ${HL}`}>chloroplasts of the leaf</span>. Oxygen is released. For example, a mango tree.
              </span>
            </div>
          </div>

          {/* 2. Rubric */}
          <div className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-[#EDF0F5] bg-white p-[14px]">
            <span className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                <Step n={2} />
                Rubric
              </span>
              <span className="inline-grid shrink-0 justify-items-end">
                <span className="de-s0 [grid-area:1/1]">
                  <Pill bg="#FFF1E8" fg={ACCENT}>
                    <span className="de-livedot h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    Evaluating…
                  </Pill>
                </span>
                <span className="de-s1 [grid-area:1/1]">
                  <Pill bg="#E7F5EE" fg="#1F7A4F">
                    6 / 8
                  </Pill>
                </span>
              </span>
            </span>
            <span className="flex flex-col">
              {RUBRIC.map((r, i) => (
                <span
                  key={r.label}
                  className={`flex items-center justify-between py-[7px] ${i < RUBRIC.length - 1 ? 'border-b border-[#F0F2F6]' : ''}`}
                >
                  <span className="text-[12px] text-[#3F4758]">{r.label}</span>
                  <span className={`de-c${i}`}>
                    {r.ok ? (
                      <Pill bg="#E7F5EE" fg="#1F7A4F">
                        {r.score}
                      </Pill>
                    ) : (
                      <Pill bg="#FEECEB" fg="#B42318">
                        {r.score}
                      </Pill>
                    )}
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* 3. Feedback */}
        <div className="grid min-h-[58px]">
          <span className="de-w flex [grid-area:1/1] items-center gap-2 rounded-xl border border-dashed border-[#F2CDB5] px-[14px] text-[11.5px] text-[#98A2B3]">
            <span className="de-livedot h-1.5 w-1.5 rounded-full bg-[#FB923C]" />
            Writing feedback…
          </span>
          <span className="de-fb box-border flex [grid-area:1/1] flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-[#F8D3BA] bg-[#FFF1E8] px-[14px] py-2">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
              <Step n={3} />
              Feedback to student
            </span>
            <span className="text-[12px] text-[#7A2E0B]">Good answer. Add a labelled diagram of the leaf.</span>
          </span>
        </div>
      </DemoWindow>
    </div>
  )
}
