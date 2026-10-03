import { productBySlug } from './names'
import { PYQ_EXAMS } from './pyqs'

/** Browser tab title and search/link-preview description for each page. */
export interface PageMeta {
  title: string
  description: string
}

const SUFFIX = 'ONESAZ by Acadhub'

export const DEFAULT_META: PageMeta = {
  title: `${SUFFIX} — AI-Powered Education Management`,
  description:
    'ONESAZ by Acadhub brings academics, administration, exams, communication, payments and student learning together on one AI-powered platform for schools, colleges and institutes.',
}

const PAGES: Record<string, PageMeta> = {
  '/': DEFAULT_META,
  '/solutions': {
    title: `Solutions for Schools, Colleges & Coaching Institutes · ${SUFFIX}`,
    description:
      'One platform shaped to the way your institution works: schools, colleges, coaching institutes and trusts & school groups, each with the ONESAZ products that fit them.',
  },
  '/resources': {
    title: `Resources & Tutorials · ${SUFFIX}`,
    description:
      'Tutorials, product guides, platform modules and answers to help your team set up ONESAZ and get the most from it every day.',
  },
  '/previous-papers': {
    title: `Previous Year Question Papers (PYQs) with Solutions · ${SUFFIX}`,
    description:
      'Download previous year question papers for JEE Main, NEET UG, CBSE Class 12, CBSE Class 10 and TS EAPCET, year by year, with solutions. Free, no sign-up.',
  },
  '/about': {
    title: `About ONESAZ · ${SUFFIX}`,
    description:
      'Acadhub Edu Tech Pvt. Ltd. builds ONESAZ, an AI-powered one-stop solution for schools, colleges and educational institutions, based in Hyderabad.',
  },
  '/contact': {
    title: `Contact Us & Book a Demo · ${SUFFIX}`,
    description: 'Talk to the ONESAZ team: book a demo, contact sales or reach technical support. Based in Madhapur, Hyderabad.',
  },
  '/apps': {
    title: `ONESAZ Mobile Apps · ${SUFFIX}`,
    description: 'Get the official ONESAZ apps and your institution’s own branded app on Google Play and the App Store.',
  },
  '/pricing': {
    title: `Pricing · ${SUFFIX}`,
    description:
      'ONESAZ pricing: plans for individual students (Free, Monthly at ₹250 + GST, Annual at ₹1,800 + GST) and custom pricing for schools, colleges and institutes.',
  },
  '/refund-policy': {
    title: `Refund Policy · ${SUFFIX}`,
    description: 'When you can get a refund on a ONESAZ student plan or institution plan, and how to ask for one.',
  },
  '/cancellation-policy': {
    title: `Cancellation Policy · ${SUFFIX}`,
    description: 'How to cancel a ONESAZ plan, and what happens to your access and data afterwards.',
  },
  '/careers': {
    title: `Careers · ${SUFFIX}`,
    description: 'Build the future of education with the ONESAZ team at Acadhub.',
  },
}

/** Meta for a pathname; product pages are built from their content. Unknown paths use the default. */
export function metaForPath(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (PAGES[path]) return PAGES[path]
  const pyq = path.match(/^\/previous-papers\/([^/]+)$/)
  if (pyq) {
    const exam = PYQ_EXAMS.find((e) => e.slug === pyq[1])
    if (exam)
      return {
        title: `${exam.name} Previous Year Question Papers with Solutions · ${SUFFIX}`,
        description: `Download ${exam.name} previous year question papers, year by year, with solutions. Free PDFs, no sign-up.`,
      }
  }
  const m = path.match(/^\/products\/([^/]+)$/)
  const product = m && productBySlug(m[1])
  if (product) {
    // Built from names.ts (not products.ts) so the product copy stays out of the main bundle
    return {
      title: `${product.name} · ${SUFFIX}`,
      description: `${product.name}: ${product.line}. Part of ONESAZ, the AI-powered platform for schools, colleges and institutes.`,
    }
  }
  return DEFAULT_META
}
