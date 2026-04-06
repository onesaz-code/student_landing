import image_56c9206474930d70f2ba1a3b8cc1dd06865668ef from 'figma:asset/56c9206474930d70f2ba1a3b8cc1dd06865668ef.png'
import { Button } from './ui/button';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import heroBackgroundImage from 'figma:asset/9cb1790001567641414826fda4b5b109daca74b2.png';
import { useRef, useEffect, useState } from 'react';
import { Button as OnesazButton } from '@onesaz/ui';

interface HeroSectionProps {
  onShowSchedulingDemo?: () => void;
}

export function HeroSection({ onShowSchedulingDemo }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Smooth spring animations for mouse tracking
  const mouseX = useSpring(0, { stiffness: 200, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Split text animation
  const headlineWords = "Transform Your Institution with".split(" ");
  const subWords = "Education Management".split(" ");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: 'calc(100vh - var(--navbar-height))',
        paddingTop: 'var(--navbar-height)',
        paddingBottom: 'var(--spacing-section-y)'
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackgroundImage}
          alt="Acadhub Platform"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80" />

        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/20 via-transparent to-[#06B6D4]/20" />
      </div>

      {/* Animated particles/blobs on top of image */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ opacity }}
      >
        {/* Primary morphing blob */}
        <motion.div
          className="absolute top-20 left-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(108,92,231,0.4) 0%, rgba(74,144,226,0.2) 50%, transparent 70%)',
            y: y1,
            x: mouseX,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary morphing blob */}
        <motion.div
          className="absolute bottom-20 right-10 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(74,144,226,0.3) 0%, rgba(108,92,231,0.2) 50%, transparent 70%)',
            y: y2,
            x: mouseX,
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="relative z-20 max-w-[var(--container-max)] mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content - Cinematic Word-by-Word Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left lg:col-span-2 max-w-4xl mx-auto"
          >
            {/* Cinematic Headline Animation */}
            <div className="space-y-1 overflow-hidden">
              <motion.h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] font-bold leading-[1.2] text-white drop-shadow-2xl">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}{' '}

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: headlineWords.length * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="inline-block"
                >
                  <motion.span
                    className="bg-gradient-to-r from-[#818CF8] via-[#22D3EE] to-[#818CF8] bg-clip-text text-transparent drop-shadow-lg"
                    animate={{
                      backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 100%',
                    }}
                  >
                    AI-Powered
                  </motion.span>
                </motion.span>{' '}

                {subWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: (headlineWords.length + 1 + i) * 0.1,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Subtitle with blur-in effect */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-base sm:text-lg text-white/90 light:text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-lg"
              style={{ marginTop: '16px' }}
            >
              Complete LMS & ERP solution that streamlines administration, enhances learning outcomes,
              and empowers educators—all in one unified platform.
            </motion.p>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              style={{ marginTop: '32px' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <OnesazButton
                  size="lg"
                  className="group shadow-2xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </OnesazButton>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white shadow-2xl"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}