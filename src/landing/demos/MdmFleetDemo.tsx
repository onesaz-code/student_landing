import * as React from 'react'
import { BookOpen, Calculator, Camera, Compass, Lock, LockOpen, NotebookPen, Settings, type LucideIcon } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Sample data for the demo only. */
const SCHOOL = 'Greenfield School'
const DEVICES = [
  { id: '6A-01', student: 'Aanya S.', status: 'Online', dot: '#12B76A' },
  { id: '6A-02', student: 'Arjun N.', status: 'Online', dot: '#12B76A' },
  { id: '6A-03', student: 'Diya R.', status: 'Online', dot: '#12B76A' },
  { id: '6A-04', student: 'Kabir M.', status: 'Offline · 2h', dot: '#98A2B3' },
]
const SELECTED = 2

type App = { label: string; icon?: LucideIcon; bg: string; approved: boolean }
const APPS: App[] = [
  { label: 'ONESAZ', bg: '#fff', approved: true },
  { label: 'Calculator', icon: Calculator, bg: '#0E9384', approved: true },
  { label: 'Notes', icon: NotebookPen, bg: '#DC6803', approved: true },
  { label: 'Library', icon: BookOpen, bg: '#2447D1', approved: true },
  { label: 'Browser', icon: Compass, bg: '#475467', approved: false },
  { label: 'Camera', icon: Camera, bg: '#344054', approved: false },
  { label: 'Settings', icon: Settings, bg: '#667085', approved: false },
]

/** What the admin does, in order, and what the tablet shows after each step. */
type Mode = 'kiosk' | 'open' | 'locked'
const SCRIPT: { action: string; mode: Mode; log: string; ms: number }[] = [
  { action: 'select', mode: 'kiosk', log: 'Viewing 6A-03 · Kiosk mode is on', ms: 1100 },
  { action: 'Exit kiosk', mode: 'open', log: 'Kiosk mode turned off · all apps available', ms: 1700 },
  { action: 'Kiosk mode', mode: 'kiosk', log: 'Kiosk mode applied · approved apps only', ms: 1700 },
  { action: 'Lock device', mode: 'locked', log: 'Device locked · message shown on screen', ms: 1900 },
]
const HOLD_MS = 2600
const BUTTONS: { label: string; icon: LucideIcon }[] = [
  { label: 'Kiosk mode', icon: Lock },
  { label: 'Exit kiosk', icon: LockOpen },
  { label: 'Lock device', icon: Lock },
]

/**
 * MDM product page demo: one dashboard for every class tablet. The admin selects a tablet and applies
 * policies (exit kiosk, kiosk mode, lock) and the live tablet beside it changes straight away.
 * With reduced motion it shows the kiosk-mode state.
 */
export default function MdmFleetDemo() {
  const [step, setStep] = React.useState(-1)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(0)
      return
    }
    const timers: number[] = []
    const run = () => {
      setStep(-1)
      let t = 600
      SCRIPT.forEach((s, i) => {
        timers.push(window.setTimeout(() => setStep(i), t))
        t += s.ms
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const current = step >= 0 ? SCRIPT[step] : null
  const mode: Mode = current?.mode ?? 'kiosk'
  const pressed = current && current.action !== 'select' ? current.action : null
  const visibleApps = APPS.filter((a) => mode === 'open' || a.approved)

  return (
    <div aria-hidden className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-5 max-[639px]:grid-cols-1">
      {/* Dashboard */}
      <div className="overflow-hidden rounded-[14px] bg-white text-[11px] text-[#0F1729] shadow-[0_22px_40px_-24px_rgba(20,40,110,.45)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#F0F2F6] px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[12.5px] font-semibold">
            <OnesazMark size={20} />
            ONESAZ MDM
          </span>
          <span className="text-[10.5px] text-[#667085]">Class 6A · 40 tablets</span>
        </div>

        {DEVICES.map((d, i) => {
          const sel = i === SELECTED && step >= 0
          return (
            <div
              key={d.id}
              className={`flex items-center justify-between gap-2 border-b border-[#F3F4F7] px-3.5 py-2 transition-colors duration-300 ${sel ? 'bg-[#EEF2FD]' : ''}`}
            >
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-5 rounded-[3px] bg-[#1E2430]" />
                <span>
                  <span className="font-semibold">{d.id}</span> <span className="text-[#667085]">· {d.student}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-[#667085]">
                <span className="h-2 w-2 rounded-full" style={{ background: d.dot }} />
                {d.status}
              </span>
            </div>
          )
        })}

        <div className="px-3.5 pb-3 pt-2.5">
          <div className="mb-2 text-[10.5px] text-[#667085]">Policies for 6A-03</div>
          <div className="flex flex-wrap gap-1.5">
            {BUTTONS.map((b) => {
              const on = pressed === b.label
              const Icon = b.icon
              return (
                <span
                  key={b.label}
                  className={`inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1.5 text-[10.5px] font-medium transition-all duration-200 ${
                    on ? 'scale-95 border-[#2447D1] bg-[#2447D1] text-white' : 'border-[#D0D5DD] bg-white text-[#344054]'
                  }`}
                >
                  <Icon size={12} strokeWidth={2.2} />
                  {b.label}
                </span>
              )
            })}
          </div>
          <div className="mt-2.5 min-h-[16px] text-[10.5px]">
            {current && <span className="lp-fade text-[#1F7A4F]">✓ {current.log}</span>}
          </div>
        </div>
      </div>

      {/* Live tablet */}
      <div className="mx-auto w-full max-w-[300px]">
        <div className="mb-2 text-center text-[10.5px] text-[#667085]">Live screen · 6A-03 · Diya R.</div>
        <div className="rounded-[18px] bg-[#16181D] p-2.5 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6),inset_0_0_0_1px_#2B2F38]">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-[10px]"
            style={{ background: 'radial-gradient(120% 90% at 20% 0%, #7C9CF5, #4B5FC8 45%, #2A2F6E)' }}
          >
            <div className="absolute inset-x-2.5 top-1.5 flex justify-between text-[8.5px] text-white/90">
              <span>9:41</span>
              <span>86%</span>
            </div>

            {/* Home screen apps */}
            <div className="absolute inset-x-3 top-6 grid grid-cols-4 gap-x-2 gap-y-2.5">
              {visibleApps.map((a) => {
                const Icon = a.icon
                return (
                  <span key={a.label} className="lp-fade flex flex-col items-center gap-1 text-[8px] text-white">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-[10px] shadow-[0_3px_8px_-3px_rgba(0,0,0,.4)]"
                      style={{ background: a.bg }}
                    >
                      {Icon ? <Icon size={15} strokeWidth={2} color="#fff" /> : <OnesazMark size={22} />}
                    </span>
                    {a.label}
                  </span>
                )
              })}
            </div>

            {/* Mode badge */}
            <div className="absolute inset-x-2.5 bottom-2 flex items-center gap-1.5 rounded-[9px] bg-white/20 px-2.5 py-1.5 text-[9px] text-white backdrop-blur">
              {mode === 'open' ? <LockOpen size={11} strokeWidth={2.2} /> : <Lock size={11} strokeWidth={2.2} />}
              {mode === 'open' ? 'Kiosk mode off · all apps' : `Kiosk mode · managed by ${SCHOOL}`}
            </div>

            {/* Lock screen */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-[#0F1729]/95 px-4 text-center text-white transition-opacity duration-500 ${
                mode === 'locked' ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Lock size={18} strokeWidth={2} />
              </span>
              <span className="mt-2 text-[12px] font-semibold">Locked by {SCHOOL}</span>
              <span className="mt-1 text-[9.5px] text-white/70">Please return this tablet to the school office.</span>
              <span className="mt-3 flex items-center gap-1.5 text-[9px] text-white/60">
                <OnesazMark size={12} />
                ONESAZ MDM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
