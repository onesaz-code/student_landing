/**
 * Copy for the About ONESAZ page (/about). Product names come from names.ts;
 * the "Why ONESAZ", Services, Clients and Testimonials blocks reuse the home sections.
 */

export const ABOUT_HERO = {
  eyebrow: 'About ONESAZ',
  title: 'We build ONESAZ, one platform for everything an institution runs.',
  lead: 'Acadhub Edu Tech Pvt. Ltd. is an education technology company based in Hyderabad. Since 2019 we have been building ONESAZ, an AI-powered one-stop solution that brings academics, administration, exams, communication and payments together for schools, colleges and educational institutions.',
  visualLine: 'One-stop solution for all educational needs.',
  motto: 'Simplify operations · Connect everyone · Make better decisions',
}

export const WHO_WE_ARE = {
  eyebrow: 'Who we are',
  title: 'An education technology company, built for institutions.',
  mission: {
    label: 'Our mission',
    title: 'Simplify operations. Connect everyone. Make better decisions.',
    text: 'We give institutions one connected platform, so students, teachers, parents and management work from the same information.',
  },
  vision: {
    label: 'Our vision',
    title: 'Every institution running on one platform, instead of ten.',
    text: 'So teachers can teach, leaders can lead, and parents always know how their child is doing.',
  },
}

export type ValueIcon = 'platform' | 'institutions' | 'support'

export const VALUES: { icon: ValueIcon; title: string; text: string }[] = [
  {
    icon: 'platform',
    title: 'One platform, not many vendors',
    text: 'Learning, administration, exams, devices and communication in one product, one login and one bill.',
  },
  {
    icon: 'institutions',
    title: 'Built with institutions',
    text: 'ONESAZ is shaped by the schools, colleges and coaching institutes that use it every day.',
  },
  { icon: 'support', title: 'Support that stays', text: 'Our team sets you up, trains your staff and stays with you after go-live.' },
]

export const WHAT_WE_BUILD = {
  eyebrow: 'What we build',
  title: 'Everything on one ONESAZ platform.',
  lead: 'Each product works on its own, and all of them share one student record.',
  /** The mobile app is a platform feature (no product page), so it links to Platform Modules. */
  app: { line: 'Students, teachers and parents on the go', to: '/resources#platform-modules' },
}

/** Qualitative outcomes only: the design's figures and named quotes were placeholders. */
export const RESULTS = {
  eyebrow: 'Results',
  title: 'What changes when institutions move to ONESAZ.',
  subtitle: 'What changed for our clients',
  items: [
    {
      label: 'Fee reconciliation',
      title: 'No more matching by hand',
      text: 'Fees, receipts and student records live in one system, so the weekly job of matching fee entries across separate tools stops existing.',
    },
    {
      label: 'Results to parents',
      title: 'Same-day results',
      text: 'Answer sheets are scanned in the morning and ranks reach parents by the afternoon, instead of taking over a week.',
    },
    {
      label: 'Fee dues',
      title: 'Follow-ups that always happen',
      text: 'The AI Calling Agent makes the fee reminder calls a busy office never has time for, so dues are chased on time every term.',
    },
  ],
}

export const ABOUT_CONTACT = {
  label: 'Talk to us',
  title: 'Let’s bring ONESAZ to your institution.',
  text: 'Tell us about your campuses and what you use today. We’ll show you how ONESAZ fits.',
  back: 'Back to home',
}
