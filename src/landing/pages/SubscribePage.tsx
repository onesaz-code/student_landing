import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { PricingBand, PricingPanel, pricingCardClass } from '../subscribe/PricingBand'
import { PlanTabs } from '../subscribe/PlanTabs'
import { checkoutPath, formatRupees, isPaidPlan, quoteFor, type PaidPlanId } from '../subscribe/planQuote'

const inputClass =
  'h-[46px] w-full rounded-lg border border-[#D9DCE3] bg-white px-3.5 text-[15px] font-normal text-[color:var(--ink-900)] outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:border-[color:var(--brand)] focus:shadow-[0_0_0_3px_rgba(36,71,209,.15)]'

function chosenPlan(value: string | null): PaidPlanId {
  return value === 'monthly' ? 'monthly' : 'annual'
}

export function SubscribePage() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const planId = chosenPlan(params.get('plan'))
  const studentId = (params.get('studentId') || '').trim()
  const [draft, setDraft] = React.useState('')
  const [error, setError] = React.useState('')
  const quote = quoteFor(planId)

  function write(next: { plan?: PaidPlanId; studentId?: string }, replace = false) {
    const updated = new URLSearchParams(params)
    updated.set('plan', next.plan || planId)
    if (next.studentId) updated.set('studentId', next.studentId)
    else if ('studentId' in next) updated.delete('studentId')
    setParams(updated, { replace })
  }

  if (!quote || !isPaidPlan(planId)) return null

  return (
    <>
      <PricingBand
        title={studentId ? quote.plan.name : 'Enter your student ID'}
        lead={
          studentId
            ? `Student ID ${studentId}. GST is added to the plan price below.`
            : `We’ll show the ${quote.plan.name} price and GST for this ID.`
        }
      >
        <PlanTabs value={planId} onChange={(next) => write({ plan: next, studentId }, true)} />
      </PricingBand>
      <PricingPanel>
        {studentId ? (
          <article className={`relative ${pricingCardClass} ${quote.plan.badge ? 'mt-8' : ''}`}>
            {quote.plan.badge ? (
              <span className="absolute -top-8 left-[-1.5px] right-[-1.5px] flex h-8 items-center justify-center rounded-t-[14px] bg-[#141414] text-[13px] font-medium text-white">
                {quote.plan.badge}
              </span>
            ) : null}
            <div className="flex flex-col gap-2 text-left">
              <h2 className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">{quote.plan.name}</h2>
              <p className="text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{quote.plan.summary}</p>
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {quote.plan.was && <span className="text-[17px] font-medium text-[color:var(--ink-400)] line-through">{quote.plan.was}</span>}
              <span className="font-[family-name:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.02em] text-[color:var(--ink-900)]">
                {quote.plan.price}
              </span>
              {quote.plan.period && <span className="text-[14px] text-[color:var(--ink-600)]">{quote.plan.period}</span>}
            </div>
            <p className="mt-3 text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{quote.cadence}</p>
            <dl className="mt-5 border-t border-[color:var(--line)]">
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] py-2.5">
                <dt className="text-[14.5px] text-[color:var(--ink-600)]">Plan price</dt>
                <dd className="text-[15px] font-semibold text-[color:var(--ink-900)]">{formatRupees(quote.basePaise)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] py-2.5">
                <dt className="text-[14.5px] text-[color:var(--ink-600)]">{quote.gstLabel}</dt>
                <dd className="text-[15px] font-semibold text-[color:var(--ink-900)]">{formatRupees(quote.gstPaise)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[16px] font-semibold text-[color:var(--ink-900)]">Total</dt>
                <dd className="font-[family-name:var(--font-display)] text-[28px] font-semibold tracking-[-0.02em] text-[color:var(--ink-900)]">
                  {formatRupees(quote.chargePaise)}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[9px] border-[1.5px] border-[color:var(--brand)] bg-[color:var(--brand)] text-[14.5px] font-semibold text-white hover:bg-[color:var(--brand-hover)]"
              onClick={() => navigate(checkoutPath(studentId, planId))}
            >
              {`Pay ${formatRupees(quote.chargePaise)}`}
              <ArrowUpRight size={16} />
            </button>
            <button type="button" className="mt-3 text-[14px] font-semibold text-[color:var(--brand)]" onClick={() => write({ studentId: '' })}>
              Change student ID
            </button>
            <p className="mt-6 text-left text-[14.5px] font-semibold text-[color:var(--ink-900)]">{quote.plan.listHeading}</p>
            <ul className="mt-3.5 flex flex-col gap-2.5 text-left">
              {quote.plan.features.map((feature) => {
                const missing = feature.included === false
                return (
                  <li key={feature.text} className="flex items-start gap-2.5 text-[14px] leading-[1.5]">
                    {missing ? (
                      <X size={16} strokeWidth={2.25} aria-hidden className="mt-[2px] shrink-0 text-[#98A2B3]" />
                    ) : (
                      <Check size={16} strokeWidth={2.25} aria-hidden className="mt-[2px] shrink-0 text-[color:var(--brand)]" />
                    )}
                    <span className={missing ? 'text-[color:var(--ink-400)]' : 'text-[color:var(--ink-900)]'}>{feature.text}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        ) : (
          <form
            className={`${pricingCardClass} flex flex-col gap-4 text-left`}
            onSubmit={(event) => {
              event.preventDefault()
              const id = draft.trim()
              if (!id) {
                setError('Enter a student ID')
                return
              }
              setError('')
              write({ studentId: id })
            }}
          >
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[color:var(--ink-600)]" htmlFor="student-id">
              Student ID
              <input
                id="student-id"
                className={inputClass}
                value={draft}
                autoComplete="off"
                placeholder="Your student ID"
                onChange={(event) => {
                  setDraft(event.target.value)
                  if (error) setError('')
                }}
              />
            </label>
            {error ? (
              <p className="text-[14px] font-medium text-[color:var(--danger)]" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="lp-btn lp-btn-primary w-full">
              Continue
            </button>
          </form>
        )}
      </PricingPanel>
    </>
  )
}
