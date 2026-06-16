import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Breadcrumbs, BreadcrumbItem } from '@onesaz/ui'
import { ArrowLeft, Calendar, Home } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { MdmDocSection } from '../data/mdmSiteContent'

type ContentDocPageProps = {
  title: string
  sections: MdmDocSection[]
}

const EMAIL_RE = /\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi

function renderText(text: string, keyPrefix: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  EMAIL_RE.lastIndex = 0
  let match: RegExpExecArray | null
  let n = 0
  while ((match = EMAIL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <a
        key={`${keyPrefix}-e${n++}`}
        href={`mailto:${match[0]}`}
        className="font-medium text-[var(--accent)] hover:underline underline-offset-2"
      >
        {match[0]}
      </a>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length ? parts : text
}

function extractLastUpdated(sections: MdmDocSection[]): { date: string | null; sections: MdmDocSection[] } {
  const first = sections[0]
  if (!first || !first.paragraphs?.length) return { date: null, sections }
  const firstPara = first.paragraphs[0]
  if (/^last updated/i.test(firstPara)) {
    const date = firstPara.replace(/^last updated\s*/i, '').trim()
    const rest = first.paragraphs.slice(1)
    const updatedFirst: MdmDocSection = { ...first, paragraphs: rest }
    return {
      date,
      sections: rest.length === 0 && !first.bullets?.length && !first.title
        ? sections.slice(1)
        : [updatedFirst, ...sections.slice(1)],
    }
  }
  return { date: null, sections }
}

export function ContentDocPage({ title, sections: rawSections }: ContentDocPageProps) {
  const navigate = useNavigate()
  const { date, sections } = React.useMemo(() => extractLastUpdated(rawSections), [rawSections])

  React.useEffect(() => { window.scrollTo(0, 0) }, [])

  // Count only titled sections for numbering
  let sectionCounter = 0

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[calc(var(--navbar-height)+40px)] pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/') }}
              className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              current
              className="text-sm text-[var(--foreground)] font-medium"
            >
              {title}
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Page header */}
          <div className="mb-8 pb-6 border-b border-[var(--border)]">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              {title}
            </h1>
            {date && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent)]/20">
                <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--accent)]">Last updated {date}</span>
              </div>
            )}
          </div>

          {/* Document card */}
          <Card className="bg-[var(--card)] border border-[var(--border)] shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-0">
              {sections.map((section, i) => {
                const isIntro = !section.title
                const isNumbered = !!section.title
                if (isNumbered) sectionCounter++
                const num = String(sectionCounter).padStart(2, '0')

                return (
                  <div
                    key={i}
                    className={`px-6 sm:px-8 py-6 ${i < sections.length - 1 ? 'border-b border-[var(--border)]' : ''} ${isIntro ? 'bg-[var(--muted)]/40' : ''}`}
                  >
                    {/* Section header */}
                    {section.title && (
                      <div className="flex items-start gap-3 mb-4">
                        <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-[var(--accent-bg)] text-[var(--accent)] text-xs font-bold mt-0.5">
                          {num}
                        </span>
                        <h2 className="text-base font-semibold text-[var(--foreground)] leading-snug pt-1">
                          {section.title}
                        </h2>
                      </div>
                    )}

                    {/* Paragraphs */}
                    {(section.paragraphs ?? []).map((p, j) => (
                      <p
                        key={j}
                        className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3 last:mb-0 whitespace-pre-wrap"
                      >
                        {renderText(p, `p-${i}-${j}`)}
                      </p>
                    ))}

                    {/* Bullets */}
                    {section.bullets?.length ? (
                      <ul className={`mt-3 space-y-2 ${section.ordered ? 'list-none' : 'list-none'}`}>
                        {section.bullets.map((item, k) => (
                          <li key={k} className="flex items-start gap-2.5 text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {section.ordered ? (
                              <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-bg)] text-[var(--accent)] text-[10px] font-bold mt-0.5">
                                {k + 1}
                              </span>
                            ) : (
                              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2" />
                            )}
                            <span>{renderText(item, `b-${i}-${k}`)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Bottom nav */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
