import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CircleHelp,
  GraduationCap,
  IndianRupee,
  Layers,
  Mail,
  MapPin,
  Phone,
  Plus,
  Shield,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'
import { DemoForm } from '../components/DemoForm'
import { BRAND } from '../content/names'
import { CONTACT_CARDS, CONTACT_FAQS, CONTACT_HERO, DEMO_PANEL, SUPPORT, type ContactOptionIcon } from '../content/contact'

const CARD_ICONS: Record<ContactOptionIcon, LucideIcon> = { sales: IndianRupee, demo: Video, support: CircleHelp }
const SERVICE_ICONS: Record<(typeof SUPPORT.services)[number]['icon'], LucideIcon> = {
  setup: Layers,
  training: GraduationCap,
  support: Shield,
}

/** Small icon + label + value item used in the hero contact strip. */
function DetailItem({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#F3F5FA] text-[#3F4758]">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[12px] text-[color:var(--ink-400)]">{label}</span>
        <span className="break-words text-[14.5px] font-semibold text-[color:var(--ink-900)]">{children}</span>
      </span>
    </div>
  )
}

/** Hero extras: the three contact routes as cards, and a strip with phone, email, headquarters and company. */
function HeroContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
        {CONTACT_CARDS.map((c) => {
          const Icon = CARD_ICONS[c.icon]
          return (
            <Link
              key={c.name}
              to={c.to}
              className="group flex flex-col gap-3 rounded-[18px] border border-[#E6E9F0] bg-white p-[26px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
            >
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#EEF2FD] text-[color:var(--brand)]">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <span className="text-[18px] font-semibold text-[color:var(--ink-900)]">{c.name}</span>
              <span className="text-[14px] leading-[1.55] text-[#5B6478]">{c.text}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-1.5 text-[14px] font-semibold text-[color:var(--brand)]">
                {c.action}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>
      <div className="grid grid-cols-4 gap-4 rounded-[18px] border border-[#E6E9F0] bg-white px-6 py-5 max-[1000px]:grid-cols-2 max-[640px]:grid-cols-1">
        <DetailItem icon={Phone} label="Phone">
          <a href={BRAND.phoneHref} className="hover:text-[color:var(--brand)]">
            {BRAND.phone}
          </a>
        </DetailItem>
        <DetailItem icon={Mail} label="Email">
          <a href={`mailto:${BRAND.email}`} className="hover:text-[color:var(--brand)]">
            {BRAND.email}
          </a>
        </DetailItem>
        <DetailItem icon={MapPin} label="Headquarters">
          {BRAND.headquarters}
        </DetailItem>
        <DetailItem icon={Building2} label="Company">
          {BRAND.company}
        </DetailItem>
      </div>
    </div>
  )
}

/** Dark panel: pitch and full contact details on the left, the Netlify demo form on the right. */
function DemoPanel() {
  const linkClass = 'inline-flex items-center gap-3 text-[15px] font-medium text-white hover:underline'
  const iconClass = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10'
  return (
    <section id="book-a-demo" className="bg-white pb-28 pt-[104px] max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container">
        <div className="relative flex items-center justify-between gap-16 overflow-hidden rounded-[20px] bg-[color:var(--ink-900)] p-20 max-[999px]:flex-col max-[999px]:items-stretch max-[999px]:gap-10 max-[999px]:p-12 max-[639px]:rounded-2xl max-[639px]:p-5 max-[639px]:pt-10">
          <div
            aria-hidden
            className="absolute -right-40 -top-[200px] h-[640px] w-full max-w-[640px] rounded-full bg-[radial-gradient(circle,rgba(36,71,209,.45),rgba(36,71,209,0)_65%)]"
          />
          <div className="relative flex w-full max-w-[560px] flex-col gap-5 max-[639px]:px-1">
            <h2 className="lp-h2 text-white">{DEMO_PANEL.title}</h2>
            <p className="text-[18px] leading-[1.6] text-[#AEB6C6] max-[639px]:text-[16px]">{DEMO_PANEL.lead}</p>
            <div className="mt-3 flex flex-col gap-4 border-t border-white/10 pt-7">
              <a href={BRAND.phoneHref} className={`${linkClass} self-start`}>
                <span className={iconClass}>
                  <Phone size={16} />
                </span>
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className={`${linkClass} self-start break-all`}>
                <span className={iconClass}>
                  <Mail size={16} />
                </span>
                {BRAND.email}
              </a>
              <div className="flex items-start gap-3">
                <span className={`${iconClass} text-white`}>
                  <MapPin size={16} />
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  <address className="text-[15px] not-italic leading-[1.6] text-[#AEB6C6]">
                    <span className="block font-medium text-white">{BRAND.company}</span>
                    {BRAND.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={BRAND.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-white hover:underline"
                  >
                    Get directions
                    <ArrowUpRight size={16} />
                    <span className="sr-only">(opens Google Maps in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-[420px] shrink-0 rounded-[14px] bg-white p-8 max-[999px]:w-full max-[639px]:p-5">
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Technical support: how to get help (numbered steps) beside the services included. */
function Support() {
  return (
    <section id="support" className="lp-section-alt py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <SectionHeader eyebrow={SUPPORT.eyebrow} title={SUPPORT.title} lead={SUPPORT.lead} />
        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-5 max-[900px]:grid-cols-1">
          <div className="flex flex-col gap-[22px] rounded-[20px] border border-[#E6E9F0] bg-white p-8 max-[639px]:p-6">
            <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{SUPPORT.stepsTitle}</h3>
            <ol className="flex flex-col gap-[22px]">
              {SUPPORT.steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand)] text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex min-w-0 flex-col gap-[3px] pt-1">
                    <span className="text-[16px] font-semibold text-[color:var(--ink-900)]">{s.title}</span>
                    <span className="break-words text-[14.5px] leading-[1.55] text-[#5B6478]">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-[18px] rounded-[20px] border border-[#E6E9F0] bg-white p-8 max-[639px]:p-6">
            <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{SUPPORT.servicesTitle}</h3>
            <ul className="flex flex-col gap-[18px]">
              {SUPPORT.services.map((s) => {
                const Icon = SERVICE_ICONS[s.icon]
                return (
                  <li key={s.name} className="flex items-center gap-3">
                    <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#EEF2FD] text-[color:var(--brand)]">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[14.5px] font-semibold text-[color:var(--ink-900)]">{s.name}</span>
                      <span className="text-[13px] text-[#5B6478]">{s.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <Link
              to={SUPPORT.servicesLink.to}
              className="group mt-auto inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-[color:var(--brand)]"
            >
              {SUPPORT.servicesLink.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Short FAQ accordion (native <details>, keyboard accessible) with a link to the full FAQ list. */
function Faqs() {
  return (
    <section id="faqs" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col items-center gap-10">
        <SectionHeader eyebrow={CONTACT_FAQS.eyebrow} title={CONTACT_FAQS.title} />
        <div className="w-full max-w-[820px] border-t border-[#E6E9EF]">
          {CONTACT_FAQS.items.map((f) => (
            <details key={f.q} className="group border-b border-[#E6E9EF] px-1 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-[color:var(--ink-900)] max-[639px]:text-[16px]">
                {f.q}
                <Plus
                  size={20}
                  aria-hidden
                  className="shrink-0 text-[color:var(--brand)] transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#5B6478]">{f.a}</p>
            </details>
          ))}
        </div>
        <Link
          to={CONTACT_FAQS.more.to}
          className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[color:var(--brand)]"
        >
          {CONTACT_FAQS.more.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}

/** Contact page (/contact): contact routes, demo form, technical support and FAQs. Copy lives in content/contact.ts. */
export function ContactPage() {
  return (
    <>
      <PageHero eyebrow={CONTACT_HERO.eyebrow} title={CONTACT_HERO.title} lead={CONTACT_HERO.lead}>
        <HeroContent />
      </PageHero>
      <DemoPanel />
      <Support />
      <Faqs />
    </>
  )
}
