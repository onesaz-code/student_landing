import { STATS } from '../content/home'

const BAND_BG =
  'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.2px) 0 0 / 18px 18px, radial-gradient(60% 90% at 50% 50%, #353852 0%, #23243A 45%, #18181D 100%)'
const NUMBER_FILL = 'linear-gradient(90deg, #FFAA4C 0%, #E7A0B4 45%, #C27CFF 75%, #6D6BFF 100%)'

/** Dark band with the headline numbers, shown above "See it in action". */
export function StatsBand() {
  return (
    <div
      className="mt-16 w-full rounded-[24px] border-[1.5px] border-[#4E74D9] px-10 py-12 shadow-[0_24px_48px_-28px_rgba(15,23,41,.55)] max-[639px]:mt-12 max-[639px]:rounded-[18px] max-[639px]:px-4 max-[639px]:py-8"
      style={{ background: BAND_BG }}
    >
      <dl className="grid grid-cols-4 gap-6 max-[899px]:grid-cols-2 max-[899px]:gap-y-9 max-[379px]:gap-x-3">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2 text-center">
            <dt className="order-last text-[clamp(14px,1.3vw,18px)] text-white">{s.label}</dt>
            <dd
              className="font-[family-name:var(--font-display)] text-[clamp(28px,3.2vw,46px)] max-[379px]:text-[22px] font-semibold leading-none tracking-[-0.02em]"
              style={{ background: NUMBER_FILL, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
            >
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
