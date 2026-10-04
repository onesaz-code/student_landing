import * as React from 'react'
import { Link, useNavigationType } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTA, productBySlug, productPath, type ProductSlug, solidFill } from '../content/names'
import { TOUR } from '../content/tour'
import { DEMOS } from '../demos'
import { PRODUCT_ICONS } from '../components/productIcons'
import { WaveBackground } from '../components/WaveBackground'

// Fades the wave canvas out on all four edges so it never shows a hard edge
const FADE =
  'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 25%, #000 70%, transparent)'
const WAVE_MASK: React.CSSProperties = {
  WebkitMaskImage: FADE,
  WebkitMaskComposite: 'source-in',
  maskImage: FADE,
  maskComposite: 'intersect',
}

/**
 * "See it in action": one tab per product (10, equal size), each showing the
 * product story on the left and its animated demo on the right.
 * Sits inside the hero, as in the design.
 */
const TOUR_KEY = 'onesaz-tour-product'

function savedTour(): ProductSlug | null {
  try {
    const saved = sessionStorage.getItem(TOUR_KEY)
    return TOUR.some((t) => t.slug === saved) ? (saved as ProductSlug) : null
  } catch {
    return null
  }
}

export function ProductTour() {
  const navigationType = useNavigationType()
  const [active, setActive] = React.useState<ProductSlug>(() =>
    navigationType === 'POP' ? (savedTour() ?? TOUR[0].slug) : TOUR[0].slug,
  )

  React.useEffect(() => {
    try {
      sessionStorage.setItem(TOUR_KEY, active)
    } catch {
      /* storage can be blocked */
    }
  }, [active])
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
    <div id="product-tour" className="mt-16 flex w-full flex-col items-center gap-7 text-left max-[639px]:mt-12">
      {/* Heading and tabs, with slow flowing waves behind them (edges faded so there is no box) */}
      <div className="relative isolate flex w-full flex-col items-center gap-7">
        <WaveBackground
          className="absolute -inset-x-10 -bottom-12 top-[-28px] -z-10 h-[calc(100%+76px)] w-[calc(100%+80px)]"
          style={WAVE_MASK}
        />
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="lp-eyebrow">See it in action</span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)] max-[639px]:text-[22px] max-[639px]:leading-snug">
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
            const Icon = PRODUCT_ICONS[t.slug]
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
                className={`flex min-h-[50px] items-center max-[1099px]:basis-[calc((100%-36px)/4)] max-[899px]:basis-auto justify-center gap-2 rounded-[12px] border px-3 py-1.5 text-left text-[13.5px] font-semibold leading-[1.25] transition-[background,color,box-shadow,border-color] duration-200 max-[639px]:min-h-[44px] max-[639px]:px-2.5 max-[639px]:text-[13px] ${
                  on ? 'text-white' : 'border-[#E3E7EF] bg-white text-[#1F2937]'
                }`}
                style={
                  on
                    ? {
                        background: p.color,
                        borderColor: p.color,
                        boxShadow: `0 10px 20px -12px ${p.color}`,
                      }
                    : undefined
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className={`shrink-0 max-[639px]:h-[17px] max-[639px]:w-[17px] ${on ? '' : 'text-[#667085]'}`}
                />
                <span className="max-[639px]:hidden">{p.name}</span>
                <span className="hidden max-[639px]:inline">{p.short}</span>
              </button>
            )
          })}
        </div>
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
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2 self-start text-[13px] font-semibold" style={{ color: product.color }}>
              <span
                className="rounded-md px-2 py-[3px] font-[family-name:var(--font-mono)] text-[10.5px] font-bold tracking-[.06em] text-white"
                style={{ background: solidFill(product.color) }}
              >
                {product.badge}
              </span>
              {product.name}
            </span>

            <h3 className="mt-5 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(24px,2.3vw,31px)] font-semibold leading-[1.2] tracking-[-0.02em] text-[color:var(--ink-900)] max-[899px]:max-w-none">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.6] text-[color:var(--ink-600)]">{item.text}</p>

            {/* The three points: numbered list with thin dividers */}
            <ol className="mt-6 flex flex-col border-t border-[#EEF0F4]">
              {item.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[32px_minmax(0,1fr)] border-b border-[#EEF0F4] py-3.5">
                  <span className="pt-[3px] font-[family-name:var(--font-mono)] text-[12px] font-semibold" style={{ color: product.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">{s.title}</span>
                    <span className="text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{s.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                to="/#book-a-demo"
                className="inline-flex h-11 items-center gap-2 rounded-[10px] px-[18px] text-[14px] font-semibold text-white"
                style={{ background: solidFill(product.color) }}
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
