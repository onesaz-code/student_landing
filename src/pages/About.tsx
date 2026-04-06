import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Starfield } from '../components/Starfield';
import { LightModeBackground } from '../components/LightModeBackground';
import {
  CheckCircle,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Award,
  Lightbulb,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatWeDo = [
    'Provide end-to-end school/college management ERP solutions.',
    'Offer robust LMS platforms with live class and test integrations.',
    'Deliver customizable dashboards for real-time academic insights.',
    'Enable digital attendance, exam, grading, and reporting systems.',
    'Ensure mobile and web access for all stakeholders.',
    'Automate fee collection and payroll processing.',
    'Create a parent-student-teacher connected ecosystem.',
    'Offer multilingual and accessible UX for all regions.',
    'Design white-labeled mobile apps for institutes.',
    'Provide extensive training and onboarding.',
    'Integrate with government education initiatives.',
    'Support hybrid and remote learning models.',
    'Enable secure document management and e-signatures.',
    'Offer AI-driven analytics and reporting.',
    'Provide 24/7 technical support.',
  ];

  const commitments = [
    'User-first design',
    'Secure and scalable architecture',
    'Continuous innovation',
    'Timely support and training',
    'Compliance with data privacy laws',
    'Feedback-driven feature improvements',
    'Reliable uptime and fast performance',
    'Transparent pricing',
    'Inclusive and accessible solutions',
    'Community engagement',
    'Environmental responsibility',
    'Ethical business practices',
    'Long-term partnerships',
    'Global reach with local expertise',
    'Empowering educators and students',
  ];

  const coreValues = [
    'Integrity', 'Excellence', 'Inclusion', 'Innovation',
    'Empathy', 'Collaboration', 'Accountability', 'Sustainability',
    'Customer Success', 'Diversity'
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden dark:bg-[#0F172A] light:bg-white transition-colors duration-500">
        {/* Starfield Background - Only in dark mode */}
        <div className="hidden dark:block">
          <Starfield />
        </div>

        {/* Light Mode Background Pattern */}
        <div className="block dark:hidden">
          <LightModeBackground />
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
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-[#64748B] light:hover:text-[#4F46E5] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-6"
              >
                About Us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed"
              >
                Onesaz is a comprehensive education technology platform dedicated to transforming
                academic institutions with cutting-edge digital tools.
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
              className="dark:bg-[#1E293B]/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A]">
                  Our Story
                </h2>
              </div>
              <div className="space-y-4 dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed">
                <p>
                  Founded by a team of educationists and technologists, our mission is to streamline
                  administrative workflows, enhance learning outcomes, and empower institutions to go digital at scale.
                </p>
                <p>
                  We offer a complete suite of ERP, LMS, analytics dashboards, mobile apps, and
                  cloud-based academic modules designed for seamless integration.
                </p>
              </div>
            </motion.section>

            {/* What We Do */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A]">
                  What We Do
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {whatWeDo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="flex items-start gap-3 dark:bg-[#1E293B]/30 light:bg-white/60 backdrop-blur-sm rounded-xl p-4 border dark:border-[#334155]/50 light:border-[#E2E8F0] light:shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5] flex-shrink-0 mt-0.5" />
                    <span className="text-sm dark:text-[#E2E8F0] light:text-[#0F172A]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Our Commitment */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A]">
                  Our Commitment
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commitments.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="flex items-center gap-3 dark:bg-[#1E293B]/30 light:bg-white/60 backdrop-blur-sm rounded-xl p-4 border dark:border-[#334155]/50 light:border-[#E2E8F0] light:shadow-sm"
                  >
                    <Shield className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5] flex-shrink-0" />
                    <span className="text-sm dark:text-[#E2E8F0] light:text-[#0F172A]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Vision, Mission, Core Values Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="dark:bg-[#1E293B]/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h3 className="text-xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
                  Vision
                </h3>
                <p className="dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed">
                  To revolutionize education by simplifying technology adoption.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="dark:bg-[#1E293B]/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h3 className="text-xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
                  Mission
                </h3>
                <p className="dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed">
                  To ensure every educator and student has access to powerful, intuitive digital tools.
                </p>
              </motion.div>

              {/* Core Values */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="dark:bg-[#1E293B]/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
                </div>
                <h3 className="text-xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
                  Core Values
                </h3>
                <div className="flex flex-wrap gap-2">
                  {coreValues.map((value, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full dark:bg-[#818CF8]/20 dark:text-[#818CF8] light:bg-[#4F46E5]/10 light:text-[#4F46E5] font-medium"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center dark:bg-[#1E293B]/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
                Get in Touch
              </h2>
              <p className="dark:text-[#94A3B8] light:text-[#64748B] mb-6">
                For more information, email us at
              </p>
              <a
                href="mailto:info@Onesazedu.com"
                className="inline-flex items-center gap-2 text-lg font-semibold dark:text-[#818CF8] dark:hover:text-[#22D3EE] light:text-[#4F46E5] light:hover:text-[#06B6D4] transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@Onesazedu.com
              </a>
            </motion.section>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
