import type { ReactNode } from 'react'
import { DemoWindow } from './DemoWindow'
import './aic.css'

const VIOLET = '#6A4BD8'
const MONO = 'font-[family-name:var(--font-mono)]'

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
      className="shrink-0"
      aria-hidden
    >
      {children}
    </svg>
  )
}

function StepLabel({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
      <span
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{ background: VIOLET }}
      >
        {n}
      </span>
      <span className="whitespace-nowrap">{children}</span>
    </span>
  )
}

type PillTone = 'violet' | 'green' | 'grey' | 'blue' | 'amber'
const PILL: Record<PillTone, { bg: string; fg: string }> = {
  violet: { bg: '#F1ECFD', fg: '#6A4BD8' },
  green: { bg: '#E7F5EE', fg: '#1F7A4F' },
  grey: { bg: '#F3F4F7', fg: '#7C879B' },
  blue: { bg: '#EEF2FD', fg: '#2447D1' },
  amber: { bg: '#FBF1DE', fg: '#9A6400' },
}

function Pill({ tone, dot, children }: { tone: PillTone; dot?: boolean; children: ReactNode }) {
  const c = PILL[tone]
  return (
    <span
      className={`${MONO} inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold tracking-[.04em]`}
      style={{ background: c.bg, color: c.fg }}
    >
      {dot && <span className="aic-livedot h-1.5 w-1.5 rounded-full" style={{ background: c.fg }} />}
      {children}
    </span>
  )
}

/** Transcript lines on the phone, shown one at a time. */
const TRANSCRIPT: { who: 'AI AGENT' | 'PARENT'; text: string }[] = [
  {
    who: 'AI AGENT',
    text: 'Hello, I’m calling from your child’s school about the Term 2 fee.',
  },
  { who: 'PARENT', text: 'Oh yes, I’ll pay it by Friday.' },
  {
    who: 'AI AGENT',
    text: 'Thank you! I’ve sent the payment link to your WhatsApp.',
  },
  { who: 'PARENT', text: 'Got it, thanks.' },
]

const WAVE = [
  { h: 8, d: 0 },
  { h: 14, d: 0.15 },
  { h: 10, d: 0.3 },
  { h: 16, d: 0.45 },
  { h: 9, d: 0.6 },
  { h: 13, d: 0.2 },
  { h: 7, d: 0.35 },
]

const SUMMARY = ['Promised to pay by Friday', 'Payment link sent on WhatsApp', 'Reminder set for Friday']

function Phone() {
  return (
    <div
      className="flex min-w-0 flex-col gap-2 rounded-2xl px-3.5 pb-3 pt-3.5 text-white shadow-[0_16px_30px_-18px_rgba(40,20,110,.7)]"
      style={{
        background: 'linear-gradient(170deg, #241A4D 0%, #150F30 100%)',
      }}
    >
      <span className="flex items-center justify-between text-[10px] text-[#A99CD8]">
        <span className={`${MONO} tracking-[.08em]`}>AI AGENT CALLING</span>
        <Ico size={11}>
          <path d="M2 20h2v-4H2zM7 20h2v-8H7zM12 20h2V8h-2zM17 20h2V4h-2z" />
        </Ico>
      </span>

      {/* Agent avatar with speaking pulse */}
      <span className="relative mx-auto mt-1 block h-16 w-16">
        <span className="aic-glow absolute inset-0">
          <span className="aic-pulse absolute inset-0 rounded-full border-2 border-[rgba(167,139,250,.7)]" />
          <span
            className="aic-pulse absolute inset-0 rounded-full border-2 border-[rgba(167,139,250,.7)]"
            style={{ animationDelay: '.8s' }}
          />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center rounded-full text-white shadow-[0_8px_24px_-6px_rgba(124,92,240,.8)]"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #B7A4FF 0%, #7C5CF0 45%, #4B2FC0 100%)',
          }}
        >
          <Ico size={26}>
            <path d="M12 3v2M12 19v2M5 12H3M21 12h-2" />
            <rect x="7" y="7" width="10" height="10" rx="3" />
            <circle cx="10.5" cy="11.5" r=".6" />
            <circle cx="13.5" cy="11.5" r=".6" />
          </Ico>
        </span>
      </span>

      <span className="flex flex-col items-center gap-px">
        <span className="text-[14px] font-semibold">R. Sharma · Parent</span>
        <span className={`${MONO} text-[10.5px] text-[#A99CD8]`}>+91 98••• ••210</span>
      </span>

      {/* Call status */}
      <span className="grid h-[22px] justify-items-center">
        <span className="aic-st0 inline-flex items-center gap-1.5 text-[11px] text-[#C9BFF5] [grid-area:1/1]">
          <Ico size={12}>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </Ico>
          Ringing…
        </span>
        <span className="aic-st1 inline-flex items-center gap-1.5 text-[11px] text-[#86EFAC] [grid-area:1/1]">
          <span className="aic-livedot h-1.5 w-1.5 rounded-full bg-[#34D399]" />
          Connected · phone call
        </span>
        <span className="aic-st2 inline-flex items-center gap-1.5 text-[11px] text-[#FCA5A5] [grid-area:1/1]">Call ended · 1:12</span>
      </span>

      {/* Live transcript */}
      <span className="grid h-[92px] py-1">
        {TRANSCRIPT.map((line, i) => {
          const ai = line.who === 'AI AGENT'
          return (
            <span key={i} className={`aic-c${i} flex flex-col gap-1 self-end [grid-area:1/1] ${ai ? 'items-start' : 'items-end'}`}>
              <span className={`${MONO} text-[9px] tracking-[.08em]`} style={{ color: ai ? '#B7A4FF' : '#9BD8C0' }}>
                {line.who}
              </span>
              <span
                className="max-w-[94%] px-2.5 py-[7px] text-[11.5px] leading-[1.4] text-white"
                style={{
                  borderRadius: ai ? '10px 10px 10px 3px' : '10px 10px 3px 10px',
                  background: ai ? 'rgba(124,92,240,.35)' : 'rgba(255,255,255,.12)',
                }}
              >
                {line.text}
              </span>
            </span>
          )
        })}
      </span>

      {/* Waveform + hang-up */}
      <span className="flex items-center justify-between border-t border-white/[.08] pt-1.5">
        <span className="aic-bars flex h-[18px] items-center gap-[3px]">
          {WAVE.map((w, i) => (
            <span key={i} className="aic-wave w-[3px] rounded-sm bg-[#B7A4FF]" style={{ height: w.h, animationDelay: `${w.d}s` }} />
          ))}
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#E5484D] text-white">
          <Ico size={14}>
            <path d="M3 13c5-4 13-4 18 0l-2 3-4-1v-2a9 9 0 0 0-6 0v2l-4 1z" />
          </Ico>
        </span>
      </span>
    </div>
  )
}

type Row = {
  initials: string
  name: string
  reason: string
  status: ReactNode
  highlight?: boolean
}

const ROWS: Row[] = [
  {
    initials: 'RS',
    name: 'R. Sharma',
    reason: 'Term 2 fee due',
    highlight: true,
    status: (
      <span className="inline-grid shrink-0 justify-items-end">
        <span className="aic-q0 [grid-area:1/1]">
          <Pill tone="violet" dot>
            Ringing
          </Pill>
        </span>
        <span className="aic-q1 [grid-area:1/1]">
          <Pill tone="green" dot>
            On call
          </Pill>
        </span>
        <span className="aic-q2 [grid-area:1/1]">
          <Pill tone="green">Will pay Fri</Pill>
        </span>
      </span>
    ),
  },
  {
    initials: 'MP',
    name: 'M. Patel',
    reason: 'Term 2 fee due',
    status: (
      <span className="inline-grid shrink-0 justify-items-end">
        <span className="aic-q3 [grid-area:1/1]">
          <Pill tone="grey">Next</Pill>
        </span>
        <span className="aic-q4 [grid-area:1/1]">
          <Pill tone="violet" dot>
            Ringing
          </Pill>
        </span>
      </span>
    ),
  },
  {
    initials: 'KR',
    name: 'K. Rao',
    reason: 'Admission enquiry',
    status: <Pill tone="blue">Visit booked</Pill>,
  },
  {
    initials: 'AN',
    name: 'A. Nair',
    reason: 'Absent today',
    status: <Pill tone="amber">Call back 5 pm</Pill>,
  },
]

function CallList() {
  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <span className="flex items-center justify-between gap-2">
        <StepLabel n={1}>Today’s call list</StepLabel>
        <span className={`aic-meta ${MONO} text-[10px] tracking-[.04em] text-[#98A2B3]`}>AUTO-DIALLING</span>
      </span>
      <div className="overflow-hidden rounded-xl border border-[#EDF0F5] bg-white">
        {ROWS.map((r, i) => (
          <div key={r.initials} className={r.highlight ? 'aic-hl' : undefined}>
            <div className={`flex items-center gap-2.5 px-3 py-[9px] ${i < ROWS.length - 1 ? 'border-b border-[#F0F2F6]' : ''}`}>
              <span className="aic-av flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3F4F7] text-[10.5px] font-semibold text-[#5B6478]">
                {r.initials}
              </span>
              <span className="flex min-w-0 grow flex-col gap-px">
                <span className="truncate text-[12.5px] font-semibold text-[#0F1729]">{r.name}</span>
                <span className="truncate text-[11px] text-[#7C879B]">{r.reason}</span>
              </span>
              {r.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Summary() {
  return (
    <div className="aic-sum flex flex-col gap-[9px] rounded-xl border border-[#EDF0F5] bg-white px-3.5 py-3">
      <span className="flex flex-wrap items-center justify-between gap-2">
        <StepLabel n={2}>Call summary</StepLabel>
        <span className="aic-log">
          <Pill tone="green">Saved to ERP</Pill>
        </span>
      </span>
      <span className="relative flex min-h-[70px] flex-col gap-[7px]">
        <span className="aic-wait absolute left-0 top-0 inline-flex items-center gap-1.5 text-[11.5px] text-[#98A2B3]">
          <span className="aic-livedot h-1.5 w-1.5 rounded-full bg-[#B7A4FF]" />
          Listening and taking notes…
        </span>
        {SUMMARY.map((s, i) => (
          <span key={s} className={`aic-s${i + 3} flex items-center gap-2 text-[12px] text-[#0F1729]`}>
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1F9D63] text-white">
              <Ico size={10}>
                <path d="m5 12 5 5 9-10" />
              </Ico>
            </span>
            {s}
          </span>
        ))}
      </span>
    </div>
  )
}

export default function AiCallingDemo() {
  return (
    <div className="aic-root">
      <p className="sr-only">
        Animated example: the AI agent phones a parent about the Term 2 fee, the parent promises to pay by Friday, a payment link is sent on
        WhatsApp and the call summary is saved to ERP.
      </p>
      <div aria-hidden>
        <DemoWindow title="ONESAZ AI Calling Agent" meta="Office view" bodyClassName="flex flex-col gap-4">
          <div className="aic-grid grid grid-cols-[206px_minmax(0,1fr)] items-stretch gap-3.5">
            <Phone />
            <div className="flex min-w-0 flex-col gap-3">
              <CallList />
              <Summary />
            </div>
          </div>
        </DemoWindow>
      </div>
    </div>
  )
}
