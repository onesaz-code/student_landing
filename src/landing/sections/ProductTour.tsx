import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Database,
  FileCheck2,
  GraduationCap,
  Landmark,
  PenLine,
  Phone,
  TabletSmartphone,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { CTA, productBySlug, productPath, type ProductSlug } from '../content/names'
import { TOUR } from '../content/tour'
import { DEMOS } from '../demos'

const ICONS: Partial<Record<ProductSlug, LucideIcon>> = {
  erp: Landmark,
  lms: BookOpen,
  'omr-scanning': FileCheck2,
  mdm: TabletSmartphone,
  'ai-calling-agent': Phone,
  'video-calling': Video,
  'ai-tutor': GraduationCap,
  crm: Users,
  'descriptive-evaluation': PenLine,
  'question-bank': Database,
}

/**
 * "See it in action": one tab per product (10, equal size), each showing the
 * product story on the left and its animated demo on the right.
 * Sits inside the hero, as in the design.
 */
export function ProductTour() {
  const [active, setActive] = React.useState<ProductSlug>(TOUR[0].slug)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const item = TOUR.find((t) => t.slug === active)!
  const product = productBySlug(active)!
  const Demo = DEMOS[active]

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = TOUR.length
    const next =
      e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null
    if (next === null) return
    e.preventDefault()
    setActive(TOUR[next].slug)
    tabRefs.current[next]?.focus()
  }

  return (
    <div id="product-tour" className="mt-24 flex w-full flex-col items-center gap-7 text-left max-[639px]:mt-16">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <span className="lp-eyebrow">See it in action</span>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)]">
          One platform. Pick a product to see what it does.
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="ONESAZ products"
        // 5 columns; 4 per row with the last row centred (900–1099 px); 2 columns on smaller screens
        className="grid w-full grid-cols-5 gap-3 max-[1099px]:flex max-[1099px]:flex-wrap max-[1099px]:justify-center max-[899px]:grid max-[899px]:grid-cols-2"
      >
        {TOUR.map((t, i) => {
          const p = productBySlug(t.slug)!
          const Icon = ICONS[t.slug] ?? BookOpen
          const on = t.slug === active
          return (
            <button
              key={t.slug}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`tour-tab-${t.slug}`}
              aria-selected={on}
              aria-controls="tour-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.slug)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-[62px] items-center max-[1099px]:basis-[calc((100%-36px)/4)] max-[899px]:basis-auto justify-center gap-2.5 rounded-[14px] border px-3.5 py-2.5 text-left text-[14px] font-semibold leading-[1.3] transition-[background,color,box-shadow,transform,border-color] duration-200 max-[639px]:min-h-[70px] max-[639px]:gap-2 max-[639px]:px-2.5 max-[639px]:text-[13px] ${
                on
                  ? 'text-white'
                  : 'border-[#E3E7EF] bg-white text-[#1F2937] hover:-translate-y-0.5 hover:border-[#C9D0DD] hover:shadow-[0_10px_22px_-14px_rgba(20,40,110,.35)]'
              }`}
              style={
                on
                  ? {
                      background: p.color,
                      borderColor: p.color,
                      boxShadow: `0 14px 28px -14px ${p.color}`,
                    }
                  : undefined
              }
            >
              <Icon
                size={20}
                strokeWidth={1.75}
                className={`shrink-0 max-[639px]:h-[17px] max-[639px]:w-[17px] ${on ? '' : 'text-[#667085]'}`}
              />
              <span>{p.name}</span>
            </button>
          )
        })}
      </div>

      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${active}`}
        className="w-full rounded-[28px] border border-[#EBEEF4] bg-white p-12 shadow-[0_50px_100px_-60px_rgba(20,40,110,.4)] max-[899px]:p-7 max-[639px]:rounded-[18px] max-[639px]:px-4 max-[639px]:py-5"
      >
        <div
          key={active}
          className="lp-fade grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-8"
        >
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start text-[13px] font-semibold" style={{ color: product.color }}>
              <span
                className="rounded-full px-[9px] py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-[.04em] text-white"
                style={{ background: product.color }}
              >
                {product.badge}
              </span>
              {product.name}
            </span>

            <div className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.18] tracking-[-0.025em] text-[color:var(--ink-900)]">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[#5B6478]">{item.text}</p>
            </div>

            <ol className="flex flex-col gap-[18px] pt-1">
              {item.steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5">
                  <span
                    className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
                    style={{ background: product.tint, color: product.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-[3px] pt-1">
                    <span className="text-[16px] font-semibold text-[color:var(--ink-900)]">{s.title}</span>
                    <span className="text-[14.5px] leading-[1.55] text-[#5B6478]">{s.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-1 flex flex-wrap gap-2.5">
              <Link
                to="/#book-a-demo"
                className="inline-flex h-11 items-center gap-2 rounded-[10px] px-[18px] text-[14px] font-semibold"
                style={{ background: product.tint, color: product.color }}
              >
                {CTA.demo}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={productPath(active)}
                className="inline-flex h-11 items-center gap-2 rounded-[10px] border px-[18px] text-[14px] font-semibold"
                style={{
                  borderColor: `${product.color}55`,
                  color: product.color,
                }}
              >
                View {product.short} details
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] p-8 max-[639px]:p-4" style={{ background: item.mockBg }}>
            <React.Suspense fallback={<div className="aspect-[4/3] w-full" />}>{Demo && <Demo />}</React.Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
