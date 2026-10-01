import { SectionHeader } from './SectionHeader'

interface PlannedSectionProps {
  id: string
  eyebrow: string
  title: string
  phase: string
  alt?: boolean
}

/**
 * Temporary placeholder that reserves a section's place, anchor and title
 * until its build phase. Remove once every section is implemented.
 */
export function PlannedSection({ id, eyebrow, title, phase, alt = false }: PlannedSectionProps) {
  return (
    <section id={id} className={`lp-section ${alt ? 'lp-section-alt' : ''}`}>
      <div className="lp-container flex flex-col items-center gap-8">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="w-full rounded-2xl border border-dashed border-[#CBD2DE] px-6 py-10 text-center text-[14px] text-[color:var(--ink-400)]">
          Built in {phase}
        </div>
      </div>
    </section>
  )
}
