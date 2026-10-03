import * as React from 'react'
import { OnesazMark } from './DemoWindow'

/** The conversation, in order (sample content). `steps` items appear one by one inside the tutor's reply. */
type Message = { from: 'student' | 'tutor'; text?: React.ReactNode; steps?: React.ReactNode[]; good?: boolean }

const Eq = ({ children }: { children: React.ReactNode }) => (
  <span className="whitespace-nowrap rounded-[5px] bg-[#F1F4F9] px-1.5 py-px font-[family-name:var(--font-mono)] text-[10.5px] text-[#0F1729]">
    {children}
  </span>
)

const MESSAGES: Message[] = [
  { from: 'student', text: 'How do I solve 2x + 6 = 14?' },
  {
    from: 'tutor',
    text: 'Let’s solve it step by step:',
    steps: [
      <>
        Subtract 6 from both sides: <Eq>2x = 8</Eq>
      </>,
      <>
        Divide both sides by 2: <Eq>x = 4</Eq>
      </>,
      <>Check: 2 × 4 + 6 = 14 ✓</>,
    ],
  },
  {
    from: 'tutor',
    text: (
      <>
        Now you try one: <Eq>3x + 5 = 20</Eq>
      </>
    ),
  },
  { from: 'student', text: 'x = 5' },
  { from: 'tutor', text: '✓ That’s right. Well done!', good: true },
]
/** One beat per message, plus one per step inside the tutor's first reply. */
const BEATS = MESSAGES.reduce((n, m) => n + 1 + (m.steps?.length ?? 0), 0)
const MASTERY_BEFORE = 45
const MASTERY_AFTER = 60

const BEAT_MS = 700
const TYPING_MS = 650
const HOLD_MS = 3200

/**
 * AI Tutor tour demo: a student asks a maths question in the ONESAZ app, the tutor answers in numbered
 * steps, sets a similar question and checks the answer, and topic mastery goes up.
 * With reduced motion it shows the finished conversation.
 */
export default function AiTutorChatDemo() {
  const [beat, setBeat] = React.useState(0)
  const [typing, setTyping] = React.useState(false)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(BEATS)
      return
    }
    const timers: number[] = []
    const run = () => {
      setBeat(0)
      setTyping(false)
      let t = 500
      let b = 0
      MESSAGES.forEach((m) => {
        if (m.from === 'tutor') {
          // short "typing…" pause before each tutor reply
          timers.push(window.setTimeout(() => setTyping(true), t))
          t += TYPING_MS
        }
        const at = ++b
        timers.push(
          window.setTimeout(() => {
            setTyping(false)
            setBeat(at)
          }, t),
        )
        t += BEAT_MS
        m.steps?.forEach(() => {
          const s = ++b
          timers.push(window.setTimeout(() => setBeat(s), t))
          t += BEAT_MS
        })
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  // Work out which messages (and how many steps of each) are visible at this beat
  let left = beat
  const shown: { m: Message; steps: number }[] = []
  for (const m of MESSAGES) {
    if (left <= 0) break
    left -= 1
    const steps = Math.min(m.steps?.length ?? 0, left)
    left -= steps
    shown.push({ m, steps })
  }
  const done = beat >= BEATS
  const mastery = done ? MASTERY_AFTER : MASTERY_BEFORE

  return (
    <div aria-hidden className="flex items-center gap-5 max-[639px]:flex-col">
      {/* Student's phone */}
      <div className="w-[228px] shrink-0 rounded-[32px] bg-[#111] p-2 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6)]">
        <div className="relative h-[420px] overflow-hidden rounded-[25px] bg-[#F5F7FB] text-[#0F1729]">
          <div className="mx-auto h-3.5 w-16 rounded-b-[10px] bg-[#111]" />
          <div className="flex items-center gap-2 border-b border-[#E6E9EF] bg-white px-3 py-2">
            <OnesazMark size={20} />
            <span className="leading-tight">
              <span className="block text-[12.5px] font-semibold">AI Tutor</span>
              <span className="block text-[10px] text-[#12B76A]">● Online</span>
            </span>
            <span className="ml-auto text-[10px] text-[#667085]">Maths · Class 7</span>
          </div>

          {/* Messages sit above the input bar; older ones scroll up out of view, like a real chat */}
          <div className="absolute inset-x-0 bottom-[50px] top-[58px] flex flex-col justify-end gap-2 overflow-hidden px-2.5 pb-1 text-[11.5px] leading-[1.45]">
            {shown.map(({ m, steps }, i) =>
              m.from === 'student' ? (
                <div key={i} className="lp-fade self-end rounded-[13px] rounded-br-[4px] bg-[#2447D1] px-2.5 py-1.5 text-white">
                  {m.text}
                </div>
              ) : (
                <div
                  key={i}
                  className={`lp-fade max-w-[92%] self-start rounded-[13px] rounded-bl-[4px] bg-white px-2.5 py-1.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,.2)] ${
                    m.good ? 'text-[#1F7A4F]' : ''
                  }`}
                >
                  {m.text}
                  {m.steps?.slice(0, steps).map((s, k) => (
                    <div key={k} className="lp-fade mt-1.5 flex gap-1.5">
                      <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EEF2FD] text-[9px] font-semibold text-[#2447D1]">
                        {k + 1}
                      </span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              ),
            )}
            {typing && (
              <div className="flex gap-1 self-start rounded-[13px] rounded-bl-[4px] bg-white px-3 py-2.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,.2)]">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="lp-typing h-1.5 w-1.5 rounded-full bg-[#98A2B3]" style={{ animationDelay: `${d * 150}ms` }} />
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2 rounded-full border border-[#E3E7EF] bg-white px-3 py-1.5 text-[10.5px] text-[#98A2B3]">
            Ask a doubt…
            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#2447D1] text-[11px] text-white">↑</span>
          </div>
        </div>
      </div>

      {/* Topic mastery */}
      <div className="flex w-full min-w-0 flex-col gap-3 text-[11.5px] text-[#0F1729]">
        <div className="rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">Linear equations</span>
            <span className="text-[10.5px] text-[#667085]">Topic mastery</span>
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#EEF1F7]">
            <div className="h-full rounded-full bg-[#2447D1] transition-[width] duration-700" style={{ width: `${mastery}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-[11px]">
            <span className="font-semibold">{mastery}%</span>
            <span className={done ? 'text-[#1F7A4F]' : 'text-[#667085]'}>
              {done ? `+${MASTERY_AFTER - MASTERY_BEFORE}% today` : 'Keep going'}
            </span>
          </div>
        </div>
        <div className="rounded-[14px] bg-white p-3.5 text-[#475467] shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="font-semibold text-[#0F1729]">Next for Aanya</div>
          <div className="mt-1">5 practice questions on equations with brackets</div>
        </div>
      </div>
    </div>
  )
}
