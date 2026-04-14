import { ThemeProvider, useTheme } from '@onesaz/ui'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { StatsSection } from './components/StatsSection'
import { FeaturesSection } from './components/FeaturesSection'
import { KeyFeaturesSection } from './components/KeyFeaturesSection'
import { ModulesSection } from './components/ModulesSection'
import { LogosSection } from './components/LogosSection'
import { NewsSection } from './components/NewsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { WhyChooseSection } from './components/WhyChooseSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { Starfield } from './components/Starfield'
import { LightModeBackground } from './components/LightModeBackground'
import { About } from './pages/About'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function Background() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === 'dark' ? <Starfield /> : <LightModeBackground />
}

function HomePage() {
  return (
    <div className="relative z-10">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <KeyFeaturesSection />
        <ModulesSection />
        <LogosSection />
        <NewsSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" accentColor="violet" grayColor="slate" radius="medium">
        <div className="min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-500">
          <Background />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}
