import { useLocation } from 'react-router-dom'
import { CTA } from '../content/names'

/**
 * Where a "Book a demo" link inside a shared section should go: the form further down the
 * home page when we're on the home page, otherwise the Contact page form.
 */
export function useDemoPath() {
  return useLocation().pathname === '/' ? '/#book-a-demo' : CTA.demoPath
}
