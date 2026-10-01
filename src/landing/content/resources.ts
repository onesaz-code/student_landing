import type { ProductSlug } from './names'

/** Copy for the Resources page (/resources). Resource names come from RESOURCES in names.ts. */

export const RESOURCES_HERO = {
  eyebrow: 'Resources',
  title: 'Learn ONESAZ, at your own pace.',
  lead: 'Tutorials, product guides and answers to help your team set up ONESAZ and get the most from it every day.',
}

export const GUIDES = {
  eyebrow: 'Product guides',
  title: 'A guide for every ONESAZ product.',
  lead: 'Features, how it works, who it’s for and FAQs, product by product.',
  linkLabel: 'Read the guide',
  tour: {
    title: 'Take the product tour',
    text: 'See every product working, one tab at a time.',
    linkLabel: 'Start the tour',
    to: '/#product-tour',
  },
}

export interface ResultPoint {
  label: string
  title: string
  text: string
  product: ProductSlug
}

/**
 * "What changes when institutions move to ONESAZ."
 * Qualitative points only: the design's metrics, before/after numbers and named quotes are placeholders and are left out.
 */
export const RESULTS = {
  eyebrow: 'Results',
  title: 'What changes when institutions move to ONESAZ.',
  subtitle: 'What changes for our clients',
  points: [
    {
      label: 'Fee reconciliation',
      title: 'No more matching fee entries by hand',
      text: 'Fees, receipts and student records sit in one system instead of four, so the weekly job of matching fee entries by hand stops existing.',
      product: 'erp',
    },
    {
      label: 'Results to parents',
      title: 'Same-day results',
      text: 'Answer sheets are scanned in the morning and ranks reach parents by the afternoon, instead of taking over a week.',
      product: 'omr-scanning',
    },
    {
      label: 'Fee dues',
      title: 'Fee follow-ups that actually happen',
      text: 'AI calls handle the fee reminders your office never had time for, so dues are followed up all through the term.',
      product: 'ai-calling-agent',
    },
  ] satisfies ResultPoint[],
}

export const RESOURCES_CTA = {
  title: 'Can’t find what you’re looking for?',
  text: 'Our team will answer your questions and walk you through ONESAZ live.',
  back: { label: 'Back to home', to: '/' },
}
