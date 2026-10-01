import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Handshake, Layers, LifeBuoy, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { ABOUT_CONTACT, ABOUT_HERO, RESULTS, VALUES, WHAT_WE_BUILD, WHO_WE_ARE, type ValueIcon } from '../content/about'
import { BRAND, CTA, FEATURES, PRODUCTS, productPath } from '../content/names'
import { ClientsSection } from '../sections/ClientsSection'
import { ServicesSection } from '../sections/ServicesSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { WhyOnesazSection } from '../sections/WhyOnesazSection'

const VALUE_ICONS: Record<ValueIcon, LucideIcon> = { platform: Layers, institutions: Handshake, support: LifeBuoy }

const MONO_LABEL = 'font-[family-name:var(--font-mono)] text-[12px] font-semibold uppercase tracking-[.1em]'

/** Breadcrumb, intro copy and the dark ONESAZ card listing every product. */
function Hero() {
  return (
    <section
      id="top"
      className="pb-24 pt-10 max-[639px]:pb-16 max-[639px]:pt-6"
      style={{ background: 'radial-gradient(900px 520px at 12% 0%, rgba(99,132,255,.14), rgba(99,132,255,0) 70%), #FBFBFD' }}
    >
      <div className="lp-container flex flex-col gap-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-[color:var(--ink-400)]">
            <li>
              <Link to="/" className="text-[color:var(--ink-600)] hover:text-[color:var(--brand)]">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="font-medium text-[color:var(--ink-900)]">
              {ABOUT_HERO.eyebrow}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div className="flex flex-col gap-[22px]">
            <span className="lp-eyebrow">{ABOUT_HERO.eyebrow}</span>
            <h1 className="lp-h1">{ABOUT_HERO.title}</h1>
            <p className="lp-lead !text-[18px] max-[639px]:!text-[16px]">{ABOUT_HERO.lead}</p>
          </div>

          <div className="flex flex-col items-center gap-[22px] rounded-3xl p-10 text-center shadow-[0_40px_80px_-40px_rgba(11,20,38,.6)] max-[640px]:px-5 max-[640px]:py-7"
            style={{ background: 'radial-gradient(500px 300px at 30% 10%, rgba(99,132,255,.35), rgba(99,132,255,0) 70%), #0B1426' }}>
            <span className="flex items-center gap-3.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                <img src={BRAND.logoSrc} alt="" width={40} height={40} className="h-10 w-10" />
              </span>
              <span className="flex flex-col items-start leading-none">
                <span className="font-[family-name:var(--font-display)] text-[34px] font-extrabold tracking-[.02em] text-white">
                  {BRAND.name}
                </span>
                <span className="mt-1.5 text-[13px] text-[#A9B2C3]">by Acadhub</span>
              </span>
            </span>
            <span className="max-w-[380px] text-[15px] leading-[1.6] text-[#C3CCE6]">{ABOUT_HERO.visualLine}</span>
            <ul className="flex flex-wrap justify-center gap-2" aria-label={`${BRAND.name} products`}>
              {PRODUCTS.map((p) => (
                <li
                  key={p.slug}
                  className="inline-flex items-center gap-[7px] rounded-full border border-white/[.14] bg-white/[.08] px-3 py-[7px] text-[12.5px] text-[#E6EAF2]"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                  {p.short}
                </li>
              ))}
            </ul>
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.1em] text-[color:var(--accent)]">
              {ABOUT_HERO.motto}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Mission and vision panels, then the three things that set the company apart. */
function WhoWeAre() {
  const { mission, vision } = WHO_WE_ARE
  return (
    <section id="who-we-are" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <SectionHeader eyebrow={WHO_WE_ARE.eyebrow} title={WHO_WE_ARE.title} />
        <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          <div className="flex flex-col gap-3 rounded-[20px] bg-[#EEF2FD] p-8 max-[640px]:p-6">
            <span className={`${MONO_LABEL} text-[color:var(--brand)]`}>{mission.label}</span>
            <h3 className="font-[family-name:var(--font-display)] text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] text-[color:var(--ink-900)] max-[640px]:text-[22px]">
              {mission.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-[#3F4758]">{mission.text}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] bg-[#0B1426] p-8 max-[640px]:p-6">
            <span className={`${MONO_LABEL} text-[color:var(--accent)]`}>{vision.label}</span>
            <h3 className="font-[family-name:var(--font-display)] text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] text-white max-[640px]:text-[22px]">
              {vision.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-[#A9B2C3]">{vision.text}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
          {VALUES.map((v) => {
            const Icon = VALUE_ICONS[v.icon]
            return (
              <div
                key={v.title}
                className="flex flex-col gap-3 rounded-2xl border border-[#E9ECF2] bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#D3DAEA] hover:shadow-[0_18px_30px_-20px_rgba(20,40,110,.35)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FD] text-[color:var(--brand)]">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="text-[17px] font-semibold text-[color:var(--ink-900)]">{v.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[#5B6478]">{v.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** One link card in the "What we build" grid. */
function ProductLink({ to, color, name, line }: { to: string; color: string; name: string; line: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3.5 rounded-[14px] border border-[#E9ECF2] bg-white px-5 py-[18px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className="flex min-w-0 flex-grow flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">{name}</span>
        <span className="text-[13px] text-[color:var(--ink-400)]">{line}</span>
      </span>
      <ArrowRight size={16} className="shrink-0 text-[#98A2B3] transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

/** Every product (plus the mobile app) as a link card. */
function WhatWeBuild() {
  return (
    <section id="what-we-build" className="lp-section-alt py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <SectionHeader eyebrow={WHAT_WE_BUILD.eyebrow} title={WHAT_WE_BUILD.title} lead={WHAT_WE_BUILD.lead} />
        <div className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
          {PRODUCTS.map((p) => (
            <ProductLink key={p.slug} to={productPath(p.slug)} color={p.color} name={p.name} line={p.line} />
          ))}
          <ProductLink to={WHAT_WE_BUILD.app.to} color="var(--brand)" name={FEATURES.app} line={WHAT_WE_BUILD.app.line} />
        </div>
      </div>
    </section>
  )
}

/** Qualitative outcomes clients see after moving to ONESAZ. */
function Results() {
  return (
    <section id="results" className="lp-section-alt py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-10">
        <SectionHeader eyebrow={RESULTS.eyebrow} title={RESULTS.title} />
        <h3 className="text-center font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">
          {RESULTS.subtitle}
        </h3>
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
          {RESULTS.items.map((r) => (
            <div key={r.label} className="lp-lift flex flex-col gap-3 rounded-2xl border border-[color:var(--line)] bg-white p-7">
              <span className={`${MONO_LABEL} text-[color:var(--brand)]`}>{r.label}</span>
              <h4 className="font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-[color:var(--ink-900)]">
                {r.title}
              </h4>
              <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Closing dark panel: demo / home actions beside the company's contact details. */
function Contact() {
  const rows: { icon: LucideIcon; label: string; value: React.ReactNode }[] = [
    {
      icon: Phone,
      label: 'Phone',
      value: (
        <a href={BRAND.phoneHref} className="hover:underline">
          {BRAND.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: 'Email',
      value: (
        <a href={`mailto:${BRAND.email}`} className="break-all hover:underline">
          {BRAND.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      value: (
        <>
          {BRAND.headquarters}
          <span className="mt-0.5 block text-[13px] font-normal leading-[1.5] text-[#C3CCE6]">{BRAND.addressLines.join(' ')}</span>
        </>
      ),
    },
    { icon: Building2, label: 'Company', value: BRAND.company },
  ]
  return (
    <section id="contact" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-10 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[760px]:grid-cols-1 max-[640px]:px-6 max-[640px]:py-8">
          <div className="flex flex-col gap-3.5">
            <span className={`${MONO_LABEL} text-[color:var(--accent)]`}>{ABOUT_CONTACT.label}</span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {ABOUT_CONTACT.title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">{ABOUT_CONTACT.text}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
                {CTA.demo}
                <ArrowRight size={16} />
              </Link>
              <Link to="/" className="lp-btn lp-btn-ghost-dark">
                {ABOUT_CONTACT.back}
              </Link>
            </div>
          </div>
          <ul className="flex flex-col gap-4 rounded-[18px] border border-white/[.14] bg-white/[.07] p-6 max-[640px]:p-5">
            {rows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3 text-[15px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10">
                  <Icon size={17} strokeWidth={1.75} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[12px] text-[#A9B2C3]">{label}</span>
                  <span className="font-semibold">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** About ONESAZ (/about): who builds ONESAZ, why it is one platform, what it includes and how clients are supported. */
export function AboutPage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyOnesazSection id="why-onesaz" />
      <WhatWeBuild />
      <ServicesSection id="services" />
      <ClientsSection id="our-clients" />
      <TestimonialsSection id="testimonials" />
      <Results />
      <Contact />
    </>
  )
}
