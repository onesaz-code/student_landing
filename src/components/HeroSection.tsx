import { motion } from 'motion/react'
import { H1, Text, Badge, HStack, useTheme, Button as OnesazButton } from '@onesaz/ui'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { HeroEdutechDecor } from './HeroEdutechDecor'

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      style={{ paddingTop: 'var(--navbar-height)', scrollMarginTop: 'var(--navbar-height)' }}
    >
      {/* Educational-themed animated backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Base gradient - Energetic & Fresh */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #0a0d1e 0%, #0f1629 25%, #1a1147 50%, #0d1a2d 75%, #050a14 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 25%, #fef3f8 50%, #f5f3ff 75%, #fff7ed 100%)',
          }}
        />

        {/* Animated floating orbs - representing knowledge & learning */}
        <motion.div
          className="absolute top-[10%] left-[15%] h-[400px] w-[400px] rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(37, 99, 235, 0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 70%)',
          }}
        />

        <motion.div
          className="absolute top-[15%] right-[10%] h-[350px] w-[350px] rounded-full blur-[90px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.18) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(147, 51, 234, 0.12) 50%, transparent 70%)',
          }}
        />

        <motion.div
          className="absolute bottom-[20%] left-[20%] h-[380px] w-[380px] rounded-full blur-[95px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, rgba(219, 39, 119, 0.16) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.1) 50%, transparent 70%)',
          }}
        />

        <motion.div
          className="absolute bottom-[10%] right-[15%] h-[320px] w-[320px] rounded-full blur-[85px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 45, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.26) 0%, rgba(5, 150, 105, 0.14) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.1) 50%, transparent 70%)',
          }}
        />

        <motion.div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 h-[450px] w-[700px] rounded-full blur-[110px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.12) 50%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)',
          }}
        />

        {/* Floating particles - representing ideas & innovation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: isDark 
                ? `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '168, 85, 247'}, ${Math.random() * 0.4 + 0.2})`
                : `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '147, 51, 234'}, ${Math.random() * 0.3 + 0.2})`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Book/Learning inspired grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isDark ? 0.08 : 0.12,
            backgroundImage: isDark
              ? `
                linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 1px, transparent 1px)
              `
              : `
                linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(147, 51, 234, 0.12) 1px, transparent 1px)
              `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%, black 0%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%, black 0%, black 20%, transparent 80%)',
          }}
        />

        {/* Animated connection lines - representing collaboration */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: isDark ? 0.06 : 0.08 }}>
          <motion.path
            d="M 100 200 Q 300 100 500 200"
            stroke={isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(99, 102, 241, 0.4)"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M 600 150 Q 800 250 1000 150"
            stroke={isDark ? "rgba(168, 85, 247, 0.4)" : "rgba(147, 51, 234, 0.4)"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M 200 400 Q 400 350 600 400"
            stroke={isDark ? "rgba(236, 72, 153, 0.4)" : "rgba(219, 39, 119, 0.4)"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          />
        </svg>

        {/* Subtle dot pattern for texture */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isDark ? 0.1 : 0.15,
            backgroundImage: isDark
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, black 15%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, black 15%, transparent 70%)',
          }}
        />

        {/* Radial shine effect from center */}
        <motion.div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 h-[50%] w-[70%] rounded-full"
          animate={{
            opacity: [0.02, 0.05, 0.02],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 85% 100% at 50% 50%, transparent 0%, transparent 35%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.5) 100%)'
              : 'radial-gradient(ellipse 85% 100% at 50% 50%, transparent 0%, transparent 45%, rgba(0, 0, 0, 0.015) 85%, rgba(0, 0, 0, 0.03) 100%)',
          }}
        />
        
        <HeroEdutechDecor isDark={isDark} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] flex-1 flex-col justify-center px-4 py-8 text-center sm:px-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="outlined" className="mb-6 text-sm border-[#6933d3] p-1.5">
            <Sparkles className="h-3 w-3 mr-1.5 text-base rounded-full bg-[#6933d3] text-white" size={16} aria-hidden />
            <span className="text-[#6933d3]">Trusted by 200+ Branches across India</span>
          </Badge>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <H1 className="max-w-4xl mx-auto !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[64px] !leading-[1.1] tracking-tight">
            Transform Your Institution with{' '}
            <span className="gradient-text">AI-Powered</span> Education Management
          </H1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
          <Text color="muted" fontWeight="semibold" className="mt-6 !text-lg max-w-2xl mx-auto leading-relaxed">
          Complete LMS & ERP solution that streamlines administration, enhances learning outcomes, and empowers educators—all in one unified platform.
          </Text>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <HStack spacing={3} justify="center" className="mt-10 flex-col sm:flex-row">
            <OnesazButton size="lg" endIcon={<ArrowRight className="h-4 w-4 bg-[#6933d3]" />} className="text-white px-6 text-base rounded-md bg-[#6933d3] text-white">
              Start Free Trial
            </OnesazButton>
            <OnesazButton variant="outlined" size="lg" startIcon={<Play className="h-4 w-4" />} className="text-sm px-6">
              Watch Demo
            </OnesazButton>
          </HStack>
        </motion.div>

        {/* <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
          <HStack spacing={8} justify="center" className="mt-16 flex-wrap">
            {miniStats.map((s) => (
              <div key={s.label} className="text-center">
                <Text fontWeight="bold" className="!text-2xl text-[var(--accent)]">{s.value}</Text>
                <Caption color="muted" className="mt-0.5">{s.label}</Caption>
              </div> */}
            {/* ))} */}
          {/* </HStack>
        </motion.div> */}
      </div>
    </section>
  )
}