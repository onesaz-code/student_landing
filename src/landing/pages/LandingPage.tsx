import { HeroSection } from '../sections/HeroSection'
import { PlannedSection } from '../components/PlannedSection'

/** The ONESAZ landing page: 16 sections in the approved order. */
export function LandingPage() {
  return (
    <>
      <HeroSection />
      <PlannedSection id="product-tour" eyebrow="See it in action" title="One platform. Pick a product to see what it does." phase="Phase 2" />
      <PlannedSection id="clients" eyebrow="Our clients" title="Trusted by leading institutions" phase="Phase 2" alt />
      <PlannedSection id="why-onesaz" eyebrow="Why ONESAZ is different" title="Other companies sell you separate tools. ONESAZ gives you one platform." phase="Phase 2" />
      <PlannedSection id="products" eyebrow="Our products" title="Everything your institution needs. One platform." phase="Phase 2" alt />
      <PlannedSection id="platform-modules" eyebrow="Inside the platform" title="Every solution your institution needs, on one platform." phase="Phase 2" />
      <PlannedSection id="solutions" eyebrow="Who we serve" title="Solutions for every kind of institution." phase="Phase 2" alt />
      <PlannedSection id="roles" eyebrow="For every role" title="A workspace for everyone at your institution." phase="Phase 2" />
      <PlannedSection id="ai" eyebrow="ONESAZ AI" title="AI that is already doing the work." phase="Phase 2" alt />
      <PlannedSection id="how-it-works" eyebrow="Working with ONESAZ" title="How we take your institution live." phase="Phase 2" />
      <PlannedSection id="services" eyebrow="Services" title="More than software. A team behind your rollout." phase="Phase 2" alt />
      <PlannedSection id="tutorials" eyebrow="Resources" title="Resources & Tutorials" phase="Phase 2" />
      <PlannedSection id="testimonials" eyebrow="Testimonials" title="Trusted by education leaders" phase="Phase 2" alt />
      <PlannedSection id="about" eyebrow="About Acadhub" title="An education technology company, built for institutions." phase="Phase 2" />
      <PlannedSection id="faqs" eyebrow="Questions" title="The questions that matter before you decide." phase="Phase 2" alt />
      <PlannedSection id="book-a-demo" eyebrow="Book a demo" title="Bring ONESAZ to your institution." phase="Phase 2" />
    </>
  )
}
