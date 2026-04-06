import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  Calendar,
  Shield,
  Laptop,
  DollarSign,
  FileText,
  Bell,
  Truck,
  Wallet,
  FileCheck,
  FileStack,
  Video,
  Building2,
  MessageCircle
} from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const tabs = [
  { id: 'lms', label: 'Learning Management (LMS)' },
  { id: 'erp', label: 'Enterprise Resource Planning (ERP)' },
];

const lmsFeatures = [
  {
    icon: FileCheck,
    title: 'Test Creation',
    description: 'Create personalized assessments aligned with student performance to foster continuous improvement and learning.',
  },
  {
    icon: FileStack,
    title: 'Question Bank',
    description: 'Access our extensive library to generate multiple question papers tailored to your specific requirements.',
  },
  {
    icon: FileText,
    title: 'Assignments & Digital Library',
    description: 'Manage assignments and provide e-books and reading materials in one integrated platform.',
  },
  {
    icon: BarChart3,
    title: 'Student Analytics',
    description: 'Comprehensive reports and insights to track performance and identify areas for improvement.',
  },
  {
    icon: Video,
    title: 'Virtual Classrooms',
    description: 'Secure online classes with full control over access, participants, and session management.',
  },
  {
    icon: Calendar,
    title: 'Class Scheduling',
    description: 'Automated timetable generation, class management, and attendance tracking system.',
    isClickable: true,
  },
];

const erpFeatures = [
  {
    icon: Building2,
    title: 'Institute Management',
    description: 'Automate enrollment, attendance, fees, exams, and optimize institutional performance.',
  },
  {
    icon: DollarSign,
    title: 'Finance Management',
    description: 'Streamlined fee collection, automated transactions, and comprehensive financial reporting.',
  },
  {
    icon: FileText,
    title: 'Admission Management',
    description: 'Online applications, document verification, and streamlined admission workflows.',
  },
  {
    icon: Laptop,
    title: 'HR & Payroll',
    description: 'Complete staff management, attendance tracking, leave management, and automated payroll.',
  },
  {
    icon: Truck,
    title: 'Transport Management',
    description: 'Route planning, vehicle tracking, driver management, and transportation scheduling.',
  },
  {
    icon: Wallet,
    title: 'Expense Management',
    description: 'Track expenses, manage budgets, approve reimbursements, and generate expense reports.',
  },
  {
    icon: Bell,
    title: 'SMS Integration',
    description: 'Automated alerts for exam schedules, meetings, and important updates via SMS.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Bulk Messaging',
    description: 'Send bulk messages to parents, students, and staff for announcements and alerts.',
  },
  {
    icon: Shield,
    title: 'Inventory & Assets',
    description: 'Complete tracking of library books, lab equipment, and institutional assets.',
  },
];

interface FeaturesSectionProps {
  onShowSchedulingDemo?: () => void;
}

export function FeaturesSection({ onShowSchedulingDemo }: FeaturesSectionProps) {
  const [activeTab, setActiveTab] = useState('lms');

  const currentFeatures = activeTab === 'lms' ? lmsFeatures : erpFeatures;

  return (
    <section
      id="features"
      className="relative light:bg-white dark:bg-transparent"
      style={{
        paddingTop: 'var(--spacing-major-section)',
        paddingBottom: 'var(--spacing-major-section)'
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-base md:text-lg dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed">
              Comprehensive features designed to simplify educational management and enhance learning experiences.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex dark:bg-[#1E293B] light:bg-white rounded-xl p-1.5 gap-2 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95 ${activeTab === tab.id
                    ? 'bg-[#1A1147] text-white shadow-lg'
                    : 'dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] dark:hover:bg-[#334155]/50 light:text-[#64748B] light:hover:text-[#0F172A] light:hover:bg-[#F8FAFC]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isClickable = feature.isClickable;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={isClickable ? onShowSchedulingDemo : undefined}
                  className={`group relative dark:bg-[#1E293B] light:bg-white rounded-xl p-6 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-md hover:shadow-xl dark:hover:shadow-[#818CF8]/10 light:hover:shadow-lg transition-all duration-300 overflow-hidden ${isClickable ? 'cursor-pointer active:scale-95' : ''
                    }`}
                >
                  {/* Gradient Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#818CF8]/0 to-[#22D3EE]/0 dark:group-hover:from-[#818CF8]/5 dark:group-hover:to-[#22D3EE]/5 light:group-hover:from-[#4F46E5]/5 light:group-hover:to-[#06B6D4]/5 transition-all duration-300" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mb-5 dark:group-hover:bg-[#818CF8]/20 light:group-hover:bg-[#4F46E5]/20 dark:group-hover:border-[#818CF8] light:group-hover:border-[#4F46E5] border border-transparent transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7 dark:text-[#818CF8] light:text-[#4F46E5] transition-transform duration-300" strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-3 dark:group-hover:text-white light:group-hover:text-[#4F46E5] transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-sm dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed mb-3">
                      {feature.description}
                    </p>

                    {isClickable && (
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold dark:text-[#818CF8] light:text-[#4F46E5] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Demo
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}