import * as React from 'react'
import { Check } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Enquiries arriving on the school's WhatsApp, newest last (sample data). */
const CHATS = [
  {
    name: 'Mrs. Iyer',
    initials: 'SI',
    color: '#7A5AF8',
    text: 'Are admissions open for Class 2?',
    status: 'Prospectus sent',
    time: '9:41',
  },
  { name: 'Mr. Khan', initials: 'AK', color: '#0A94A8', text: 'Do you have a school bus to Kondapur?', status: 'Answered', time: '9:44' },
  { name: 'Mrs. Rao', initials: 'KR', color: '#E8590C', text: 'Sat, 10:00 AM', status: 'Visit booked', time: '9:47' },
  { name: 'Mr. Das', initials: 'PD', color: '#2447D1', text: 'What are the fees for Class 9?', status: 'Fee details sent', time: '9:52' },
  { name: 'Mrs. Nair', initials: 'LN', color: '#C2255C', text: 'Can we visit this week?', status: 'Visit booked', time: '9:58' },
  { name: 'Mr. Joshi', initials: 'RJ', color: '#12805C', text: 'Fee paid. Thank you!', status: 'Admitted', time: '10:03' },
]
const VISIBLE_ROWS = 5

/** Funnel stages for this month (sample data). Counts climb as enquiries arrive. */
const STAGES = [
  { label: 'Enquiries', value: 248, width: 100, color: '#08C5A7' },
  { label: 'Contacted', value: 212, width: 84, color: '#0A94A8' },
  { label: 'Campus visits', value: 96, width: 62, color: '#1E86C0' },
  { label: 'Admitted', value: 61, width: 44, color: '#12B76A' },
]
/** Where the counts start before this round of enquiries comes in. */
const START = [230, 196, 88, 55]

const NEXT_MS = 1100
const HOLD_MS = 3600

/**
 * CRM product page demo: enquiries arrive on the school's WhatsApp and each one is answered
 * automatically. Every new enquiry drops into the admissions funnel beside the phone, and the counts
 * for enquiries, contacts, visits and admissions climb. With reduced motion it shows the finished state.
 */
export default function CrmFunnelDemo() {
  const [arrived, setArrived] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setArrived(CHATS.length)
      return
    }
    const timers: number[] = []
    const run = () => {
      setArrived(0)
      CHATS.forEach((_, i) => timers.push(window.setTimeout(() => setArrived(i + 1), 700 + NEXT_MS * i)))
      timers.push(window.setTimeout(run, 700 + NEXT_MS * CHATS.length + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const progress = arrived / CHATS.length
  const done = arrived === CHATS.length
  const rows = CHATS.slice(0, arrived).reverse().slice(0, VISIBLE_ROWS)
  const conversion = Math.round((STAGES[3].value / STAGES[0].value) * 100)

  return (
    <div aria-hidden className="flex items-center gap-5 max-[639px]:flex-col">
      {/* School's WhatsApp inbox */}
      <div className="w-[236px] max-w-full shrink-0 rounded-[32px] bg-[#111] p-2 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6)]">
        <div className="relative h-[430px] overflow-hidden rounded-[25px] bg-white text-[#111B21]">
          <div className="flex items-center gap-2 bg-[#075E54] px-2.5 pb-2 pt-5 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
              <OnesazMark size={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-semibold">Greenfield School</span>
              <span className="block text-[10px] text-white/75">Admissions inbox</span>
            </span>
            <span className="ml-auto rounded-full bg-[#25D366] px-1.5 py-px text-[10px] font-semibold text-[#063D2E]">{arrived}</span>
          </div>

          <div className="px-2.5">
            {rows.map((c) => (
              <div key={c.name} className="lp-fade flex gap-2 border-b border-[#EEF0F2] py-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
                  style={{ background: c.color }}
                >
                  {c.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-1">
                    <span className="text-[11.5px] font-semibold">{c.name}</span>
                    <span className="text-[9.5px] text-[#667781]">{c.time}</span>
                  </span>
                  <span className="block truncate text-[10.5px] text-[#667781]">{c.text}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-[#12805C]">
                    <Check size={11} strokeWidth={3} />
                    {c.status}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-[#F0F2F5] px-3 py-2 text-center text-[10px] text-[#667781]">
            Every enquiry answered automatically
          </div>
        </div>
      </div>

      {/* Admissions funnel */}
      <div className="w-full min-w-0 rounded-[14px] bg-white p-3.5 text-[11.5px] text-[#0F1729] shadow-[0_14px_28px_-20px_rgba(20,40,110,.4)]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 whitespace-nowrap font-semibold">
            <OnesazMark size={18} />
            Admissions funnel
          </span>
          <span className="flex items-center gap-1 text-[10.5px] text-[#667085]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
            Live
          </span>
        </div>

        <div className="relative mt-3">
          {/* The latest enquiry dropping in from the top */}
          {arrived > 0 && !done && (
            <span
              key={arrived}
              className="lp-drop absolute left-[calc(50%+46px)] top-0 z-[1] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]"
              style={{ '--drop': '150px' } as React.CSSProperties}
            />
          )}
          {STAGES.map((s, i) => {
            const value = done ? s.value : Math.round(START[i] + (s.value - START[i]) * progress)
            return (
              <div key={s.label} className="grid grid-cols-[84px_1fr] items-center gap-2 py-1">
                <span className="text-[#475467]">{s.label}</span>
                <span className="flex justify-center">
                  <span
                    className="flex h-8 items-center justify-center rounded-[8px] text-[12.5px] font-semibold tabular-nums text-white"
                    style={{ width: `${s.width}%`, background: s.color }}
                  >
                    {value}
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#EEF0F2] pt-3">
          <div>
            <div className="text-[10.5px] text-[#667085]">Conversion</div>
            <div className="text-[17px] font-semibold">{conversion}%</div>
          </div>
          <div>
            <div className="text-[10.5px] text-[#667085]">First reply</div>
            <div className="whitespace-nowrap text-[17px] font-semibold">&lt; 1 min</div>
          </div>
        </div>
      </div>
    </div>
  )
}
