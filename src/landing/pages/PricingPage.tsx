import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check, GraduationCap, X } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Segmented } from '../components/Segmented'
import { AUDIENCES, INSTITUTION_PRICING, PARTNER_NOTICE, PLANS, PRICING_HERO, type Audience, type Plan } from '../content/pricing'
import { CTA } from '../content/names'

function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured
  return (
    <article
      className={`relative flex flex-col gap-6 rounded-[22px] p-8 max-[639px]:p-6 ${
        dark
          ? 'bg-[color:var(--brand)] text-white shadow-[0_30px_60px_-30px_rgba(36,71,209,.6)]'
          : 'border border-[color:var(--line)] bg-white'
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h2
            className={`font-[family-name:var(--font-display)] text-[22px] font-semibold ${dark ? 'text-white' : 'text-[color:var(--ink-900)]'}`}
          >
            {plan.name}
          </h2>
          {plan.badge && (
            <span className="rounded-full bg-[#E3DC4B] px-3 py-1 text-[12.5px] font-semibold text-[#1A1519]">{plan.badge}</span>
          )}
        </div>
        <p className={`text-[14.5px] leading-[1.55] ${dark ? 'text-[#D6DEFA]' : 'text-[color:var(--ink-600)]'}`}>{plan.summary}</p>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {plan.was && (
          <span className={`text-[20px] font-medium line-through ${dark ? 'text-[#D6DEFA]' : 'text-[color:var(--ink-400)]'}`}>
            {plan.was}
          </span>
        )}
        <span
          className={`font-[family-name:var(--font-display)] text-[44px] font-semibold leading-none tracking-[-0.02em] ${
            dark ? 'text-white' : 'text-[color:var(--ink-900)]'
          }`}
        >
          {plan.price}
        </span>
        <span className={`text-[15px] ${dark ? 'text-[#D6DEFA]' : 'text-[color:var(--ink-600)]'}`}>{plan.period}</span>
      </div>

      <a
        href={plan.cta.href}
        className={`lp-btn w-full ${dark ? 'lp-btn-on-dark' : plan.id === 'free' ? 'lp-btn-secondary' : 'lp-btn-primary'}`}
      >
        {plan.cta.label}
        <ArrowRight size={16} />
      </a>

      <ul className={`flex flex-col gap-3 border-t pt-6 ${dark ? 'border-white/20' : 'border-[color:var(--line)]'}`}>
        {plan.features.map((f) => {
          const no = f.included === false
          return (
            <li key={f.text} className="flex items-start gap-3 text-[15px] leading-[1.5]">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  no
                    ? 'bg-[#F1F2F5] text-[#98A2B3]'
                    : dark
                      ? 'bg-[#E3DC4B] text-[#1A1519]'
                      : 'bg-[color:var(--brand-tint)] text-[color:var(--brand)]'
                }`}
              >
                {no ? <X size={11} strokeWidth={3} /> : <Check size={12} strokeWidth={3} />}
              </span>
              <span className={no ? 'text-[color:var(--ink-600)]' : dark ? 'text-white' : 'text-[color:var(--ink-900)]'}>{f.text}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

/** Blue notice above the student plans: students of client institutions don't need a plan. */
function PartnerNotice() {
  return (
    <div className="flex items-start gap-3 rounded-[14px] border border-[#C9D4F6] bg-[#EEF2FD] px-5 py-4 text-[15px] leading-[1.55] text-[#1B2F7A] max-[639px]:px-4">
      <GraduationCap size={20} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
      <p>
        {PARTNER_NOTICE.text}{' '}
        <a href={PARTNER_NOTICE.signIn.href} className="font-semibold text-[color:var(--brand)] underline underline-offset-2">
          {PARTNER_NOTICE.signIn.label}
        </a>{' '}
        with the login your institution gave you, or{' '}
        <Link to={PARTNER_NOTICE.apps.to} className="font-semibold text-[color:var(--brand)] underline underline-offset-2">
          {PARTNER_NOTICE.apps.label}
        </Link>
        .
      </p>
    </div>
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
 * /pricing: two audiences on tabs. Individual students see the three plans exactly as provided (with a notice for
 * students of client institutions); institutions see custom pricing and how to get a quote.
 * /pricing#institutions opens the institutions tab.
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
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]}
        eyebrow={PRICING_HERO.eyebrow}
        title={PRICING_HERO.title}
        lead={PRICING_HERO.lead}
      >
        <div className="flex justify-center max-[639px]:w-full">
          <Segmented label="Pricing for" options={AUDIENCES} value={audience} onChange={switchTo} controls="pricing-panel" />
        </div>
      </PageHero>

      <section id="pricing-panel" role="tabpanel" className="relative z-[1] -mt-12 pb-20 max-[639px]:-mt-8 max-[639px]:pb-14">
        <div key={audience} className="lp-container lp-fade flex flex-col gap-6">
          {audience === 'students' ? (
            <>
              <PartnerNotice />
              <div className="grid grid-cols-3 items-start gap-6 max-[1023px]:mx-auto max-[1023px]:w-full max-[1023px]:max-w-[560px] max-[1023px]:grid-cols-1">
                {PLANS.map((p) => (
                  <PlanCard key={p.id} plan={p} />
                ))}
              </div>
            </>
          ) : (
            <InstitutionPanel />
          )}
        </div>
      </section>

      {audience === 'institutions' && (
        <section className="bg-white py-20 max-[639px]:py-14">
          <div className="lp-container">
            <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
              <div className="flex max-w-[620px] flex-col gap-2.5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  Buying for your whole institution?
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">
                  Schools, colleges and coaching institutes get ONESAZ for every student and teacher. Talk to us about a plan for your
                  institution.
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
