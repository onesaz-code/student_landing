import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  MessageSquare,
  Phone,
  ReceiptIndianRupee,
  ScanLine,
  TabletSmartphone,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react'
import { SEPARATE_TOOLS, WITHOUT_ONESAZ, WITH_ONESAZ } from '../content/home'
import { BRAND, CTA } from '../content/names'
import { useDemoPath } from '../components/useDemoPath'

const TOOL_ICONS: Record<(typeof SEPARATE_TOOLS)[number]['key'], LucideIcon> = {
  learning: BookOpen,
  exams: FileCheck2,
  omr: ScanLine,
  qbank: CircleHelp,
  devices: TabletSmartphone,
  video: Video,
  sms: MessageSquare,
  fees: ReceiptIndianRupee,
  attendance: ClipboardCheck,
  ai: Phone,
}

// Dark plum panel with a soft glow and faint rings, like the reference feature banners
const PANEL_BG =
  'repeating-radial-gradient(circle at 50% 55%, rgba(255,255,255,.028) 0 1px, transparent 1px 84px), radial-gradient(55% 65% at 50% 55%, rgba(128,58,112,.55) 0%, rgba(84,36,78,.32) 42%, rgba(30,21,30,0) 78%), radial-gradient(45% 55% at 100% 0%, rgba(98,64,150,.28) 0%, rgba(98,64,150,0) 70%), #1A1519'
// Same blue as the Book a demo button (--brand)
const WITH_BG = 'var(--brand)'
const CHECK = '#E3DC4B'

/** "Other companies sell you separate tools": ten vendors on the left, one ONESAZ on the right. */
export function WhyOnesazSection({ id = 'why-onesaz' }: { id?: string }) {
  const demoPath = useDemoPath()
  return (
    <section id={id} className="bg-white py-[72px] max-[639px]:py-12">
      <div className="lp-container">
        <div
          className="flex flex-col items-center gap-11 rounded-[28px] px-14 py-14 text-white max-[999px]:px-8 max-[639px]:gap-8 max-[639px]:rounded-[20px] max-[639px]:px-4 max-[639px]:py-10"
          style={{ background: PANEL_BG }}
        >
          <div className="flex max-w-[860px] flex-col items-center gap-3 text-center">
            <span className="lp-eyebrow" style={{ color: CHECK }}>
              Why ONESAZ is different
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
              Others offer separate tools
              <br />
              <span className="text-[#9DB4FF]">ONESAZ gives you one platform.</span>
            </h2>
            <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#C9C0CC] max-[639px]:text-[15px]">
              Everything an institution needs, from learning and exams to devices and parent messages, in one product with one login and one
              bill.
            </p>
          </div>

          <div className="grid w-full max-w-[1000px] grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-stretch gap-4 max-[899px]:grid-cols-1">
            {/* Without ONESAZ */}
            <div className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/[.04] p-6 max-[639px]:p-4">
              <div className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-semibold tracking-[.1em] text-[#F29A8C]">
                  WITHOUT ONESAZ
                </span>
                <span className="font-[family-name:var(--font-display)] text-[18px] font-semibold text-[#E4DDE6]">
                  10 separate tools from 10 vendors
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2 max-[639px]:gap-1.5">
                {SEPARATE_TOOLS.map((t) => {
                  const Icon = TOOL_ICONS[t.key]
                  return (
                    <li
                      key={t.key}
                      className="flex min-h-[42px] items-center gap-2 rounded-[10px] py-1.5 border border-dashed border-white/[.16] px-2.5"
                    >
                      <Icon size={15} strokeWidth={1.75} className="shrink-0 text-[#9C93A0]" />
                      <span className="text-[13px] leading-[1.25] text-[#B9B0BD] max-[639px]:text-[12.5px]">{t.label}</span>
                    </li>
                  )
                })}
              </ul>
              <ul className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
                {WITHOUT_ONESAZ.map((line) => (
                  <li key={line} className="flex items-center gap-2.5 text-[14px] text-[#D9D1DB]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(240,110,95,.18)] text-[#F29A8C]">
                      <X size={11} strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center" aria-hidden>
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#1A1519] shadow-[0_0_0_8px_rgba(227,220,75,.12)]"
                style={{ background: CHECK }}
              >
                <ArrowRight size={20} strokeWidth={2.4} className="max-[899px]:rotate-90" />
              </span>
            </div>

            {/* With ONESAZ */}
            <div className="flex flex-col gap-4 rounded-[18px] p-6 max-[639px]:p-4" style={{ background: WITH_BG }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-semibold tracking-[.1em] text-[#FFD48A]">
                    WITH ONESAZ
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[18px] font-semibold text-white">
                    All 10, inside one platform
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-[8px] bg-white px-2 py-1">
                  <img src={BRAND.logoSrc} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-[family-name:var(--font-display)] text-[13px] font-bold text-[color:var(--ink-900)]">
                    {BRAND.name}
                  </span>
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2 max-[639px]:gap-1.5">
                {SEPARATE_TOOLS.map((t) => {
                  const Icon = TOOL_ICONS[t.key]
                  return (
                    <li key={t.key} className="flex min-h-[42px] items-center gap-2 rounded-[10px] py-1.5 bg-white/[.13] px-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-white text-[color:var(--brand)]">
                        <Icon size={13} strokeWidth={1.9} />
                      </span>
                      <span className="text-[13px] leading-[1.25] font-medium text-white max-[639px]:text-[12.5px]">{t.label}</span>
                    </li>
                  )
                })}
              </ul>
              <ul className="flex flex-col gap-2 border-t border-white/20 pt-4">
                {WITH_ONESAZ.map((line) => (
                  <li key={line} className="flex items-center gap-2.5 text-[14px] font-medium text-white">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#1A1519]"
                      style={{ background: CHECK }}
                    >
                      <Check size={12} strokeWidth={3.2} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                to={demoPath}
                className="mt-auto flex h-11 items-center justify-center gap-2 rounded-[10px] bg-white text-[14.5px] font-semibold text-[color:var(--brand)]"
              >
                {CTA.demo}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
