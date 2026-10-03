import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: string
  lead: string
  children?: ReactNode
}

/** Hero for inner pages: eyebrow, H1, lead and optional actions or visual. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section
      className="pb-24 pt-10 max-[639px]:pb-16 max-[639px]:pt-6"
      style={{
        background:
          'radial-gradient(900px 520px at 12% 0%, rgba(99,132,255,.14), rgba(99,132,255,0) 70%), #FBFBFD',
      }}
    >
      <div className="lp-container flex flex-col gap-10">
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
