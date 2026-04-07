import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { ModulesSection } from './components/ModulesSection';
import { LogosSection } from './components/LogosSection';
import { NewsSection } from './components/NewsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { Starfield } from './components/Starfield';
import { LightModeBackground } from './components/LightModeBackground';
import { ClassSchedulingDemo } from './components/ClassSchedulingDemo';
import { ThemeProvider } from './components/ThemeProvider';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

function HomePage() {
  const [showSchedulingDemo, setShowSchedulingDemo] = useState(false);

  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <HeroSection onShowSchedulingDemo={() => setShowSchedulingDemo(true)} />
        <StatsSection />
        <FeaturesSection onShowSchedulingDemo={() => setShowSchedulingDemo(true)} />
        <KeyFeaturesSection />
        <ModulesSection />
        <LogosSection />
        <NewsSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>

      {/* Class Scheduling Demo Modal */}
      {showSchedulingDemo && (
        <ClassSchedulingDemo onClose={() => setShowSchedulingDemo(false)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen relative overflow-hidden dark:bg-[#0F172A] light:bg-white transition-colors duration-500">
          {/* Starfield Background - Only in dark mode */}
          <div className="dark:block light:hidden">
            <Starfield />
          </div>

          {/* Light Mode Background Pattern */}
          <div className="dark:hidden light:block">
            <LightModeBackground />
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}