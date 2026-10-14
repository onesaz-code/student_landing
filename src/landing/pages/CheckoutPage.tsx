import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PricingBand, PricingPanel, pricingCardClass } from '../subscribe/PricingBand'
import { formatRupees, quoteFor } from '../subscribe/planQuote'

const METHODS = [
  { id: 'upi', label: 'UPI', detail: 'Pay from any UPI app. You confirm the request there.' },
  { id: 'card', label: 'Card', detail: 'Debit and credit cards are taken on the secure payment window.' },
  { id: 'netbanking', label: 'Net banking', detail: 'You finish this payment on your bank’s page.' },
]

export function CheckoutPage() {
  const [params] = useSearchParams()
  const studentId = (params.get('studentId') || '').trim()
  const quote = quoteFor(params.get('plan'))
  const [method, setMethod] = React.useState('upi')
  const selected = METHODS.find((item) => item.id === method) || METHODS[0]

  if (!studentId || !quote) {
    return (
      <>
        <PricingBand title="Checkout" lead="Enter a student ID and choose Monthly or Annual before paying." />
        <PricingPanel>
          <div className={`${pricingCardClass} text-center`}>
            <Link to="/subscribe" className="lp-btn lp-btn-primary">
              Enter a student ID
            </Link>
          </div>
        </PricingPanel>
      </>
    )
  }

  return (
    <>
      <PricingBand title="Checkout" lead={`${quote.plan.name} for student ${studentId}.`} />
      <PricingPanel>
        <div className="mx-auto grid max-w-[960px] grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] items-start gap-6 max-[899px]:grid-cols-1">
          <section className="rounded-[18px] border border-[#E6E8EF] bg-white px-8 py-7 shadow-[0_30px_70px_-40px_rgba(20,10,60,.45)] max-[639px]:px-5">
            <h2 className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">Payment method</h2>
            <div className="mt-5 flex flex-col gap-3" role="radiogroup" aria-label="Payment method">
              {METHODS.map((item) => {
                const on = item.id === method
                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-[14px] border px-4 py-3 ${
                      on ? 'border-[color:var(--brand)] bg-[color:var(--brand-tint)]' : 'border-[color:var(--line)]'
                    }`}
                  >
                    <input type="radio" name="payment-method" value={item.id} checked={on} onChange={() => setMethod(item.id)} />
                    <span className="text-[15px] font-semibold text-[color:var(--ink-900)]">{item.label}</span>
                  </label>
                )
              })}
            </div>
            <p className="mt-4 text-[14.5px] leading-[1.55] text-[color:var(--ink-600)]">{selected.detail}</p>
            <button
              type="button"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[9px] border-[1.5px] border-[color:var(--brand)] bg-[color:var(--brand)] text-[14.5px] font-semibold text-white hover:bg-[color:var(--brand-hover)]"
            >
              {`Pay ${formatRupees(quote.chargePaise)}`}
              <ArrowUpRight size={16} />
            </button>
          </section>

          <aside className="rounded-[18px] border border-[#E6E8EF] bg-white px-8 py-7 shadow-[0_30px_70px_-40px_rgba(20,10,60,.45)] max-[639px]:px-5">
            <h2 className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">Order summary</h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-[color:var(--ink-600)]">{quote.plan.name}</p>
            <p className="mt-1 text-[14px] text-[color:var(--ink-600)]">
              Student ID <span className="font-semibold text-[color:var(--ink-900)]">{studentId}</span>
            </p>
            <dl className="mt-4 border-t border-[color:var(--line)]">
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] py-2.5">
                <dt className="text-[14.5px] text-[color:var(--ink-600)]">Plan price</dt>
                <dd className="text-[15px] font-semibold">{formatRupees(quote.basePaise)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] py-2.5">
                <dt className="text-[14.5px] text-[color:var(--ink-600)]">{quote.gstLabel}</dt>
                <dd className="text-[15px] font-semibold">{formatRupees(quote.gstPaise)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[16px] font-semibold">Total due</dt>
                <dd className="font-[family-name:var(--font-display)] text-[28px] font-semibold tracking-[-0.02em]">{formatRupees(quote.chargePaise)}</dd>
              </div>
            </dl>
            <p className="text-[13.5px] leading-[1.5] text-[color:var(--ink-600)]">{quote.cadence}</p>
            <button
              type="button"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[9px] border-[1.5px] border-[color:var(--brand)] bg-[color:var(--brand)] text-[14.5px] font-semibold text-white hover:bg-[color:var(--brand-hover)]"
            >
              {`Pay ${formatRupees(quote.chargePaise)}`}
              <ArrowUpRight size={16} />
            </button>
          </aside>
        </div>
      </PricingPanel>
    </>
  )
}
