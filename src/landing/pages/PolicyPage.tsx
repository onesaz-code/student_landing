import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, CalendarX, Clock, CopyCheck, Mail, Phone, RefreshCw, RotateCcw, type LucideIcon } from 'lucide-react'
import { BRAND } from '../content/names'
import { POLICIES, type Policy, type PolicyBlock, type PolicyGlance } from '../content/policies'

const GLANCE_ICONS: Record<PolicyGlance['icon'], LucideIcon> = {
  refund: RotateCcw,
  clock: Clock,
  duplicate: CopyCheck,
  cancel: CalendarX,
  access: CalendarCheck,
  reactivate: RefreshCw,
}

/** Turns email addresses in policy text into mailto links. */
function withEmail(text: string) {
  const parts = text.split(BRAND.email)
  if (parts.length === 1) return text
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${BRAND.email}`} className="font-medium text-[color:var(--brand)] underline underline-offset-2">
            {BRAND.email}
          </a>,
          part,
        ],
  )
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === 'p') return <p className="text-[16px] leading-[1.75] text-[color:var(--ink-600)]">{withEmail(block.text)}</p>
  if (block.type === 'note')
    return (
      <p className="rounded-[12px] border border-[#C9D4F6] bg-[#EEF2FD] px-5 py-4 text-[15px] leading-[1.65] text-[#1B2F7A]">
        {withEmail(block.text)}
      </p>
    )
  if (block.type === 'steps')
    return (
      <ol className="flex flex-col gap-3">
        {block.items.map((item, i) => (
          <li key={item} className="flex gap-3.5 text-[16px] leading-[1.65] text-[color:var(--ink-600)]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand)] text-[13px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5">{withEmail(item)}</span>
          </li>
        ))}
      </ol>
    )
  return (
    <ul className="flex flex-col gap-2.5">
      {block.items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-[color:var(--ink-600)]">
          <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
          <span>{withEmail(item)}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Refund and Cancellation policy pages: hero with the key points at a glance, a sticky "On this page" list
 * on wide screens, numbered sections, and a contact card. The two pages link to each other.
 */
export function PolicyPage({ policy: key }: { policy: Policy['key'] }) {
  const policy = POLICIES[key]
  const other = POLICIES[key === 'refund' ? 'cancellation' : 'refund']

  return (
    <>
      <section
        className="pb-14 pt-10 max-[639px]:pb-10 max-[639px]:pt-6"
        style={{ background: 'radial-gradient(900px 520px at 12% 0%, rgba(99,132,255,.14), rgba(99,132,255,0) 70%), #FBFBFD' }}
      >
        <div className="lp-container flex flex-col gap-10 max-[639px]:gap-7">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-[color:var(--ink-400)]">
              <li>
                <Link to="/" className="text-[color:var(--ink-600)] hover:text-[color:var(--brand)]">
                  Home
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="font-medium text-[color:var(--ink-900)]">
                {policy.title}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="lp-eyebrow">Legal</span>
            <h1 className="lp-h1">{policy.title}</h1>
            <p className="lp-lead max-w-[640px]">{policy.lead}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[14px]">
              <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[color:var(--ink-600)]">
                Last updated {policy.updated}
              </span>
              <Link to={other.path} className="inline-flex items-center gap-1.5 font-medium text-[color:var(--brand)]">
                Read the {other.title}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <ul className="grid grid-cols-3 gap-4 max-[899px]:grid-cols-1">
            {policy.glance.map((g) => {
              const Icon = GLANCE_ICONS[g.icon]
              return (
                <li key={g.title} className="flex gap-4 rounded-[16px] border border-[color:var(--line)] bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[color:var(--brand-tint)] text-[color:var(--brand)]">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-semibold text-[color:var(--ink-900)]">{g.title}</span>
                    <span className="text-[14.5px] leading-[1.55] text-[color:var(--ink-600)]">{g.text}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white pb-24 pt-14 max-[639px]:pb-16 max-[639px]:pt-10">
        <div className="lp-container grid grid-cols-[240px_minmax(0,1fr)] gap-16 max-[1023px]:grid-cols-1 max-[1023px]:gap-8">
          {/* On this page (wide screens: sticky list; smaller: collapsible) */}
          <div className="max-[1023px]:hidden">
            <nav aria-label="On this page" className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-1">
              <span className="mb-2 text-[13px] font-semibold uppercase tracking-[.08em] text-[color:var(--ink-400)]">On this page</span>
              {policy.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-[8px] px-3 py-2 text-[14.5px] text-[color:var(--ink-600)] hover:bg-[color:var(--surface-alt)] hover:text-[color:var(--ink-900)]"
                >
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </div>
          <details className="hidden rounded-[14px] border border-[color:var(--line)] bg-[#FBFBFD] max-[1023px]:block">
            <summary className="cursor-pointer px-5 py-4 text-[15px] font-semibold text-[color:var(--ink-900)]">On this page</summary>
            <nav aria-label="On this page" className="flex flex-col gap-1 px-3 pb-4">
              {policy.sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="rounded-[8px] px-2 py-2 text-[15px] text-[color:var(--ink-600)]">
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </details>

          <div className="flex max-w-[760px] flex-col gap-12 max-[639px]:gap-10">
            {policy.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="flex flex-col gap-4">
                <h2 className="flex items-baseline gap-3 font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.3] text-[color:var(--ink-900)]">
                  <span className="font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[color:var(--brand)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </section>
            ))}

            <div className="flex flex-col gap-5 rounded-[20px] bg-[color:var(--surface-dark)] p-8 text-white max-[639px]:p-6">
              <div className="flex flex-col gap-1.5">
                <h2 className="font-[family-name:var(--font-display)] text-[22px] font-semibold">{policy.contactTitle}</h2>
                <p className="text-[15px] text-[#A9B2C3]">Our support team is happy to help.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${BRAND.email}`} className="lp-btn lp-btn-on-dark">
                  <Mail size={16} />
                  {BRAND.email}
                </a>
                <a href={BRAND.phoneHref} className="lp-btn lp-btn-ghost-dark">
                  <Phone size={16} />
                  {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
