import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Users, Award, TrendingUp, Zap } from 'lucide-react';

export function FloatingElements() {
  const icons = [
    { Icon: GraduationCap, delay: 0, x: '10%', y: '15%' },
    { Icon: BookOpen, delay: 2, x: '85%', y: '25%' },
    { Icon: Users, delay: 4, x: '15%', y: '70%' },
    { Icon: Award, delay: 1, x: '90%', y: '60%' },
    { Icon: TrendingUp, delay: 3, x: '8%', y: '45%' },
    { Icon: Zap, delay: 5, x: '92%', y: '85%' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: x,
            top: y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-16 h-16 text-[#314E78]" strokeWidth={0.5} />
        </motion.div>
      ))}
    </div>
  );
}
