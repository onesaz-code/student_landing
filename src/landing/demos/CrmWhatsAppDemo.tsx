import * as React from 'react'
import { CheckCheck, Mic } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Sample enquiry for the demo only. */
const SCHOOL = 'Greenfield School'
const SLOTS = ['Sat, 10:00 AM', 'Sat, 12:00 PM', 'Mon, 3:00 PM']
const PICKED = 0

/** Beats: which chat item appears at each step. 'typing' shows the school typing before a reply. */
const BEATS = ['ask', 'typing', 'prospectus', 'slots', 'pick', 'typing', 'booked'] as const
type Beat = (typeof BEATS)[number]
const BEAT_MS = [1300, 900, 1500, 1500, 1200, 900, 1000]
const HOLD_MS = 3400

/** CRM record steps and the beat at which each is ticked. */
const STEPS = [
  { text: 'Enquiry received on WhatsApp', at: 0 },
  { text: 'Prospectus and fees sent', at: 2 },
  { text: 'Campus visit booked · Sat, 10 AM', at: 6 },
  { text: 'Admission confirmed', at: Infinity },
]
const TAGS = [
  { text: 'Counsellor: Priya', bg: '#EEF2FD', fg: '#2447D1' },
  { text: 'Reminder: Fri, 6 PM', bg: '#FDF3E2', fg: '#9A6200' },
  { text: 'Source: WhatsApp', bg: '#E7F5EE', fg: '#1F7A4F' },
]

/**
 * CRM tour demo: a parent asks about admissions on WhatsApp. The school's ONESAZ assistant replies with
 * the prospectus, offers visit slots and books the one the parent picks, while the enquiry record beside
 * the phone updates step by step. With reduced motion it shows the finished conversation.
 */
export default function CrmWhatsAppDemo() {
  const [beat, setBeat] = React.useState(-1)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(BEATS.length - 1)
      return
    }
    const timers: number[] = []
    const run = () => {
      setBeat(-1)
      let t = 600
      BEAT_MS.forEach((ms, i) => {
        timers.push(window.setTimeout(() => setBeat(i), t))
        t += ms
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const seen = (b: Beat) => BEATS.slice(0, beat + 1).includes(b)
  const typing = beat >= 0 && BEATS[beat] === 'typing'
  const done = beat === BEATS.length - 1
  const time = (m: number) => `10:0${m}`

  return (
    <div aria-hidden className="flex items-center gap-5 max-[639px]:flex-col">
      {/* Parent's phone */}
      <div className="w-[236px] max-w-full shrink-0 rounded-[32px] bg-[#111] p-2 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6)]">
        <div className="relative h-[460px] overflow-hidden rounded-[25px] bg-[#EFE7DD] text-[11px] leading-[1.42] text-[#111B21]">
          {/* Chat header */}
          <div className="flex items-center gap-2 bg-[#075E54] px-2.5 pb-2 pt-5 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
              <OnesazMark size={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-semibold">{SCHOOL}</span>
              <span className="block text-[10px] text-white/75">Admissions · Business account</span>
            </span>
          </div>

          {/* Messages sit above the input bar; older ones scroll up out of view */}
          <div className="absolute inset-x-2 bottom-[48px] top-[62px] flex flex-col justify-end gap-1.5 overflow-hidden">
            {seen('ask') && (
              <Bubble out time={time(2)}>
                Hi, are admissions open for Class 5?
              </Bubble>
            )}
            {seen('prospectus') && (
              <Bubble time={time(2)}>
                Yes, admissions for 2026–27 are open. Here’s our prospectus with the fee details.
                <span className="mt-1.5 flex items-center gap-2 rounded-[6px] bg-[#F5F6F6] p-1.5">
                  <span className="flex h-7 w-6 shrink-0 items-center justify-center rounded-[3px] bg-[#E24B4A] text-[7.5px] font-bold text-white">
                    PDF
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold">Prospectus 2026–27</span>
                    <span className="block text-[9.5px] text-[#667781]">4 pages · 1.2 MB</span>
                  </span>
                </span>
              </Bubble>
            )}
            {seen('slots') && (
              <Bubble time={time(3)}>
                Would you like to visit the campus? Choose a time:
                <span className="-mx-2 mt-1.5 block border-t border-[#E9EDEF]">
                  {SLOTS.map((s, i) => (
                    <span
                      key={s}
                      className={`block py-1 text-center font-medium text-[#027EB5] transition-colors ${
                        i > 0 ? 'border-t border-[#E9EDEF]' : ''
                      } ${i === PICKED && beat === BEATS.indexOf('slots') + 1 ? 'bg-[#E7F4FB]' : ''}`}
                    >
                      {s}
                    </span>
                  ))}
                </span>
              </Bubble>
            )}
            {seen('pick') && (
              <Bubble out time={time(3)}>
                {SLOTS[PICKED]}
              </Bubble>
            )}
            {seen('booked') && (
              <Bubble time={time(3)}>✅ Your visit is booked for Saturday at 10:00 AM. We’ll send you a reminder the day before.</Bubble>
            )}
            {typing && (
              <div className="flex gap-1 self-start rounded-[9px] rounded-tl-[2px] bg-white px-3 py-2.5 shadow-[0_1px_.5px_rgba(0,0,0,.13)]">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="lp-typing h-1.5 w-1.5 rounded-full bg-[#8696A0]" style={{ animationDelay: `${d * 150}ms` }} />
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5">
            <span className="flex-1 rounded-full bg-white px-3 py-2 text-[11px] text-[#8696A0]">Message</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00A884] text-white">
              <Mic size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* The enquiry record in ONESAZ CRM */}
      <div className="flex w-full min-w-0 flex-col gap-3 text-[11.5px] text-[#0F1729]">
        <div className="rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <OnesazMark size={18} />
              ONESAZ CRM
            </span>
          </div>
          <div className="mt-2.5 font-semibold">Mrs. Kavya Rao</div>
          <div className="text-[10.5px] text-[#667085]">Parent of Ishaan · Class 5 · New enquiry</div>
          <div className="mt-2">
            {STEPS.map((s) => {
              const ticked = beat >= s.at
              return (
                <div
                  key={s.text}
                  className={`flex items-center gap-2 py-1 transition-colors ${ticked ? 'text-[#0F1729]' : 'text-[#98A2B3]'}`}
                >
                  <span
                    className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[9px] transition-colors ${
                      ticked ? 'border-[#12B76A] bg-[#12B76A] text-white' : 'border-[#CBD2DE] text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  {s.text}
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`rounded-[14px] bg-white p-3.5 shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)] transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-50'}`}
        >
          <div className="font-semibold">Next steps, set automatically</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TAGS.map((tag, i) => (
              <span
                key={tag.text}
                className={`rounded-full px-2.5 py-1 text-[10.5px] transition-all duration-300 ${done ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                style={{ background: tag.bg, color: tag.fg, transitionDelay: done ? `${i * 200}ms` : '0ms' }}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** One WhatsApp message: green on the right from the parent, white on the left from the school. */
function Bubble({ out, time, children }: { out?: boolean; time: string; children: React.ReactNode }) {
  return (
    <div
      className={`lp-fade max-w-[86%] rounded-[9px] px-2 pb-1 pt-1.5 shadow-[0_1px_.5px_rgba(0,0,0,.13)] ${
        out ? 'self-end rounded-tr-[2px] bg-[#D9FDD3]' : 'self-start rounded-tl-[2px] bg-white'
      }`}
    >
      {children}
      <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[9px] text-[#667781]">
        {time}
        {out && <CheckCheck size={12} className="text-[#53BDEB]" />}
      </span>
    </div>
  )
}
