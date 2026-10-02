import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { PRODUCT_FAMILIES, type ProductFamily } from '../content/home'
import { productPath } from '../content/names'
import { useDemoPath } from '../components/useDemoPath'

/** ONESAZ logo colours (green-teal and sky blue), sampled from the logo file. */
const LOGO_GREEN = '#08C5A7'
const LOGO_BLUE = '#3FBBEE'
/** The top band runs green to blue like the logo, a few shades deeper so the white code stays readable. */
const BAND_BG = 'linear-gradient(90deg, #06937D 0%, #0A94A8 50%, #1E86C0 100%)'

/** Product family card: same content as before on a white card, with a logo-gradient band across the top. No hover effect. */
function ProductCard({ family: p }: { family: ProductFamily }) {
  return (
    // Subgrid: the band, intro, list and link sit on shared rows, so they line up across the cards in a row
    <article className="row-span-4 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-[24px] border border-[#DCEDEA] bg-white">
      <div className="flex items-center justify-between gap-3 px-7 py-5 max-[639px]:px-5" style={{ background: BAND_BG }}>
        <span className="font-[family-name:var(--font-display)] text-[28px] font-bold leading-none tracking-[-0.02em] text-white">
          {p.code}
        </span>
        <span className="whitespace-nowrap rounded-md bg-white px-2 py-1 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[.06em] text-[#075E52]">
          {p.who}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 px-7 pt-6 max-[639px]:px-5 max-[639px]:pt-5">
        <h3 className="text-[18px] font-semibold leading-[1.3] text-[color:var(--ink-900)]">{p.name}</h3>
        <p className="text-[14.5px] leading-[1.6] text-[color:var(--ink-600)]">{p.desc}</p>
      </div>

      <ul className="mx-7 mt-5 flex flex-col gap-2.5 self-start border-t border-[#E8EFEE] pt-5 max-[639px]:mx-5">
        {p.features.map((f, i) => (
          <li key={f} className="flex items-start gap-3 text-[14px] leading-[1.45] text-[color:var(--ink-900)]">
            {/* Dots alternate the two logo colours */}
            <span
              aria-hidden
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: i % 2 ? LOGO_BLUE : LOGO_GREEN }}
            />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={productPath(p.slug)}
        className="inline-flex items-center gap-1.5 self-end justify-self-start px-7 pb-7 pt-6 text-[14.5px] font-semibold text-[#0B7F65] underline-offset-4 hover:underline max-[639px]:px-5 max-[639px]:pb-6"
      >
        {p.cta}
        <ArrowRight size={15} />
      </Link>
    </article>
  )
}

/** "Everything your institution needs": six product family cards in the logo colours, each linking to its product page. */
export function ProductsSection({ id = 'products' }: { id?: string }) {
  const demoPath = useDemoPath()
  return (
    <section id={id} className="lp-section">
      <div className="lp-container flex flex-col items-center gap-14 max-[639px]:gap-10">
        <SectionHeader
          eyebrow="Our products"
          title="Everything your institution needs. One platform."
          lead="LMS, ERP, exams, device management, communication and AI, built as one product instead of stitched together from different vendors."
        />

        <div className="grid w-full grid-cols-3 gap-5 max-[1099px]:grid-cols-2 max-[639px]:grid-cols-1">
          {PRODUCT_FAMILIES.map((p) => (
            <ProductCard key={p.code} family={p} />
          ))}
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-[14px] bg-[color:var(--ink-900)] px-7 py-[22px] text-[#D5DAE4] max-[639px]:px-5">
          <p className="text-[16px]">
            <b className="font-semibold text-white">Start with the product you need.</b> Add the others as your institution grows.
          </p>
          <Link
            to={demoPath}
            className="inline-flex h-[42px] items-center rounded-lg bg-white px-[18px] text-[14px] font-medium text-[color:var(--ink-900)] transition-colors hover:bg-[#EEF2FD]"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  )
}
