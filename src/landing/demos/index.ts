import * as React from 'react'
import type { ProductSlug } from '../content/names'

/** Animated product demos for the tour, loaded on demand. One file per product. */
type DemoComponent = React.LazyExoticComponent<() => JSX.Element>

export const DEMOS: Partial<Record<ProductSlug, DemoComponent>> = {
  erp: React.lazy(() => import('./ErpDemo')),
  lms: React.lazy(() => import('./LmsDemo')),
  'omr-scanning': React.lazy(() => import('./OmrDemo')),
  mdm: React.lazy(() => import('./MdmDemo')),
  'ai-calling-agent': React.lazy(() => import('./AiCallingDemo')),
  'video-calling': React.lazy(() => import('./VideoCallingDemo')),
  'ai-tutor': React.lazy(() => import('./AiTutorDemo')),
  crm: React.lazy(() => import('./CrmDemo')),
  'descriptive-evaluation': React.lazy(() => import('./DescriptiveEvaluationDemo')),
  'question-bank': React.lazy(() => import('./QuestionBankDemo')),
}
