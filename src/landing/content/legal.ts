/**
 * Legal page copy (privacy, terms, cookies, GDPR).
 * Page text goes here. LegalPage only renders it.
 */
import { BRAND } from './names'

export interface LegalSection {
  id?: string
  title?: string
  paragraphs?: string[]
  bullets?: string[]
  ordered?: boolean
}

export interface LegalDocument {
  documentTitle: string
  sections: LegalSection[]
}

export type LegalKey = 'privacy' | 'terms' | 'cookie' | 'gdpr'

const pending = (name: string): LegalSection[] => [
  {
    paragraphs: [`The ${name} for ${BRAND.lockup} is being updated. For questions, email ${BRAND.email}.`],
  },
]

export const LEGAL_PAGES: Record<LegalKey, LegalDocument> = {
  privacy: { documentTitle: 'Privacy Policy', sections: pending('Privacy Policy') },
  terms: { documentTitle: 'Terms of Service', sections: pending('Terms of Service') },
  cookie: { documentTitle: 'Cookie Policy', sections: pending('Cookie Policy') },
  gdpr: { documentTitle: 'GDPR', sections: pending('GDPR page') },
}
