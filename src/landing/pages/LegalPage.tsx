import * as React from 'react'
import { Link } from 'react-router-dom'
import { mdmLegalPages, type MdmDocSection } from '../../data/mdmSiteContent'

type LegalKey = 'privacy' | 'terms' | 'cookie' | 'gdpr' | 'refund' | 'cancellation'

const EMAIL_RE = /\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi

/** Turns email addresses in legal text into mailto links. */
function withEmailLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(EMAIL_RE)) {
    const i = m.index ?? 0
    if (i > last) parts.push(text.slice(last, i))
    parts.push(
      <a key={i} href={`mailto:${m[0]}`} className="font-medium text-[color:var(--brand)] hover:underline">
        {m[0]}
      </a>,
    )
    last = i + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Section({ s }: { s: MdmDocSection }) {
  return (
    <section id={s.id} className="flex flex-col gap-3">
      {s.title && <h2 className="text-[20px] font-semibold text-[color:var(--ink-900)]">{s.title}</h2>}
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="text-[15.5px] leading-[1.75] text-[color:var(--ink-600)]">
          {withEmailLinks(p)}
        </p>
      ))}
      {s.bullets && (
        <ul className={`flex flex-col gap-2 pl-5 text-[15.5px] leading-[1.7] text-[color:var(--ink-600)] ${s.ordered ? 'list-decimal' : 'list-disc'}`}>
          {s.bullets.map((b, i) => (
            <li key={i}>{withEmailLinks(b)}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

/**
 * Legal pages in the new layout. The text comes unchanged from the existing
 * legal content (src/data/mdmSiteContent.ts), so nothing legal is rewritten.
 */
export function LegalPage({ page }: { page: LegalKey }) {
  const cfg = mdmLegalPages[page]
  return (
    <section className="pb-24 pt-10 max-[639px]:pb-16 max-[639px]:pt-6">
      <div className="lp-container">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-[color:var(--ink-400)]">
          <Link to="/" className="text-[color:var(--ink-600)] hover:text-[color:var(--brand)]">
            Home
          </Link>
          <span className="mx-2" aria-hidden>
            ›
          </span>
          <span aria-current="page" className="font-medium text-[color:var(--ink-900)]">
            {cfg.documentTitle}
          </span>
        </nav>
        <article className="mx-auto mt-10 flex max-w-[820px] flex-col gap-8">
          <h1 className="lp-h1">{cfg.documentTitle}</h1>
          {cfg.sections.map((s, i) => (
            <Section key={s.id ?? i} s={s} />
          ))}
        </article>
      </div>
    </section>
  )
}
