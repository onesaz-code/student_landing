import { SERVICE_CARDS } from '../content/home'

// Near-black at the top fading into burnt orange at the bottom, like the reference
const BAND_BG =
  'radial-gradient(60% 55% at 22% 100%, rgba(214,98,36,.55) 0%, rgba(214,98,36,0) 75%), linear-gradient(180deg, #02090B 0%, #050A0B 28%, #23120A 56%, #6A2D10 80%, #B5561E 100%)'

/** Thin orange arcs sweeping from the top-left corner down towards the bottom. */
const ARC_RADII = Array.from({ length: 22 }, (_, i) => 700 + i * 38)

function Arcs() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full max-[639px]:opacity-60"
      viewBox="0 0 2000 1000"
      preserveAspectRatio="xMinYMin slice"
    >
      <g fill="none" stroke="#E8793C" strokeWidth="1.2">
        {ARC_RADII.map((r, i) => (
          <circle key={r} cx={-640} cy={-140} r={r} strokeOpacity={0.75 - i * 0.014} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

/** "More than software": the six services every client gets. */
export function ServicesSection({ id = 'services' }: { id?: string }) {
  return (
    <section id={id} className="bg-white pt-24 max-[639px]:pt-16">
      {/* Header stays on the white page, outside the dark band */}
      <div className="lp-container flex flex-wrap items-end justify-between gap-x-16 gap-y-5 pb-12 max-[639px]:pb-9">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="lp-eyebrow">Services</span>
          <h2 className="lp-h2">More than software. A team behind your rollout.</h2>
        </div>
      </div>

      {/* Full-width dark-orange band: lead text, centred, then the cards */}
      <div className="relative isolate overflow-hidden py-24 max-[639px]:py-12" style={{ background: BAND_BG }}>
        <Arcs />
        <p className="lp-container relative mb-12 max-w-[680px] text-center text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#D3D6D8] max-[639px]:mb-8 max-[639px]:text-[16px]">
          Every ONESAZ client gets the people and services needed to set up, adopt and run the platform.
        </p>
        <div className="lp-container relative grid grid-cols-3 gap-6 max-[1099px]:grid-cols-2 max-[639px]:grid-cols-1 max-[639px]:gap-4">
          {SERVICE_CARDS.map((s) => (
            <div key={s.n} className="flex flex-col gap-3 rounded-[14px] bg-white p-8 max-[639px]:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FDF0E8] font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[#C2521C]">
                {s.n}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[19px] font-semibold text-[color:var(--ink-900)]">{s.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
