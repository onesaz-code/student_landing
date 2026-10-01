import { SERVICE_CARDS } from '../content/home'

/** "More than software": the six services every client gets. */
export function ServicesSection({ id = 'services' }: { id?: string }) {
  return (
    <section id={id} className="lp-section">
      <div className="lp-container flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex max-w-[640px] flex-col gap-4">
            <span className="lp-eyebrow">Services</span>
            <h2 className="lp-h2">More than software. A team behind your rollout.</h2>
          </div>
          <p className="lp-lead flex-[0_1_420px] !text-[17px]">
            Every ONESAZ client gets the people and services needed to set up, adopt and run the platform.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[1099px]:grid-cols-2 max-[639px]:grid-cols-1">
          {SERVICE_CARDS.map((s) => (
            <div key={s.n} className="lp-lift flex flex-col gap-3 rounded-2xl border border-[color:var(--line)] bg-white p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[color:var(--brand-tint)] font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[color:var(--brand)]">
                {s.n}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[19px] font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
