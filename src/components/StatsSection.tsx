import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Users, School, TrendingUp, BookOpen } from 'lucide-react';

const stats = [
  {
    icon: School,
    value: 200,
    suffix: '+',
    label: 'Institutions',
    description: 'Trust Acadhub nationwide',
  },
  {
    icon: Users,
    value: 600000,
    suffix: '+',
    label: 'Students',
    description: 'Learning every day',
  },
  {
    icon: TrendingUp,
    value: 99,
    suffix: '%',
    label: 'Success Rate',
    description: 'Proven results',
  },
  {
    icon: BookOpen,
    value: 600000,
    suffix: '+',
    label: 'Question Bank',
    description: 'Enhanced with integrated AI',
  },
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <section 
      className="relative dark:bg-transparent light:bg-[#F1F5F9]"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="dark:bg-[#1E293B] light:bg-white rounded-2xl p-6 md:p-8 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-lg relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(108,92,231,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(74,144,226,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(108,92,231,0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="text-center group"
                >
                  {/* Icon with pulse animation */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 dark:border-[#818CF8]/20 light:border-[#4F46E5]/20 border relative"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl dark:bg-[#818CF8] light:bg-[#4F46E5]"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ 
                        opacity: [0.2, 0, 0.2],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    <Icon className="w-6 h-6 dark:text-[#818CF8] light:text-[#4F46E5] relative z-10" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Value with scale animation */}
                  <motion.div 
                    className="mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.15 + 0.3
                    }}
                  >
                    <span className="text-4xl md:text-5xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A]">
                      <Counter value={stat.value} />
                      {stat.suffix}
                    </span>
                  </motion.div>
                  
                  {/* Label */}
                  <motion.div 
                    className="text-sm font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Description */}
                  <motion.div 
                    className="text-xs dark:text-[#94A3B8] light:text-[#64748B]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                  >
                    {stat.description}
                  </motion.div>
                  
                  {/* Hover indicator line */}
                  <motion.div
                    className="mx-auto mt-3 h-1 rounded-full dark:bg-[#818CF8] light:bg-[#4F46E5]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}