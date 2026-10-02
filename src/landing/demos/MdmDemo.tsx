import type { ReactNode } from 'react'
import { DemoWindow, OnesazMark } from './DemoWindow'
import './mdm.css'

const ACCENT = '#B7791F'

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
      aria-hidden
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

const CheckIco = ({ size }: { size: number }) => (
  <Ico size={size}>
    <path d="m5 12 5 5 9-10" />
  </Ico>
)

const LockIco = ({ size }: { size: number }) => (
  <Ico size={size}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Ico>
)

const TabletIco = ({ size }: { size: number }) => (
  <Ico size={size}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M11 18h2" />
  </Ico>
)

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

const pill =
  'inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[.04em]'

/** Status pills cross-fade through the loop (stacked in one grid cell). */
const STATUSES = [
  {
    cls: 'mdm-s0',
    label: 'Installing Acadhub app',
    bg: '#FBF3E4',
    fg: ACCENT,
    live: true,
  },
  { cls: 'mdm-s1', label: '8/8 ready', bg: '#E7F5EE', fg: '#1F7A4F' },
  { cls: 'mdm-s2', label: 'Kiosk on', bg: '#EEF2FD', fg: '#2447D1' },
  { cls: 'mdm-s3', label: '8B-06 locked', bg: '#F3F4F7', fg: '#0F1729' },
]

/** Apps that kiosk mode hides; only ONESAZ and Acadhub remain. */
const BLOCKED_APPS = [
  { label: 'YouTube', glyph: '▶', bg: '#E5484D' },
  { label: 'Games', glyph: '◆', bg: '#8B5CF6' },
  { label: 'Browser', glyph: '◎', bg: '#64748B' },
  { label: 'Social', glyph: '♥', bg: '#DB2777' },
]

const TABLETS = Array.from({ length: 8 }, (_, i) => `8B-0${i + 1}`)
const LOST_INDEX = 5 // 8B-06 goes missing, then gets locked remotely

const statusText = 'inline-flex items-center gap-[3px] whitespace-nowrap text-[9px] font-semibold [grid-area:1/1]'

export default function MdmDemo() {
  return (
    <div className="mdm-root">
      <DemoWindow title="ONESAZ MDM" meta="IT view" bodyClassName="flex flex-col gap-4">
        <p className="sr-only">
          Animated example: IT installs the Acadhub app on all eight Class 8B tablets, turns on kiosk mode so the student tablet shows only
          the ONESAZ and Acadhub apps, and remotely locks a missing tablet.
        </p>
        <div aria-hidden className="mdm-grid grid grid-cols-[minmax(0,1fr)_190px] items-center gap-4">
          {/* Left: fleet + controls */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-2.5">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                  <Step n={1} />
                  Class 8B tablets
                </span>
                <span className="inline-grid shrink-0 justify-items-start">
                  {STATUSES.map((s) => (
                    <span key={s.cls} className={`${s.cls} [grid-area:1/1]`}>
                      <span className={pill} style={{ background: s.bg, color: s.fg }}>
                        {s.live && <span className="mdm-livedot h-1.5 w-1.5 rounded-[3px]" style={{ background: ACCENT }} />}
                        {s.label}
                      </span>
                    </span>
                  ))}
                </span>
              </span>

              <div className="mdm-tiles grid grid-cols-4 gap-[7px]">
                {TABLETS.map((id, i) => (
                  <div
                    key={id}
                    className={`${i === LOST_INDEX ? 'mdm-tile6 ' : ''}flex min-w-0 flex-col gap-1.5 rounded-[10px] border border-[#EDF0F5] bg-white px-[9px] py-2`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-[#A0A9BA]">
                        <TabletIco size={13} />
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#0F1729]">{id}</span>
                    </span>
                    <span className="grid h-3.5 items-center">
                      <span className={`mdm-bar${i} block h-1 overflow-hidden rounded-sm bg-[#EEF0F3] [grid-area:1/1]`}>
                        <span className={`mdm-pb${i} block h-1 origin-left`} style={{ background: ACCENT }} />
                      </span>
                      <span className={`mdm-ok${i} ${statusText} text-[#1F7A4F]`}>
                        <CheckIco size={10} />
                        Ready
                      </span>
                      {i === LOST_INDEX && (
                        <>
                          <span className={`mdm-lost ${statusText} text-[#B45309]`}>Missing</span>
                          <span className={`mdm-lk ${statusText} text-[#0F1729]`}>
                            <LockIco size={10} />
                            Locked
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
              <div className="flex flex-col gap-0.5 rounded-xl border border-[#EDF0F5] bg-white px-3.5 py-2.5">
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                    <Step n={2} />
                    <span className="whitespace-nowrap">Kiosk mode</span>
                  </span>
                  <span className="mdm-track relative h-5 w-9 shrink-0 rounded-[10px] bg-[#D5DAE3]">
                    <span className="mdm-knob absolute left-0.5 top-0.5 h-4 w-4 rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,.2)]" />
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#EDF0F5] bg-white px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
                  <Step n={3} />
                  Remote
                </span>
                <span className="flex max-w-[220px] flex-[1_1_170px] gap-1.5">
                  {['Lock', 'Ring', 'Message'].map((label, i) => (
                    <span
                      key={label}
                      className={`${i === 0 ? 'mdm-btn ' : ''}flex h-[30px] flex-[1_1_0] items-center justify-center rounded-lg bg-[#F5F7FB] text-[11.5px] font-semibold text-[#0F1729]`}
                    >
                      {label}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Right: the student's tablet */}
          <div className="mdm-tab flex min-w-0 flex-col items-center gap-2">
            <div className="w-full max-w-[200px] rounded-[18px] bg-[#151A26] p-[9px] shadow-[0_18px_30px_-18px_rgba(20,24,40,.7)]">
              <div
                className="relative box-border min-h-[250px] rounded-[10px] px-2.5 pb-9 pt-2.5"
                style={{
                  background: 'linear-gradient(160deg, #2B3552 0%, #1B2238 100%)',
                }}
              >
                <span className="mb-3.5 flex justify-between text-[8.5px] text-[#A9B2C3]">
                  <span className="font-[family-name:var(--font-mono)]">8B-06</span>
                  <span>10:24</span>
                </span>

                {/* Approved apps: ONESAZ + Acadhub */}
                <span className="mb-[18px] mt-1.5 flex justify-center gap-[22px]">
                  <span className="flex flex-col items-center gap-1">
                    <span className="flex rounded-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,.5)]">
                      <OnesazMark size={30} />
                    </span>
                    <span className="text-[9px] font-semibold text-white">ONESAZ</span>
                  </span>
                  <span className="mdm-new flex flex-col items-center gap-1">
                    <span className="flex rounded-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,.5)]">
                      <span
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-[15px] font-extrabold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #F59E0B, #EA580C)',
                        }}
                      >
                        A
                      </span>
                    </span>
                    <span className="text-[9px] font-semibold text-white">Acadhub</span>
                  </span>
                </span>

                {/* Other apps fade out once kiosk mode is on */}
                <span className="grid grid-cols-4 gap-1">
                  {BLOCKED_APPS.map((app, i) => (
                    <span key={app.label} className={`mdm-x${i} flex flex-col items-center gap-[3px]`}>
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-[7px] text-[11px] font-bold text-white"
                        style={{ background: app.bg }}
                      >
                        {app.glyph}
                      </span>
                      <span className="text-[7.5px] text-[#C9D0DC]">{app.label}</span>
                    </span>
                  ))}
                </span>

                <span className="mdm-ban absolute bottom-2 left-2 right-2 flex items-center justify-center gap-[5px] rounded-md bg-[rgba(36,71,209,.9)] px-1.5 py-[5px] text-center text-[9px] font-semibold text-white">
                  <LockIco size={10} />
                  Kiosk mode · approved apps only
                </span>

                <span className="mdm-lock absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[10px] bg-[rgba(10,14,28,.94)] p-3 text-center text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <LockIco size={20} />
                  </span>
                  <span className="text-[12px] font-semibold">Locked by your institution</span>
                  <span className="text-[9.5px] leading-[1.4] text-[#A9B2C3]">
                    Please return this tablet
                    <br />
                    to the IT desk
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
