import * as React from 'react'
import { Link } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { Segmented } from '../components/Segmented'
import { SectionHeader } from '../components/SectionHeader'
import { SOLUTION_DETAILS } from '../content/home'
import { CTA, SOLUTIONS, productBySlug, productPath } from '../content/names'
import { useDemoPath } from '../components/useDemoPath'

type SolutionId = (typeof SOLUTIONS)[number]['id']

const GRADES = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B', '11', '12']
const DEPARTMENTS = ['B.Sc', 'B.Com', 'BBA', 'BCA', 'B.A', 'M.Sc', 'M.Com', 'MBA']

/** Tile grid used by the school (grades) and college (departments) visuals. */
function TileGrid({ items, primary, secondary }: { items: string[]; primary: number; secondary: number }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {items.map((t, i) => (
        <span
          key={t}
          className={`flex h-11 items-center justify-center rounded-lg font-[family-name:var(--font-mono)] text-[12px] ${
            i === primary
              ? 'bg-[color:var(--brand)] text-white'
              : i === secondary
                ? 'bg-[#DCE3FA] text-[color:var(--brand)]'
                : 'border border-[#E1E4EA] bg-white text-[#667085]'
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/** Small illustration on the right of each institution type. */
function SolutionVisual({ id }: { id: SolutionId }) {
  if (id === 'schools') {
    return (
      <div className="w-[300px] max-w-full">
        <TileGrid items={GRADES} primary={4} secondary={5} />
      </div>
    )
  }
  if (id === 'colleges') {
    return (
      <div className="flex w-[320px] max-w-full flex-col gap-3">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[.08em] text-[#98A2B3]">
          DEPARTMENTS &amp; PROGRAMMES
        </span>
        <TileGrid items={DEPARTMENTS} primary={1} secondary={5} />
      </div>
    )
  }
  if (id === 'coaching-institutes') {
    return (
      <div className="flex w-[340px] max-w-full flex-col gap-3 text-[12px]">
        <div className="flex justify-between font-[family-name:var(--font-mono)] text-[10px] text-[#98A2B3]">
          <span>07:00</span>
          <span>12:00</span>
          <span>17:00</span>
          <span>21:00</span>
        </div>
        <span className="flex h-10 w-[40%] items-center rounded-lg bg-[color:var(--brand)] pl-3 text-white">Batch A · JEE</span>
        <span className="ml-[55%] flex h-10 w-[30%] items-center whitespace-nowrap rounded-lg bg-[#DCE3FA] pl-3 text-[color:var(--brand)]">
          Batch B · NEET
        </span>
        <span className="ml-[70%] flex h-10 w-[30%] items-center rounded-lg border border-[#E1E4EA] bg-white pl-3 text-[color:var(--ink-600)]">
          Foundation
        </span>
      </div>
    )
  }
  return (
    <div className="flex w-[340px] max-w-full flex-col items-center text-[12px]">
      <span className="flex h-10 items-center rounded-lg bg-[color:var(--ink-900)] px-[18px] text-[13px] font-medium text-white">
        Education Trust
      </span>
      <div className="h-5 border-l-[1.5px] border-[#C9CFDA]" />
      <div className="h-5 w-[216px] max-w-[70%] rounded-t-lg border-[1.5px] border-b-0 border-[#C9CFDA]" />
      <div className="flex gap-3">
        <span className="flex h-10 w-24 items-center justify-center rounded-lg border border-[#E1E4EA] bg-white">Campus 1</span>
        <span className="flex h-10 w-24 items-center justify-center rounded-lg bg-[#DCE3FA] text-[color:var(--brand)]">Campus 2</span>
        <span className="flex h-10 w-24 items-center justify-center rounded-lg border border-[#E1E4EA] bg-white">Campus 3</span>
      </div>
    </div>
  )
}

/** "Solutions for every kind of institution": switch between institution types. */
export function SolutionsSection({ id = 'solutions' }: { id?: string }) {
  const demoPath = useDemoPath()
  const [active, setActive] = React.useState<SolutionId>('schools')
  const d = SOLUTION_DETAILS[active]
  const label = SOLUTIONS.find((s) => s.id === active)!.name

  return (
    <section id={id} className="lp-section">
      <div className="lp-container flex flex-col items-center gap-10">
        <SectionHeader eyebrow="Who we serve" title="Solutions for every kind of institution." />

        <Segmented
          label="Institution type"
          options={SOLUTIONS.map((s) => ({ id: s.id, label: s.name }))}
          value={active}
          onChange={setActive}
          controls="solutions-panel"
        />

        <div
          id="solutions-panel"
          role="tabpanel"
          key={active}
          className="lp-fade flex w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white max-[899px]:flex-col"
        >
          <div className="flex flex-grow flex-col gap-[18px] p-12 max-[899px]:p-8 max-[639px]:p-6">
            <h3 className="font-[family-name:var(--font-display)] text-[32px] font-semibold tracking-[-0.02em] max-[639px]:text-[26px]">
              {d.title}
            </h3>
            <p className="text-[17px] leading-[1.6] text-[color:var(--ink-600)]">{d.desc}</p>
            <ul className="flex flex-col gap-3 pt-1">
              {d.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px]">
                  <CircleCheck size={16} strokeWidth={1.75} className="shrink-0 text-[color:var(--brand)]" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-1 flex flex-col gap-2.5 border-t border-[#EEF0F3] pt-2">
              <span className="pt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.08em] text-[color:var(--ink-400)]">
                Products for {label}
              </span>
              <div className="flex flex-wrap gap-2">
                {d.products.map((slug) => {
                  const p = productBySlug(slug)!
                  return (
                    <Link
                      key={slug}
                      to={productPath(slug)}
                      className="inline-flex h-8 items-center gap-[7px] rounded-full border border-[#E3E7EF] bg-white px-3 text-[13px] font-medium text-[#1F2637] transition-colors hover:border-[#C9D0DD] hover:bg-[color:var(--surface-alt)]"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                      {p.short}
                    </Link>
                  )
                })}
              </div>
            </div>
            <Link to={demoPath} className="lp-btn lp-btn-primary mt-3 self-start">
              {CTA.demo}
            </Link>
          </div>
          <div
            aria-hidden
            className="flex min-w-[340px] flex-[0_1_420px] items-center justify-center border-l border-[#EEF0F3] bg-[#F6F7F9] p-8 max-[899px]:min-w-0 max-[899px]:flex-auto max-[899px]:border-l-0 max-[899px]:border-t max-[639px]:px-4"
          >
            <SolutionVisual id={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
