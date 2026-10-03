import * as React from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Atom,
  BookOpen,
  Check,
  CircleCheckBig,
  Dna,
  Download,
  FileText,
  FlaskConical,
  PackageOpen,
  Search,
  SearchX,
  Sigma,
  Target,
  Timer,
  X,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import {
  ALL_SUBJECTS,
  PYQ_EXAMS,
  PYQ_FAQS,
  PYQ_PAGE,
  PYQ_PAPERS,
  PYQ_POPULAR,
  examSubjects,
  examYears,
  isNewYear,
  paperFile,
  shiftFile,
  solutionsFile,
  subjectFile,
  zipFile,
  type PyqDay,
  type PyqExam,
  type PyqPaper,
} from '../content/pyqs'
import { FaqSection } from '../sections/FaqSection'

export const PYQ_PATH = '/previous-papers'
const examPath = (slug: string) => `${PYQ_PATH}/${slug}`
const examBySlug = (slug: string) => PYQ_EXAMS.find((e) => e.slug === slug)

/* ── Which PDFs exist ───────────────────────────────────────── */

/**
 * One check per file for the whole visit. Asks for just the first byte (some servers answer HEAD with the
 * site's HTML page), and checks the type because a missing file falls back to that HTML page too.
 */
const fileChecks = new Map<string, Promise<boolean>>()
function fileExists(url: string) {
  let check = fileChecks.get(url)
  if (!check) {
    const ctrl = new AbortController()
    check = fetch(url, { headers: { Range: 'bytes=0-0' }, signal: ctrl.signal })
      .then((r) => {
        ctrl.abort()
        return r.ok && /pdf|zip|octet-stream/i.test(r.headers.get('content-type') ?? '')
      })
      .catch(() => false)
    fileChecks.set(url, check)
  }
  return check
}

/** Availability of each file: true, false, or undefined while checking. */
function useFilesAvailable(urls: string[]) {
  const [found, setFound] = React.useState<Record<string, boolean>>({})
  const key = urls.join('|')
  React.useEffect(() => {
    let live = true
    key
      .split('|')
      .filter(Boolean)
      .forEach((url) =>
        fileExists(url).then((ok) => {
          if (live) setFound((f) => (f[url] === ok ? f : { ...f, [url]: ok }))
        }),
      )
    return () => {
      live = false
    }
  }, [key])
  return found
}

/* ── Search ──────────────────────────────────────────────────── */

/** Shorthands students type for each exam. */
const EXAM_ALIASES: Record<string, string> = {
  'jee-main': 'jee mains jeemain jeemains iit',
  'neet-ug': 'neet medical neetug',
  'cbse-class-12': 'cbse12 cbse 12 class12 class 12 12th board',
  'cbse-class-10': 'cbse10 cbse 10 class10 class 10 10th board',
  'ts-eapcet': 'eamcet tseamcet eapcet telangana',
}

/** Extra words each subject answers to, so “maths” finds Mathematics. */
const SUBJECT_ALIASES: Record<string, string> = { Mathematics: 'maths math', 'Social Science': 'sst social' }

const subjectWords = (subject: string) => `${subject} ${SUBJECT_ALIASES[subject] ?? ''}`.toLowerCase()
const paperSubjects = (p: PyqPaper) => p.subjects ?? (p.subject ? [p.subject] : [])

function searchText(p: PyqPaper) {
  const exam = examBySlug(p.exam)!
  const extra = EXAM_ALIASES[p.exam] ?? ''
  const subjects = paperSubjects(p).map(subjectWords).join(' ')
  return `${exam.name} ${p.exam.replace(/-/g, ' ')} ${extra} ${p.year} ${p.title} ${subjects}`.toLowerCase()
}

const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const queryWords = (query: string) => query.toLowerCase().split(/\s+/).filter(Boolean)

/** Papers matching every word, newest first, then in exam order. */
function searchPapers(query: string) {
  const words = queryWords(query)
  const examOrder = (slug: string) => PYQ_EXAMS.findIndex((e) => e.slug === slug)
  const compact = squash(query)
  return PYQ_PAPERS.filter((p) => {
    const text = searchText(p)
    // Every word matches, or the query matches with spaces ignored (“jeemain”, “cbse12”, “Jeema”)
    return words.every((w) => text.includes(w)) || (compact.length > 2 && squash(text).includes(compact))
  }).sort((a, b) => b.year - a.year || examOrder(a.exam) - examOrder(b.exam))
}

/** The subjects a search asked for (“physics”, “maths”); all of a paper's subjects when it named none. */
function searchedSubjects(p: PyqPaper, query: string) {
  const words = queryWords(query)
  const all = paperSubjects(p)
  const named = all.filter((s) =>
    words.some(
      (w) =>
        w.length > 2 &&
        subjectWords(s)
          .split(' ')
          .some((x) => x.startsWith(w)),
    ),
  )
  return named.length ? named : all
}

/* ── Page ────────────────────────────────────────────────────── */

/** Previous year question papers: pick an exam, a year and a subject, then download the paper and its solutions. */
export function PyqPage() {
  const { exam: examSlug } = useParams()
  const [params, setParams] = useSearchParams()
  const exam = examSlug ? examBySlug(examSlug) : PYQ_EXAMS[0]

  if (!exam) return <Navigate to={PYQ_PATH} replace />

  const years = examYears(exam.slug)
  const yearParam = Number(params.get('year'))
  const year = years.includes(yearParam) ? yearParam : years[0]
  const subjects = examSubjects(exam.slug)
  const subjectParam = params.get('subject') ?? ALL_SUBJECTS
  const subject = subjects.includes(subjectParam) ? subjectParam : ALL_SUBJECTS
  const query = params.get('q') ?? ''

  const update = (next: Record<string, string | null>) => {
    const p = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    setParams(p, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Hero query={query} onQuery={(q) => update({ q: q || null })} />
      <section id="papers" className="scroll-mt-[calc(var(--header-h)+16px)] bg-white pb-24 pt-14 max-[639px]:pb-16 max-[639px]:pt-10">
        <div className="lp-container flex flex-col gap-8">
          {query ? (
            <SearchResults query={query} onClear={() => update({ q: null })} />
          ) : (
            <>
              <ExamTabs current={exam.slug} />
              <div className="grid grid-cols-[220px_minmax(0,1fr)] items-start gap-8 max-[899px]:grid-cols-1 max-[899px]:gap-6">
                <Filters
                  exam={exam.slug}
                  years={years}
                  year={year}
                  subjects={subjects}
                  subject={subject}
                  onYear={(y) => update({ year: y === years[0] ? null : String(y) })}
                  onSubject={(s) => update({ subject: s === ALL_SUBJECTS ? null : s })}
                />
                <PaperList exam={exam} year={year} subject={subject} />
              </div>
            </>
          )}
        </div>
      </section>
      <Tips />
      <FaqSection
        eyebrow="Questions"
        title="About the past papers."
        lead="Everything students and parents ask before downloading."
        items={PYQ_FAQS}
        className="lp-section lp-section-alt"
      />
    </>
  )
}

/* ── Hero with search ────────────────────────────────────────── */

const popularPath = (p: (typeof PYQ_POPULAR)[number]) => {
  const params = new URLSearchParams()
  if (p.year) params.set('year', String(p.year))
  if (p.subject) params.set('subject', p.subject)
  const qs = params.toString()
  return `${examPath(p.exam)}${qs ? `?${qs}` : ''}#papers`
}

interface Suggestion {
  group: 'Exams' | 'Papers'
  label: string
  meta: string
  to: string
}

/** Up to six suggestions while typing: matching exams first, then the newest matching papers. */
function suggestionsFor(text: string): Suggestion[] {
  const compact = squash(text)
  if (!compact) return []
  const words = queryWords(text)
  const exams = PYQ_EXAMS.filter((e) => {
    const names = [e.name, e.slug, ...(EXAM_ALIASES[e.slug] ?? '').split(' ')].map(squash)
    // Only suggest the exam itself when the query is about the exam, not a specific year or subject
    return words.length <= 2 && !/\d{4}/.test(text) && names.some((n) => n.includes(compact) || compact === n)
  }).map((e) => {
    const n = PYQ_PAPERS.filter((p) => p.exam === e.slug).length
    return { group: 'Exams' as const, label: e.name, meta: `${n} papers`, to: `${examPath(e.slug)}#papers` }
  })
  const papers = searchPapers(text)
    .slice(0, 6 - Math.min(exams.length, 2))
    .map((p) => {
      const exam = examBySlug(p.exam)!
      const meta = p.days ? `${shiftCount(p)} shifts` : p.subjects ? `${p.subjects.length} subjects` : p.detail.split(' · ')[0]
      return {
        group: 'Papers' as const,
        label: `${exam.name} ${p.year} · ${p.title}`,
        meta,
        to: `${examPath(p.exam)}?year=${p.year}#papers`,
      }
    })
  return [...exams.slice(0, 2), ...papers]
}

function Hero({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const navigate = useNavigate()
  const [text, setText] = React.useState(query)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(-1)
  const boxRef = React.useRef<HTMLFormElement>(null)
  // Short hint on phones so it isn't cut off
  const [narrow, setNarrow] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 479px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  React.useEffect(() => setText(query), [query])

  const suggestions = React.useMemo(() => suggestionsFor(text), [text])
  const showList = open && suggestions.length > 0

  // Close the list when clicking anywhere else
  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const go = (s: Suggestion) => {
    setOpen(false)
    setText('')
    onQuery('')
    navigate(s.to)
  }
  const submit = () => {
    setOpen(false)
    onQuery(text.trim())
    window.setTimeout(() => document.getElementById('papers')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (!showList) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const n = suggestions.length
      setActive((a) => (e.key === 'ArrowDown' ? (a + 1) % n : (a - 1 + n) % n))
    } else if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      go(suggestions[active])
    }
  }

  return (
    <section
      className="relative pb-20 pt-8 text-white max-[639px]:pb-14 max-[639px]:pt-6"
      style={{
        background:
          'radial-gradient(760px 360px at 88% 0%, rgba(106,75,216,.45), rgba(106,75,216,0) 70%), radial-gradient(680px 340px at 0% 100%, rgba(36,71,209,.42), rgba(36,71,209,0) 70%), linear-gradient(135deg, #070B18 0%, #0E1636 55%, #1B1446 100%)',
      }}
    >
      <div className="lp-container flex flex-col gap-12 max-[639px]:gap-9">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-[#8E9AB8]">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to="/resources" className="hover:text-white">
                Resources
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="font-medium text-white">
              {PYQ_PAGE.eyebrow}
            </li>
          </ol>
        </nav>

        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
          {/* Badge with a soft gradient border */}
          <span className="rounded-[12px] bg-[linear-gradient(90deg,#6A8BFF,#B07CFF)] p-px">
            <span className="block rounded-[11px] bg-[#0B1022] px-4 py-1.5 text-[14px] font-medium">{PYQ_PAGE.eyebrow}</span>
          </span>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em]">
            {PYQ_PAGE.title}
          </h1>
          <p className="mt-5 max-w-[620px] text-[clamp(15.5px,1.4vw,18px)] leading-relaxed text-[#B9C3DA]">{PYQ_PAGE.lead}</p>

          <form
            ref={boxRef}
            role="search"
            className="relative mt-9 w-full max-w-[640px] text-left"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <label htmlFor="pyq-search" className="sr-only">
              Search papers
            </label>
            <div className="flex h-[62px] items-center gap-3 rounded-full bg-white pl-5 pr-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,.7)] ring-4 ring-[rgba(106,139,255,.25)] transition-shadow focus-within:ring-[rgba(106,139,255,.45)] max-[479px]:h-14 max-[479px]:pl-4">
              <Search size={19} className="shrink-0 text-[color:var(--ink-400)]" aria-hidden />
              <input
                id="pyq-search"
                type="search"
                role="combobox"
                aria-expanded={showList}
                aria-controls="pyq-suggestions"
                aria-autocomplete="list"
                aria-activedescendant={showList && active >= 0 ? `pyq-sug-${active}` : undefined}
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  setOpen(true)
                  setActive(-1)
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKey}
                placeholder={narrow ? 'Search papers' : PYQ_PAGE.searchPlaceholder}
                autoComplete="off"
                className="lp-input-bare h-full min-w-0 flex-1 bg-transparent text-[16px] text-[color:var(--ink-900)] outline-none placeholder:text-[color:var(--ink-400)] [&::-webkit-search-cancel-button]:hidden"
              />
              {text && (
                <button
                  type="button"
                  onClick={() => {
                    setText('')
                    onQuery('')
                  }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[color:var(--ink-400)] hover:bg-[#F1F4F9] hover:text-[color:var(--ink-900)]"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="h-[50px] shrink-0 rounded-full bg-[linear-gradient(90deg,#2447D1,#6A4BD8)] px-7 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(36,71,209,.8)] hover:brightness-110 max-[479px]:h-11 max-[479px]:px-5"
              >
                Search
              </button>
            </div>

            {showList && (
              <ul
                id="pyq-suggestions"
                role="listbox"
                className="absolute inset-x-0 top-[calc(100%+10px)] z-20 rounded-2xl bg-white p-2 text-[color:var(--ink-900)] shadow-[0_28px_70px_-24px_rgba(7,11,24,.6)] ring-1 ring-[#0F1729]/5"
              >
                {suggestions.map((sg, i) => (
                  <React.Fragment key={sg.to + sg.label}>
                    {(i === 0 || suggestions[i - 1].group !== sg.group) && (
                      <li
                        role="presentation"
                        className="px-3 pb-1 pt-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.08em] text-[color:var(--ink-400)]"
                      >
                        {sg.group}
                      </li>
                    )}
                    <li
                      id={`pyq-sug-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        go(sg)
                      }}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-[15px] ${
                        i === active ? 'bg-[#F3F6FF]' : ''
                      }`}
                    >
                      <span className="min-w-0 truncate font-semibold">{sg.label}</span>
                      <span className="shrink-0 text-[13.5px] text-[color:var(--ink-400)]">{sg.meta}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            )}
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {PYQ_POPULAR.map((p) => (
              <Link
                key={p.label}
                to={popularPath(p)}
                className="rounded-full border border-white/15 bg-white/[.07] px-3.5 py-1.5 text-[13.5px] text-[#DCE3F5] hover:border-white/30 hover:bg-white/[.12] hover:text-white"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Exam tabs and filters ───────────────────────────────────── */

function ExamTabs({ current }: { current: string }) {
  return (
    <nav aria-label="Exams">
      {/* One row on larger screens; a two-column grid on phones so every exam stays visible */}
      <ul className="inline-flex max-w-full flex-wrap gap-2 rounded-2xl bg-[#F3F5FA] p-1.5 max-[639px]:grid max-[639px]:w-full max-[639px]:grid-cols-2 max-[639px]:[&>li:last-child:nth-child(odd)]:col-span-2">
        {PYQ_EXAMS.map((e) => {
          const on = e.slug === current
          return (
            <li key={e.slug}>
              <Link
                to={`${examPath(e.slug)}#papers`}
                aria-current={on ? 'page' : undefined}
                preventScrollReset
                className={`flex h-11 items-center justify-center whitespace-nowrap rounded-xl px-5 text-[15px] font-semibold transition-colors max-[639px]:px-3 max-[639px]:text-[14.5px] ${
                  on
                    ? 'bg-white text-[color:var(--brand)] shadow-[0_6px_16px_-10px_rgba(20,40,110,.5)] ring-1 ring-[#DCE3F5]'
                    : 'text-[color:var(--ink-600)] hover:text-[color:var(--ink-900)]'
                }`}
              >
                {e.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

interface FiltersProps {
  exam: string
  years: number[]
  year: number
  subjects: string[]
  subject: string
  onYear: (y: number) => void
  onSubject: (s: string) => void
}

function Filters({ exam, years, year, subjects, subject, onYear, onSubject }: FiltersProps) {
  const heading = 'mb-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.08em] text-[color:var(--ink-400)]'
  return (
    <div
      role="group"
      aria-label="Filters"
      className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-7 max-[899px]:static max-[899px]:gap-5"
    >
      <div>
        <h2 className={heading}>Year</h2>
        <ul
          className="flex flex-col gap-1 max-[899px]:grid max-[899px]:max-w-[calc(var(--cols)*92px)] max-[899px]:grid-cols-[repeat(var(--cols),minmax(0,1fr))] max-[899px]:gap-2"
          // Phones and tablets: every year on one row
          style={{ ['--cols' as string]: years.length }}
        >
          {years.map((y) => {
            const on = y === year
            const fresh = isNewYear(exam, y)
            return (
              <li key={y}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onYear(y)}
                  className={`relative flex h-10 w-full items-center justify-between gap-2 rounded-[10px] px-3.5 text-[15px] tabular-nums transition-colors max-[899px]:justify-center max-[899px]:px-0 max-[899px]:ring-1 ${
                    on
                      ? 'bg-[color:var(--brand-tint)] font-semibold text-[color:var(--brand)] max-[899px]:ring-[color:var(--brand)]'
                      : 'text-[color:var(--ink-600)] hover:bg-[#F5F7FB] hover:text-[color:var(--ink-900)] max-[899px]:ring-[#E6E9F0]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {y}
                    {fresh && (
                      <span className="rounded-[5px] bg-[#C8281C] px-1.5 py-px text-[10px] font-bold uppercase tracking-[.04em] text-white max-[899px]:absolute max-[899px]:-right-1 max-[899px]:-top-1.5 max-[899px]:px-1 max-[899px]:text-[9px]">
                        New
                      </span>
                    )}
                  </span>
                  {on && <ArrowRight size={15} className="max-[899px]:hidden" aria-hidden />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {subjects.length > 1 && (
        <div>
          <h2 className={heading}>Subject</h2>
          <ul className="flex flex-wrap gap-2">
            {[ALL_SUBJECTS, ...subjects].map((s) => {
              const on = s === subject
              return (
                <li key={s}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => onSubject(s)}
                    className={`h-9 rounded-full px-3.5 text-[14px] transition-colors ${
                      on
                        ? 'bg-[color:var(--ink-900)] font-medium text-white'
                        : 'bg-white text-[color:var(--ink-600)] ring-1 ring-[#E6E9F0] hover:text-[color:var(--ink-900)] hover:ring-[#C9D1E0]'
                    }`}
                  >
                    {s === ALL_SUBJECTS ? 'All' : s}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ── Paper list ──────────────────────────────────────────────── */

/** Subjects a card shows: all of a session's subjects, or just the filtered one. */
function shownSubjects(p: PyqPaper, subject: string) {
  return (p.subjects ?? []).filter((s) => subject === ALL_SUBJECTS || s === subject)
}

/** Every file a list of papers might link to, so their availability can be checked together. */
function filesFor(papers: PyqPaper[], subject: string) {
  return papers.flatMap((p) => {
    if (!p.subjects) return [paperFile(p), solutionsFile(p)]
    const subjects = shownSubjects(p, subject)
    if (!p.days) return subjects.map((s) => subjectFile(p, s))
    return p.days.flatMap((d) => shiftNumbers(d).flatMap((n) => subjects.map((s) => shiftFile(p, d.date, n, s))))
  })
}

const shiftNumbers = (d: PyqDay) => Array.from({ length: d.shifts }, (_, i) => i + 1)
const shiftCount = (p: PyqPaper) => (p.days ?? []).reduce((n, d) => n + d.shifts, 0)

/** "22 January" and "Wednesday" for an ISO date, read in UTC so the day never shifts. */
function dayLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  return {
    date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' }),
  }
}

/** "22 – 29 January" or "27 January – 1 February". */
function dateRange(days: PyqDay[]) {
  const first = dayLabel(days[0].date).date
  const last = dayLabel(days[days.length - 1].date).date
  const [d1, m1] = first.split(' ')
  const [, m2] = last.split(' ')
  return m1 === m2 ? `${d1} – ${last}` : `${first} – ${last}`
}

function matchesSubject(p: PyqPaper, subject: string) {
  return subject === ALL_SUBJECTS || p.subject === subject || (p.subjects ?? []).includes(subject)
}

function PaperList({ exam, year, subject }: { exam: PyqExam; year: number; subject: string }) {
  const papers = PYQ_PAPERS.filter((p) => p.exam === exam.slug && p.year === year && matchesSubject(p, subject))
  const zip = zipFile(exam.slug, year)
  const found = useFilesAvailable([zip, ...filesFor(papers, subject)])
  const sessions = papers.filter((p) => p.subjects).length
  const pdfs = papers.reduce((n, p) => n + (p.subjects ? shownSubjects(p, subject).length * (p.days ? shiftCount(p) : 1) : 1), 0)
  const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
  const shifts = papers.reduce((n, p) => n + shiftCount(p), 0)
  const summary = sessions
    ? [
        count(sessions, 'session', 'sessions'),
        shifts ? count(shifts, 'shift', 'shifts') : subject === ALL_SUBJECTS ? count(pdfs, 'subject PDF', 'subject PDFs') : null,
        subject === ALL_SUBJECTS ? null : subject,
      ]
        .filter(Boolean)
        .join(' · ')
    : `${count(papers.length, 'paper', 'papers')}${subject === ALL_SUBJECTS ? '' : ` in ${subject}`}`

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_70%,#2447D1_100%)] px-6 py-5 text-white max-[639px]:px-5">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[22px] font-semibold tracking-[-0.01em]">
            {exam.name} {year}
            {isNewYear(exam.slug, year) && (
              <span className="rounded-md bg-[#C8281C] px-2 py-0.5 font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[.05em]">
                New
              </span>
            )}
          </h2>
          <p className="mt-1 text-[14px] text-[#B9C3DA]">
            {exam.body} · {exam.about}
          </p>
        </div>
        {found[zip] && (
          <a
            href={zip}
            download={`${exam.name} ${year} papers.zip`}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[10px] bg-white px-4 text-[14px] font-semibold text-[color:var(--ink-900)] hover:bg-[#EEF2FD]"
          >
            <PackageOpen size={16} aria-hidden />
            Download all
          </a>
        )}
      </div>

      <p className="px-1 text-[14px] text-[color:var(--ink-400)]" aria-live="polite">
        {summary}
      </p>

      <ul className="flex flex-col gap-3">
        {papers.map((p) => (
          <li key={p.id}>
            {p.subjects ? <SessionCard paper={p} subject={subject} found={found} /> : <PaperCard paper={p} found={found} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SearchResults({ query, onClear }: { query: string; onClear: () => void }) {
  const papers = searchPapers(query)
  const found = useFilesAvailable(
    papers.flatMap((p) =>
      p.days ? [] : p.subjects ? searchedSubjects(p, query).map((s) => subjectFile(p, s)) : [paperFile(p), solutionsFile(p)],
    ),
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4 border-b border-[#EEF0F4] pb-4">
        <div className="min-w-0">
          <h2
            className="font-[family-name:var(--font-display)] text-[22px] font-semibold tracking-[-0.01em] text-[color:var(--ink-900)] max-[639px]:text-[20px]"
            aria-live="polite"
          >
            Results for “{query}”
          </h2>
          {papers.length > 0 && (
            <p className="mt-1 text-[14px] text-[color:var(--ink-400)]">
              {papers.length} {papers.length === 1 ? 'paper' : 'papers'}, newest first
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[14px] font-medium text-[color:var(--ink-600)] ring-1 ring-[#E6E9F0] hover:text-[color:var(--ink-900)] hover:ring-[#C9D1E0]"
        >
          <X size={14} aria-hidden />
          Clear
        </button>
      </div>

      {papers.length === 0 ? (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 rounded-2xl border border-[#E6E9F0] bg-white p-6 max-[479px]:grid-cols-1 max-[479px]:p-5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand-tint)] text-[color:var(--brand)]"
            aria-hidden
          >
            <SearchX size={20} />
          </span>
          <div>
            <p className="text-[17px] font-semibold text-[color:var(--ink-900)]">No exact match for “{query}”</p>
            <p className="mt-1 text-[15px] text-[color:var(--ink-600)]">Check the spelling, or search with an exam and a year.</p>
            <p className="mt-5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.08em] text-[color:var(--ink-400)]">
              Popular searches
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {PYQ_POPULAR.map((p) => (
                <Link
                  key={p.label}
                  to={popularPath(p)}
                  className="rounded-full border border-[#E6E9F0] bg-[#F6F8FC] px-3.5 py-1.5 text-[14px] text-[color:var(--ink-900)] hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-[#E6E9F0] bg-white">
          {papers.map((p) => (
            <li key={`${p.exam}-${p.year}-${p.id}`} className="border-b border-[#F0F2F6] last:border-0">
              <ResultRow paper={p} subjects={searchedSubjects(p, query)} found={found} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** One search result: the paper's name and details, with its downloads, or a link to its shifts. */
function ResultRow({ paper, subjects, found }: { paper: PyqPaper; subjects: string[]; found: Record<string, boolean> }) {
  const exam = examBySlug(paper.exam)!
  const name = `${exam.name} ${paper.year} ${paper.title}`
  const detail = paper.days ? `${dateRange(paper.days)} · ${shiftCount(paper)} shifts · with solutions` : paper.detail
  const shiftsLink = `${examPath(paper.exam)}?year=${paper.year}${subjects.length === 1 ? `&subject=${encodeURIComponent(subjects[0])}` : ''}#papers`

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-3 px-5 py-4 max-[767px]:grid-cols-1 max-[639px]:px-4">
      <div className="min-w-0">
        <h3 className="text-[15.5px] font-semibold text-[color:var(--ink-900)]">
          {exam.name} {paper.year} <span className="font-normal text-[color:var(--ink-400)]">·</span> {paper.title}
        </h3>
        <p className="mt-0.5 text-[13.5px] text-[color:var(--ink-400)]">{detail}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {paper.days ? (
          <Link
            to={shiftsLink}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[color:var(--brand)] underline-offset-4 hover:underline"
          >
            {subjects.length === 1 ? `View ${subjects[0]} by shift` : 'View all shifts'}
            <ArrowRight size={14} aria-hidden />
          </Link>
        ) : paper.subjects ? (
          subjects.map((s) => (
            <ShiftLink key={s} file={subjectFile(paper, s)} subject={s} name={`${name} ${s}`} available={found[subjectFile(paper, s)]} />
          ))
        ) : (
          <>
            <ShiftLink file={paperFile(paper)} subject="Question paper" name={name} available={found[paperFile(paper)]} />
            <ShiftLink file={solutionsFile(paper)} subject="Solutions" name={`${name} solutions`} available={found[solutionsFile(paper)]} />
          </>
        )}
      </div>
    </div>
  )
}

/* ── Session card: one download tile per subject ─────────────── */

const SUBJECT_STYLE: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  Physics: { icon: Atom, color: '#2447D1', bg: '#EEF2FD' },
  Chemistry: { icon: FlaskConical, color: '#0E8A5F', bg: '#E7F6EF' },
  Mathematics: { icon: Sigma, color: '#6A4BD8', bg: '#F1EDFE' },
  Biology: { icon: Dna, color: '#C2410C', bg: '#FFF1E7' },
}
const DEFAULT_STYLE = { icon: BookOpen, color: '#3F4758', bg: '#F3F5FA' }

interface SessionCardProps {
  paper: PyqPaper
  subject: string
  found: Record<string, boolean>
  showExam?: boolean
}

function SessionCard({ paper, subject, found, showExam = false }: SessionCardProps) {
  const exam = examBySlug(paper.exam)!
  const subjects = shownSubjects(paper, subject)
  const cols = subjects.length >= 3 ? 'grid-cols-3' : subjects.length === 2 ? 'grid-cols-2' : 'grid-cols-1'

  return (
    <article className="rounded-2xl border border-[#E6E9F0] bg-white p-5 max-[639px]:p-4 max-[359px]:p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[17px] font-semibold text-[color:var(--ink-900)]">
          {showExam ? `${exam.name} ${paper.year} · ${paper.title}` : paper.title}
        </h3>
        <p className="text-[13.5px] text-[color:var(--ink-400)]">
          {paper.days ? `${dateRange(paper.days)} · ${shiftCount(paper)} shifts · with solutions` : paper.detail}
        </p>
      </div>

      {paper.days ? (
        <DayList paper={paper} subjects={subjects} found={found} />
      ) : (
        <ul className={`mt-4 grid gap-3 ${cols} max-[639px]:grid-cols-1`}>
          {subjects.map((s) => {
            const file = subjectFile(paper, s)
            const style = SUBJECT_STYLE[s] ?? DEFAULT_STYLE
            const Icon = style.icon
            const name = `${exam.name} ${paper.year} ${paper.title} ${s}`
            return (
              <li
                key={s}
                className="flex flex-col gap-3.5 rounded-xl border border-[#EEF0F4] bg-[#FBFCFE] p-4 max-[639px]:flex-row max-[639px]:items-center max-[639px]:gap-3 max-[639px]:p-3"
              >
                <div className="flex min-w-0 items-center gap-3 max-[639px]:flex-1">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] max-[359px]:hidden"
                    style={{ background: style.bg, color: style.color }}
                    aria-hidden
                  >
                    <Icon size={19} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-[color:var(--ink-900)]">{s}</span>
                    <span className="block whitespace-nowrap text-[12.5px] text-[color:var(--ink-400)]">
                      With solutions<span className="max-[639px]:hidden"> · PDF</span>
                    </span>
                  </span>
                </div>
                <DownloadButton file={file} name={name} available={found[file]} />
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}

/** Exam days in a session: each day lists its shifts, with a quiet download link per subject. */
function DayList({ paper, subjects, found }: { paper: PyqPaper; subjects: string[]; found: Record<string, boolean> }) {
  const exam = examBySlug(paper.exam)!
  return (
    <>
      <ul className="mt-3">
        {paper.days!.map((d) => {
          const { date, weekday } = dayLabel(d.date)
          return (
            <li key={d.date} className="border-b border-[#F0F2F6] py-4 last:border-0 last:pb-0">
              <h4 className="text-[15px] font-semibold text-[color:var(--ink-900)]">
                {date}
                <span className="ml-2 font-normal text-[color:var(--ink-400)]">{weekday}</span>
              </h4>
              <ul className="mt-2 flex flex-col gap-1.5">
                {shiftNumbers(d).map((n) => (
                  <li
                    key={n}
                    className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-x-3 max-[639px]:grid-cols-1 max-[639px]:gap-y-1"
                  >
                    <span className="text-[14px] text-[color:var(--ink-400)]">Shift {n}</span>
                    <span className={`grid gap-x-4 gap-y-1 ${subjects.length === 1 ? 'grid-cols-1' : 'grid-cols-3'} max-[399px]:gap-x-2`}>
                      {subjects.map((s) => (
                        <ShiftLink
                          key={s}
                          file={shiftFile(paper, d.date, n, s)}
                          subject={s}
                          name={`${exam.name} ${date} ${paper.year} Shift ${n} ${s}`}
                          available={found[shiftFile(paper, d.date, n, s)]}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </>
  )
}

/** A subject's download as a quiet text link. */
function ShiftLink({ file, subject, name, available }: { file: string; subject: string; name: string; available: boolean | undefined }) {
  const short = subject === 'Mathematics' ? 'Maths' : subject
  return (
    <FileLink
      href={file}
      available={available}
      fileName={`${name}.pdf`}
      label={`Download ${name} (PDF)`}
      className="inline-flex min-w-0 items-center gap-1.5 justify-self-start text-[14px] font-medium text-[color:var(--brand)] underline-offset-4 hover:underline"
    >
      <Download size={14} className="shrink-0" aria-hidden />
      <span className="truncate">
        <span className="max-[399px]:hidden">{subject}</span>
        <span className="hidden max-[399px]:inline">{short}</span>
      </span>
    </FileLink>
  )
}

/** Full-width in a tile (compact on phones). */
function DownloadButton({ file, name, available }: { file: string; name: string; available: boolean | undefined }) {
  return (
    <FileLink
      href={file}
      available={available}
      fileName={`${name}.pdf`}
      label={`Download ${name} (PDF)`}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-[color:var(--brand)] text-[14px] font-semibold text-white hover:bg-[color:var(--brand-hover)] max-[639px]:w-[118px] max-[639px]:shrink-0"
    >
      <Download size={16} aria-hidden />
      Download
    </FileLink>
  )
}

/**
 * A download link that looks the same whether or not its file has been added yet.
 * It downloads only once the file exists; until then it is a placeholder that does nothing when clicked.
 */
function FileLink({
  href,
  available,
  fileName,
  label,
  className,
  children,
}: {
  href: string
  available: boolean | undefined
  fileName: string
  label: string
  className: string
  children: React.ReactNode
}) {
  if (available)
    return (
      <a href={href} download={fileName} className={className} aria-label={label}>
        {children}
      </a>
    )
  return (
    <span className={`${className} cursor-pointer select-none`} aria-disabled="true" aria-label={`${label}, available soon`}>
      {children}
    </span>
  )
}

/* ── Board paper card: question paper and solutions ──────────── */

function PaperCard({ paper, found, showExam = false }: { paper: PyqPaper; found: Record<string, boolean>; showExam?: boolean }) {
  const exam = examBySlug(paper.exam)!
  const file = paperFile(paper)
  const sol = solutionsFile(paper)
  const hasPaper = found[file]
  const hasSolutions = found[sol]
  const name = `${exam.name} ${paper.year} ${paper.title}`

  return (
    <article className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-[#E6E9F0] bg-white p-4 pr-5 max-[639px]:grid-cols-[44px_minmax(0,1fr)] max-[639px]:gap-x-3.5 max-[639px]:gap-y-3.5 max-[639px]:pr-4">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDECEC] text-[#C2312A] max-[639px]:h-11 max-[639px]:w-11"
        aria-hidden
      >
        <FileText size={22} strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <h3 className="text-[16px] font-semibold text-[color:var(--ink-900)]">
          {showExam ? `${exam.name} ${paper.year} · ${paper.title}` : paper.title}
        </h3>
        <p className="mt-1 text-[14px] text-[color:var(--ink-400)]">{paper.detail}</p>
      </div>

      <div className="flex items-center justify-end gap-2 max-[639px]:col-span-2 max-[639px]:flex-col max-[639px]:items-stretch">
        <FileLink
          href={file}
          available={hasPaper}
          fileName={`${name}.pdf`}
          label={`Download ${name} question paper (PDF)`}
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[color:var(--brand)] px-4 text-[14px] font-semibold text-white hover:bg-[color:var(--brand-hover)] max-[639px]:w-full"
        >
          <Download size={16} aria-hidden />
          Question paper
        </FileLink>
        <FileLink
          href={sol}
          available={hasSolutions}
          fileName={`${name} solutions.pdf`}
          label={`Download ${name} solutions (PDF)`}
          className="inline-flex h-10 w-[140px] items-center justify-center gap-2 rounded-[10px] px-4 text-[14px] font-semibold text-[color:var(--ink-900)] ring-1 ring-[#DCE3F5] hover:bg-[#F5F7FB] max-[639px]:w-full"
        >
          <CircleCheckBig size={16} className="text-[color:var(--success)]" aria-hidden />
          Solutions
        </FileLink>
      </div>
    </article>
  )
}

/* ── Practice tips and closing CTA ───────────────────────────── */

const TIP_ICONS = [Timer, CircleCheckBig, Target]

function Tips() {
  return (
    <section className="lp-section bg-white pt-0 max-[639px]:pt-0">
      <div className="lp-container flex flex-col gap-12">
        <SectionHeader eyebrow="How to practise" title={PYQ_PAGE.tipsTitle} lead={PYQ_PAGE.tipsLead} />
        <ol className="grid grid-cols-3 gap-5 max-[899px]:grid-cols-1">
          {PYQ_PAGE.tips.map((t, i) => {
            const Icon = TIP_ICONS[i]
            return (
              <li key={t.title} className="flex flex-col gap-3 rounded-[18px] border border-[#E6E8EC] bg-white p-7 max-[639px]:p-6">
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand-tint)] text-[color:var(--brand)]"
                    aria-hidden
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--ink-400)]">0{i + 1}</span>
                </span>
                <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{t.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{t.text}</p>
              </li>
            )
          })}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-12 text-white max-[639px]:px-6 max-[639px]:py-8">
          <div className="max-w-[600px]">
            <h2 className="font-[family-name:var(--font-display)] text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] max-[639px]:text-[23px]">
              {PYQ_PAGE.practice.title}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-[#C3CBE0]">{PYQ_PAGE.practice.text}</p>
          </div>
          <Link
            to={PYQ_PAGE.practice.cta.to}
            className="lp-btn h-[52px] bg-white px-6 text-[16px] text-[color:var(--ink-900)] hover:bg-[#EEF2FD] max-[639px]:w-full"
          >
            {PYQ_PAGE.practice.cta.label}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
