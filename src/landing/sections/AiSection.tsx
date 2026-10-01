import { Link } from 'react-router-dom'
import { ArrowRight, Crosshair, FilePen, Phone, Sparkles, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { AI_CARDS } from '../content/home'
import { productBySlug, productPath } from '../content/names'

const ICONS: Record<(typeof AI_CARDS)[number]['key'], LucideIcon> = {
  calls: Phone,
  grades: FilePen,
  writes: Sparkles,
  practice: Crosshair,
}

/** "AI that is already doing the work": four AI capabilities, each linking to its product. */
export function AiSection() {
  return (
    <section id="ai" className="lp-section">
      <div className="lp-container flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow="ONESAZ AI"
          title="AI that is already doing the work."
          lead="Built into the platform, not sold as a separate add-on."
        />

        <div className="grid w-full grid-cols-4 gap-5 max-[1099px]:grid-cols-2 max-[639px]:grid-cols-1">
          {AI_CARDS.map((c) => {
            const Icon = ICONS[c.key]
            return (
              <Link
                key={c.key}
                to={productPath(c.slug)}
                className="lp-lift group flex flex-col gap-3 overflow-hidden rounded-[18px] border border-[color:var(--line)] bg-white p-7 hover:border-[#DCE3FA]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2447D1,#7B5CE6)] text-white">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[20px] font-semibold group-hover:text-[color:var(--brand)]">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{c.text}</p>
                <span className="mt-auto flex items-center justify-between gap-2 pt-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[.08em] text-[color:var(--brand)]">
                  <span>{productBySlug(c.slug)!.name.toUpperCase()}</span>
                  <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
