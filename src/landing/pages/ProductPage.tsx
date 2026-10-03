import * as React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Plus } from 'lucide-react'
import { FEATURE_ICONS } from '../components/featureIcons'
import { CTA, productBySlug, productPath, type Product, type ProductSlug, solidFill } from '../content/names'
import { PRODUCT_CONTENT } from '../content/products'
import { TOUR } from '../content/tour'
import { DEMOS, PAGE_DEMOS } from '../demos'
import { NotFoundPage } from './NotFoundPage'

/** Gradient behind each hero demo: the tour's colours, plus Attendance (not in the tour). */
const MOCK_BG: Partial<Record<ProductSlug, string>> = {
  ...Object.fromEntries(TOUR.map((t) => [t.slug, t.mockBg])),
  attendance: 'linear-gradient(135deg, #DCF0FC 0%, #F2F9FE 100%)',
}

/** Centred eyebrow + H2 (+ lead) used by every section on the page. */
function Heading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3.5 text-center">
      <span className="lp-eyebrow">{eyebrow}</span>
      <h2 className="lp-h2">{title}</h2>
      {lead && <p className="lp-lead">{lead}</p>}
    </div>
  )
}

function Hero({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  const Demo = PAGE_DEMOS[product.slug] ?? DEMOS[product.slug]
  return (
    <section
      id="top"
      className="pb-24 pt-10 max-[639px]:pb-16 max-[639px]:pt-6"
      style={{
        background: `radial-gradient(900px 520px at 12% 0%, ${product.color}22, ${product.color}00 70%), radial-gradient(700px 480px at 95% 40%, ${product.color}14, ${product.color}00 70%), #FBFBFD`,
      }}
    >
      <div className="lp-container">
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <div className="flex flex-col gap-[22px]">
            <span className="inline-flex items-center gap-2 self-start text-[13px] font-semibold" style={{ color: product.color }}>
              <span
                className="rounded-full px-[9px] py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-[.04em] text-white"
                style={{ background: solidFill(product.color) }}
              >
                {product.badge}
              </span>
              {product.name}
            </span>
            <h1 className="lp-h1 text-[color:var(--ink-900)]">{c.headline}</h1>
            <p className="lp-lead !text-[18px] max-[639px]:!text-[16px]">{c.lead}</p>
            <div className="flex flex-wrap gap-3 pt-1 max-[379px]:flex-col">
              <Link to={CTA.demoPath} className="lp-btn lp-btn-primary" style={{ background: solidFill(product.color) }}>
                {CTA.demo}
                <ArrowRight size={16} />
              </Link>
              <a href="#features" className="lp-btn lp-btn-secondary">
                Explore features
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1.5 text-[13.5px] text-[color:var(--ink-600)]">
              {c.highlights.map((h) => (
                <li key={h} className="inline-flex items-center gap-1.5">
                  <Check size={15} strokeWidth={2} className="text-[color:var(--success)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] p-8 max-[639px]:p-4" style={{ background: MOCK_BG[product.slug] }}>
            <React.Suspense fallback={<div className="aspect-[4/3] w-full" />}>{Demo && <Demo />}</React.Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section id="features" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <Heading eyebrow="Features" title={c.featuresTitle} lead={c.featuresLead} />
        <div className="grid grid-cols-3 gap-4 max-[899px]:grid-cols-2 max-[639px]:grid-cols-1">
          {c.features.map((f) => {
            const Icon = FEATURE_ICONS[f.icon]
            return (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-2xl border border-[#E9ECF2] bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#D3DAEA] hover:shadow-[0_18px_30px_-20px_rgba(20,40,110,.35)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: product.tint, color: product.color }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="text-[17px] font-semibold text-[color:var(--ink-900)]">{f.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[#5B6478]">{f.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section id="how-it-works" className="lp-section-alt py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <Heading eyebrow="How it works" title={c.stepsTitle} />
        <ol className="grid grid-cols-3 gap-4 max-[759px]:grid-cols-1">
          {c.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2.5 rounded-2xl border border-[#E9ECF2] bg-white px-6 py-7">
              <span
                aria-hidden
                className="font-[family-name:var(--font-display)] text-[44px] font-bold leading-none"
                style={{ color: product.tint, WebkitTextStroke: `1.5px ${product.color}` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[19px] font-semibold text-[color:var(--ink-900)]">{s.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-[#5B6478]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Audience({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section id="who-its-for" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <Heading eyebrow="Who it’s for" title={c.audienceTitle} />
        <div className="grid grid-cols-4 gap-4 max-[999px]:grid-cols-2 max-[639px]:grid-cols-1">
          {c.audience.map((a) => (
            <div key={a.role} className="flex flex-col gap-3.5 rounded-2xl border border-[#E9ECF2] bg-white p-6">
              <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{a.role}</h3>
              <ul className="flex flex-col gap-3.5">
                {a.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[14px] leading-[1.5] text-[color:var(--ink-600)]">
                    <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: product.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorksWith({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section id="works-with" className="lp-section-alt py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col gap-12">
        <Heading eyebrow="One platform" title="Works with the rest of ONESAZ." lead={c.worksWithLead} />
        <div className="grid grid-cols-3 gap-3 max-[899px]:grid-cols-2 max-[639px]:grid-cols-1">
          {c.related.map((slug) => {
            const p = productBySlug(slug)!
            return (
              <Link
                key={slug}
                to={productPath(slug)}
                className="group flex items-center gap-3.5 rounded-[14px] border border-[#E9ECF2] bg-white px-5 py-[18px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <span className="flex flex-grow flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">{p.name}</span>
                  <span className="text-[13px] text-[color:var(--ink-400)]">{p.line}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-[#98A2B3] transition-transform group-hover:translate-x-0.5" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Faqs({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section id="faqs" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col items-center gap-12">
        <Heading eyebrow="FAQs" title={`Questions about ${product.name}`} />
        <div className="w-full max-w-[820px] border-t border-[#E6E9EF]">
          {c.faqs.map((f) => (
            <details key={f.q} className="group border-b border-[#E6E9EF] px-1 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-[color:var(--ink-900)] max-[639px]:text-[16px]">
                {f.q}
                <Plus
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                  style={{ color: product.color }}
                />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#5B6478]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Returns to the card the visitor came from. A direct visit goes to the products section. */
function BackToProducts() {
  const location = useLocation()
  const navigate = useNavigate()
  const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
  if (location.key !== 'default' && idx > 0) {
    return (
      <button type="button" onClick={() => navigate(-1)} className="lp-btn lp-btn-ghost-dark">
        Back
      </button>
    )
  }
  return (
    <Link to="/#products" className="lp-btn lp-btn-ghost-dark">
      Back to all products
    </Link>
  )
}

function ClosingCta({ product }: { product: Product }) {
  const c = PRODUCT_CONTENT[product.slug]
  return (
    <section className="bg-white pb-24 max-[639px]:pb-16">
      <div className="lp-container">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
          <div className="flex max-w-[620px] flex-col gap-2.5">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {c.cta.title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">{c.cta.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
              {CTA.demo}
              <ArrowRight size={16} />
            </Link>
            <BackToProducts />
          </div>
        </div>
      </div>
    </section>
  )
}

/** One template renders all 11 product pages at /products/:slug. Copy lives in content/products.ts. */
export function ProductPage() {
  const { slug = '' } = useParams()
  const product = productBySlug(slug)

  if (!product) return <NotFoundPage />

  return (
    <>
      <Hero product={product} />
      <Features product={product} />
      <HowItWorks product={product} />
      <Audience product={product} />
      <WorksWith product={product} />
      <Faqs product={product} />
      <ClosingCta product={product} />
    </>
  )
}
