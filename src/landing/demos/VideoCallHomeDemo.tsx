import * as React from 'react'
import { Mic, PhoneOff, Video } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

const STUDENT_IMG = '/images/landing/video-call-student.jpg'
const PARENT_IMG = '/images/landing/video-call-parent.jpg'

/** Approved contacts on the student's tablet (sample data). Mom uses the real photo. */
const CONTACTS = [
  { name: 'Mom', photo: PARENT_IMG, initials: '', color: '' },
  { name: 'Dad', photo: '', initials: 'D', color: '#2447D1' },
  { name: 'Grandma', photo: '', initials: 'G', color: '#7A5AF8' },
]
const STEPS = ['Ananya taps “Call Mom”', 'Ringing', 'Video call connected', 'Call ended and logged']

const PICK_MS = 1200
const RING_MS = 1600
const CALL_MS = 3400
const HOLD_MS = 2600

/** Phase: 0 contacts, 1 ringing, 2 on the call, 3 ended. */
type Phase = 0 | 1 | 2 | 3

/**
 * Video Calling tour demo: a hostel student calls home from the school tablet. She picks Mom from her
 * parent-approved contacts, it rings, and the video call connects with Mom full screen and her own camera
 * in the corner. With reduced motion it shows the call in progress.
 */
export default function VideoCallHomeDemo() {
  const [phase, setPhase] = React.useState<Phase>(0)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(2)
      setSeconds(42)
      return
    }
    const timers: number[] = []
    let clock = 0
    const run = () => {
      setPhase(0)
      setSeconds(0)
      let t = PICK_MS
      timers.push(window.setTimeout(() => setPhase(1), t))
      t += RING_MS
      timers.push(
        window.setTimeout(() => {
          setPhase(2)
          clock = window.setInterval(() => setSeconds((s) => s + 1), 400)
        }, t),
      )
      t += CALL_MS
      timers.push(
        window.setTimeout(() => {
          window.clearInterval(clock)
          setPhase(3)
        }, t),
      )
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => {
      timers.forEach(clearTimeout)
      window.clearInterval(clock)
    }
  }, [])

  const time = `00:${String(seconds).padStart(2, '0')}`
  const stepsDone = phase === 3 ? STEPS.length : phase + 1

  return (
    <div aria-hidden className="flex items-center gap-5 max-[639px]:flex-col">
      {/* Student's tablet */}
      <div className="w-[214px] shrink-0 rounded-[30px] bg-[#111] p-2 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6)]">
        <div className="relative h-[400px] overflow-hidden rounded-[23px] bg-[#F5F7FB] text-[#0F1729]">
          <div className="absolute inset-x-0 top-0 z-[5] mx-auto h-3.5 w-16 rounded-b-[10px] bg-[#111]" />

          {/* 1. Approved contacts */}
          {phase === 0 && (
            <div className="lp-fade absolute inset-0 px-3.5 pt-7">
              <div className="flex items-center gap-2">
                <OnesazMark size={18} />
                <span className="text-[13px] font-semibold">Call home</span>
              </div>
              <div className="mt-0.5 text-[10.5px] text-[#667085]">Approved by your parents</div>
              <div className="mt-3">
                {CONTACTS.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2.5 border-b border-[#E6E9EF] py-2.5">
                    {c.photo ? (
                      <img src={c.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                        style={{ background: c.color }}
                      >
                        {c.initials}
                      </span>
                    )}
                    <span className="flex-1 text-[12.5px] font-medium">{c.name}</span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#12B76A] text-white ${i === 0 ? 'lp-shake' : ''}`}
                    >
                      <Video size={14} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Ringing */}
          {phase === 1 && (
            <div className="lp-fade absolute inset-0 flex flex-col items-center bg-[linear-gradient(180deg,#141B33,#0B1022)] pt-16 text-white">
              <span className="relative h-24 w-24">
                <span className="lp-ring absolute inset-0 rounded-full border-2 border-[#3FBBEE]" />
                <span className="lp-ring absolute inset-0 rounded-full border-2 border-[#3FBBEE] [animation-delay:.6s]" />
                <img src={PARENT_IMG} alt="" className="relative h-24 w-24 rounded-full object-cover" />
              </span>
              <span className="mt-5 text-[16px] font-semibold">Mom</span>
              <span className="mt-1 text-[11px] text-white/70">Ringing…</span>
              <span className="absolute bottom-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#E24B4A]">
                <PhoneOff size={20} />
              </span>
            </div>
          )}

          {/* 3. On the call: Mom full screen, student in the corner */}
          {phase === 2 && (
            <div className="lp-fade absolute inset-0 text-white">
              <img src={PARENT_IMG} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
              <div className="absolute left-3 top-6">
                <div className="text-[13.5px] font-semibold">Mom</div>
                <div className="text-[10.5px] text-[#34D399]">● {time}</div>
              </div>
              <img
                src={STUDENT_IMG}
                alt=""
                className="absolute right-2.5 top-6 h-[96px] w-[70px] rounded-[12px] border-2 border-white/85 object-cover shadow-[0_6px_14px_-6px_rgba(0,0,0,.5)]"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 bg-gradient-to-t from-black/60 to-transparent pb-6 pt-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Mic size={16} />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Video size={16} />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E24B4A]">
                  <PhoneOff size={16} />
                </span>
              </div>
            </div>
          )}

          {/* 4. Ended */}
          {phase === 3 && (
            <div className="lp-fade absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(180deg,#141B33,#0B1022)] text-center text-white">
              <img src={PARENT_IMG} alt="" className="h-16 w-16 rounded-full object-cover" />
              <span className="mt-4 text-[14px] font-semibold">Call ended</span>
              <span className="mt-1 text-[11px] text-white/70">{time} · Mom</span>
            </div>
          )}
        </div>
      </div>

      {/* What the school sees */}
      <div className="flex w-full min-w-0 flex-col gap-3 text-[11.5px] text-[#0F1729]">
        <div className="rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <OnesazMark size={18} />
              ONESAZ Video Calling
            </span>
            <span className="text-[10.5px] text-[#667085]">Hostel · Ananya, 9A</span>
          </div>
          <div className="mt-2.5">
            {STEPS.map((s, i) => {
              const done = i < stepsDone
              return (
                <div key={s} className={`flex items-center gap-2 py-1 transition-colors ${done ? 'text-[#0F1729]' : 'text-[#98A2B3]'}`}>
                  <span
                    className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[9px] transition-colors ${
                      done ? 'border-[#12B76A] bg-[#12B76A] text-white' : 'border-[#CBD2DE] text-transparent'
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
        <div className="rounded-[14px] bg-white p-3.5 text-[#475467] shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          Students can only call contacts their parents have approved. Every call is timed and logged.
        </div>
      </div>
    </div>
  )
}
