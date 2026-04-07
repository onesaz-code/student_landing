import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Starfield } from '../components/Starfield';
import {
  Shield,
  FileText,
  Lock,
  Cookie,
  Globe,
  Mail,
  ArrowLeft,
  CheckCircle,
  UserCheck,
  Server,
  Scale
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const informationCollected = [
    'Contact Information: name, email address, display picture, mailing address, phone number, IP address, geographic location',
    'Identity Verification: date of birth, mark-sheets, Passport/Aadhar/Voter ID details',
    'Billing Information: debit card number, credit card number and billing address',
    'Unique Identifiers: username or password',
    'Account Settings: syllabus and course preferences, account settings',
    'Service Interactions: reviews, ratings, customer service interactions',
    'Survey and Marketing: participation in surveys or marketing promotions',
    'Academic Information: competitive examinations, exam application number, date of exam, test center',
  ];

  const dataUsage = [
    'Deliver requested educational services',
    'Determine general geographic location for localized content',
    'Provide customized study material and recommendations',
    'Respond to inquiries and requests efficiently',
    'Improve security and analyze trends',
    'Administer and enhance customer experience',
  ];

  const userRights = [
    'Customize communication preferences',
    'Control marketing information received',
    'Manage advertising preferences',
    'Stay signed in or sign out of account',
    'Terminate account if needed',
  ];

  return (
    <>
      {/* Plain white in light mode, dark slate in dark mode */}
      <div className="min-h-screen relative overflow-hidden bg-white dark:bg-[#0F172A] transition-colors duration-500">

        {/* Starfield Background — dark mode only */}
        <div className="hidden dark:block">
          <Starfield />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate('/')}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#4F46E5] dark:text-[#94A3B8] dark:hover:text-[#818CF8] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-6"
              >
                Privacy Policy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-[#64748B] dark:text-[#94A3B8] leading-relaxed"
              >
                This Privacy Policy discloses the privacy practices for your use of the online platform <a href="https://Onesaz.com" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:text-[#06B6D4] dark:text-[#818CF8] dark:hover:text-[#22D3EE] underline transition-colors">https://Onesaz.com</a>
              </motion.p>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">

            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
                  Scope & Application
                </h2>
              </div>
              <div className="space-y-4 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                <p>
                  This Privacy Policy applies to the https://Onesaz.com website and all corresponding domains,
                  subdomains, web pages and websites associated therewith (collectively, the "Website") and
                  our video streaming service that provides live and time-shifted television programming delivered
                  over the Internet via applications on consumer devices.
                </p>
                <p>
                  This Privacy Policy only governs the Services and does not apply offline. By accessing or using
                  the Services, you agree to the terms of this Privacy Policy and consent to the collection and
                  use of information as discussed herein.
                </p>
                <p>
                  We review this Privacy Policy periodically to ensure it is up-to-date. For registered users,
                  we will notify you before making changes to this Policy.
                </p>
              </div>
            </motion.section>

            {/* Information Collection */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
                  Collection of Information
                </h2>
              </div>
              <div className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none">
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                  As a visitor, you can browse our Website without providing Personal Data. We collect and store
                  certain information to improve security, analyze trends and administer the Website.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {informationCollected.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className="flex items-start gap-3 bg-[#F8FAFC] dark:bg-[#1E293B]/30 rounded-xl p-4"
                    >
                      <CheckCircle className="w-5 h-5 text-[#4F46E5] dark:text-[#818CF8] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0F172A] dark:text-[#E2E8F0]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Usage and Retention */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center">
                  <Server className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
                  Usage and Retention of Information
                </h2>
              </div>
              <div className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none">
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                  We use the personal information we collect to deliver services, exercise legal rights,
                  and for normal business purposes.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dataUsage.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-white dark:bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-4 border border-[#E2E8F0] dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                    >
                      <Shield className="w-5 h-5 text-[#4F46E5] dark:text-[#818CF8] flex-shrink-0" />
                      <span className="text-sm text-[#0F172A] dark:text-[#E2E8F0]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Security & Community Grid */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Security */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-4">
                  Security
                </h3>
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  We take all precautions to protect personal information both online and offline using
                  technical and administrative security measures to reduce risks of loss, misuse,
                  unauthorized access, disclosure and alteration.
                </p>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-4">
                  Community
                </h3>
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Onesaz is a community. We offer features that allow members to connect and communicate
                  in public or semi-public spaces. Please be sensible when posting in community spaces
                  or sharing personal information with others.
                </p>
              </motion.div>
            </div>

            {/* Cookies & Third Parties */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center mb-6">
                  <Cookie className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-4">
                  Cookies
                </h3>
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  We transfer cookies, which are small files containing a string of characters, to your
                  IP address to keep track of the user's preferences and enhance your browsing experience.
                </p>
              </motion.div>

              {/* Third Parties */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center mb-6">
                  <Scale className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-4">
                  Third Parties and Links
                </h3>
                <p className="text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  We may pass your details to other companies in our group and to our agents and
                  subcontractors to help us with uses of your data as set out in our Privacy Policy.
                </p>
              </motion.div>
            </div>

            {/* User Choice */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
                  Your Choice and Rights
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userRights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="flex items-center gap-3 bg-white dark:bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-4 border border-[#E2E8F0] dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                  >
                    <CheckCircle className="w-5 h-5 text-[#4F46E5] dark:text-[#818CF8] flex-shrink-0" />
                    <span className="text-sm text-[#0F172A] dark:text-[#E2E8F0]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Legal Information */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
                  Ownership, Consent & Governing Law
                </h2>
              </div>
              <div className="space-y-4 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                <p>
                  <strong className="text-[#0F172A] dark:text-[#E2E8F0]">Ownership of Rights:</strong> All rights,
                  including copyright, in this Website are owned by or licensed to us. Any use of this Website
                  or its contents, other than for your own personal, non-commercial use is prohibited without our permission.
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-[#E2E8F0]">Consent:</strong> By submitting data
                  to us or using the Site, you consent to our use of your data in the manner set out in this Privacy Policy.
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-[#E2E8F0]">Governing Law and Jurisdiction:</strong> In the
                  event of any dispute, the same shall be referred to the Sole Arbitrator in accordance with Arbitration
                  and Conciliation Act of 1996. The seat and place of arbitration shall be Rajahmundry.
                </p>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white dark:bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#E2E8F0] dark:border-[#334155] shadow-sm dark:shadow-none"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 dark:bg-[#818CF8]/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-[#4F46E5] dark:text-[#818CF8]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E2E8F0] mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] mb-6">
                If you have any questions about this Privacy Policy, please contact us at
              </p>
              <a
                href="mailto:help@Onesaz.com"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#4F46E5] hover:text-[#06B6D4] dark:text-[#818CF8] dark:hover:text-[#22D3EE] transition-colors"
              >
                <Mail className="w-5 h-5" />
                help@Onesaz.com
              </a>
            </motion.section>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
