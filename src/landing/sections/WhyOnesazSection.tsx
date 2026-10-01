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
import { SectionHeader } from '../components/SectionHeader'
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

/** "Other companies sell you separate tools": ten vendors on the left, one ONESAZ on the right. */
export function WhyOnesazSection({ id = 'why-onesaz' }: { id?: string }) {
  const demoPath = useDemoPath()
  return (
    <section id={id} className="lp-section bg-[color:var(--surface-dark)] text-white">
      <div className="lp-container flex flex-col items-center gap-14 max-[639px]:gap-10">
        <SectionHeader
          onDark
          eyebrow="Why ONESAZ is different"
          title={
            <>
              Other companies sell you separate tools.
              <br />
              <span className="text-[#7FA2FF]">ONESAZ gives you one platform.</span>
            </>
          }
          lead="Everything an institution needs, from learning and exams to devices and parent messages, in one product with one login and one bill."
        />

        <div className="grid w-full grid-cols-[minmax(0,1fr)_64px_minmax(0,1.12fr)] items-stretch gap-5 max-[999px]:grid-cols-1 max-[999px]:gap-4">
          {/* Without ONESAZ */}
          <div className="flex flex-col gap-5 rounded-[20px] border border-white/10 bg-white/[.04] p-7 max-[639px]:p-5">
            <div className="flex flex-col gap-1.5">
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[.1em] text-[#F28B7D]">
                WITHOUT ONESAZ
              </span>
              <span className="font-[family-name:var(--font-display)] text-[22px] font-semibold text-[#D5DAE4]">
                10 separate tools from 10 vendors
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-2 max-[639px]:gap-1.5">
              {SEPARATE_TOOLS.map((t) => {
                const Icon = TOOL_ICONS[t.key]
                return (
                  <li
                    key={t.key}
                    className="flex h-[50px] items-center gap-2.5 rounded-[10px] border border-dashed border-white/[.18] bg-white/[.03] px-3 max-[639px]:h-11 max-[639px]:px-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-white/[.07] text-[#8B95A8]">
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-[13.5px] text-[#A9B2C3] max-[639px]:text-[12.5px]">{t.label}</span>
                  </li>
                )
              })}
            </ul>
            <ul className="mt-auto flex flex-col gap-2.5 border-t border-white/10 pt-[18px]">
              {WITHOUT_ONESAZ.map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-[15px] text-[#D5DAE4]">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(240,110,95,.16)] text-[#F28B7D]">
                    <X size={11} strokeWidth={3.2} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center" aria-hidden>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--surface-dark)] shadow-[0_0_0_10px_rgba(224,160,48,.15)]">
              <ArrowRight size={24} strokeWidth={2.4} className="max-[999px]:rotate-90" />
            </span>
          </div>

          {/* With ONESAZ */}
          <div className="relative flex flex-col gap-5 overflow-hidden rounded-[22px] bg-[color:var(--brand)] p-[30px] shadow-[0_24px_48px_-24px_rgba(0,0,0,.55)] max-[639px]:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[.1em] text-[#FFD48A]">
                  WITH ONESAZ
                </span>
                <span className="font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">
                  All 10, inside one platform
                </span>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-[10px] bg-white px-2.5 py-1.5">
                <img src={BRAND.logoSrc} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
                <span className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[color:var(--ink-900)]">
                  {BRAND.name}
                </span>
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-2 max-[639px]:gap-1.5">
              {SEPARATE_TOOLS.map((t) => {
                const Icon = TOOL_ICONS[t.key]
                return (
                  <li
                    key={t.key}
                    className="flex h-[46px] items-center gap-2.5 rounded-[10px] border border-white/20 bg-white/[.14] px-3 max-[639px]:h-11 max-[639px]:px-2.5"
                  >
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-white text-[color:var(--brand)]">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    <span className="text-[13.5px] font-medium text-white max-[639px]:text-[12.5px]">{t.label}</span>
                  </li>
                )
              })}
            </ul>
            <ul className="mt-auto flex flex-col gap-2.5 border-t border-white/20 pt-[18px]">
              {WITH_ONESAZ.map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-[15px] font-medium text-white">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--success)]">
                    <Check size={12} strokeWidth={3.2} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to={demoPath}
              className="flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-white text-[15px] font-semibold text-[color:var(--brand)] transition-colors hover:bg-[#EEF2FD]"
            >
              {CTA.demo}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
