import * as React from 'react'
import { Calculator, Lock, NotebookPen } from 'lucide-react'
import { OnesazMark } from './DemoWindow'

/** Sample data for the demo only. */
const SCHOOL = 'Greenfield School'
const EXISTING = [
  { device: '6A-11', student: 'Ishaan K.', battery: '74%' },
  { device: '6A-12', student: 'Meera P.', battery: '88%' },
]
const NEW_DEVICE = { device: '6A-13', student: 'Aanya S.', battery: '92%' }
const ENROLLED = 40
const STEPS = ['Connecting to the school network', 'Applying school policies', 'Installing ONESAZ apps']

/** Phases: 0 setup screen, 1 camera, 2 code found, 3–5 enrolment steps done, 6 ready. */
const PHASE_MS = [1000, 900, 500, 550, 550, 550, 400]
const HOLD_MS = 3400

/** A fixed, QR-looking pattern (three finder squares plus pseudo-random modules). */
function useQrModules() {
  return React.useMemo(() => {
    const cells: [number, number][] = []
    let seed = 7
    const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
    for (let y = 0; y < 21; y++)
      for (let x = 0; x < 21; x++) {
        const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)
        if (!inFinder && rand() > 0.52) cells.push([x, y])
      }
    return cells
  }, [])
}

function Qr({ className = '' }: { className?: string }) {
  const cells = useQrModules()
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#0F1729" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#0F1729" />
    </g>
  )
  return (
    <svg viewBox="0 0 21 21" shapeRendering="crispEdges" className={className}>
      <rect width="21" height="21" fill="#fff" />
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="#0F1729" />
      ))}
    </svg>
  )
}

/**
 * MDM demo: a new class tablet scans the QR code shown on the ONESAZ MDM dashboard, enrols
 * (network, policies, apps) and lands on a managed home screen, while its row appears in the dashboard.
 * With reduced motion it shows the finished state.
 */
export default function MdmEnrolDemo() {
  const [phase, setPhase] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(PHASE_MS.length)
      return
    }
    const timers: number[] = []
    const run = () => {
      setPhase(0)
      let t = 0
      PHASE_MS.forEach((ms, i) => {
        t += ms
        timers.push(window.setTimeout(() => setPhase(i + 1), t))
      })
      timers.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const screen = phase === 0 ? 'setup' : phase <= 2 ? 'camera' : phase < PHASE_MS.length ? 'enrol' : 'home'
  const found = phase >= 2
  const stepsDone = Math.max(0, Math.min(STEPS.length, phase - 3))
  const ready = screen === 'home'
  const pane = (on: boolean) => `absolute inset-0 transition-opacity duration-500 ${on ? 'opacity-100' : 'pointer-events-none opacity-0'}`

  return (
    <div aria-hidden className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-5 max-[639px]:grid-cols-1">
      {/* ONESAZ MDM dashboard */}
      <div className="overflow-hidden rounded-[14px] bg-white text-[11px] text-[#0F1729] shadow-[0_22px_40px_-24px_rgba(20,40,110,.45)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#F0F2F6] px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[12.5px] font-semibold">
            <OnesazMark size={20} />
            ONESAZ MDM
          </span>
          <span className="truncate text-[10.5px] text-[#667085]">Class 6A · {SCHOOL}</span>
        </div>

        <div className="flex items-center gap-3 border-b border-[#F0F2F6] px-3.5 py-3">
          <Qr className="h-16 w-16 shrink-0 rounded-md border border-[#E6E9EF] p-1" />
          <div>
            <div className="text-[12px] font-semibold">Add a tablet</div>
            <div className="mt-0.5 leading-[1.45] text-[#667085]">Scan this code from the tablet’s setup screen to enrol it.</div>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-[10px] text-[#667085]">
              <th className="px-3.5 py-2 font-medium">Tablet</th>
              <th className="px-2 py-2 font-medium">Status</th>
              <th className="px-3.5 py-2 text-right font-medium">Battery</th>
            </tr>
          </thead>
          <tbody>
            {ready && (
              <tr className="lp-fade border-t border-[#F3F4F7] bg-[#EEF8F3]">
                <td className="px-3.5 py-2">
                  <div className="font-semibold">{NEW_DEVICE.device}</div>
                  <div className="text-[10px] text-[#667085]">{NEW_DEVICE.student}</div>
                </td>
                <td className="px-2 py-2">
                  <span className="whitespace-nowrap rounded-full bg-[#EEF2FD] px-2 py-0.5 text-[10px] text-[#2447D1]">
                    ● Enrolled just now
                  </span>
                </td>
                <td className="px-3.5 py-2 text-right">{NEW_DEVICE.battery}</td>
              </tr>
            )}
            {EXISTING.map((d) => (
              <tr key={d.device} className="border-t border-[#F3F4F7]">
                <td className="px-3.5 py-2">
                  <div className="font-medium">{d.device}</div>
                  <div className="text-[10px] text-[#667085]">{d.student}</div>
                </td>
                <td className="px-2 py-2">
                  <span className="whitespace-nowrap rounded-full bg-[#E7F5EE] px-2 py-0.5 text-[10px] text-[#1F7A4F]">● Online</span>
                </td>
                <td className="px-3.5 py-2 text-right">{d.battery}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-[#F3F4F7] px-3.5 py-2 text-[10.5px]">
          {ready ? (
            <span className="text-[#1F7A4F]">{ENROLLED + 1} tablets enrolled · policies applied</span>
          ) : (
            <span className="text-[#667085]">{ENROLLED} tablets enrolled</span>
          )}
        </div>
      </div>

      {/* New tablet */}
      <div className="mx-auto w-full max-w-[230px] rounded-[18px] bg-[#16181D] p-2.5 shadow-[0_26px_44px_-22px_rgba(15,23,41,.6),inset_0_0_0_1px_#2B2F38]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-[#F7F9FC] text-[#0F1729]">
          {/* 1. Setup */}
          <div className={`${pane(screen === 'setup')} flex flex-col items-center justify-center px-4 text-center`}>
            <div className="text-[22px] font-semibold">Welcome</div>
            <div className="mt-1 text-[11px] text-[#667085]">Let’s set up this tablet</div>
            <div className="mt-5 rounded-lg bg-[#2447D1] px-3.5 py-2 text-[11px] font-medium text-white">Scan QR code</div>
          </div>

          {/* 2. Camera */}
          <div className={`${pane(screen === 'camera')} flex items-center justify-center bg-[#1B1F27]`}>
            <div className="absolute inset-x-0 top-3 text-center text-[10.5px] text-white">
              {found ? 'QR code found ✓' : 'Point the camera at the QR code'}
            </div>
            <div className="relative w-[62%]">
              <Qr className="block w-full rounded-sm opacity-90" />
              {[
                '-left-1.5 -top-1.5 border-b-0 border-r-0',
                '-right-1.5 -top-1.5 border-b-0 border-l-0',
                '-bottom-1.5 -left-1.5 border-r-0 border-t-0',
                '-bottom-1.5 -right-1.5 border-l-0 border-t-0',
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute h-[18px] w-[18px] border-[3px] transition-colors duration-300 ${pos} ${found ? 'border-[#34D399]' : 'border-white'}`}
                />
              ))}
              {!found && <span className="lp-scan absolute inset-x-[6%] h-0.5 bg-[#3FBBEE] shadow-[0_0_10px_#3FBBEE]" />}
            </div>
          </div>

          {/* 3. Enrolment */}
          <div className={`${pane(screen === 'enrol')} flex flex-col items-center justify-center px-4 text-center`}>
            <OnesazMark size={40} />
            <div className="mt-2.5 text-[12.5px] font-semibold">Enrolling in ONESAZ MDM</div>
            <div className="text-[10px] text-[#667085]">{SCHOOL} · Class 6A</div>
            <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-[#EEF1F7]">
              <div
                className="h-full rounded-full bg-[#2447D1] transition-[width] duration-300"
                style={{ width: `${(stepsDone / STEPS.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 w-full text-left">
              {STEPS.map((s, i) => {
                const ok = i < stepsDone
                return (
                  <div
                    key={s}
                    className={`flex items-center gap-2 py-1 text-[10px] transition-colors ${ok ? 'text-[#0F1729]' : 'text-[#98A2B3]'}`}
                  >
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[8px] transition-colors ${
                        ok ? 'border-[#12B76A] bg-[#12B76A] text-white' : 'border-[#CBD2DE] text-transparent'
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

          {/* 4. Managed home screen */}
          <div
            className={`${pane(screen === 'home')} px-3.5 pt-7`}
            style={{ background: 'radial-gradient(120% 90% at 20% 0%, #7C9CF5, #4B5FC8 45%, #2A2F6E)' }}
          >
            <div className="grid grid-cols-3 gap-x-2 gap-y-3.5">
              {[
                { label: 'ONESAZ', icon: <OnesazMark size={26} />, bg: '#fff' },
                { label: 'Calculator', icon: <Calculator size={18} strokeWidth={2} color="#fff" />, bg: '#0E9384' },
                { label: 'Notes', icon: <NotebookPen size={18} strokeWidth={2} color="#fff" />, bg: '#DC6803' },
              ].map((a) => (
                <span key={a.label} className="flex flex-col items-center gap-1 text-[9px] text-white">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] shadow-[0_3px_8px_-3px_rgba(0,0,0,.4)]"
                    style={{ background: a.bg }}
                  >
                    {a.icon}
                  </span>
                  {a.label}
                </span>
              ))}
            </div>
            <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 rounded-[10px] bg-white/20 px-2.5 py-1.5 text-[9.5px] text-white backdrop-blur">
              <Lock size={11} strokeWidth={2.2} />
              Managed by {SCHOOL}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
