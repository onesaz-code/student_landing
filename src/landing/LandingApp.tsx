import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@onesaz/ui'
import { LandingLayout } from './layout/LandingLayout'
import { LandingPage } from './pages/LandingPage'
import { ProductPage } from './pages/ProductPage'
import { AboutPage, CareersPage, ContactPage, ResourcesPage, SolutionsPage } from './pages/SectionPages'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Entry for the new ONESAZ landing page. Every page shares LandingLayout
 * (header + footer). Legal routes keep their existing URLs.
 */
export default function LandingApp() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" accentColor="blue" grayColor="slate" radius="medium">
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
            <Route path="/terms-of-service" element={<LegalPage page="terms" />} />
            <Route path="/cookie-policy" element={<LegalPage page="cookie" />} />
            <Route path="/gdpr" element={<LegalPage page="gdpr" />} />
            <Route path="/refund-policy" element={<LegalPage page="refund" />} />
            <Route path="/cancellation-policy" element={<LegalPage page="cancellation" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
