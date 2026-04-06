import { motion } from 'motion/react';
import { Settings, Shield, ScanLine, TrendingUp, GraduationCap, FileQuestion } from 'lucide-react';

const features = [
  {
    icon: Settings,
    title: 'Customized Applications',
    description: 'Our tech-savvy team listens to your needs and delivers fast, tailored solutions that fit your institution perfectly.',
  },
  {
    icon: Shield,
    title: '4-Layer Security',
    description: 'Your data is protected by enterprise-grade security with real-time monitoring and instant notifications.',
  },
  {
    icon: ScanLine,
    title: 'OMR Scan Analysis',
    description: 'Scan any OMR sheet with your mobile camera and get instant, comprehensive analysis with 14 detailed insights.',
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Learning',
    description: 'Advanced algorithms analyze individual student performance and preferences to personalize learning paths.',
  },
  {
    icon: GraduationCap,
    title: 'School Operating System',
    description: 'Seamlessly integrate all aspects of education management from enrollment to graduation.',
  },
  {
    icon: FileQuestion,
    title: 'Question Bank',
    description: 'Access 600,000+ expertly curated questions across all subjects for comprehensive assessment.',
  },
];

export function KeyFeaturesSection() {
  return (
    <section 
      className="relative dark:bg-transparent light:bg-[#EEF2FF]"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
            Core Capabilities That Drive Success
          </h2>
          <p className="text-lg dark:text-[#94A3B8] light:text-[#64748B]">
            Powerful features designed to transform how educational institutions operate and deliver learning outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="dark:bg-[#1E293B] light:bg-white rounded-xl p-5 dark:hover:border-[#818CF8] light:hover:border-[#4F46E5] border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm transition-all duration-300 group text-center"
              >
                {/* Icon - Single Color */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 mb-4 dark:group-hover:bg-[#818CF8]/20 light:group-hover:bg-[#4F46E5]/20 dark:group-hover:border-[#818CF8] light:group-hover:border-[#4F46E5] border border-transparent transition-all duration-300">
                  <Icon className="w-8 h-8 dark:text-[#818CF8] light:text-[#4F46E5] transition-colors duration-300" strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-sm dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}