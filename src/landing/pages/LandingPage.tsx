import { HeroSection } from '../sections/HeroSection'
import { ClientsSection } from '../sections/ClientsSection'
import { WhyOnesazSection } from '../sections/WhyOnesazSection'
import { ProductsSection } from '../sections/ProductsSection'
import { PlatformModulesSection } from '../sections/PlatformModulesSection'
import { SolutionsSection } from '../sections/SolutionsSection'
import { RolesSection } from '../sections/RolesSection'
import { AiSection } from '../sections/AiSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { ServicesSection } from '../sections/ServicesSection'
import { TutorialsSection } from '../sections/TutorialsSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { AboutSection } from '../sections/AboutSection'
import { StudentPlansStrip } from '../sections/StudentPlansStrip'
import { FaqSection } from '../sections/FaqSection'
import { BookDemoSection } from '../sections/BookDemoSection'

/** The ONESAZ landing page, in the approved section order. The product tour sits inside the hero. */
export function LandingPage() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <WhyOnesazSection />
      <ProductsSection />
      <PlatformModulesSection />
      <SolutionsSection />
      <RolesSection />
      <AiSection />
      <HowItWorksSection />
      <ServicesSection />
      <TutorialsSection />
      <TestimonialsSection />
      <AboutSection />
      <StudentPlansStrip />
      <FaqSection />
      <BookDemoSection />
    </>
  )
}
