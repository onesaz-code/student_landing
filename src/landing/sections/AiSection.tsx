import { Link } from 'react-router-dom'
import { ArrowUpRight, Crosshair, FilePen, Phone, Sparkles, type LucideIcon } from 'lucide-react'
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
export function AiSection({ id = 'ai' }: { id?: string }) {
  return (
    <section id={id} className="lp-section">
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
              // Resource-card style (reference: Scalefusion success stories). No hover effect, by request.
              <article key={c.key} className="flex flex-col rounded-[20px] border border-[#E7E7EC] bg-[#F5F5F7] p-5">
                <div aria-hidden className="flex h-[150px] items-center justify-center rounded-[14px] bg-white">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2447D1,#7B5CE6)] text-white">
                    <Icon size={28} strokeWidth={1.75} />
                  </span>
                </div>
                <span className="mt-5 text-[14px] font-medium text-[#6A4BD8]">{productBySlug(c.slug)!.name}</span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-semibold leading-[1.3] text-[color:var(--ink-900)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[color:var(--ink-600)]">{c.text}</p>
                <div className="mt-auto pt-5">
                  <Link
                    to={productPath(c.slug)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D9DCE3] bg-white px-4 py-2 text-[14px] font-medium text-[color:var(--ink-900)]"
                  >
                    Learn more
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
