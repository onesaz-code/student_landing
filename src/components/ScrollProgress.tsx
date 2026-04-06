import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#314E78] via-[#4DBEFF] to-[#314E78] origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Scroll Progress Indicator Circle */}
      <motion.div
        className="fixed top-4 right-4 w-12 h-12 rounded-full border-4 border-[#314E78]/20 flex items-center justify-center z-50 bg-white/80 backdrop-blur-sm shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-10 h-10 -rotate-90">
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            stroke="#314E78"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
          />
        </svg>
        <motion.div 
          className="absolute text-[10px] font-bold text-[#314E78]"
          style={{
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
          }}
        >
          <motion.span>
            {scrollYProgress.get() > 0 ? Math.round(scrollYProgress.get() * 100) : '0'}%
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
