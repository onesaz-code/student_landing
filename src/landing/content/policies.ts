import { BRAND } from './names'

/**
 * ONESAZ refund and cancellation policies. They cover both ways people pay for ONESAZ:
 * individual students on the Monthly or Annual Plan, and institutions with an agreement.
 */

export type PolicyBlock =
  { type: 'p'; text: string } | { type: 'list'; items: string[] } | { type: 'steps'; items: string[] } | { type: 'note'; text: string }

export interface PolicySection {
  id: string
  title: string
  blocks: PolicyBlock[]
}

export interface PolicyGlance {
  icon: 'refund' | 'clock' | 'duplicate' | 'cancel' | 'access' | 'reactivate'
  title: string
  text: string
}

export interface Policy {
  key: 'refund' | 'cancellation'
  path: string
  title: string
  lead: string
  updated: string
  glance: PolicyGlance[]
  sections: PolicySection[]
  contactTitle: string
}

const EMAIL = BRAND.email
const UPDATED = '2 October 2026'

export const REFUND_POLICY: Policy = {
  key: 'refund',
  path: '/refund-policy',
  title: 'Refund Policy',
  lead: 'When you can get your money back for a ONESAZ plan, and how to ask for it.',
  updated: UPDATED,
  glance: [
    { icon: 'refund', title: '7-day refund', text: 'Full refund on a paid student plan if you ask within 7 days of paying.' },
    { icon: 'clock', title: '7–10 business days', text: 'Approved refunds go back to your original payment method.' },
    { icon: 'duplicate', title: 'Duplicate payments', text: 'Always refunded in full once we confirm them.' },
  ],
  sections: [
    {
      id: 'who-this-covers',
      title: 'Who this policy covers',
      blocks: [
        {
          type: 'list',
          items: [
            'Individual students who pay for the Monthly Plan or the Annual Plan.',
            'Institutions that pay for ONESAZ under an agreement or order form with Acadhub Edu Tech Pvt. Ltd.',
          ],
        },
        {
          type: 'note',
          text: 'The Free Plan needs no payment, so there is nothing to refund. Students who use ONESAZ through their school or college do not pay us directly; any refund is between their institution and us.',
        },
      ],
    },
    {
      id: 'student-plans',
      title: 'Refunds on student plans',
      blocks: [
        {
          type: 'list',
          items: [
            'Monthly Plan: you can ask for a full refund within 7 days of any payment. After 7 days that month’s payment is not refundable, but you can cancel so you are not charged again.',
            'Annual Plan: you can ask for a full refund within 7 days of paying. After 7 days the annual payment is not refundable, and your access continues until the end of your 12 months.',
            'Refunds include the GST charged on the payment.',
          ],
        },
      ],
    },
    {
      id: 'institutions',
      title: 'Refunds for institutions',
      blocks: [
        {
          type: 'p',
          text: 'Refunds for institutions follow the terms in your agreement or order form. Where your agreement does not say otherwise:',
        },
        {
          type: 'list',
          items: [
            'You can ask for a refund within 7 days of your first payment.',
            'Setup, data migration and training that have already been delivered are not refundable.',
            'SMS and WhatsApp messages already sent are billed at cost and are not refundable.',
          ],
        },
      ],
    },
    {
      id: 'always-refunded',
      title: 'Payments we always refund',
      blocks: [
        {
          type: 'list',
          items: ['Duplicate payments made by mistake.', 'Any charge made after you cancelled, if it was our error.'],
        },
      ],
    },
    {
      id: 'not-refunded',
      title: 'When we cannot give a refund',
      blocks: [
        {
          type: 'list',
          items: [
            'The request is made more than 7 days after the payment, except in the cases listed above.',
            'The account was closed because the Terms of Service were broken.',
            'There is evidence of misuse or fraud.',
            'The payment was made to a third party, such as an app store. Those payments follow that store’s refund process.',
          ],
        },
      ],
    },
    {
      id: 'how-to-request',
      title: 'How to ask for a refund',
      blocks: [
        {
          type: 'steps',
          items: [
            `Email ${EMAIL} from the email address on your ONESAZ account.`,
            'Include your registered phone number, your plan, and the payment date or reference.',
            'We review your request and confirm our decision by email.',
            'If approved, the refund reaches your original payment method within 7–10 business days.',
          ],
        },
      ],
    },
    {
      id: 'chargebacks',
      title: 'Chargebacks',
      blocks: [
        {
          type: 'p',
          text: 'Please contact us before raising a chargeback with your bank. Most payment problems are quicker to fix directly, and a chargeback raised without contacting us may lead to the account being suspended while it is investigated.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this policy from time to time. The date at the top shows the latest version, and we will tell you about important changes by email or in the app.',
        },
      ],
    },
  ],
  contactTitle: 'Questions about a refund?',
}

export const CANCELLATION_POLICY: Policy = {
  key: 'cancellation',
  path: '/cancellation-policy',
  title: 'Cancellation Policy',
  lead: 'How to cancel a ONESAZ plan, and what happens to your access and data afterwards.',
  updated: UPDATED,
  glance: [
    { icon: 'cancel', title: 'Cancel anytime', text: 'Stop the Monthly Plan whenever you like. You won’t be charged again.' },
    { icon: 'access', title: 'Keep your access', text: 'You can keep using ONESAZ until the end of the period you paid for.' },
    { icon: 'reactivate', title: 'Come back easily', text: 'Reactivate within 30 days and pick up where you left off.' },
  ],
  sections: [
    {
      id: 'free-plan',
      title: 'Free Plan',
      blocks: [
        {
          type: 'p',
          text: `The Free Plan has no payment and no subscription, so there is nothing to cancel. If you want your account deleted, email ${EMAIL}.`,
        },
      ],
    },
    {
      id: 'monthly-plan',
      title: 'Monthly Plan',
      blocks: [
        {
          type: 'list',
          items: [
            'You can cancel anytime.',
            'Cancelling stops your next renewal, so you are not charged again.',
            'Your access continues until the end of the month you have already paid for.',
            'Cancelling within 7 days of a payment also makes that payment eligible for a full refund (see the Refund Policy).',
          ],
        },
      ],
    },
    {
      id: 'annual-plan',
      title: 'Annual Plan',
      blocks: [
        {
          type: 'list',
          items: [
            'The Annual Plan is a one-time payment for 12 months.',
            'Cancel within 7 days of paying for a full refund.',
            'After 7 days, your access continues until the end of your 12 months.',
            'If your plan is set to renew, you can turn renewal off at any time before the renewal date.',
          ],
        },
      ],
    },
    {
      id: 'institutions',
      title: 'Institutions',
      blocks: [
        {
          type: 'p',
          text: 'Cancellation for institutions follows the notice period and terms in your agreement or order form. Where it does not say otherwise:',
        },
        {
          type: 'list',
          items: [
            'Send a written cancellation request from an authorised contact at your institution.',
            'Access continues until the end of the current billing period.',
            'All outstanding dues must be cleared before the cancellation is complete.',
            'Setup and training fees are not refundable on cancellation.',
          ],
        },
        {
          type: 'note',
          text: 'Students who use ONESAZ through their school or college keep their access for as long as their institution’s plan is active. Questions about it should go to the institution.',
        },
      ],
    },
    {
      id: 'how-to-cancel',
      title: 'How to cancel',
      blocks: [
        {
          type: 'steps',
          items: [
            'Open your account settings in ONESAZ and choose to cancel your plan, or',
            `email ${EMAIL} from the email address on your ONESAZ account and tell us which plan you want to cancel.`,
            'You will get an email confirming the cancellation.',
          ],
        },
      ],
    },
    {
      id: 'after-you-cancel',
      title: 'After you cancel',
      blocks: [
        {
          type: 'list',
          items: [
            'Your data is kept for 1 year after cancellation so you can come back, unless you ask us to delete it sooner.',
            'You can reactivate a cancelled account within 30 days by contacting support.',
            'Payment gateways or other third parties may apply their own fees; we are not responsible for those.',
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this policy from time to time. The date at the top shows the latest version, and we will tell you about important changes by email or in the app.',
        },
      ],
    },
  ],
  contactTitle: 'Need help cancelling?',
}

export const POLICIES = { refund: REFUND_POLICY, cancellation: CANCELLATION_POLICY }
