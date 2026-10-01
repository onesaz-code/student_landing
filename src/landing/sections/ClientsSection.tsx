import * as React from 'react'
import { CLIENTS } from '../content/home'

type Client = (typeof CLIENTS)[number]

// Two rows, moving in opposite directions
const half = Math.ceil(CLIENTS.length / 2)
const ROWS: Client[][] = [CLIENTS.slice(0, half), CLIENTS.slice(half)]
/** Seconds per logo, so speed stays the same whatever the number of clients. */
const SECONDS_PER_LOGO = 4.5

function LogoCard({ client, hidden }: { client: Client; hidden: boolean }) {
  const [failed, setFailed] = React.useState(false)
  // A logo that fails to load is dropped instead of leaving an empty card
  if (failed) return null
  return (
    <li className="mr-6 flex h-[104px] min-w-[200px] shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white px-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_-20px_rgba(20,40,110,.35)] max-[639px]:mr-4 max-[639px]:h-[84px] max-[639px]:min-w-[150px] max-[639px]:px-5">
      <img
        src={client.logo}
        alt={hidden ? '' : client.name}
        title={client.name}
        draggable={false}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
        className="block h-[68px] w-auto max-w-[200px] object-contain max-[639px]:h-[52px] max-[639px]:max-w-[150px]"
      />
    </li>
  )
}

/**
 * "Trusted by leading institutions": every client logo in two endless marquee rows.
 * Each row is rendered twice so the -50% translate loops seamlessly; the copy is hidden from screen readers.
 * The rows never pause on hover, click or tap. With reduced motion they stop and scroll by hand.
 * Logos load eagerly: lazy loading misses images that move into view by transform, leaving empty cards.
 */
export function ClientsSection() {
  return (
    <section
      id="clients"
      className="flex flex-col items-center gap-11 overflow-hidden bg-[color:var(--surface-alt)] pb-[84px] pt-[76px] max-[639px]:gap-8 max-[639px]:pb-16 max-[639px]:pt-14"
    >
      <h2 className="mx-6 border-b-[3px] border-[color:var(--ink-900)] pb-1.5 text-center text-[clamp(20px,2.2vw,30px)] font-bold uppercase leading-[1.3] tracking-[.14em] text-[color:var(--ink-900)]">
        Trusted by leading{' '}
        <span className="bg-[linear-gradient(90deg,#D9A21B_0%,#C4A435_45%,#7FA87C_100%)] bg-clip-text text-transparent">institutions</span>
      </h2>

      <div className="flex w-full flex-col gap-5 max-[639px]:gap-3.5">
        {ROWS.map((row, r) => (
          <div key={r} className="lp-marquee w-full select-none overflow-hidden">
            <div
              className={`lp-marquee-track flex w-max py-1.5 ${r === 1 ? 'lp-marquee-reverse' : ''}`}
              style={{ animationDuration: `${row.length * SECONDS_PER_LOGO}s` }}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex" aria-hidden={copy === 1 || undefined}>
                  {row.map((c) => (
                    <LogoCard key={c.name} client={c} hidden={copy === 1} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
