import * as React from 'react'
import { MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Sample call for the demo only. */
const SCHOOL = 'Greenfield School'
const LINES: { who: 'ai' | 'parent'; text: string }[] = [
  { who: 'ai', text: 'Hello Mrs. Sharma, this is the Greenfield School assistant.' },
  { who: 'ai', text: 'Aarav’s Term 2 fee of ₹18,500 is due on 15 October.' },
  { who: 'parent', text: '“Okay, I’ll pay it tomorrow.”' },
  { who: 'ai', text: 'Thank you. I’m sending the payment link to your WhatsApp now.' },
]
const STEPS = ['Dialling parent', 'Ringing', 'Connected', 'Call ended · result saved']
const RESULTS = [
  { text: 'Promised to pay · 3 Oct', bg: '#E7F5EE', fg: '#1F7A4F' },
  { text: 'Payment link sent', bg: '#EEF2FD', fg: '#2447D1' },
  { text: 'Reminder set for 3 Oct', bg: '#FDF3E2', fg: '#9A6200' },
]

const DIAL_MS = 500
const RING_MS = 1700
const LINE_MS = 1500
const RESULT_MS = 300
const HOLD_MS = 3200

/** Phase: 0 dialling, 1 ringing, 2… connected (one per caption line), then ended. */
const ENDED = 2 + LINES.length

/**
 * AI Calling Agent tour demo: the parent's phone rings with a call from the school's ONESAZ assistant,
 * the call connects with a timer, waveform and captions, then ends and the result is saved to the fee record.
 * With reduced motion it shows the finished call.
 */
export default function AiCallRingDemo() {
  const [phase, setPhase] = React.useState(0)
  const [results, setResults] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(ENDED)
      setResults(RESULTS.length)
      setSeconds(12)
      return
    }
    const timers: number[] = []
    let clock = 0
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const run = () => {
      setPhase(0)
      setResults(0)
      setSeconds(0)
      let t = DIAL_MS
      later(() => setPhase(1), t)
      t += RING_MS
      later(() => {
        setPhase(2)
        clock = window.setInterval(() => setSeconds((s) => s + 1), 450)
      }, t)
      LINES.forEach((_, i) => {
        if (i > 0) later(() => setPhase(2 + i), t + LINE_MS * i)
      })
      t += LINE_MS * LINES.length
      later(() => {
        window.clearInterval(clock)
        setPhase(ENDED)
      }, t)
      RESULTS.forEach((_, i) => later(() => setResults(i + 1), t + RESULT_MS * (i + 1)))
      later(run, t + RESULT_MS * RESULTS.length + HOLD_MS)
    }
    run()
    return () => {
      timers.forEach(clearTimeout)
      window.clearInterval(clock)
    }
  }, [])

  const ringing = phase === 1
  const onCall = phase >= 2 && phase < ENDED
  const ended = phase === ENDED
  const line = onCall ? LINES[phase - 2] : null
  const stepIndex = phase === 0 ? 0 : ringing ? 1 : onCall ? 2 : 4
  const time = `00:${String(seconds).padStart(2, '0')}`

  return (
    <div aria-hidden className="flex items-center gap-5 max-[639px]:flex-col">
      {/* Parent's phone */}
      <div className="w-[214px] shrink-0 rounded-[32px] bg-[#111] p-2 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6)]">
        <div className="relative h-[400px] overflow-hidden rounded-[25px] bg-[linear-gradient(180deg,#141B33,#0B1022)] text-white">
          <div className="relative z-[2] mx-auto h-3.5 w-16 rounded-b-[10px] bg-[#111]" />

          {/* Ringing / dialling */}
          {!onCall && !ended && (
            <div className="lp-fade absolute inset-0 flex flex-col items-center pt-12 text-center">
              <span className="text-[11px] text-white/70">{ringing ? 'Incoming call' : 'Connecting…'}</span>
              <span className="relative mt-5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white shadow-[0_0_30px_rgba(63,187,238,.5)]">
                {ringing && (
                  <>
                    <span className="lp-ring absolute inset-0 rounded-full border-2 border-[#3FBBEE]" />
                    <span className="lp-ring absolute inset-0 rounded-full border-2 border-[#3FBBEE] [animation-delay:.6s]" />
                  </>
                )}
                <OnesazMark size={44} />
              </span>
              <span className="mt-5 text-[16px] font-semibold">{SCHOOL}</span>
              <span className="mt-0.5 text-[11px] text-white/70">ONESAZ AI assistant</span>
              <div className="absolute inset-x-0 bottom-7 flex justify-around px-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E24B4A]">
                  <PhoneOff size={20} />
                </span>
                <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#12B76A] ${ringing ? 'lp-shake' : ''}`}>
                  <Phone size={20} />
                </span>
              </div>
            </div>
          )}

          {/* On the call */}
          {onCall && (
            <div className="lp-fade absolute inset-0 flex flex-col items-center pt-10 text-center">
              <span className="text-[13.5px] font-semibold">{SCHOOL}</span>
              <span className="mt-0.5 text-[10.5px] text-[#34D399]">● {time}</span>
              <span className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_24px_rgba(63,187,238,.45)]">
                <OnesazMark size={36} />
              </span>
              <span className="mt-3 flex h-6 items-center gap-[3px]">
                {Array.from({ length: 16 }, (_, i) => (
                  <span key={i} className="lp-wave w-[3px] rounded-full bg-[#3FBBEE]" style={{ animationDelay: `${(i * 37) % 90}ms` }} />
                ))}
              </span>
              <p
                key={phase}
                className={`lp-fade mt-4 min-h-[52px] px-4 text-[11.5px] leading-[1.5] ${line?.who === 'parent' ? 'text-[#7FE3D2]' : 'text-white'}`}
              >
                {line?.text}
              </p>
              <div className="absolute inset-x-0 bottom-7 flex justify-around px-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <MicOff size={17} />
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <Volume2 size={17} />
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E24B4A]">
                  <PhoneOff size={17} />
                </span>
              </div>
            </div>
          )}

          {/* Call ended */}
          {ended && (
            <div className="lp-fade absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <OnesazMark size={30} />
              </span>
              <span className="mt-4 text-[14px] font-semibold">Call ended</span>
              <span className="mt-1 text-[11px] text-white/70">
                {time} · {SCHOOL}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* What happened */}
      <div className="flex w-full min-w-0 flex-col gap-3 text-[11.5px] text-[#0F1729]">
        <div className="rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <OnesazMark size={18} />
              AI Calling Agent
            </span>
            <span className="text-[10.5px] text-[#667085]">Fee reminder</span>
          </div>
          <div className="mt-2.5">
            {STEPS.map((s, i) => {
              const done = i < stepIndex || (ended && i === 3)
              const current = !done && i === stepIndex
              return (
                <div
                  key={s}
                  className={`flex items-center gap-2 py-1 transition-colors ${done ? 'text-[#0F1729]' : current ? 'text-[#2447D1]' : 'text-[#98A2B3]'}`}
                >
                  <span
                    className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[9px] transition-colors ${
                      done
                        ? 'border-[#12B76A] bg-[#12B76A] text-white'
                        : current
                          ? 'border-[#2447D1] text-transparent'
                          : 'border-[#CBD2DE] text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  {s}
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)] transition-opacity duration-300 ${ended ? 'opacity-100' : 'opacity-50'}`}
        >
          <div className="font-semibold">Saved to Aarav’s fee record</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {RESULTS.map((r, i) => (
              <span
                key={r.text}
                className={`rounded-full px-2.5 py-1 text-[10.5px] transition-all duration-300 ${i < results ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                style={{ background: r.bg, color: r.fg }}
              >
                {r.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
