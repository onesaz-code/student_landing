import { motion } from 'motion/react'
import { H2, Text } from '@onesaz/ui'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button as OnesazButton } from '@onesaz/ui'

export function CTASection({ activeSolution = 'mdm' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  if (activeSolution === 'mdm') {
    return null
  }

  return (
    <section id="pricing" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-10 md:p-16 text-center accent-gradient"
        >
          <div className="relative z-10">
            <H2 className="!text-Black tracking-tight mb-3">
              Acadhub for your <span className="gradient-text">institution</span> is in progress
            </H2>
            <Text color="muted" fontWeight="semibold" className="max-w-xl mx-auto mb-8">
              We are currently building and refining the platform. Request early access to get updates, previews, and onboarding support.
            </Text>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <OnesazButton size="lg" className="text-sm px-6 bg-[#6933d3] text-white" endIcon={<ArrowRight className="h-4 w-4" />}>
                Request Early Access
              </OnesazButton>
              <OnesazButton variant="outlined" size="lg" className="text-sm px-6" startIcon={<Calendar className="h-4 w-4" />}>
                Schedule Demo
              </OnesazButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
