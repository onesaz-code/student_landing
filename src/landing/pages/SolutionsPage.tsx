import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, GraduationCap, House, Network, PenLine, User, Users, type LucideIcon } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { ServicesSection } from '../sections/ServicesSection'
import { CTA, SOLUTIONS, productBySlug, productPath, type ProductSlug } from '../content/names'
import {
  ROLE_CARDS,
  ROLES_INTRO,
  SOLUTION_BLOCKS,
  SOLUTIONS_CTA,
  SOLUTIONS_HERO,
  type RoleIcon,
  type SolutionBlock,
  type SolutionId,
} from '../content/solutions'

const SOLUTION_ICONS: Record<SolutionId, LucideIcon> = {
  schools: House,
  colleges: GraduationCap,
  'coaching-institutes': PenLine,
  'trusts-school-groups': Network,
}

const ROLE_ICONS: Record<RoleIcon, LucideIcon> = {
  management: User,
  principal: House,
  teacher: BookOpen,
  family: Users,
}

const solutionName = (id: SolutionId) => SOLUTIONS.find((s) => s.id === id)!.name

/** Pill link to a product page with its colour dot. `short` uses the product's short name for tight cards. */
function ProductChip({ slug, short = false }: { slug: ProductSlug; short?: boolean }) {
  const p = productBySlug(slug)!
  return (
    <Link
      to={productPath(slug)}
      title={short ? p.name : undefined}
      className="inline-flex min-h-8 max-w-full items-center gap-[7px] rounded-full border border-[#E3E7EF] bg-white px-3 py-1 text-[13px] font-medium leading-[1.3] text-[#1F2637] transition-[border-color,background-color,transform] duration-150 hover:-translate-y-px hover:border-[color:var(--brand)] hover:bg-[#F3F6FE]"
    >
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
      {short ? p.short : p.name}
    </Link>
  )
}

/** Small mono caption used inside the product panels. */
function PanelLabel({ children }: { children: string }) {
  return (
    <h3 className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[.08em] text-[color:var(--ink-400)]">
      {children}
    </h3>
  )
}

/** Hero quick links: one card per institution type, jumping to its section. */
function QuickLinks() {
  return (
    <div className="grid grid-cols-4 gap-3 max-[899px]:grid-cols-2 max-[379px]:grid-cols-1">
      {SOLUTIONS.map((s) => {
        const Icon = SOLUTION_ICONS[s.id]
        return (
          <Link
            key={s.id}
            to={`#${s.id}`}
            className="flex flex-col gap-2.5 rounded-2xl border border-[#E6E9F0] bg-white p-5 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
          >
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#EEF2FD] text-[color:var(--brand)]">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <span className="text-[16px] font-semibold text-[color:var(--ink-900)]">{s.name}</span>
            <span className="text-[13px] leading-[1.5] text-[color:var(--ink-400)]">{s.line}</span>
            <ArrowRight size={16} className="mt-auto text-[color:var(--brand)]" aria-hidden />
          </Link>
        )
      })}
    </div>
  )
}

/** One institution type: copy and demo button beside a panel of recommended products and "what changes". */
function SolutionSection({ block, alt }: { block: SolutionBlock; alt: boolean }) {
  const Icon = SOLUTION_ICONS[block.id]
  const name = solutionName(block.id)

  const copy = (
    <div className="flex flex-col gap-[18px]">
      <span className="inline-flex items-center gap-2 self-start text-[13px] font-semibold text-[color:var(--brand)]">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[#EEF2FD]">
          <Icon size={17} strokeWidth={1.75} />
        </span>
        {name}
      </span>
      <h2 className="lp-h2">{block.title}</h2>
      <p className="lp-lead !text-[17px]">{block.lead}</p>
      <ul className="flex flex-col gap-2.5 pt-1">
        {block.points.map((pt) => (
          <li key={pt} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#1F2637]">
            <Check size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
            {pt}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link to={CTA.demoPath} className="lp-btn lp-btn-primary">
          {CTA.demo} for {block.demoFor}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )

  const panel = (
    <div
      className={`flex flex-col gap-5 rounded-[20px] border border-[#E6E9F0] p-7 max-[639px]:p-5 ${alt ? 'bg-white' : 'bg-[color:var(--surface-alt)]'}`}
    >
      <PanelLabel>Recommended products</PanelLabel>
      <div className="flex flex-wrap gap-2">
        {block.products.map((slug) => (
          <ProductChip key={slug} slug={slug} />
        ))}
      </div>
      <div className="h-px bg-[#E6E9F0]" />
      <PanelLabel>What changes</PanelLabel>
      <ul className="flex flex-col gap-3">
        {block.changes.map((c) => (
          <li key={c.who} className="flex items-center gap-3">
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#E7F5EE] text-[#1F7A4F]">
              <Check size={16} strokeWidth={1.75} />
            </span>
            <span className="flex flex-col">
              <span className="text-[14.5px] font-semibold text-[color:var(--ink-900)]">{c.who}</span>
              <span className="text-[13px] text-[#5B6478]">{c.what}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section id={block.id} className={`py-24 max-[899px]:py-20 max-[639px]:py-16 ${alt ? 'lp-section-alt' : 'bg-white'}`}>
      <div
        className={`lp-container grid items-center gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-8 ${
          alt ? 'grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]' : 'grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]'
        }`}
      >
        {alt ? (
          <>
            <div className="max-[899px]:order-2">{panel}</div>
            {copy}
          </>
        ) : (
          <>
            {copy}
            {panel}
          </>
        )}
      </div>
    </section>
  )
}

/** "By role": what each person gets, with the products they use most. */
function RolesBlock() {
  return (
    <section id="roles" className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container flex flex-col items-center gap-12">
        <div className="flex max-w-[760px] flex-col items-center gap-3.5 text-center">
          <span className="lp-eyebrow">{ROLES_INTRO.eyebrow}</span>
          <h2 className="lp-h2">{ROLES_INTRO.title}</h2>
          <p className="lp-lead">{ROLES_INTRO.lead}</p>
        </div>
        <div className="grid w-full grid-cols-4 gap-4 max-[999px]:grid-cols-2 max-[639px]:grid-cols-1">
          {ROLE_CARDS.map((r) => {
            const Icon = ROLE_ICONS[r.icon]
            return (
              <div key={r.name} className="flex flex-col gap-3.5 rounded-2xl border border-[#E9ECF2] bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FD] text-[color:var(--brand)]">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="text-[18px] font-semibold text-[color:var(--ink-900)]">{r.name}</h3>
                <ul className="flex flex-col gap-3.5">
                  {r.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[14px] leading-[1.5] text-[#3F4758]">
                      <Check size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1.5">
                  {r.products.map((slug) => (
                    <ProductChip key={slug} slug={slug} short />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Closing dark CTA panel. */
function ClosingCta() {
  return (
    <section className="bg-white py-24 max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
          <div className="flex max-w-[620px] flex-col gap-2.5">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {SOLUTIONS_CTA.title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">{SOLUTIONS_CTA.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
              {CTA.demo}
              <ArrowRight size={16} />
            </Link>
            <Link to="/" className="lp-btn lp-btn-ghost-dark">
              {SOLUTIONS_CTA.back}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Solutions page (/solutions): institution types, roles and services. Copy lives in content/solutions.ts. */
export function SolutionsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]} {...SOLUTIONS_HERO}>
        <QuickLinks />
      </PageHero>
      {SOLUTION_BLOCKS.map((b, i) => (
        <SolutionSection key={b.id} block={b} alt={i % 2 === 1} />
      ))}
      <RolesBlock />
      <div className="lp-section-alt">
        <ServicesSection id="services" />
      </div>
      <ClosingCta />
    </>
  )
}
