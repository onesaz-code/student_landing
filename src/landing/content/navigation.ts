import type { LucideIcon } from 'lucide-react'
import { PLATFORM_FEATURE_ICONS, PRODUCT_ICONS, ROLE_ICONS } from '../components/productIcons'
import { FEATURES, PRODUCTS, RESOURCES, SOLUTIONS, productPath, type ProductSlug } from './names'

export interface NavLink {
  label: string
  to: string
  /** Flat icon shown before the label (products and platform features). */
  icon?: LucideIcon
  /** Icon colour (the product's colour). */
  color?: string
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

/** Student pricing page, linked from the header, phone menu and footer. */
export const PRICING_LINK: NavLink = { label: 'Pricing', to: '/pricing' }
/** Previous year question papers, a top-level link for students. */
export const PYQ_LINK: NavLink = { label: 'PYQs', to: '/previous-papers' }

/** The ONESAZ Mobile Apps page, which lists every app with store links. */
export const APP_DOWNLOAD_PATH = '/apps'

/** Icon colours for platform features (they have no product colour of their own). */
const FEATURE_COLORS = {
  adaptive: '#E0A030',
  payments: '#CA8A04',
  sms: '#25A35A',
  app: '#475569',
} as const

const product = (slug: ProductSlug): NavLink => {
  const p = PRODUCTS.find((x) => x.slug === slug)!
  return { label: p.name, to: productPath(slug), icon: PRODUCT_ICONS[slug], color: p.color }
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
          { label: 'About ONESAZ', to: '/about' },
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
          { label: FEATURES.adaptive, to: productPath('ai-tutor'), icon: PLATFORM_FEATURE_ICONS.adaptive, color: FEATURE_COLORS.adaptive },
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
          { label: FEATURES.payments, to: productPath('erp'), icon: PLATFORM_FEATURE_ICONS.payments, color: FEATURE_COLORS.payments },
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
          { label: FEATURES.sms, to: '/resources#platform-modules', icon: PLATFORM_FEATURE_ICONS.sms, color: FEATURE_COLORS.sms },
          { label: FEATURES.app, to: APP_DOWNLOAD_PATH, icon: PLATFORM_FEATURE_ICONS.app, color: FEATURE_COLORS.app },
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
          { label: 'Management & Owners', to: '/solutions#roles', icon: ROLE_ICONS.management, color: 'var(--brand)' },
          { label: 'Principals', to: '/solutions#roles', icon: ROLE_ICONS.principals, color: 'var(--brand)' },
          { label: 'Teachers', to: '/solutions#roles', icon: ROLE_ICONS.teachers, color: 'var(--brand)' },
          { label: 'Parents & Students', to: '/solutions#roles', icon: ROLE_ICONS.parentsStudents, color: 'var(--brand)' },
        ],
      },
      {
        title: 'By Product',
        // Tight column: short names, per the naming standard.
        links: PRODUCTS.map((p) => ({ label: p.short, to: productPath(p.slug), icon: PRODUCT_ICONS[p.slug], color: p.color })),
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
        title: 'For Students',
        links: [{ label: 'Previous Year Papers', to: '/previous-papers' }],
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
      { label: FEATURES.app, to: APP_DOWNLOAD_PATH, icon: PLATFORM_FEATURE_ICONS.app, color: FEATURE_COLORS.app },
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
    links: [
      { label: 'Resources', to: '/resources' },
      ...RESOURCES.map((r) => ({ label: r.name, to: `/resources#${r.id}` })),
      { label: 'Previous Year Papers', to: '/previous-papers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About ONESAZ', to: '/about' },
      PRICING_LINK,
      { label: 'Why ONESAZ', to: '/about#why-onesaz' },
      { label: 'Our Clients', to: '/about#our-clients' },
      { label: 'Testimonials', to: '/about#testimonials' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]
