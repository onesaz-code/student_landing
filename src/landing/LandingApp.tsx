import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingLayout } from './layout/LandingLayout'
import { LandingPage } from './pages/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Inner pages load on demand so the home page ships less JavaScript
const ProductPage = lazy(() => import('./pages/ProductPage').then((m) => ({ default: m.ProductPage })))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })))
const AppsPage = lazy(() => import('./pages/AppsPage').then((m) => ({ default: m.AppsPage })))
const PolicyPage = lazy(() => import('./pages/PolicyPage').then((m) => ({ default: m.PolicyPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const PyqPage = lazy(() => import('./pages/PyqPage').then((m) => ({ default: m.PyqPage })))

/**
 * Entry for the new ONESAZ landing page. Every page shares LandingLayout
 * (header + footer). Legal routes keep their existing URLs.
 */
export default function LandingApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/previous-papers" element={<PyqPage />} />
          <Route path="/previous-papers/:exam" element={<PyqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage page="terms" />} />
          <Route path="/cookie-policy" element={<LegalPage page="cookie" />} />
          <Route path="/gdpr" element={<LegalPage page="gdpr" />} />
          <Route path="/refund-policy" element={<PolicyPage policy="refund" />} />
          <Route path="/cancellation-policy" element={<PolicyPage policy="cancellation" />} />
          <Route path="/data-deletion-policy" element={<LegalPage page="data-deletion" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
