import { Link } from 'react-router-dom'
import { STEPS } from '../content/home'
import { useDemoPath } from '../components/useDemoPath'

/** "How we take your institution live": four numbered steps on a timeline. */
export function HowItWorksSection({ id = 'how-it-works' }: { id?: string }) {
  const demoPath = useDemoPath()
  return (
    <section id={id} className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col gap-16 max-[639px]:gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-4">
            <span className="lp-eyebrow">Working with ONESAZ</span>
            <h2 className="lp-h2">How we take your institution live.</h2>
          </div>
          <Link to={demoPath} className="lp-btn lp-btn-secondary">
            Plan your rollout
          </Link>
        </div>

        <div className="relative">
          {/* Timeline: horizontal on desktop, vertical when the steps stack */}
          <div
            aria-hidden
            className="absolute left-[22px] right-[22px] top-[22px] border-t-[1.5px] border-[#DCE0E7] max-[899px]:bottom-[22px] max-[899px]:right-auto max-[899px]:border-l-[1.5px] max-[899px]:border-t-0"
          />
          <ol className="relative grid grid-cols-4 gap-8 max-[899px]:grid-cols-1 max-[899px]:gap-7">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex flex-col gap-3.5 max-[899px]:grid max-[899px]:grid-cols-[44px_minmax(0,1fr)] max-[899px]:gap-x-5 max-[899px]:gap-y-1.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand)] font-[family-name:var(--font-mono)] text-[13px] text-white max-[899px]:row-span-2">
                  {s.n}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-semibold max-[899px]:mt-2.5">{s.title}</h3>
                <p className="pr-5 text-[15px] leading-[1.55] text-[color:var(--ink-600)] max-[899px]:col-start-2 max-[899px]:pr-0">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
