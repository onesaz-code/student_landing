import * as React from 'react'
import { ContentDocPage } from './ContentDocPage'
import { useActiveSolution } from '../context/ActiveSolutionContext'
import type { MdmDocSection } from '../data/mdmSiteContent'
import { mdmLegalPages } from '../data/mdmSiteContent'

function stripGdprTermsBullets(sections: MdmDocSection[]): MdmDocSection[] {
  return sections.map((s) => ({
    ...s,
    bullets: s.bullets?.filter((b) => !b.startsWith('GDPR alignment:')),
  }))
}

export function TermsOfService() {
  const { activeSolution } = useActiveSolution()
  const cfg = mdmLegalPages.terms
  const sections = React.useMemo(
    () => (activeSolution === 'mdm' ? stripGdprTermsBullets(cfg.sections) : cfg.sections),
    [activeSolution, cfg.sections],
  )
  return <ContentDocPage title={cfg.documentTitle} sections={sections} />
}
