import { motion } from 'motion/react'
import { Button, H2, Text } from '@onesaz/ui'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button as OnesazButton } from '@onesaz/ui'

export function CTASection() {
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
              Ready to transform your <span className="gradient-text">institution</span>?
            </H2>
            <Text color="muted" fontWeight="semibold" className="max-w-xl mx-auto mb-8">
              Join 200+ institutions that trust Acadhub for their educational management needs. Start your free trial today — no credit card required.
            </Text>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <OnesazButton size="lg" className="text-sm px-6 bg-[#6933d3] text-white" endIcon={<ArrowRight className="h-4 w-4" />}>
                Start Free Trial
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
