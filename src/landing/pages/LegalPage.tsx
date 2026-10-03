import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { LEGAL_NAV, LEGAL_PAGES, type LegalKey, type LegalSection } from '../content/legal'

const EMAIL_RE = /\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi

/** Turns email addresses in legal text into mailto links. */
function withEmailLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(EMAIL_RE)) {
    const i = m.index ?? 0
    if (i > last) parts.push(text.slice(last, i))
    parts.push(
      <a key={i} href={`mailto:${m[0]}`} className="text-[color:var(--brand)] hover:underline">
        {m[0]}
      </a>,
    )
    last = i + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Section({ s }: { s: LegalSection }) {
  return (
    <section id={s.id} className="flex flex-col gap-3 [overflow-wrap:anywhere]">
      {s.title && (
        <h2 className="text-[17px] font-bold text-[#1a1a1a]">{s.title}</h2>
      )}
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="text-[15px] font-normal leading-[1.75] text-[#3c3c3c]">
          {withEmailLinks(p)}
        </p>
      ))}
      {s.bullets && (
        <ul className="flex flex-col gap-2">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] font-normal leading-[1.7] text-[#3c3c3c]">
              <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
              <span>{withEmailLinks(b)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** Privacy, terms, and cookie pages. Copy lives in content/legal.ts. */
export function LegalPage({ page }: { page: LegalKey }) {
  const cfg = LEGAL_PAGES[page]
  return (
    <section className="bg-white pb-28 pt-14 font-[Arial,Helvetica,sans-serif] max-[639px]:pb-16 max-[639px]:pt-8">
      <div className="lp-container grid grid-cols-[210px_minmax(0,680px)] items-start justify-start gap-x-20 max-[899px]:grid-cols-1 max-[899px]:gap-8">
        <nav aria-label="Policies" className="sticky top-[calc(var(--header-h)+32px)] max-[899px]:static">
          <p className="mb-4 text-[15px] font-bold text-[#1a1a1a]">Policies</p>
          <ul className="flex flex-col gap-3 max-[899px]:flex-row max-[899px]:flex-wrap max-[899px]:gap-x-5 max-[899px]:gap-y-2.5">
            {LEGAL_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-[14.5px] leading-snug text-[color:var(--brand)] hover:underline ${isActive ? 'font-medium' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0">
          <h1 className="text-[32px] font-bold leading-[1.2] text-[#1a1a1a] max-[639px]:text-[28px]">{cfg.documentTitle}</h1>
          {(cfg.version || cfg.effective) && (
            <div className="mt-5 flex flex-col gap-1 text-[13.5px] font-normal leading-snug text-[#8d8d8d]">
              {cfg.version && <p>Version: {cfg.version}</p>}
              {cfg.effective && <p>Effective date: {cfg.effective}</p>}
            </div>
          )}
          <hr className="mt-5 border-0 border-t border-[#e6e6e6]" />
          <div className="mt-8 flex flex-col gap-8">
            {cfg.sections.map((s, i) => (
              <Section key={s.id ?? i} s={s} />
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
