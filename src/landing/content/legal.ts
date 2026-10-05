/**
 * Legal page copy (privacy, terms, cookies, GDPR, data deletion).
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
  /** Shown under the title, not inside the body. */
  version?: string
  effective?: string
  sections: LegalSection[]
}

export const LEGAL_NAV: { label: string; to: string }[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'Cancellation Policy', to: '/cancellation-policy' },
  { label: 'Data Deletion Policy', to: '/data-deletion-policy' },
]

export type LegalKey = 'privacy' | 'terms' | 'cookie' | 'gdpr' | 'data-deletion'

const pending = (name: string): LegalSection[] => [
  {
    paragraphs: [`The ${name} for ${BRAND.lockup} is being updated. For questions, email ${BRAND.email}.`],
  },
]

const privacySections = (brand: typeof BRAND): LegalSection[] => [
  {
    paragraphs: [
      `${brand.company} (“Acadhub”, “we”) operates ${brand.name}, including our websites and mobile apps. This policy explains what we collect, how we use it, and the choices you have.`,
      'Personal information means information that identifies a person, such as a name, phone number, email address, student ID or device identifier. We do not sell personal information.',
    ],
  },
  {
    id: 'who',
    title: 'Who this policy covers',
    paragraphs: [`${brand.name} is used in three ways.`],
    bullets: [
      'Institutions that subscribe and upload records for students, parents and staff.',
      'Students, parents, teachers and staff who are given an account by an institution.',
      'People who browse this website, book a demo, or pay for an individual student plan.',
    ],
  },
  {
    id: 'collect',
    title: 'Information we collect',
    paragraphs: ['What we collect depends on how you use ONESAZ.'],
    bullets: [
      'Name, email address, phone number, role and class.',
      'Admissions, attendance, fee, staff and transport records.',
      'Lessons, test scores, answer sheets and practice activity.',
      'Messages, call numbers, and files you choose to upload.',
      'Device status for institution-owned phones and tablets.',
      'Billing details. We do not store full card or UPI credentials.',
      'IP address, browser, device type and pages viewed.',
      'Sign-in activity needed to provide the feature you used.',
    ],
  },
  {
    id: 'use',
    title: 'How we use it',
    bullets: [
      'To run ONESAZ and send results, alerts and fee reminders.',
      'To answer demo, support and billing questions.',
      'To keep the service secure and fix faults.',
      'To see which features are used, so we can improve them.',
      'To keep invoices and meet the law.',
      'To send product updates. You can opt out of marketing. Receipts and security alerts still go out while you have an account.',
    ],
  },
  {
    id: 'roles',
    title: 'Who decides',
    paragraphs: [
      'When a school or college uses ONESAZ, that institution decides why student, parent and staff data is collected. Acadhub processes it only on their instructions. We do not use those records to market to students or parents.',
      'We decide the purpose for information we collect ourselves: demo requests, billing, individual student plans, website usage and support.',
    ],
  },
  {
    id: 'legal-bases',
    title: 'Why we are allowed to',
    bullets: [
      'To perform the subscription or student plan.',
      'Because the institution has instructed us to process its records.',
      'For security and support, where your rights do not override that interest.',
      'With your consent, which you can withdraw at any time.',
      'Where the law requires it.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'We use essential cookies to run the site, and analytics cookies to see which pages are visited. YouTube may set its own cookies if you play an embedded video. You can block non-essential cookies in your browser.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    paragraphs: ['Service providers may use information only to perform the work we hire them for.'],
    bullets: [
      'The institution that gave you an account.',
      'Hosting, email, SMS, WhatsApp and calling providers.',
      'Payment partners, who receive billing details, not study records.',
      'Authorities, when the law requires it.',
      'A buyer, if the business is sold. We will tell affected customers first.',
    ],
  },
  {
    paragraphs: ['We do not share institution records with advertisers.'],
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'Under the Digital Personal Data Protection Act, 2023 and, where it applies, the EU and UK GDPR, you can ask to access, correct or delete your information, object to marketing, or withdraw consent.',
      `If your school created the account, contact the school first. We will help them. For an individual account or a website enquiry, email ${brand.email}. We may keep invoices where tax law requires it.`,
    ],
  },
  {
    id: 'end-users',
    title: 'If your institution manages your account',
    paragraphs: [
      'Administrators can reset your password, see records and remove access. If you use an institution email address, that institution may later administer the account. We will tell you if that happens.',
    ],
  },
  {
    id: 'children',
    title: 'Students and children',
    paragraphs: [
      'Student records, including children’s data, are provided by the institution or a parent. The institution must have the legal authority to share them. We use that data only to provide the service.',
      `A child under 18 cannot open an individual paid account alone. A parent, guardian or institution must open it. We do not use children’s data for our own marketing. If you believe a child has given us information without that authority, email ${brand.email}.`,
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    bullets: [
      'Institution records: for the subscription, then deleted or returned when the institution asks, unless the law requires longer.',
      'Individual accounts: while the account is active. Invoices are kept for tax.',
      'Demo details: while we are in touch about your enquiry. You can ask us to delete them sooner.',
      'Security logs: for a limited period.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'Access is limited to people who need it, and connections use HTTPS. If a breach requires notice, we will tell you, or the institution where it controls the record.',
    ],
  },
  {
    id: 'transfers',
    title: 'Where information is processed',
    paragraphs: [
      'We store information in India. A messaging or payment partner may process a limited part of it in another country, and must protect it by contract.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      'We will update the date at the top of this page. If a change materially affects how we use personal information, we will also notify account holders.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      `Questions and requests: ${brand.email}`,
      brand.company,
      brand.addressLines.join(' '),
      brand.phone,
      'If the request is about records a school stores in ONESAZ, contact the school as well.',
    ],
  },
]

const termsSections = (brand: typeof BRAND): LegalSection[] => [
  {
    paragraphs: [
      `${brand.company} (“Acadhub”, “we”) operates ${brand.name}, including our websites and mobile apps. These terms govern your use of ${brand.name}.`,
      `By using ${brand.name} you agree to these terms, the Privacy Policy and, where they apply, the Refund Policy and Cancellation Policy. If you do not agree, do not use the service.`,
    ],
  },
  {
    id: 'who',
    title: 'Who these terms cover',
    bullets: [
      'Institutions that subscribe to ONESAZ.',
      'Students, parents, teachers and staff who are given an account by an institution.',
      'People who browse this website, book a demo, or pay for an individual student plan.',
    ],
  },
  {
    id: 'service',
    title: 'The service',
    paragraphs: [
      'ONESAZ is a school and college platform. It includes admissions and fees, learning, attendance, exams, a question bank, an AI tutor, admissions follow-up, device management, calls and video calls.',
      'We may add, change or withdraw a feature. If a change materially reduces what an institution paid for, we will tell the institution.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts',
    bullets: [
      'You must give accurate details and keep your password safe.',
      'You are responsible for activity on your account.',
      'If your school created the account, the school administers it and can reset access.',
      'A child under 18 cannot open an individual paid account alone. A parent, guardian or institution must open it.',
    ],
  },
  {
    id: 'institution',
    title: 'Institution accounts',
    paragraphs: [
      'The institution is responsible for the records it uploads, for who it gives access to, and for having the legal authority to share student and staff data with us.',
      'We process those records on the institution’s instructions so the product works. The institution’s own policies apply to its users in addition to these terms.',
    ],
  },
  {
    id: 'plans',
    title: 'Plans and payment',
    bullets: [
      'Individual students can use the Free Plan, or pay for the Monthly Plan or the Annual Plan. GST is added at checkout.',
      'Institution pricing is quoted separately and follows the agreement or order form.',
      'We do not store full card or UPI credentials. Payment partners process the payment.',
      'Refunds and cancellations follow the Refund Policy and the Cancellation Policy.',
    ],
  },
  {
    id: 'use',
    title: 'Acceptable use',
    paragraphs: ['You must not:'],
    bullets: [
      'Break the law or upload content you do not have the right to share.',
      'Try to access another account, copy the service, or interfere with it.',
      'Use ONESAZ to send spam, or to harm a student, parent or member of staff.',
      'Share login details, or use the service in a way that overloads it.',
    ],
  },
  {
    id: 'content',
    title: 'Content',
    paragraphs: [
      'Records and files an institution or user uploads stay theirs. They give us a licence to host and process that content only to provide ONESAZ.',
      'ONESAZ, our apps, designs and trademarks belong to Acadhub. You may use them only as these terms allow.',
    ],
  },
  {
    id: 'third-parties',
    title: 'Third parties',
    paragraphs: [
      'The service uses hosting, payment, SMS, WhatsApp and calling partners. Their terms apply to the part they provide. We are not responsible for a third-party site you leave ONESAZ to visit.',
    ],
  },
  {
    id: 'availability',
    title: 'Availability',
    paragraphs: [
      'We aim to keep ONESAZ available, but we do not promise uninterrupted access. We may suspend the service for maintenance, security or a legal reason.',
    ],
  },
  {
    id: 'end',
    title: 'When access ends',
    bullets: [
      'You can cancel a student plan as set out in the Cancellation Policy.',
      'An institution can end its subscription as set out in its agreement.',
      'We may suspend or close an account that breaks these terms, after notice where we reasonably can.',
      'When an institution’s subscription ends, we delete or return its records as the Privacy Policy describes, unless the law requires us to keep them.',
    ],
  },
  {
    id: 'liability',
    title: 'Limits',
    paragraphs: [
      'ONESAZ is provided as a working product. We do not warrant that it will meet every need or be free of faults.',
      'To the extent the law allows, Acadhub is not liable for indirect loss, lost marks, lost fees or lost business. Our total liability for a claim is limited to the fees paid to us for the service in the 12 months before the claim.',
      'Nothing in these terms limits liability that the law does not allow us to limit, including for fraud or for death or personal injury caused by negligence.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of India. Courts in Hyderabad, Telangana have exclusive jurisdiction, unless a written agreement with an institution says otherwise.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      'We will update the date at the top of this page. If a change is material, we will also notify account holders. Continued use after a change means you accept the updated terms.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [`Questions: ${brand.email}`, brand.company, brand.addressLines.join(' '), brand.phone],
  },
]

const cookieSections = (brand: typeof BRAND): LegalSection[] => [
  {
    paragraphs: [
      `This Cookie Policy explains how ${brand.company} uses cookies and similar tools on the ${brand.name} website. It should be read with the Privacy Policy.`,
      'A cookie is a small file stored on your device when you visit a website. Similar tools include pixels and local storage.',
    ],
  },
  {
    id: 'why',
    title: 'Why we use cookies',
    bullets: [
      'To keep the site working, such as a session or a form submission.',
      'To remember a choice you make, such as language, where we offer it.',
      'To see which pages are visited, so we can improve the site.',
    ],
  },
  {
    id: 'types',
    title: 'Cookies we use',
    bullets: [
      'Essential cookies: needed for pages, forms and security. The site may not work if you block these.',
      'Analytics cookies: tell us how many people visit and which pages they use. They are not used to sell your information.',
    ],
  },
  {
    id: 'third',
    title: 'Third-party cookies',
    paragraphs: [
      'If you play an embedded video, YouTube may set its own cookies under Google’s terms. Our demo form is delivered with our site host so we can receive your request.',
      'Those companies process the data they collect under their own privacy policies.',
    ],
  },
  {
    id: 'control',
    title: 'How to control cookies',
    paragraphs: [
      'You can block or delete cookies in your browser settings. Blocking essential cookies may stop some pages or the demo form from working. Blocking analytics cookies does not stop you from reading this site or contacting us.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: ['We will update the date at the top of this page if we change how we use cookies.'],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [`Questions: ${brand.email}`, brand.company, brand.addressLines.join(' '), brand.phone],
  },
]

const dataDeletionSections = (brand: typeof BRAND): LegalSection[] => [
  {
    paragraphs: [
      `${brand.company} (“Acadhub”, “we”) operates ${brand.name}. This page explains the Meta (Facebook and Instagram) data we store when an institute connects those accounts to Acadhub CRM, and how to delete it.`,
    ],
  },
  {
    id: 'meta',
    title: 'Meta (Facebook & Instagram) Connected Data',
    paragraphs: [
      'When an institute connects Meta (Facebook and Instagram) to Acadhub CRM, we store, for that institute only:',
    ],
    bullets: [
      'An encrypted Meta access token, and, when a Facebook Page is selected, an encrypted Page access token',
      'The identifiers and names of the connected ad account and Facebook Page',
      'The Instagram professional account identifier, if one is selected',
      'The Business Manager identifier and the permissions granted at connect',
      'Which Acadhub user connected the account, and when',
    ],
  },
  {
    paragraphs: [
      'We use this only so the institute can manage its own advertising and posting from the CRM. We do not store Meta users’ personal profile information, such as names, email addresses, or profile pictures. We do not sell this data.',
    ],
  },
  {
    id: 'how-to-delete',
    title: 'How to Delete This Data',
    paragraphs: [
      'An institute administrator can delete it in the product: CRM → Integrations → Meta → Disconnect. That deletes the Meta connection record, including both access tokens and the connected-account identifiers, from our active database immediately.',
      `You can also email ${brand.email} and ask us to delete it. We will do that within 30 days.`,
      'Disconnecting does not delete the Facebook Page, the Instagram account, or ads and posts already published on Meta. Those stay on Meta until the institute removes them there.',
    ],
  },
  {
    id: 'storage',
    title: 'How This Data Is Stored',
    paragraphs: [
      'Access tokens are encrypted before they are stored and are not sent to the browser. The connection record is kept in our database. Data is transmitted over HTTPS.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [`Questions about deleting this data: ${brand.email}.`],
  },
]

export const LEGAL_PAGES: Record<LegalKey, LegalDocument> = {
  privacy: {
    documentTitle: 'Privacy Policy',
    version: '1.0',
    effective: '3 October 2026',
    sections: privacySections(BRAND),
  },
  terms: {
    documentTitle: 'Terms of Service',
    version: '1.0',
    effective: '3 October 2026',
    sections: termsSections(BRAND),
  },
  cookie: {
    documentTitle: 'Cookie Policy',
    version: '1.0',
    effective: '3 October 2026',
    sections: cookieSections(BRAND),
  },
  gdpr: { documentTitle: 'GDPR', sections: pending('GDPR page') },
  'data-deletion': {
    documentTitle: 'Data Deletion Policy',
    version: '1.0',
    effective: '5 October 2026',
    sections: dataDeletionSections(BRAND),
  },
}
