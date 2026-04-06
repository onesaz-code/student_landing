import { motion } from 'motion/react';
import { Building2, UserPlus, DollarSign, ScanFace, Video, FileQuestion, TrendingUp, MessageCircle, BookOpen, Banknote, Package, Bus } from 'lucide-react';

const modules = [
  { 
    name: 'Organization', 
    icon: Building2, 
    description: 'AI-Powered Org Structure',
  },
  { 
    name: 'Admissions', 
    icon: UserPlus, 
    description: 'Intelligent Enrollment',
  },
  { 
    name: 'Finance', 
    icon: DollarSign, 
    description: 'Predictive Analytics',
  },
  { 
    name: 'Attendance', 
    icon: ScanFace, 
    description: 'Face Recognition AI',
  },
  { 
    name: 'Live Classes', 
    icon: Video, 
    description: 'Interactive Learning',
  },
  { 
    name: 'Question Bank', 
    icon: FileQuestion, 
    description: 'AI Question Generator',
  },
  { 
    name: 'Analytics', 
    icon: TrendingUp, 
    description: 'Deep Learning Insights',
  },
  { 
    name: 'Communications', 
    icon: MessageCircle, 
    description: 'Smart Notifications',
  },
  { 
    name: 'Academics', 
    icon: BookOpen, 
    description: 'Adaptive Curriculum',
  },
  { 
    name: 'Payroll', 
    icon: Banknote, 
    description: 'Automated Processing',
  },
  { 
    name: 'Inventory', 
    icon: Package, 
    description: 'Smart Tracking',
  },
  { 
    name: 'Transport', 
    icon: Bus, 
    description: 'Route Optimization',
  },
];

export function ModulesSection() {
  return (
    <section 
      id="modules"
      className="relative light:bg-white dark:bg-transparent overflow-hidden"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      {/* Animated gradient grid background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-[#818CF8]/5 dark:to-transparent light:bg-gradient-to-b light:from-transparent light:via-[#4F46E5]/5 light:to-transparent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 dark:bg-[#818CF8]/30 light:bg-[#4F46E5]/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 dark:bg-[#1E293B] light:bg-white rounded-full mb-4 border dark:border-[#818CF8]/30 light:border-[#4F46E5]/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="w-2 h-2 dark:bg-[#818CF8] light:bg-[#4F46E5] rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold dark:text-[#E2E8F0] light:text-[#0F172A]">AI-Powered Modules</span>
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Complete AI-Driven Module Suite
            </motion.h2>
            <motion.p 
              className="text-lg dark:text-[#94A3B8] light:text-[#64748B]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Every module enhanced with artificial intelligence for smarter, faster, and more efficient operations.
            </motion.p>
          </motion.div>
        </div>

        {/* Modules Grid with Staggered Flip Animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="dark:bg-[#1E293B] light:bg-white rounded-xl p-4 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm dark:hover:border-[#818CF8] light:hover:border-[#4F46E5] transition-all duration-300 group text-center relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#818CF8]/0 dark:to-[#22D3EE]/0 light:bg-gradient-to-br light:from-[#4F46E5]/0 light:to-[#06B6D4]/0"
                  whileHover={{
                    backgroundImage: [
                      'linear-gradient(135deg, rgba(129,140,248,0) 0%, rgba(34,211,238,0) 100%)',
                      'linear-gradient(135deg, rgba(129,140,248,0.1) 0%, rgba(34,211,238,0.05) 100%)',
                    ]
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon with rotation on hover */}
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 mb-3 dark:group-hover:bg-[#818CF8]/20 light:group-hover:bg-[#4F46E5]/20 dark:group-hover:border-[#818CF8] light:group-hover:border-[#4F46E5] border border-transparent transition-all duration-300 relative"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg dark:bg-[#818CF8] light:bg-[#4F46E5] blur-xl opacity-0"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Icon className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5] transition-colors duration-300 relative z-10" strokeWidth={2} />
                </motion.div>
                
                <h3 className="text-base font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-2 relative z-10">
                  {module.name}
                </h3>
                
                <p className="text-xs dark:text-[#94A3B8] light:text-[#64748B] relative z-10">
                  {module.description}
                </p>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%', skewX: -20 }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}