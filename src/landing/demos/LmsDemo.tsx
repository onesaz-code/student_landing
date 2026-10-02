import type { ReactNode } from 'react'
import './lms.css'
import { DemoWindow, OnesazMark } from './DemoWindow'

const MONO = 'font-[family-name:var(--font-mono)]'

function Ico({ size, children }: { size: number; children: ReactNode }) {
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
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

const PlayPath = <path d="M8 5v14l11-7z" />
const CheckPath = <path d="m5 12 5 5 9-10" />

function Step({ n, color = '#2447D1', children }: { n: number; color?: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
      <span
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white"
        style={{ background: color }}
      >
        {n}
      </span>
      {children}
    </span>
  )
}

/** Small mono pill (status chips). */
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

const PROGRESS = [
  {
    label: 'Watched the video',
    done: '28/32',
    width: '88%',
    bar: 'lms-b0',
    a: 'lms-b0a',
    b: 'lms-b0b',
  },
  {
    label: 'Finished the quiz',
    done: '24/32',
    width: '75%',
    bar: 'lms-b1',
    a: 'lms-b1a',
    b: 'lms-b1b',
  },
]

const HELP = ['Arjun', 'Meera', 'Kiran']

const QUIZ = [
  { key: 'A', label: 'Chlorophyll', correct: true },
  { key: 'B', label: 'Haemoglobin', correct: false },
  { key: 'C', label: 'Melanin', correct: false },
]

function TabletTask({ done, title, sub }: { done: boolean; title: string; sub: string }) {
  return (
    <span className="flex items-center gap-2 rounded-lg border border-[#EDF0F5] bg-white p-2">
      <span
        className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md"
        style={done ? { background: '#E7F5EE', color: '#1F7A4F' } : { background: '#F3F4F7', color: '#7C879B' }}
      >
        <Ico size={11}>
          {done ? (
            CheckPath
          ) : (
            <>
              <path d="M6 3h9l4 4v14H6z" />
              <path d="M9 12h7M9 16h5" />
            </>
          )}
        </Ico>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[10px] font-semibold text-[#0F1729]">{title}</span>
        <span className="text-[8.5px] text-[#667085]">{sub}</span>
      </span>
    </span>
  )
}

export default function LmsDemo() {
  return (
    <div className="lms-root" aria-hidden>
      <DemoWindow title="ONESAZ LMS" meta="Teacher view" bodyClassName="flex flex-col gap-4">
        <div className="lms-grid grid grid-cols-[minmax(0,1fr)_190px] items-center gap-4">
          {/* Teacher side */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-2.5">
              <Step n={1}>Today’s lesson · Science 8B</Step>
              <div className="lms-row flex items-center gap-3 rounded-xl border border-[#EDF0F5] bg-white px-3.5 py-3">
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#EEF2FD] text-[#2447D1]">
                  <Ico size={16}>{PlayPath}</Ico>
                </span>
                <span className="flex min-w-0 grow flex-col gap-px">
                  <span className="text-[13.5px] font-semibold text-[#0F1729]">Light and chlorophyll</span>
                  <span className="text-[11.5px] text-[#667085]">Video · 8 min + quiz</span>
                </span>
                <span className="inline-grid shrink-0 justify-items-end">
                  <span className="lms-st0 [grid-area:1/1]">
                    <span className="lms-sb inline-flex">
                      <span
                        className={`${MONO} inline-flex items-center gap-[5px] whitespace-nowrap rounded-lg bg-[#2447D1] px-2.5 py-1.5 text-[10.5px] font-semibold text-white`}
                      >
                        Send to class
                      </span>
                    </span>
                  </span>
                  <span className="lms-st1 [grid-area:1/1]">
                    <Pill bg="#EEF2FD" fg="#2447D1">
                      <span className="lms-dot h-1.5 w-1.5 rounded-[3px] bg-[#2447D1]" />
                      Sending…
                    </Pill>
                  </span>
                  <span className="lms-st2 [grid-area:1/1]">
                    <Pill bg="#E7F5EE" fg="#1F7A4F">
                      Delivered 32/32
                    </Pill>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 rounded-xl border border-[#EDF0F5] bg-white px-3.5 py-3">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <Step n={2}>Class progress · live</Step>
                <span className="lms-avg">
                  <Pill bg="#E7F5EE" fg="#1F7A4F">
                    Avg score 86%
                  </Pill>
                </span>
              </span>
              {PROGRESS.map((p) => (
                <div key={p.label} className="flex flex-col gap-[5px]">
                  <span className="flex justify-between text-[12px] text-[#5B6478]">
                    <span>{p.label}</span>
                    <span className="inline-grid justify-items-end font-semibold text-[#0F1729]">
                      <span className={`${p.a} [grid-area:1/1]`}>0/32</span>
                      <span className={`${p.b} [grid-area:1/1]`}>{p.done}</span>
                    </span>
                  </span>
                  <span className="block h-1.5 overflow-hidden rounded-[3px] bg-[#EEF0F3]">
                    <span className={`${p.bar} block h-1.5 origin-left rounded-[3px] bg-[#2447D1]`} style={{ width: p.width }} />
                  </span>
                </div>
              ))}
            </div>

            <div className="relative min-h-[58px] rounded-xl max-[639px]:min-h-[66px]">
              <span className="lms-wait absolute inset-0 flex items-center gap-2 rounded-xl border border-dashed border-[#D5DAE3] px-3.5 text-[11.5px] text-[#98A2B3]">
                <span className="lms-dot h-1.5 w-1.5 shrink-0 rounded-[3px] bg-[#9DB0F0]" />
                Checking who needs help…
              </span>
              <span className="lms-help absolute inset-0 box-border flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-xl border border-[#F2DDB0] bg-[#FDF6E7] px-3.5 py-2">
                <Step n={3} color="#B7791F">
                  Needs help · 3 students
                </Step>
                <span className="flex gap-[5px]">
                  {HELP.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-[#F2DDB0] bg-white px-2 py-[3px] text-[11px] font-medium text-[#7A4B00]"
                    >
                      {name}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </div>

          {/* Student tablet */}
          <div className="lms-tab flex min-w-0 flex-col items-center gap-2">
            <div className="w-full max-w-[200px] rounded-[18px] bg-[#151A26] p-[9px] shadow-[0_18px_30px_-18px_rgba(20,24,40,.7)]">
              <div className="relative box-border h-[262px] overflow-hidden rounded-[10px] bg-[#F5F7FB] p-2.5">
                <span className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#0F1729]">
                  <OnesazMark size={16} />
                  ONESAZ
                  <span className="ml-auto text-[8.5px] font-normal text-[#98A2B3]">10:24</span>
                </span>

                <span className="grid">
                  {/* Screen 1: today's list */}
                  <span className="lms-s0 flex flex-col gap-2 [grid-area:1/1]">
                    <span className="text-[10px] text-[#667085]">Today</span>
                    <TabletTask done title="How plants make food" sub="Completed" />
                    <TabletTask done={false} title="Maths worksheet" sub="Due Friday" />
                  </span>

                  {/* Screen 2: lesson video */}
                  <span className="lms-s1 flex flex-col gap-2 [grid-area:1/1]">
                    <span
                      className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, #1F7A4F 0%, #6CBF6A 100%)',
                      }}
                    >
                      <span className="absolute -right-2.5 -top-3.5 h-[70px] w-[70px] rounded-full bg-[rgba(255,240,150,.55)]" />
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-white/90 text-[#1F7A4F]">
                        <Ico size={14}>{PlayPath}</Ico>
                      </span>
                    </span>
                    <span className="block h-1 overflow-hidden rounded-sm bg-[#E4E7EE]">
                      <span className="lms-vp block h-1 origin-left bg-[#2447D1]" />
                    </span>
                    <span className="text-[11px] font-semibold text-[#0F1729]">Light and chlorophyll</span>
                    <span className="text-[9px] leading-[1.4] text-[#667085]">
                      Plants use chlorophyll to capture sunlight and make food.
                    </span>
                  </span>

                  {/* Screen 3: quick quiz */}
                  <span className="lms-s2 flex flex-col gap-[7px] [grid-area:1/1]">
                    <span className={`${MONO} text-[8.5px] tracking-[.08em] text-[#2447D1]`}>QUICK QUIZ · 1 OF 5</span>
                    <span className="text-[11px] font-semibold leading-[1.35] text-[#0F1729]">Which pigment captures sunlight?</span>
                    {QUIZ.map((o) => (
                      <span
                        key={o.key}
                        className={`${o.correct ? 'lms-opt ' : ''}flex items-center gap-[7px] rounded-[7px] border border-[#E4E7EE] bg-white px-2 py-[7px] text-[10px] text-[#0F1729]`}
                      >
                        <span
                          className={`${MONO} flex h-4 w-4 items-center justify-center rounded-lg bg-[#F3F4F7] text-[8.5px] font-bold text-[#5B6478]`}
                        >
                          {o.key}
                        </span>
                        {o.label}
                      </span>
                    ))}
                    <span className="lms-ok inline-flex items-center gap-[5px] text-[10px] font-semibold text-[#1F7A4F]">
                      <Ico size={11}>{CheckPath}</Ico>
                      Correct! Well done
                    </span>
                  </span>
                </span>

                {/* Push notification */}
                <span className="lms-nt absolute inset-x-2 top-2 flex items-center gap-[7px] rounded-[9px] bg-[#0F1729] px-[9px] py-[7px] text-white shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]">
                  <OnesazMark size={16} />
                  <span className="flex flex-col">
                    <span className="text-[9.5px] font-semibold">New lesson from Ms. Rao</span>
                    <span className="text-[8.5px] text-[#A9B2C3]">Light and chlorophyll</span>
                  </span>
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#667085]">Student’s tablet</span>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
