import * as React from 'react'
import { BookOpen, ClipboardCheck, FileText, PlayCircle, type LucideIcon } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Today's plan for the student (sample data). */
const TASKS: { icon: LucideIcon; color: string; title: string; meta: string }[] = [
  { icon: PlayCircle, color: '#2447D1', title: 'Fractions basics', meta: 'Video · 8 min' },
  { icon: FileText, color: '#0E7490', title: 'Chapter 4 notes', meta: 'Notes · 3 pages' },
  { icon: ClipboardCheck, color: '#6A4BD8', title: 'Equal fractions', meta: 'Quiz · 5 questions' },
  { icon: BookOpen, color: '#B7791F', title: 'Worksheet 2', meta: 'Homework · due Fri' },
]
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const STREAK_START = 4

const START_MS = 900
const STEP_MS = 750
const HOLD_MS = 3200

/**
 * LMS product page demo: the student app on a phone. Today's tasks tick off one by one, then the
 * learning streak grows by a day. With reduced motion it shows the finished day.
 */
export default function LmsStudentPhoneDemo() {
  const [done, setDone] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(TASKS.length)
      return
    }
    const timers: number[] = []
    const run = () => {
      setDone(0)
      TASKS.forEach((_, i) => timers.push(window.setTimeout(() => setDone(i + 1), START_MS + STEP_MS * i)))
      timers.push(window.setTimeout(run, START_MS + STEP_MS * TASKS.length + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const allDone = done === TASKS.length
  const streak = STREAK_START + (allDone ? 1 : 0)

  return (
    <div aria-hidden className="flex justify-center py-2">
      <div className="w-[248px] rounded-[34px] bg-[#111] p-2 shadow-[0_28px_50px_-24px_rgba(15,23,41,.55)] max-[379px]:w-[224px]">
        <div className="relative h-[512px] overflow-hidden rounded-[27px] bg-[#F5F7FB] max-[379px]:h-[512px]">
          <div className="mx-auto h-3.5 w-16 rounded-b-[10px] bg-[#111]" />

          {/* App header */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-2">
              <OnesazMark size={20} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-[#0F1729]">Good morning, Aanya</div>
                <div className="text-[10.5px] text-[#667085]">Class 6A · Thursday</div>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="mx-3 mt-3 rounded-[16px] bg-[linear-gradient(135deg,#2447D1,#6A4BD8)] px-3.5 py-3 text-white">
            <div className="text-[10.5px] text-white/80">Learning streak</div>
            <div className="mt-0.5 text-[20px] font-semibold leading-none">
              {streak} days <span className="text-[16px]">🔥</span>
            </div>
            <div className="mt-2.5 flex justify-between">
              {WEEK.map((d, i) => (
                <span
                  key={i}
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9.5px] font-semibold transition-colors duration-300 ${
                    i < streak ? 'bg-[#FFC93C] text-[#1A1519]' : 'bg-white/20 text-white/80'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Today's plan */}
          <div className="mx-4 mt-4 flex items-baseline justify-between">
            <span className="text-[13px] font-semibold text-[#0F1729]">Today’s plan</span>
            <span className="text-[10.5px] text-[#667085]">
              {done} of {TASKS.length} done
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-2 px-3">
            {TASKS.map((t, i) => {
              const ok = i < done
              const Icon = t.icon
              return (
                <div
                  key={t.title}
                  className={`flex items-center gap-2.5 rounded-[12px] bg-white px-2.5 py-2 shadow-[0_4px_12px_-8px_rgba(0,0,0,.25)] transition-opacity duration-500 ${ok ? 'opacity-60' : ''}`}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-white"
                    style={{ background: t.color }}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className={`truncate text-[11.5px] font-medium text-[#0F1729] ${ok ? 'line-through decoration-[#98A2B3]' : ''}`}>
                      {t.title}
                    </span>
                    <span className="whitespace-nowrap text-[10px] text-[#667085]">{t.meta}</span>
                  </span>
                  <span
                    className={`ml-auto flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[10px] transition-colors duration-300 ${
                      ok ? 'border-[#1F9D63] bg-[#1F9D63] text-white' : 'border-[#CBD2DE] text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </div>
              )
            })}
          </div>

          {/* Day complete (sits below the tasks, so it never covers them) */}
          <div
            className={`mx-3 mt-3 rounded-[12px] bg-[#0F1729] px-3 py-2.5 text-center text-[11.5px] text-white transition-all duration-500 ${
              allDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            All done for today 🎉 {STREAK_START + 1}-day streak!
          </div>
        </div>
      </div>
    </div>
  )
}
