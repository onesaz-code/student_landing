import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, GraduationCap, X } from 'lucide-react'
import {
  AUDIENCES,
  INSTITUTION_PRICING,
  INSTITUTION_PRICING_FAQS,
  PARTNER_NOTICE,
  PLANS,
  PRICING_HERO,
  STUDENT_PRICING_FAQS,
  type Audience,
  type Plan,
} from '../content/pricing'
import { FaqSection } from '../sections/FaqSection'
import { CTA } from '../content/names'

/** Dark purple band behind the heading and tabs, as in the reference pricing page. */
const BAND_BG = 'radial-gradient(70% 90% at 50% 100%, #6D28D9 0%, #3B1A8C 45%, #140B33 80%, #0B0820 100%)'

/** Audience switcher on the dark band (tablist; arrow keys switch). */
function AudienceTabs({ value, onChange }: { value: Audience; onChange: (id: Audience) => void }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = AUDIENCES.length
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : null
    if (next === null) return
    e.preventDefault()
    onChange(AUDIENCES[next].id)
    refs.current[next]?.focus()
  }
  return (
    <div
      role="tablist"
      aria-label="Pricing for"
      className="inline-flex rounded-[12px] border border-white/15 bg-white/[.08] p-1 max-[479px]:w-full"
    >
      {AUDIENCES.map((a, i) => {
        const on = a.id === value
        return (
          <button
            key={a.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls="pricing-panel"
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(a.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`relative h-11 rounded-[9px] px-6 text-[14.5px] font-medium transition-colors max-[479px]:flex-1 max-[479px]:px-3 max-[479px]:text-[13.5px] ${
              on ? 'bg-white/10 text-white shadow-[inset_0_-2px_0_#E3DC4B]' : 'text-[#C9C3E6] hover:text-white'
            }`}
          >
            {a.label}
          </button>
        )
      })}
    </div>
  )
}

/** Notice for students of client institutions, on the dark band under the tabs. */
function PartnerNotice() {
  return (
    <div className="mx-auto flex max-w-[1120px] items-start gap-3 rounded-[14px] border border-white/15 bg-white/[.07] px-5 py-3 text-left text-[14px] leading-[1.55] text-[#E4E0F5] max-[639px]:px-4">
      <GraduationCap size={20} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-[#E3DC4B]" />
      <p>
        {PARTNER_NOTICE.text}{' '}
        <a href={PARTNER_NOTICE.signIn.href} className="font-semibold text-white underline underline-offset-2">
          {PARTNER_NOTICE.signIn.label}
        </a>{' '}
        with the login your institution gave you, or{' '}
        <Link to={PARTNER_NOTICE.apps.to} className="font-semibold text-white underline underline-offset-2">
          {PARTNER_NOTICE.apps.label}
        </Link>
        .
      </p>
    </div>
  )
}

/**
 * One plan column in the joined white panel. Subgrid rows (intro, price, button, list heading, list) line the
 * columns up. The featured plan is outlined in blue with a dark tab above it.
 */
function PlanColumn({ plan }: { plan: Plan }) {
  const ft = plan.featured
  return (
    <article
      className={`relative row-span-5 grid grid-rows-subgrid gap-y-0 px-8 pb-7 pt-6 max-[639px]:px-5 ${
        ft
          ? 'z-[1] -my-px rounded-b-[18px] outline outline-[1.5px] outline-[color:var(--brand)] max-[1023px]:mt-9 max-[1023px]:rounded-[18px]'
          : 'border-l border-[#EEF0F4] first:border-l-0 max-[1023px]:border-l-0 max-[1023px]:border-t max-[1023px]:first:border-t-0'
      }`}
    >
      {ft && plan.badge && (
        <span className="absolute -top-8 left-[-1.5px] right-[-1.5px] flex h-8 items-center justify-center rounded-t-[14px] bg-[#141414] text-[13px] font-medium text-white">
          {plan.badge}
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">{plan.name}</h2>
        <p className="text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{plan.summary}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 self-end">
        {plan.was && <span className="text-[17px] font-medium text-[color:var(--ink-400)] line-through">{plan.was}</span>}
        <span className="font-[family-name:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.02em] text-[color:var(--ink-900)]">
          {plan.price}
        </span>
        {plan.period && <span className="text-[14px] text-[color:var(--ink-600)]">{plan.period}</span>}
      </div>

      <a
        href={plan.cta.href}
        className={`mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-[9px] border-[1.5px] border-[color:var(--brand)] text-[14.5px] font-semibold ${
          ft ? 'bg-[color:var(--brand)] text-white' : 'bg-white text-[color:var(--brand)]'
        }`}
      >
        {plan.cta.label}
        <ArrowUpRight size={16} />
      </a>

      <p className="mt-6 text-[14.5px] font-semibold text-[color:var(--ink-900)]">{plan.listHeading}</p>

      <ul className="mt-3.5 flex flex-col gap-2.5 self-start">
        {plan.features.map((f) => {
          const no = f.included === false
          return (
            <li key={f.text} className="flex items-start gap-2.5 text-[14px] leading-[1.5]">
              {no ? (
                <X size={16} strokeWidth={2.25} aria-hidden className="mt-[2px] shrink-0 text-[#98A2B3]" />
              ) : (
                <Check size={16} strokeWidth={2.25} aria-hidden className="mt-[2px] shrink-0 text-[color:var(--brand)]" />
              )}
              <span className={no ? 'text-[color:var(--ink-400)]' : 'text-[color:var(--ink-900)]'}>{f.text}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

/** Institutions tab: no fixed price, what is included, the products, and how to get a quote. */
function InstitutionPanel() {
  return (
    <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 rounded-[22px] border border-[color:var(--line)] bg-white p-10 max-[899px]:grid-cols-1 max-[899px]:gap-8 max-[639px]:p-6">
      <div className="flex flex-col gap-5">
        <h2 className="font-[family-name:var(--font-display)] text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-[color:var(--ink-900)]">
          {INSTITUTION_PRICING.title}
        </h2>
        <p className="text-[16px] leading-[1.6] text-[color:var(--ink-600)]">{INSTITUTION_PRICING.text}</p>
        <ul className="grid grid-cols-2 gap-3 max-[479px]:grid-cols-1">
          {INSTITUTION_PRICING.included.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px] text-[color:var(--ink-900)]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-tint)] text-[color:var(--brand)]">
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link to={CTA.demoPath} className="lp-btn lp-btn-primary">
            {CTA.demo}
            <ArrowRight size={16} />
          </Link>
          <Link to="/contact#book-a-demo" className="lp-btn lp-btn-secondary">
            Contact sales
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-[16px] bg-[color:var(--surface-alt)] p-6">
        <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">Choose the products you need</span>
        <ul className="flex flex-wrap gap-2">
          {INSTITUTION_PRICING.products.map((p) => (
            <li
              key={p}
              className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-[13.5px] text-[color:var(--ink-900)]"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-auto border-t border-[color:var(--line)] pt-4 text-[14.5px] leading-[1.55] text-[color:var(--ink-600)]">
          {INSTITUTION_PRICING.studentsNote}
        </p>
      </div>
    </div>
  )
}

/**
 * /pricing: a dark band with the heading and the audience tabs, then a white panel overlapping it.
 * Individual students see the three plans side by side (with a notice for students of client institutions);
 * institutions see custom pricing. /pricing#institutions opens the institutions tab.
 */
export function PricingPage() {
  const { hash } = useLocation()
  const [audience, setAudience] = React.useState<Audience>(hash === '#institutions' ? 'institutions' : 'students')

  React.useEffect(() => {
    if (hash === '#institutions') setAudience('institutions')
    else if (hash === '#students') setAudience('students')
  }, [hash])

  const switchTo = (id: Audience) => {
    setAudience(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <section className="pb-[170px] pt-6 text-center max-[639px]:pb-[140px] max-[639px]:pt-6" style={{ background: BAND_BG }}>
        <div className="lp-container flex flex-col items-center gap-4">
          <h1 className="lp-h1 max-w-[760px] !text-[clamp(32px,3.6vw,48px)] !text-white">{PRICING_HERO.title}</h1>
          <p className="-mt-1 max-w-[760px] text-[17px] leading-[1.6] text-[#C9C3E6] max-[639px]:text-[15.5px]">{PRICING_HERO.lead}</p>
          <AudienceTabs value={audience} onChange={switchTo} />
          {audience === 'students' && <PartnerNotice />}
        </div>
      </section>

      <section id="pricing-panel" role="tabpanel" className="relative z-[1] -mt-[140px] pb-20 max-[639px]:-mt-[110px] max-[639px]:pb-14">
        <div key={audience} className="lp-container lp-fade">
          {audience === 'students' ? (
            <div className="mx-auto mt-6 grid grid-cols-3 rounded-[18px] border border-[#E6E8EF] bg-white shadow-[0_30px_70px_-40px_rgba(20,10,60,.45)] max-[1023px]:max-w-[560px] max-[1023px]:grid-cols-1">
              {PLANS.map((p) => (
                <PlanColumn key={p.id} plan={p} />
              ))}
            </div>
          ) : (
            <InstitutionPanel />
          )}
        </div>
      </section>

      <FaqSection
        key={`faq-${audience}`}
        id="pricing-faqs"
        eyebrow="FAQs"
        title="Frequently asked questions"
        lead={
          audience === 'students'
            ? 'Answers about the student plans, billing and refunds.'
            : 'Answers about pricing for schools, colleges and institutes.'
        }
        items={audience === 'students' ? STUDENT_PRICING_FAQS : INSTITUTION_PRICING_FAQS}
        className="lp-section lp-section-alt"
      />

      {audience === 'institutions' && (
        <section className="bg-white py-20 max-[639px]:py-14">
          <div className="lp-container">
            <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
              <div className="flex max-w-[620px] flex-col gap-2.5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  See ONESAZ with your own data.
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">
                  Book a demo and we will walk you through the products your institution needs, with a quote to match.
                </p>
              </div>
              <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
                {CTA.demo}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
