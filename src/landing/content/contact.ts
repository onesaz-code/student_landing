import { BRAND, CONTACT_OPTIONS, SERVICES } from './names'

export const CONTACT_HERO = {
  eyebrow: 'Contact Us',
  title: `Talk to the ${BRAND.name} team.`,
  lead: `Whether you are exploring ${BRAND.name} for the first time or already use it every day, we are here to help.`,
}

export type ContactOptionIcon = 'sales' | 'demo' | 'support'

export interface ContactOption {
  icon: ContactOptionIcon
  name: string
  text: string
  action: string
  to: string
}

const option = (id: (typeof CONTACT_OPTIONS)[number]['id']) => CONTACT_OPTIONS.find((o) => o.id === id)!

/** The three routes into the team, shown as cards in the hero. */
export const CONTACT_CARDS: ContactOption[] = [
  {
    icon: 'sales',
    name: option('contact-sales').name,
    text: 'Pricing, plans and the right products for your institution.',
    action: 'Talk to sales',
    to: `/contact#${option('contact-sales').hash}`,
  },
  {
    icon: 'demo',
    name: option('book-a-demo').name,
    text: `A live walkthrough of ${BRAND.name}, set up around your institution.`,
    action: 'Book a demo',
    to: `/contact#${option('book-a-demo').hash}`,
  },
  {
    icon: 'support',
    name: option('technical-support').name,
    text: `Help for institutions already using ${BRAND.name}.`,
    action: 'Get support',
    to: `/contact#${option('technical-support').hash}`,
  },
]

export const DEMO_PANEL = {
  title: `Bring ${BRAND.name} to your institution.`,
  lead: 'Tell us about your institution. Our team will show you the products that fit and plan your rollout with you.',
}

export const SUPPORT = {
  eyebrow: 'Technical support',
  title: `Already using ${BRAND.name}? We’re here to help.`,
  lead: `Our team supports every ${BRAND.name} institution, from setup to everyday questions.`,
  stepsTitle: 'How to get help',
  steps: [
    {
      title: 'Call or email our support team',
      text: `Reach us on ${BRAND.phone} or ${BRAND.email} and share your institution’s name.`,
    },
    { title: 'Tell us what you need', text: 'A product question, a setting to change or something not working as expected.' },
    { title: 'We help you fix it', text: 'Our team walks you through it, or takes care of it for you.' },
  ],
  servicesTitle: 'Services included',
  services: [
    { icon: 'setup', name: SERVICES[0], text: `We configure ${BRAND.name} and bring in your records.` },
    { icon: 'training', name: SERVICES[1], text: 'Hands-on sessions for teachers and office staff.' },
    { icon: 'support', name: SERVICES[3], text: 'We stay with you after go-live.' },
  ] as const,
  servicesLink: { label: 'See all services', to: '/solutions#services' },
}

export const CONTACT_FAQS = {
  eyebrow: 'FAQs',
  title: 'Before you get in touch',
  items: [
    {
      q: `Can I see ${BRAND.name} before deciding?`,
      a: 'Yes. Book a demo and our team will walk you through the products that fit your institution.',
    },
    { q: 'Can we start with one product?', a: 'Yes. Start with the product you need most and add more whenever you are ready.' },
    { q: 'Will you help us move our existing data?', a: 'Yes. Setup and data migration are part of every rollout.' },
  ],
  more: { label: 'See all FAQs', to: '/resources#faqs' },
}
