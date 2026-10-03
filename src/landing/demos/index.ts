import * as React from 'react'
import type { ProductSlug } from '../content/names'

/** Animated product demos for the tour, loaded on demand. One file per product. */
type DemoComponent = React.LazyExoticComponent<() => JSX.Element>

export const DEMOS: Partial<Record<ProductSlug, DemoComponent>> = {
  erp: React.lazy(() => import('./ErpDemo')),
  lms: React.lazy(() => import('./LmsLessonDemo')),
  'omr-scanning': React.lazy(() => import('./OmrScanDemo')),
  mdm: React.lazy(() => import('./MdmEnrolDemo')),
  'ai-calling-agent': React.lazy(() => import('./AiCallRingDemo')),
  'video-calling': React.lazy(() => import('./VideoCallHomeDemo')),
  'ai-tutor': React.lazy(() => import('./AiTutorChatDemo')),
  crm: React.lazy(() => import('./CrmWhatsAppDemo')),
  'descriptive-evaluation': React.lazy(() => import('./DescriptiveStoryDemo')),
  'question-bank': React.lazy(() => import('./QuestionBankDemo')),
  attendance: React.lazy(() => import('./AttendanceDemo')),
}

/** Product pages can show a different demo from the tour (the tour keeps the story version). */
export const PAGE_DEMOS: Partial<Record<ProductSlug, DemoComponent>> = {
  erp: React.lazy(() => import('./ErpDashboardDemo')),
  lms: React.lazy(() => import('./LmsStudentPhoneDemo')),
  'omr-scanning': React.lazy(() => import('./OmrPhoneDemo')),
  mdm: React.lazy(() => import('./MdmFleetDemo')),
  'ai-calling-agent': React.lazy(() => import('./AiCallMapDemo')),
  'video-calling': React.lazy(() => import('./VideoCallingDemo')),
  'ai-tutor': React.lazy(() => import('./AiTutorBoardDemo')),
  crm: React.lazy(() => import('./CrmFunnelDemo')),
}
