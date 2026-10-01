import { FEATURES, PRODUCTS, RESOURCES, SOLUTIONS, productPath, type ProductSlug } from './names'

export interface NavLink {
  label: string
  to: string
  /** Product colour dot shown before the label. */
  dot?: string
  description?: string
}

export interface NavGroup {
  title: string
  description?: string
  explore?: NavLink
  links: NavLink[]
}

export interface NavPromo {
  title: string
  text: string
  cta: NavLink
}

export interface NavMenu {
  id: 'about' | 'products' | 'solutions' | 'resources'
  label: string
  /** 'cards' = grey product cards (Products); 'columns' = headed link columns. */
  layout: 'cards' | 'columns'
  groups: NavGroup[]
  promos?: NavPromo[]
}

const product = (slug: ProductSlug): NavLink => {
  const p = PRODUCTS.find((x) => x.slug === slug)!
  return { label: p.name, to: productPath(slug), dot: p.color }
}

export const MENUS: NavMenu[] = [
  {
    id: 'about',
    label: 'About',
    layout: 'columns',
    groups: [
      {
        title: 'Company',
        links: [
          { label: 'About Acadhub', to: '/about' },
          { label: 'Why ONESAZ', to: '/about#why-onesaz' },
          { label: 'Services', to: '/about#services' },
        ],
      },
      {
        title: 'Trust',
        links: [
          { label: 'Our Clients', to: '/about#our-clients' },
          { label: 'Testimonials', to: '/about#testimonials' },
          { label: 'Results', to: '/about#results' },
        ],
      },
    ],
    promos: [
      {
        title: 'Talk to our team',
        text: 'Questions about pricing or rollout? We are happy to help.',
        cta: { label: 'Contact us', to: '/contact' },
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    layout: 'cards',
    groups: [
      {
        title: 'Academics',
        description: 'Teach, assess and personalise learning for every student.',
        explore: { label: 'Explore', to: productPath('lms') },
        links: [
          product('lms'),
          product('attendance'),
          product('question-bank'),
          product('ai-tutor'),
          { label: FEATURES.adaptive, to: productPath('ai-tutor') },
        ],
      },
      {
        title: 'Exams & Administration',
        description: 'Evaluate exams and run the whole institution from one office.',
        explore: { label: 'Explore', to: productPath('erp') },
        links: [
          product('omr-scanning'),
          product('descriptive-evaluation'),
          product('erp'),
          product('crm'),
          { label: FEATURES.payments, to: productPath('erp') },
        ],
      },
      {
        title: 'Devices & Communication',
        description: 'Manage devices and keep students, parents and staff connected.',
        explore: { label: 'Explore', to: productPath('mdm') },
        links: [
          product('mdm'),
          product('ai-calling-agent'),
          product('video-calling'),
          { label: FEATURES.sms, to: '/resources#platform-modules' },
          { label: FEATURES.app, to: '/resources#platform-modules' },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    layout: 'columns',
    groups: [
      {
        title: 'By Institution',
        links: SOLUTIONS.map((s) => ({ label: s.name, to: `/solutions#${s.id}` })),
        explore: { label: 'View all solutions', to: '/solutions' },
      },
      {
        title: 'By Role',
        links: [
          { label: 'Management & Owners', to: '/solutions#roles' },
          { label: 'Principals', to: '/solutions#roles' },
          { label: 'Teachers', to: '/solutions#roles' },
          { label: 'Parents & Students', to: '/solutions#roles' },
        ],
      },
      {
        title: 'By Product',
        // Tight column: short names, per the naming standard.
        links: PRODUCTS.map((p) => ({ label: p.short, to: productPath(p.slug), dot: p.color })),
      },
      {
        title: 'Services',
        links: [
          { label: 'Setup & Data Migration', to: '/solutions#services' },
          { label: 'Staff Training', to: '/solutions#services' },
          { label: 'Ongoing Support', to: '/solutions#services' },
        ],
        explore: { label: 'View all services', to: '/solutions#services' },
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    layout: 'columns',
    groups: [
      {
        title: 'Learn',
        links: RESOURCES.slice(0, 4).map((r) => ({ label: r.name, to: `/resources#${r.id}` })),
        explore: { label: 'View all resources', to: '/resources' },
      },
      {
        title: 'Customer Stories',
        links: [
          { label: 'Our Clients', to: '/resources#our-clients' },
          { label: 'Testimonials', to: '/resources#testimonials' },
          { label: 'Results', to: '/resources#results' },
        ],
      },
    ],
    promos: [
      {
        title: 'See ONESAZ in action',
        text: 'A short tour of every product.',
        cta: { label: 'Take the tour', to: '/#product-tour' },
      },
      {
        title: 'Book a free demo',
        text: 'We will show it with your own data.',
        cta: { label: 'Book now', to: '/contact#book-a-demo' },
      },
    ],
  },
]

export const CONTACT_MENU: NavLink[] = [
  { label: 'Contact Sales', to: '/contact#book-a-demo' },
  { label: 'Book a Demo', to: '/contact#book-a-demo' },
  { label: 'Technical Support', to: '/contact#support' },
]

/** Footer columns: same destinations as the header, grouped in six columns. */
export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Academics & Exams',
    links: (['lms', 'attendance', 'omr-scanning', 'descriptive-evaluation', 'question-bank', 'ai-tutor'] as ProductSlug[]).map(product),
  },
  {
    title: 'Administration & Connect',
    links: [
      ...(['erp', 'crm', 'mdm', 'ai-calling-agent', 'video-calling'] as ProductSlug[]).map(product),
      { label: FEATURES.app, to: '/resources#platform-modules' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      ...SOLUTIONS.map((s) => ({ label: s.name, to: `/solutions#${s.id}` })),
      { label: 'By Role', to: '/solutions#roles' },
      { label: 'Services', to: '/solutions#services' },
    ],
  },
  {
    title: 'Resources',
    links: [{ label: 'Resources', to: '/resources' }, ...RESOURCES.map((r) => ({ label: r.name, to: `/resources#${r.id}` }))],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Acadhub', to: '/about' },
      { label: 'Why ONESAZ', to: '/about#why-onesaz' },
      { label: 'Our Clients', to: '/about#our-clients' },
      { label: 'Testimonials', to: '/about#testimonials' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]
