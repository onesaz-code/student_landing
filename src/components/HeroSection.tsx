import { motion } from 'motion/react'
import { H1, Text, Badge, HStack, useTheme, Button as OnesazButton } from '@onesaz/ui'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { HeroEdutechDecor } from './HeroEdutechDecor'

export function HeroSection({ activeSolution = 'mdm' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const isMdm = activeSolution === 'mdm'
  const heroContent = isMdm
    ? {
        badge: 'Trusted for device-first education programs',
        titleStart: 'Device Management for',
        titleAccent: 'Schools & Colleges',
        description: 'Unified management of Android devices across your institution. Secure, deploy, and manage student and staff devices from one intuitive platform.',
        primary: 'Schedule a Demo',
        secondary: 'View Solutions',
      }
    : {
        badge: 'Trusted by 200+ Branches across India',
        titleStart: 'Transform Your Institution with',
        titleAccent: 'AI-Powered',
        titleEnd: 'Education Management',
        description: 'Complete LMS & ERP solution that streamlines administration, enhances learning outcomes, and empowers educators-all in one unified platform.',
        primary: 'Start Free Trial',
        secondary: 'Watch Demo',
      }

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

        {!isMdm && (
          <>
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
                repeat: 0,
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
            repeat: 0,
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
            repeat: 0,
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
            repeat: 0,
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
            repeat: 0,
            ease: "easeInOut",
          }}
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.12) 50%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)',
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
                transition={{ duration: 2, repeat: 0, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.path
                d="M 600 150 Q 800 250 1000 150"
                stroke={isDark ? "rgba(168, 85, 247, 0.4)" : "rgba(147, 51, 234, 0.4)"}
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, repeat: 0, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
              />
              <motion.path
                d="M 200 400 Q 400 350 600 400"
                stroke={isDark ? "rgba(236, 72, 153, 0.4)" : "rgba(219, 39, 119, 0.4)"}
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, repeat: 0, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
              />
            </svg>

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

            {/* Radial shine effect from center */}
            <motion.div
              className="absolute top-[30%] left-1/2 -translate-x-1/2 h-[50%] w-[70%] rounded-full"
              animate={{
                opacity: [0.02, 0.05, 0.02],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: 0,
                ease: "easeInOut"
              }}
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 60%)'
                  : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
          </>
        )}

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

      <div className={`relative z-10 mx-auto flex w-full max-w-[var(--container-max)] flex-1 px-4 py-8 sm:px-6 sm:py-10 ${isMdm ? 'items-center' : 'flex-col justify-center text-center'}`}>
        {isMdm ? (
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-center lg:text-left">
              <Badge variant="outlined" className="mb-6 text-sm border-[#6933d3] p-1.5">
                <Sparkles className="h-3 w-3 mr-1.5 text-base rounded-full bg-[#6933d3] text-white" size={16} aria-hidden />
                <span className="text-[#6933d3]">{heroContent.badge}</span>
              </Badge>
              <H1 className="!text-4xl sm:!text-5xl lg:!text-6xl !leading-[1.1] tracking-tight">
                Device Management for <span className="gradient-text">Schools & Colleges</span>
              </H1>
              <Text color="muted" fontWeight="semibold" className="mt-6 !text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroContent.description}
              </Text>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="relative mx-auto h-[460px] w-full max-w-[520px]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white via-indigo-50/70 to-emerald-50/70 dark:from-slate-900/75 dark:via-indigo-950/40 dark:to-emerald-950/35" />
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.85),transparent_48%),radial-gradient(circle_at_75%_80%,rgba(167,243,208,0.3),transparent_42%)]" />

              <motion.img
                src="/images/mdm-device-blue.svg"
                alt="Managed blue device"
                className="absolute left-8 top-12 h-[190px] w-auto drop-shadow-[0_10px_18px_rgba(59,130,246,0.28)]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src="/images/mdm-device-green.svg"
                alt="Managed green device"
                className="absolute left-[44%] top-16 h-[196px] w-auto -translate-x-1/2 drop-shadow-[0_10px_18px_rgba(16,185,129,0.24)]"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              />
              <motion.img
                src="/images/mdm-device-orange.svg"
                alt="Managed orange device"
                className="absolute right-10 top-12 h-[192px] w-auto drop-shadow-[0_10px_18px_rgba(245,158,11,0.24)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.3, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
              />
              <motion.img
                src="/images/mdm-device-laptop.svg"
                alt="Managed laptop device"
                className="absolute bottom-10 left-1/2 h-[138px] w-auto -translate-x-1/2 drop-shadow-[0_12px_20px_rgba(99,102,241,0.22)]"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
              />

              <motion.div
                animate={{ x: [0, 6, 0, -4, 0], y: [0, -5, 0, 4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-4 top-20 rounded-full border border-indigo-200 bg-white/95 px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm dark:border-indigo-700 dark:bg-slate-900/90 dark:text-slate-100"
              >
                10k+ Managed Devices
              </motion.div>
              <motion.div
                animate={{ x: [0, -5, 0, 6, 0], y: [0, 4, 0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute bottom-14 right-6 rounded-full border border-indigo-200 bg-white/95 px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm dark:border-indigo-700 dark:bg-slate-900/90 dark:text-slate-100"
              >
                24/7 Monitoring
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="outlined" className="mb-6 text-sm border-[#6933d3] p-1.5">
                <Sparkles className="h-3 w-3 mr-1.5 text-base rounded-full bg-[#6933d3] text-white" size={16} aria-hidden />
                <span className="text-[#6933d3]">{heroContent.badge}</span>
              </Badge>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <H1 className="max-w-4xl mx-auto !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[64px] !leading-[1.1] tracking-tight">
                {heroContent.titleStart}{' '}
                <span className="gradient-text">{heroContent.titleAccent}</span>{' '}
                {heroContent.titleEnd}
              </H1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <Text color="muted" fontWeight="semibold" className="mt-6 !text-lg max-w-2xl mx-auto leading-relaxed">
                {heroContent.description}
              </Text>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <HStack spacing={3} justify="center" className="mt-10 flex-col sm:flex-row">
                <OnesazButton size="lg" endIcon={<ArrowRight className="h-4 w-4 bg-[#6933d3]" />} className="text-white px-6 text-base rounded-md bg-[#6933d3] text-white">
                  {heroContent.primary}
                </OnesazButton>
                <OnesazButton variant="outlined" size="lg" startIcon={<Play className="h-4 w-4" />} className="text-sm px-6">
                  {heroContent.secondary}
                </OnesazButton>
              </HStack>
            </motion.div>
          </>
        )}

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