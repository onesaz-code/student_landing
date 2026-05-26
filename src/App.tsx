import { ThemeProvider, useTheme } from "@onesaz/ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActiveSolutionProvider, useActiveSolution } from "./context/ActiveSolutionContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { KeyFeaturesSection } from "./components/KeyFeaturesSection";
import { ModulesSection } from "./components/ModulesSection";
import { LogosSection } from "./components/LogosSection";
import { NewsSection } from "./components/NewsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WhyChooseSection } from "./components/WhyChooseSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { Starfield } from "./components/Starfield";
import { LightModeBackground } from "./components/LightModeBackground";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Contact } from "./pages/Contact";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { Gdpr } from "./pages/Gdpr";
import { RefundPolicy } from "./pages/RefundPolicy";
import { CancellationPolicy } from "./pages/CancellationPolicy";
// import { InstituteRegistration } from "./pages/InstituteRegistration";

function Background() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? <Starfield /> : <LightModeBackground />;
}

function HomePage() {
  const { activeSolution, setActiveSolution } = useActiveSolution();

  return (
    <div className="relative z-10">
      <Navbar activeSolution={activeSolution} onSolutionChange={setActiveSolution} />
      <main>
        <HeroSection activeSolution={activeSolution} />
        <StatsSection />
        <FeaturesSection activeSolution={activeSolution} onSolutionChange={setActiveSolution} />
        <KeyFeaturesSection activeSolution={activeSolution} />
        <ModulesSection activeSolution={activeSolution} />
        <LogosSection activeSolution={activeSolution} />
        <NewsSection activeSolution={activeSolution} />
        <TestimonialsSection activeSolution={activeSolution} />
        <WhyChooseSection activeSolution={activeSolution} />
        <FAQSection />
        <CTASection activeSolution={activeSolution} />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="light"
        accentColor="violet"
        grayColor="slate"
        radius="medium"
      >
        <ActiveSolutionProvider>
          <div className="min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-500">
            <Background />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<Gdpr />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              {/* <Route path="/register" element={<InstituteRegistration />} />  */}
            </Routes>
          </div>
        </ActiveSolutionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
