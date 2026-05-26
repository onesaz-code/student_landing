import { ContentDocPage } from './ContentDocPage'
import { mdmLegalPages } from '../data/mdmSiteContent'

type MdmLegalPageKey = keyof typeof mdmLegalPages

export function MdmDocRoute({ page }: { page: MdmLegalPageKey }) {
  const cfg = mdmLegalPages[page]
  return <ContentDocPage title={cfg.documentTitle} sections={cfg.sections} />
}
