import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { PRODUCT_FAMILIES, type ProductFamily } from '../content/home'
import { productPath } from '../content/names'
import { useDemoPath } from '../components/useDemoPath'

/** Card surface matched to the reference: near-black top, warm olive-gold glow at the bottom. */
const CARD_BG =
  'radial-gradient(120% 55% at 50% 108%, rgba(196,184,58,.62) 0%, rgba(132,124,34,.30) 42%, rgba(56,54,20,0) 78%), linear-gradient(180deg, #121212 0%, #14140F 55%, #1C1B10 100%)'

/** Product family card: same content as before, on a dark surface. No hover effect, by request. */
function ProductCard({ family: p }: { family: ProductFamily }) {
  return (
    <article className="flex flex-col rounded-[28px] p-8 text-white max-[639px]:p-6" style={{ background: CARD_BG }}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-[family-name:var(--font-display)] text-[30px] font-bold tracking-[-0.02em]">{p.code}</span>
        <span className="rounded-md border border-white/15 bg-white/[.06] px-[9px] py-[5px] font-[family-name:var(--font-mono)] text-[11px] tracking-[.06em] text-white/75">
          {p.who}
        </span>
      </div>
      <h3 className="mt-5 text-[19px] font-semibold leading-[1.3]">{p.name}</h3>
      <p className="mt-3 text-[15px] leading-[1.6] text-white/70">{p.desc}</p>

      <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-white/85">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#CFC14E]" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={productPath(p.slug)}
        className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-[14.5px] font-semibold text-white underline-offset-4 hover:underline"
      >
        {p.cta}
        <ArrowRight size={15} />
      </Link>
    </article>
  )
}

/** "Everything your institution needs": six dark product family cards, each linking to its product page. */
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
