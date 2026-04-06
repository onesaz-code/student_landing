import { motion, useInView } from 'motion/react';
import { Zap, Shield, DollarSign, Layers, Wrench, Headphones } from 'lucide-react';
import { useRef } from 'react';

const benefits = [
  {
    icon: Zap,
    title: 'Built for Scale',
    description: 'Handle growing student populations and expanding operations without compromising performance or reliability.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level encryption, compliance certifications, and 99.9% uptime guarantee with 24/7 monitoring.',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Solution',
    description: 'Eliminate multiple software subscriptions. One platform with transparent pricing and no hidden costs.',
  },
  {
    icon: Layers,
    title: 'Seamless Integration',
    description: 'Connect with your existing systems, payment gateways, and third-party tools through robust APIs.',
  },
  {
    icon: Wrench,
    title: 'Fully Customizable',
    description: 'Tailor workflows, reports, and features to match your institution\'s unique requirements and processes.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Round-the-clock technical assistance with dedicated account managers and comprehensive training programs.',
  },
];

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative light:bg-[#EEF2FF] dark:bg-transparent overflow-hidden"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full dark:bg-[#22D3EE]/20 light:bg-[#06B6D4]/20 blur-2xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() + 0.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2 
            className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Enterprise Value for Educational Institutions
          </motion.h2>
          <motion.p 
            className="text-lg dark:text-[#94A3B8] light:text-[#64748B]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover what makes Acadhub the trusted choice for institutions seeking scalable, secure, 
            and comprehensive education management solutions.
          </motion.p>
        </div>

        {/* Benefits Grid with Cascading Wave Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: row * 0.2 + col * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="dark:bg-[#1E293B] light:bg-white rounded-xl p-5 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm dark:hover:border-[#818CF8] light:hover:border-[#4F46E5] transition-all duration-300 group relative overflow-hidden"
              >
                {/* Expanding circle on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10"
                  initial={{ scale: 0, x: "-50%", y: "-50%" }}
                  whileHover={{ scale: 3 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                />
                
                {/* Icon with bounce */}
                <motion.div 
                  className="w-14 h-14 rounded-xl dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 flex items-center justify-center mb-4 dark:group-hover:bg-[#818CF8]/20 light:group-hover:bg-[#4F46E5]/20 dark:group-hover:border-[#818CF8] light:group-hover:border-[#4F46E5] border border-transparent transition-all duration-300 relative z-10"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Icon pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl dark:bg-[#818CF8] light:bg-[#4F46E5]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <Icon className="w-7 h-7 dark:text-[#818CF8] light:text-[#4F46E5] transition-colors duration-300 relative z-10" strokeWidth={2} />
                </motion.div>
                
                {/* Title with underline reveal */}
                <div className="relative mb-3 z-10">
                  <h3 className="text-xl font-semibold dark:text-[#E2E8F0] light:text-[#0F172A]">
                    {benefit.title}
                  </h3>
                  <motion.div
                    className="h-0.5 dark:bg-[#818CF8] light:bg-[#4F46E5] mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                
                <p className="text-sm dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed relative z-10">
                  {benefit.description}
                </p>

                {/* Corner decoration */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-24 h-24"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#818CF8]/20 dark:to-transparent light:bg-gradient-to-br light:from-[#4F46E5]/20 light:to-transparent rounded-tl-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}