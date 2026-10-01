import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { PRODUCT_FAMILIES } from '../content/home'
import { productPath } from '../content/names'
import { useDemoPath } from '../components/useDemoPath'

/** "Everything your institution needs": six product family cards, each linking to its product page. */
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
            <article
              key={p.code}
              className="lp-lift flex flex-col overflow-hidden rounded-[18px] border border-[color:var(--line)] bg-white"
            >
              <div
                className="flex flex-col gap-3.5 border-b border-[#EEF0F3] px-7 pb-6 pt-7 max-[639px]:px-6"
                style={{ background: p.tint }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-[family-name:var(--font-display)] text-[30px] font-bold tracking-[-0.02em]"
                    style={{ color: p.color }}
                  >
                    {p.code}
                  </span>
                  <span className="rounded-md border border-[color:var(--line)] bg-white px-[9px] py-[5px] font-[family-name:var(--font-mono)] text-[11px] tracking-[.06em] text-[color:var(--ink-600)]">
                    {p.who}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{p.name}</h3>
                <p className="text-[14px] leading-[1.6] text-[color:var(--ink-600)]">{p.desc}</p>
              </div>
              <div className="flex flex-grow flex-col gap-[11px] px-7 pb-7 pt-[22px] max-[639px]:px-6">
                <ul className="flex flex-col gap-[11px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-[color:var(--ink-900)]">
                      <span
                        className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                        style={{ background: p.tint, color: p.color }}
                      >
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={productPath(p.slug)}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-3.5 text-[14px] font-semibold"
                  style={{ color: p.color }}
                >
                  {p.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
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
