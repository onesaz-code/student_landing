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
  /** Label above the feature list. */
  listHeading: string
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
    listHeading: 'What you get:',
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
    listHeading: 'What you get:',
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
    // "Everything included in the Monthly Plan", shown as the list heading
    listHeading: 'Everything in Monthly, plus',
    features: [
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

/** Pricing page FAQs. Answers only use the plan details and the ONESAZ refund and cancellation policies. */
export const STUDENT_PRICING_FAQS = [
  {
    q: 'Is there a free plan?',
    a: 'Yes. The Free Plan costs ₹0 and needs no card. You can choose any subject, topic and sub-topic, practise 5–10 questions per topic and check your correct and incorrect answers.',
  },
  {
    q: 'What is the difference between the Monthly and Annual plans?',
    a: 'Both give you unlimited practice, Strength & Weakness Analysis, personalized practice, progress tracking and the AI Tutor. The Annual Plan also adds unlimited quizzes and referral rewards, and costs ₹1,800 a year instead of ₹3,000 for 12 months of the Monthly Plan, a 40% saving.',
  },
  {
    q: 'Do the prices include GST?',
    a: 'No. GST is added to the Monthly and Annual plans at checkout.',
  },
  {
    q: 'What is the AI Tutor?',
    a: 'The AI Tutor gives step-by-step explanations and formula support. The Monthly Plan includes around 1,000–1,500 AI Tutor credits a month. It is not part of the Free Plan.',
  },
  {
    q: 'Can I cancel the Monthly Plan?',
    a: 'Yes, anytime. You are not charged again, and you keep access until the end of the month you have paid for.',
    link: { label: 'Read the Cancellation Policy', to: '/cancellation-policy' },
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes. You can ask for a full refund on the Monthly or Annual Plan within 7 days of paying.',
    link: { label: 'Read the Refund Policy', to: '/refund-policy' },
  },
  {
    q: 'My school uses ONESAZ. Do I need a plan?',
    a: 'No. Your access comes through your institution, so sign in with the login it gave you or use its app. These plans are only for individual students who are not with a partner institution.',
  },
]

export const INSTITUTION_PRICING_FAQS = [
  {
    q: 'How is pricing worked out for an institution?',
    a: 'It is priced per student, per year, and quoted once. Start with the products you need and switch on the rest when you are ready.',
  },
  {
    q: 'What is included?',
    a: 'Every institution plan includes setup and configuration, data migration, staff and teacher training, and ongoing support.',
  },
  {
    q: 'Do our students pay separately?',
    a: 'No. Your students get access through your institution and never pay separately.',
  },
  {
    q: 'How do we get a quote?',
    a: 'Book a demo and we will walk you through the products your institution needs, with a quote to match.',
    link: { label: 'Book a demo', to: '/contact#book-a-demo' },
  },
]
