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
import RefundPolicy from "./components/RefundPolicy";

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
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
