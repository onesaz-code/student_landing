import { useEffect, useState, type ReactNode } from 'react'
import { DemoWindow } from './DemoWindow'
import './vid.css'

const TEAL = '#0E7490'
const STUDENT_IMG = '/images/landing/video-call-student.jpg'
const PARENT_IMG = '/images/landing/video-call-parent.jpg'

type IconProps = { size: number; children: ReactNode }

function Ico({ size, children }: IconProps) {
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
      className="shrink-0"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const VideoPath = () => (
  <>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10 5-3v10l-5-3z" />
  </>
)
const MicPath = () => (
  <>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </>
)
const EndPath = () => <path d="M3 13c5-5 13-5 18 0l-2 3-3-1v-2a10 10 0 0 0-8 0v2l-3 1z" />

function StepLabel({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
      <span
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{ background: TEAL }}
      >
        {n}
      </span>
      {children}
    </span>
  )
}

const HISTORY = ['Today · 6 min', 'Yesterday · 4 min', 'Monday · 8 min']

const CAPTIONS: { who: 'Mom' | 'Ananya'; text: string }[] = [
  { who: 'Mom', text: 'Hi Ananya, how did your exam go today?' },
  { who: 'Ananya', text: 'It went well, Mom! I got 18 out of 20.' },
  { who: 'Mom', text: 'That’s wonderful, I’m so proud of you!' },
  { who: 'Ananya', text: 'Thanks, Mom. Talk to you tonight!' },
]

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

export default function VideoCallingDemo() {
  // Live call timer: starts at 04:32 and ticks every second (design: callSec).
  const [callSec, setCallSec] = useState(272)
  useEffect(() => {
    const id = window.setInterval(() => setCallSec((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="vid-root">
      <DemoWindow title="ONESAZ Video Calling" meta="Parent app" bodyClassName="flex flex-col gap-4">
        <div className="vid-grid grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-stretch gap-3.5">
          {/* Left column: child card + call history */}
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2.5">
              <StepLabel n={1}>Your child</StepLabel>
              <div className="flex flex-col gap-3 rounded-xl border border-[#EDF0F5] bg-white p-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src={STUDENT_IMG}
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                    style={{ objectPosition: '68% 40%' }}
                  />
                  <span className="flex min-w-0 grow flex-col gap-px">
                    <span className="text-[14px] font-semibold text-[#0F1729]">Ananya Rao</span>
                    <span className="text-[12px] text-[#667085]">Class 9A · Hostel</span>
                  </span>
                </div>
                <span
                  className="flex h-[38px] items-center justify-center gap-2 rounded-[9px] text-[13px] font-semibold text-white"
                  style={{ background: TEAL }}
                  aria-hidden
                >
                  <Ico size={15}>
                    <VideoPath />
                  </Ico>
                  Start video call
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-[#EDF0F5] bg-white p-4">
              <StepLabel n={3}>Call history</StepLabel>
              <ul>
                {HISTORY.map((when, i) => (
                  <li key={when} className={`flex items-center gap-2.5 py-2 ${i < HISTORY.length - 1 ? 'border-b border-[#F0F2F6]' : ''}`}>
                    <span style={{ color: TEAL }}>
                      <Ico size={14}>
                        <VideoPath />
                      </Ico>
                    </span>
                    <span className="grow text-[12.5px] text-[#0F1729]">Ananya</span>
                    <span className="text-[11.5px] text-[#667085]">{when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: live call screen */}
          <div className="flex h-full flex-col gap-2.5">
            <StepLabel n={2}>Live video call</StepLabel>
            <div className="relative min-h-[340px] grow overflow-hidden rounded-2xl bg-[#1B2638]">
              <img
                src={STUDENT_IMG}
                alt="Student on a video call"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: '66% 30%' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)',
                }}
              />
              <span aria-hidden className="vid-mainglow pointer-events-none absolute inset-0 z-[1] rounded-2xl" />

              {/* Timer + name */}
              <span className="absolute left-3 top-3 z-[2] flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-[5px] text-[11.5px] font-medium text-white backdrop-blur-[6px]">
                <span aria-hidden className="vid-livedot h-[7px] w-[7px] rounded-full bg-[#34D399]" />
                <span className="tabular-nums">{formatTime(callSec)}</span>
              </span>
              <span className="absolute left-3 top-11 z-[2] rounded-full bg-black/40 px-[9px] py-[3px] text-[11px] text-white">Ananya</span>

              {/* Picture-in-picture: parent */}
              <span
                className="vid-pip absolute right-3 top-3 z-[2] w-[30%] max-w-[96px] overflow-hidden rounded-xl border-2 border-white/85 bg-[#2B3A55]"
                style={{ aspectRatio: '290 / 326' }}
              >
                <img src={PARENT_IMG} alt="Parent on a video call" className="block h-full w-full object-cover" />
                <span className="absolute bottom-1 left-[5px] rounded bg-black/45 px-[5px] py-px text-[9px] text-white">You</span>
              </span>

              {/* Rotating captions */}
              <div aria-hidden className="absolute bottom-[66px] left-3 right-3 z-[2] h-12">
                {CAPTIONS.map((c, i) => (
                  <div key={i} className={`vid-cap vid-cap${i + 1} absolute inset-x-0 bottom-0 flex justify-center`}>
                    <span className="max-w-[94%] rounded-xl bg-white/[.94] px-3 py-2 text-[12.5px] leading-[1.4] text-[#0F1729] shadow-[0_8px_20px_-10px_rgba(0,0,0,.45)]">
                      <b
                        className="font-semibold"
                        style={{
                          color: c.who === 'Mom' ? '#1B6FB3' : '#12805C',
                        }}
                      >
                        {c.who}
                      </b>{' '}
                      · {c.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Call controls (decorative) */}
              <span aria-hidden className="absolute inset-x-0 bottom-3.5 z-[2] flex justify-center gap-3">
                {[
                  { bg: 'rgba(255,255,255,.18)', icon: <MicPath /> },
                  { bg: 'rgba(255,255,255,.18)', icon: <VideoPath /> },
                  { bg: '#E5484D', icon: <EndPath /> },
                ].map((b, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white backdrop-blur-[6px]"
                    style={{ background: b.bg }}
                  >
                    <Ico size={17}>{b.icon}</Ico>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
