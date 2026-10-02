import { CTA, PRODUCTS } from './names'
import { APP_DOWNLOAD_PATH } from './navigation'

/** Student pricing plans (prices exclude GST). */
export interface PlanFeature {
  text: string
  /** false = shown as not included (crossed out). */
  included?: boolean
}

export interface Plan {
  id: 'free' | 'monthly' | 'annual'
  name: string
  price: string
  /** Shown after the price, e.g. "/month + GST". */
  period: string
  /** Earlier price shown struck through (annual saving). */
  was?: string
  badge?: string
  summary: string
  features: PlanFeature[]
  cta: { label: string; href: string }
  featured?: boolean
}

export const PRICING_HERO = {
  eyebrow: 'Pricing',
  title: 'Plans for every way you learn.',
  lead: 'Individual students pick a plan. Institutions get ONESAZ for every student and teacher.',
}

/** The two audiences on the pricing page (tab ids double as URL hashes: /pricing#institutions). */
export const AUDIENCES = [
  { id: 'students', label: 'For individual students' },
  { id: 'institutions', label: 'For institutions' },
] as const
export type Audience = (typeof AUDIENCES)[number]['id']

/** Shown above the student plans so students of client institutions don't pay by mistake. */
export const PARTNER_NOTICE = {
  text: 'Studying at a school or college that uses ONESAZ? You don’t need a plan.',
  signIn: { label: 'Sign in', href: CTA.loginHref },
  apps: { label: 'find your institution’s app', to: APP_DOWNLOAD_PATH },
}

/** Institutions tab: pricing is quoted per institution (same terms as the home page FAQ). */
export const INSTITUTION_PRICING = {
  title: 'Custom pricing for your institution',
  text: 'Priced per student, per year, and quoted once. Start with the products you need and switch on the rest when you are ready.',
  included: ['Setup and configuration', 'Data migration', 'Staff and teacher training', 'Ongoing support'],
  products: PRODUCTS.map((p) => p.short),
  studentsNote: 'Your students get access through your institution. They never pay separately.',
}

/** Exactly the plan details provided by ONESAZ; nothing added. */
export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '₹0',
    period: '',
    summary: 'For students who want to explore the platform before subscribing.',
    features: [
      { text: 'Choose any subject, topic & sub-topic' },
      { text: 'Practice 5–10 questions per topic' },
      { text: 'Check correct and incorrect answers' },
      { text: 'No Strength & Weakness Analysis', included: false },
      { text: 'No AI Tutor', included: false },
      { text: 'No card required' },
    ],
    cta: { label: 'Start for free', href: CTA.loginHref },
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '₹250',
    period: '/month + GST',
    summary: 'Full access to personalized practice and AI-supported learning.',
    features: [
      { text: 'Unlimited practice across the complete question bank' },
      { text: 'Strength & Weakness Analysis' },
      { text: 'Personalized practice based on student performance' },
      { text: 'Performance insights and progress tracking' },
      { text: 'AI Tutor with step-by-step explanations and formula support' },
      { text: 'Around 1,000–1,500 AI Tutor credits/month' },
      { text: 'Cancel anytime' },
    ],
    cta: { label: 'Choose Monthly', href: CTA.loginHref },
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    price: '₹1,800',
    period: '/year + GST',
    was: '₹3,000',
    badge: '40% savings',
    summary: 'Complete student learning experience at a discounted yearly price.',
    features: [
      { text: 'Everything included in the Monthly Plan' },
      { text: 'Unlimited eligible practice' },
      { text: 'Unlimited quizzes' },
      { text: 'Complete ONESAZ student learning experience' },
      { text: 'Referral rewards for annual members' },
      { text: 'One-time annual payment' },
      { text: '₹3,000 → ₹1,800, 40% savings' },
    ],
    cta: { label: 'Choose Annual', href: CTA.loginHref },
    featured: true,
  },
]

/** Home page strip ("For individual students"), just before the FAQ. */
export const PLANS_STRIP = {
  eyebrow: 'For individual students',
  title: 'Not with a partner institution? Learn on your own.',
  note: 'Already at a ONESAZ institution? Your access is included.',
  cta: 'See all plans',
}
