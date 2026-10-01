import * as React from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { FAQS } from '../content/home'

/** "The questions that matter": accordion, one answer open at a time. */
export function FaqSection() {
  const [open, setOpen] = React.useState(0)
  const baseId = React.useId()

  return (
    <section id="faqs" className="lp-section">
      <div className="lp-container flex gap-24 max-[999px]:flex-col max-[999px]:gap-10">
        <div className="flex w-[380px] shrink-0 flex-col gap-4 max-[999px]:w-full max-[999px]:max-w-[640px]">
          <span className="lp-eyebrow">Questions</span>
          <h2 className="lp-h2">The questions that matter before you decide.</h2>
          <p className="lp-lead !text-[16px]">
            Every vendor shows a clean dashboard. Here is what actually sets ONESAZ apart. Have another question?{' '}
            <Link to="/#book-a-demo" className="font-medium !text-[color:var(--brand)] hover:underline">
              Ask us directly.
            </Link>
          </p>
        </div>

        <div className="flex flex-grow flex-col border-b border-[color:var(--line)]">
          {FAQS.map((f, i) => {
            const isOpen = i === open
            const btnId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <div key={f.q} className="border-t border-[color:var(--line)]">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-medium text-[color:var(--ink-900)] transition-colors hover:text-[color:var(--brand)] max-[639px]:py-5 max-[639px]:text-[16px]"
                  >
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E1E4EA] text-[color:var(--ink-600)]">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={btnId} className="lp-fade pb-6 pr-14 max-[639px]:pr-0">
                    <p className="text-[16px] leading-[1.65] text-[color:var(--ink-600)]">{f.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
