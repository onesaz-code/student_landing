import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CircleHelp, LayoutGrid, PlayCircle, Users, Video, type LucideIcon } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'
import { CTA, PRODUCTS, RESOURCES, productBySlug, productPath } from '../content/names'
import { GUIDES, RESOURCES_CTA, RESOURCES_HERO, RESULTS } from '../content/resources'
import { ClientsSection } from '../sections/ClientsSection'
import { FaqSection } from '../sections/FaqSection'
import { PlatformModulesSection } from '../sections/PlatformModulesSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { TutorialsSection } from '../sections/TutorialsSection'

const HOME = { label: 'Home', to: '/' }

const QUICK_ICONS: Record<(typeof RESOURCES)[number]['id'], LucideIcon> = {
  tutorials: Video,
  'product-guides': BookOpen,
  'platform-modules': LayoutGrid,
  faqs: CircleHelp,
  'customer-stories': Users,
}

/** Hero quick links: one card per resource, jumping to its section on this page. */
function QuickLinks() {
  return (
    <nav aria-label="Resources" className="grid grid-cols-5 gap-3 max-[999px]:grid-cols-3 max-[639px]:grid-cols-2">
      {RESOURCES.map((r) => {
        const Icon = QUICK_ICONS[r.id]
        return (
          <Link
            key={r.id}
            to={`/resources#${r.id}`}
            className="group flex flex-col gap-2.5 rounded-2xl border border-[#E6E9F0] bg-white p-5 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)] max-[379px]:p-4"
          >
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#EEF2FD] text-[color:var(--brand)]">
              <Icon size={20} strokeWidth={1.8} />
            </span>
            <span className="text-[16px] font-semibold text-[color:var(--ink-900)]">{r.name}</span>
            <span className="text-[13px] leading-[1.5] text-[color:var(--ink-400)]">{r.line}</span>
            <ArrowRight size={16} className="mt-auto text-[color:var(--brand)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        )
      })}
    </nav>
  )
}

/** "A guide for every ONESAZ product": one card per product, plus the product tour. */
function ProductGuides() {
  return (
    <section id="product-guides" className="lp-section bg-white">
      <div className="lp-container flex flex-col items-center gap-12">
        <SectionHeader eyebrow={GUIDES.eyebrow} title={GUIDES.title} lead={GUIDES.lead} />
        <div className="grid w-full grid-cols-3 gap-3 max-[899px]:grid-cols-2 max-[639px]:grid-cols-1">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to={productPath(p.slug)}
              className="group flex flex-col gap-2 rounded-[14px] border border-[#E9ECF2] bg-white p-5 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
            >
              <span className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <span className="text-[15.5px] font-semibold text-[color:var(--ink-900)]">{p.name}</span>
              </span>
              <span className="text-[13.5px] leading-[1.5] text-[color:var(--ink-600)]">{p.line}</span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[color:var(--brand)]">
                {GUIDES.linkLabel}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
          <Link
            to={GUIDES.tour.to}
            className="group flex flex-col gap-2 rounded-[14px] border border-[#DCE3FA] bg-[#EEF2FD] p-5 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
          >
            <span className="flex items-center gap-2.5 text-[15.5px] font-semibold text-[color:var(--ink-900)]">
              <PlayCircle size={18} className="shrink-0 text-[color:var(--brand)]" />
              {GUIDES.tour.title}
            </span>
            <span className="text-[13.5px] leading-[1.5] text-[color:var(--ink-600)]">{GUIDES.tour.text}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[color:var(--brand)]">
              {GUIDES.tour.linkLabel}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/** "What changes when institutions move to ONESAZ": qualitative outcomes, each linked to its product. */
function Results() {
  return (
    <section id="results" className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col gap-12">
        <SectionHeader eyebrow={RESULTS.eyebrow} title={RESULTS.title} />
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-display)] text-[24px] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)] max-[639px]:text-[20px]">
            {RESULTS.subtitle}
          </h3>
          <div className="grid grid-cols-3 gap-5 max-[899px]:grid-cols-1">
            {RESULTS.points.map((r) => {
              const p = productBySlug(r.product)!
              return (
                <div
                  key={r.label}
                  className="lp-lift flex flex-col gap-4 rounded-[18px] border border-[#E6E8EC] bg-white p-[30px] max-[639px]:p-6"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.08em] text-[#667085]">
                    {r.label}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[24px] font-bold leading-[1.25] tracking-[-0.02em] text-[color:var(--brand)]">
                    {r.title}
                  </span>
                  <p className="text-[15px] leading-[1.65] text-[#3F4758]">{r.text}</p>
                  <Link
                    to={productPath(p.slug)}
                    className="group mt-auto inline-flex items-center gap-2 pt-2 text-[14px] font-semibold text-[color:var(--ink-900)] hover:text-[color:var(--brand)]"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                    {p.name}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Closing dark CTA panel. */
function ClosingCta() {
  return (
    <section className="bg-white py-24 max-[639px]:py-16">
      <div className="lp-container">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
          <div className="flex max-w-[620px] flex-col gap-2.5">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {RESOURCES_CTA.title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">{RESOURCES_CTA.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
              {CTA.demo}
              <ArrowRight size={16} />
            </Link>
            <Link to={RESOURCES_CTA.back.to} className="lp-btn lp-btn-ghost-dark">
              {RESOURCES_CTA.back.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Resources page: tutorials, product guides, platform modules, FAQs and customer stories. */
export function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[HOME, { label: 'Resources' }]}
        eyebrow={RESOURCES_HERO.eyebrow}
        title={RESOURCES_HERO.title}
        lead={RESOURCES_HERO.lead}
      >
        <QuickLinks />
      </PageHero>
      <TutorialsSection id="tutorials" showAllLink={false} />
      <ProductGuides />
      <PlatformModulesSection id="platform-modules" />
      <FaqSection id="faqs" />
      <div id="customer-stories">
        <ClientsSection id="our-clients" />
        <TestimonialsSection id="testimonials" />
        <Results />
      </div>
      <ClosingCta />
    </>
  )
}
