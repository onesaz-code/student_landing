import * as React from 'react'
import { STATS } from '../content/home'

const BAND_BG =
  'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.2px) 0 0 / 18px 18px, radial-gradient(60% 90% at 50% 50%, #353852 0%, #23243A 45%, #18181D 100%)'
const NUMBER_FILL = 'linear-gradient(90deg, #FFAA4C 0%, #E7A0B4 45%, #C27CFF 75%, #6D6BFF 100%)'
const DURATION_MS = 1600

function parseStat(value: string) {
  const suffix = value.replace(/^[\d,]+/, '')
  const target = Number(value.replace(/[^\d]/g, ''))
  return { target, suffix }
}

function formatCount(n: number) {
  return Math.round(n).toLocaleString('en-US')
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

/** Counts from 0 to the headline figure once the band is on screen. */
function CountUp({ value, active, delay }: { value: string; active: boolean; delay: number }) {
  const { target, suffix } = parseStat(value)
  const [shown, setShown] = React.useState(0)
  const final = `${formatCount(target)}${suffix}`

  React.useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target)
      return
    }

    let frame = 0
    let start: number | undefined
    const tick = (now: number) => {
      if (start == null) start = now
      const t = Math.min(1, (now - start) / DURATION_MS)
      setShown(target * easeOutCubic(t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    const wait = window.setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(wait)
      cancelAnimationFrame(frame)
    }
  }, [active, delay, target])

  const fill = {
    background: NUMBER_FILL,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  } as const

  return (
    <span className="relative block">
      <span className="invisible" style={fill}>
        {final}
      </span>
      <span className="absolute inset-0" style={fill}>
        {formatCount(shown)}
        {suffix}
      </span>
    </span>
  )
}

/** Dark band with the headline numbers, shown above "See it in action". */
export function StatsBand() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = () => setActive(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mt-16 w-full rounded-[24px] border-[1.5px] border-[#4E74D9] px-10 py-12 shadow-[0_24px_48px_-28px_rgba(15,23,41,.55)] max-[639px]:mt-12 max-[639px]:rounded-[18px] max-[639px]:px-4 max-[639px]:py-8"
      style={{ background: BAND_BG }}
    >
      <dl className="grid grid-cols-4 gap-6 max-[899px]:grid-cols-2 max-[899px]:gap-y-9 max-[379px]:gap-x-3">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-2 text-center">
            <dt className="order-last text-[clamp(14px,1.3vw,18px)] text-white">{s.label}</dt>
            <dd className="font-[family-name:var(--font-display)] text-[clamp(28px,3.2vw,46px)] max-[379px]:text-[22px] font-semibold leading-none tracking-[-0.02em]">
              <CountUp value={s.value} active={active} delay={i * 120} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
