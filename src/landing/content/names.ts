/**
 * Naming standard — the single source for every product, feature, solution,
 * resource and page name on the ONESAZ landing page.
 *
 * Rules (see the Design & Implementation Plan, "Naming standard"):
 * - `name` is the full name: page titles, H1s, menus, footer, breadcrumbs.
 * - `short` is for tight UI only: chips, mobile tabs, badges, the module ring.
 * - Product and feature names are proper nouns: always Title Case as written here.
 */

export const BRAND = {
  name: 'ONESAZ',
  lockup: 'ONESAZ by Acadhub',
  company: 'Acadhub Edu Tech Pvt. Ltd.',
  tagline: 'One-stop solution for all educational needs',
  phone: '+91 99123 40396',
  phoneHref: 'tel:+919912340396',
  email: 'info@acadhub.com',
  headquarters: 'Madhapur, Hyderabad',
  /** Full postal address, shown on the Contact page. */
  addressLines: [
    'Suvarna Habitat, Jai Hind Gandhi Rd, Cyber Hills Colony,',
    'VIP Hills, Jaihind Enclave, Madhapur,',
    'Hyderabad, Telangana 500081',
  ],
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Suvarna+Habitat,+Jai+Hind+Gandhi+Rd,+Cyber+Hills+Colony,+VIP+Hills,+Jaihind+Enclave,+Madhapur,+Hyderabad,+Telangana+500081',
  logoSrc: '/images/onesaz-mark.png',
  /** Developer pages on each store: they list every ONESAZ app. */
  apps: {
    googlePlay: 'https://play.google.com/store/apps/developer?id=onesaz+developer&hl=en_IN',
    appStore: 'https://apps.apple.com/us/developer/onesaz/id1713076053',
  },
} as const

export type ProductSlug =
  | 'erp'
  | 'lms'
  | 'attendance'
  | 'omr-scanning'
  | 'descriptive-evaluation'
  | 'question-bank'
  | 'ai-tutor'
  | 'crm'
  | 'mdm'
  | 'ai-calling-agent'
  | 'video-calling'

export interface Product {
  slug: ProductSlug
  name: string
  short: string
  badge: string
  color: string
  tint: string
  /** One line used on link cards, guides and menus. */
  line: string
}

/** The 11 products, in the order used everywhere (tour, menus, footer, guides). */
export const PRODUCTS: Product[] = [
  { slug: 'erp', name: 'Enterprise Resource Planning (ERP)', short: 'ERP', badge: 'ERP', color: '#1F7A4F', tint: '#E7F5EE', line: 'Admissions, fees and student records' },
  { slug: 'lms', name: 'Academic Management (LMS)', short: 'LMS', badge: 'LMS', color: '#2447D1', tint: '#EEF2FD', line: 'Lessons, homework, timetables and progress' },
  { slug: 'attendance', name: 'Attendance Management', short: 'Attendance', badge: 'ATT', color: '#0284C7', tint: '#E0F2FE', line: 'Registers in seconds, parents alerted' },
  { slug: 'omr-scanning', name: 'OMR Scanning & Exams', short: 'OMR Scanning', badge: 'EXAMS', color: '#C2412D', tint: '#FDEFEC', line: 'Paper tests with same-day results' },
  { slug: 'descriptive-evaluation', name: 'Descriptive Evaluation', short: 'Evaluation', badge: 'DE', color: '#EA580C', tint: '#FFF1E8', line: 'Rubric-based marking of written answers' },
  { slug: 'question-bank', name: 'Question Bank', short: 'Question Bank', badge: 'QB', color: '#0D9488', tint: '#E6F6F4', line: '10 lakh+ questions for tests and practice' },
  { slug: 'ai-tutor', name: 'AI Tutor', short: 'AI Tutor', badge: 'TUTOR', color: '#DB2777', tint: '#FDEBF4', line: 'Personal practice for every student' },
  { slug: 'crm', name: 'Admissions CRM', short: 'CRM', badge: 'CRM', color: '#4F46E5', tint: '#EEF0FE', line: 'Every enquiry followed up' },
  { slug: 'mdm', name: 'Mobile Device Management (MDM)', short: 'MDM', badge: 'MDM', color: '#B7791F', tint: '#FBF3E4', line: 'Locked-down, ready-to-use class tablets' },
  { slug: 'ai-calling-agent', name: 'AI Calling Agent', short: 'AI Calling', badge: 'AI', color: '#6A4BD8', tint: '#F1ECFD', line: 'Automated calls to parents' },
  { slug: 'video-calling', name: 'Video Calling', short: 'Video Calling', badge: 'VIDEO', color: '#0E7490', tint: '#E3F4F8', line: 'Parents and students, face to face' },
]

export const productBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug)

export const productPath = (slug: ProductSlug) => `/products/${slug}`

/** Platform features: no page of their own. */
export const FEATURES = {
  sms: 'Bulk SMS & WhatsApp',
  payments: 'Payment Gateway',
  adaptive: 'Adaptive Learning',
  app: 'ONESAZ Mobile Apps',
} as const

export const SOLUTIONS = [
  { id: 'schools', name: 'Schools', line: 'K–12 schools' },
  { id: 'colleges', name: 'Colleges', line: 'Degree, junior and professional colleges' },
  { id: 'coaching-institutes', name: 'Coaching Institutes', line: 'Test prep and tuition centres' },
  { id: 'trusts-school-groups', name: 'Trusts & School Groups', line: 'Trusts, societies and multi-campus groups' },
] as const

export const ROLES = ['Management & Owners', 'Principals', 'Teachers', 'IT Administrators', 'Parents', 'Students'] as const

export const RESOURCES = [
  { id: 'tutorials', name: 'Tutorials', line: 'Step-by-step product videos' },
  { id: 'product-guides', name: 'Product Guides', line: 'What every ONESAZ product does' },
  { id: 'platform-modules', name: 'Platform Modules', line: 'Everything inside ONESAZ' },
  { id: 'faqs', name: 'FAQs', line: 'Answers to common questions' },
  { id: 'customer-stories', name: 'Customer Stories', line: 'Clients, testimonials and results' },
] as const

export const SERVICES = ['Setup & Data Migration', 'Staff Training', 'Device Rollout', 'Ongoing Support', 'Custom Configuration'] as const

export const CONTACT_OPTIONS = [
  { id: 'contact-sales', name: 'Contact Sales', hash: 'book-a-demo' },
  { id: 'book-a-demo', name: 'Book a Demo', hash: 'book-a-demo' },
  { id: 'technical-support', name: 'Technical Support', hash: 'support' },
] as const

/** One label per action, on every page. */
export const CTA = {
  demo: 'Book a demo',
  demoPath: '/contact#book-a-demo',
  login: 'Login',
  loginHref: 'https://onesaz.com/sign-in',
} as const
