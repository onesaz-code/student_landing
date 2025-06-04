import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Best from "./components/Best";
import Erp from "./components/Erp";
import Lms from "./components/Lms";
import Modules from "./components/Modules";
import ContactUsSection from "./components/Letstalk";
import Footer from "./components/Footer";
import FAQ from "./components/Faq";
import Appd from "./components/Appd";
import StudentPortal from "./components/Learning";
import DashboardSolutions from "./components/Solutions";
import FloatingWhatsApp from "./components/whatsapp";
import TestimonialsSection from "./components/Testimonials";
import Pricing from "./components/Pricing";

import AboutUs from "./components/AboutUs";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CancellationPolicy from "./components/CancellationPolicy";
import ContactUs from "./components/ContactUs";
import RefundPolicys from "./components/RefundPolicys";
const MainApp = () => (
  <>
    <Navbar />
    <Hero />
    <Best />
    <Erp />
    <Lms />
    <Modules />
    <DashboardSolutions />
    <StudentPortal />
    <TestimonialsSection />
    <ContactUsSection />
    <FAQ />
    <Appd />
    <Footer />
    <FloatingWhatsApp />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/pricing" element={<Pricing />} />
         <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-policys" element={<RefundPolicys />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
