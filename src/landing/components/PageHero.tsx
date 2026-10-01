import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface PageHeroProps {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead: string
  children?: React.ReactNode
}

/** Hero for inner pages: breadcrumb, eyebrow, H1, lead and optional actions or visual. */
export function PageHero({ crumbs, eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section
      className="pb-24 pt-10 max-[639px]:pb-16 max-[639px]:pt-6"
      style={{
        background:
          'radial-gradient(900px 520px at 12% 0%, rgba(99,132,255,.14), rgba(99,132,255,0) 70%), #FBFBFD',
      }}
    >
      <div className="lp-container flex flex-col gap-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-[color:var(--ink-400)]">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>›</span>}
                {c.to ? (
                  <Link to={c.to} className="text-[color:var(--ink-600)] hover:text-[color:var(--brand)]">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-[color:var(--ink-900)]">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-4 text-center">
          <span className="lp-eyebrow">{eyebrow}</span>
          <h1 className="lp-h1">{title}</h1>
          <p className="lp-lead">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
