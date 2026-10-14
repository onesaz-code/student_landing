import { PLANS, type Plan } from '../content/pricing'

/** 18% GST, in basis points. The charged total is rounded in paise. */
const GST_BPS = 1800

export type PaidPlanId = 'monthly' | 'annual'

export interface PlanQuote {
  plan: Plan
  basePaise: number
  gstPaise: number
  chargePaise: number
  gstLabel: string
  cadence: string
}

const CADENCE: Record<PaidPlanId, string> = {
  monthly: 'Renews every 30 days. Cancel anytime before the next charge.',
  annual: 'One-time payment for 365 days. It does not renew.',
}

export function isPaidPlan(id: string | null): id is PaidPlanId {
  return id === 'monthly' || id === 'annual'
}

function basePaise(price: string): number {
  const rupees = Number(price.replace(/[^\d]/g, ''))
  return Number.isFinite(rupees) ? rupees * 100 : 0
}

export function quoteFor(planId: string | null): PlanQuote | null {
  if (!isPaidPlan(planId)) return null
  const plan = PLANS.find((item) => item.id === planId)
  if (!plan) return null
  const base = basePaise(plan.price)
  const chargePaise = Math.round((base * (10000 + GST_BPS)) / 10000)
  return {
    plan,
    basePaise: base,
    gstPaise: chargePaise - base,
    chargePaise,
    gstLabel: 'GST (18%)',
    cadence: CADENCE[planId],
  }
}

/** Whole rupees stay without paise. Grouping follows the Indian system (₹2,124). */
export function formatRupees(paise: number): string {
  const sign = paise < 0 ? '-' : ''
  const abs = Math.abs(Math.round(paise))
  const rupees = Math.floor(abs / 100)
  const rest = abs % 100
  const digits = String(rupees)
  let grouped = digits
  if (digits.length > 3) {
    const head = digits.slice(0, -3)
    const tail = digits.slice(-3)
    grouped = `${head.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${tail}`
  }
  const fraction = rest ? `.${String(rest).padStart(2, '0')}` : ''
  return `${sign}₹${grouped}${fraction}`
}

export function checkoutPath(studentId: string, planId: PaidPlanId): string {
  const params = new URLSearchParams({ studentId, plan: planId })
  return `/subscribe/checkout?${params.toString()}`
}
