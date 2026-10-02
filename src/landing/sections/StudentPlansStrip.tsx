import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PLANS, PLANS_STRIP } from '../content/pricing'

/** Short line under each price in the strip. */
const UNIT: Record<string, string> = { free: 'Free', monthly: 'per month', annual: 'per year · save 40%' }

/** Home page: small "For individual students" band with the three prices, linking to /pricing. */
export function StudentPlansStrip() {
  return (
    <section id="student-plans" className="bg-white pb-6 pt-16 max-[639px]:pt-12">
      <div className="lp-container">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-[20px] border border-[color:var(--line)] bg-[#FBFBFD] px-8 py-7 max-[639px]:px-5 max-[639px]:py-6">
          <div className="flex max-w-[420px] flex-col gap-1.5">
            <span className="lp-eyebrow">{PLANS_STRIP.eyebrow}</span>
            <h2 className="font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.25] text-[color:var(--ink-900)]">
              {PLANS_STRIP.title}
            </h2>
            <p className="text-[14.5px] text-[color:var(--ink-600)]">{PLANS_STRIP.note}</p>
          </div>
          <ul className="flex flex-wrap gap-3 max-[639px]:w-full">
            {PLANS.map((p) => (
              <li
                key={p.id}
                className={`flex min-w-[112px] flex-col rounded-[12px] border bg-white px-4 py-3 max-[639px]:flex-1 ${
                  p.featured ? 'border-[color:var(--brand)]' : 'border-[color:var(--line)]'
                }`}
              >
                <span className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">
                  {p.price}
                </span>
                <span className="text-[13px] text-[color:var(--ink-600)]">{UNIT[p.id]}</span>
              </li>
            ))}
          </ul>
          <Link to="/pricing" className="lp-btn lp-btn-primary max-[639px]:w-full">
            {PLANS_STRIP.cta}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
