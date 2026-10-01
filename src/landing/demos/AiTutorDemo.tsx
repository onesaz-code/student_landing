import { DemoWindow } from './DemoWindow'
import './tutor.css'

const ACCENT = '#DB2777'

const aiBubble = 'max-w-[86%] self-start rounded-[12px_12px_12px_3px] bg-[#FDEBF4] px-[11px] py-2 text-[12px] leading-[1.45] text-[#4A1230]'

const card = 'flex min-w-0 flex-col gap-2.5 rounded-xl border border-[#EDF0F5] bg-white p-3.5'

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

const OPTIONS = ['30°', '60°', '90°']

export default function AiTutorDemo() {
  return (
    <div className="tutor-root">
      <DemoWindow title="ONESAZ AI Tutor" meta="Student view" bodyClassName="flex flex-col gap-4">
        <p className="sr-only">
          Animated example: a student asks the AI Tutor a physics question, gets an explanation and a practice question, answers correctly,
          and the topic mastery rises from 45% to 72% while the next practice set is chosen and the teacher is updated.
        </p>
        <div aria-hidden className="tutor-grid grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start gap-3">
          {/* Chat */}
          <div className="box-border flex min-h-[300px] min-w-0 flex-col gap-2 rounded-xl border border-[#EDF0F5] bg-white p-3">
            <span className="flex items-center gap-2 border-b border-[#F0F2F6] pb-2">
              <span
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #F472B6, #DB2777)',
                }}
              >
                AI
              </span>
              <span className="flex flex-col">
                <span className="text-[12.5px] font-semibold text-[#0F1729]">ONESAZ AI Tutor</span>
                <span className="text-[10.5px] text-[#1F9D63]">Online · Physics, Class 10</span>
              </span>
            </span>

            <span className="tutor-q max-w-[86%] self-end rounded-[12px_12px_3px_12px] bg-[#0F1729] px-[11px] py-2 text-[12px] leading-[1.45] text-white">
              Why do I see my reflection in a mirror?
            </span>

            <span className="grid">
              <span className="[grid-area:1/1]">
                <span className="tutor-dot inline-flex gap-1 self-start rounded-xl bg-[#FDEBF4] px-3 py-2.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <span
                      key={d}
                      className="tutor-wave h-[5px] w-[5px] rounded-[3px]"
                      style={{ background: ACCENT, animationDelay: `${d}s` }}
                    />
                  ))}
                </span>
              </span>
              <span className="tutor-a1 flex [grid-area:1/1]">
                <span className={aiBubble}>
                  A mirror bounces light back at the same angle it arrives. Those rays reach your eyes, so you see yourself.
                </span>
              </span>
            </span>

            <span className="tutor-a2 flex flex-col gap-1.5">
              <span className={aiBubble}>Try one: light hits a mirror at 30°. What is the angle of reflection?</span>
              <span className="flex gap-1.5">
                {OPTIONS.map((o, i) => (
                  <span
                    key={o}
                    className={`${i === 0 ? 'tutor-opt ' : ''}flex-[1_1_0] rounded-lg border border-[#F3C6DD] bg-white py-[7px] text-center text-[12px] font-semibold text-[#4A1230]`}
                  >
                    {o}
                  </span>
                ))}
              </span>
            </span>

            <span className="tutor-a3 flex">
              <span className={`${aiBubble} inline-flex items-center gap-1.5`}>Correct! You’ve got it. Let’s try a harder one.</span>
            </span>
          </div>

          {/* Side panels */}
          <div className="flex min-w-0 flex-col gap-2.5">
            <div className={card}>
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                <Step n={1} />
                Topic mastery
              </span>
              <span className="flex items-baseline justify-between">
                <span className="text-[12px] text-[#5B6478]">Reflection of light</span>
                <span className="inline-grid shrink-0 justify-items-end">
                  <span className="tutor-p0 [grid-area:1/1]">
                    <b className="text-[20px] text-[#0F1729]">45%</b>
                  </span>
                  <span className="tutor-p1 [grid-area:1/1]">
                    <b className="text-[20px] text-[#0F1729]">72%</b>
                  </span>
                </span>
              </span>
              <span className="block h-2 overflow-hidden rounded bg-[#F3F4F7]">
                <span className="tutor-bar block h-2 rounded" style={{ background: ACCENT, width: '72%' }} />
              </span>
            </div>

            <div className="relative min-h-[86px]">
              <span className="tutor-w absolute inset-0 flex items-center gap-2 rounded-xl border border-dashed border-[#E4C3D4] px-3.5 text-[11.5px] text-[#98A2B3]">
                <span className="tutor-livedot h-1.5 w-1.5 rounded-[3px] bg-[#F472B6]" />
                Choosing the next practice…
              </span>
              <span className="tutor-next absolute inset-0 box-border flex flex-col gap-1 rounded-xl border border-[#F3C6DD] bg-[#FDEBF4] px-3.5 py-3">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                  <Step n={2} />
                  Next up for Riya
                </span>
                <span className="text-[12px] text-[#4A1230]">Refraction · Medium · 5 questions</span>
              </span>
            </div>

            <div className={card}>
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                <Step n={3} />
                Teacher sees
              </span>
              <span className="text-[12px] leading-[1.5] text-[#5B6478]">
                Riya improved on <b className="text-[#0F1729]">Reflection</b>. 4 students still need help with{' '}
                <b className="text-[#0F1729]">Refraction</b>.
              </span>
            </div>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
