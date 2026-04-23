import { motion } from 'motion/react'
import { Card, CardContent, H2, Text, HStack, Box } from '@onesaz/ui'
import { Zap, Shield, DollarSign, Layers, Wrench, Headphones, Smartphone, Lock } from 'lucide-react'

const benefits = [
  { icon: Zap, title: 'Built for Scale', desc: 'Handle growing student populations and expanding operations without compromising performance or reliability.' },
  { icon: Shield, title: 'Enterprise-Grade Security', desc: 'Bank-level encryption, compliance certifications, and 99.9% uptime guarantee with 24/7 monitoring.' },
  { icon: DollarSign, title: 'Cost-Effective Solution', desc: 'Eliminate multiple software subscriptions. One platform with transparent pricing and no hidden costs.' },
  { icon: Layers, title: 'Seamless Integration', desc: 'Connect with your existing systems, payment gateways, and third-party tools through robust APIs.' },
  { icon: Wrench, title: 'Fully Customizable', desc: 'Tailor workflows, reports, and features to match your institution\'s unique requirements and processes.' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'Round-the-clock technical assistance with dedicated account managers and comprehensive training programs.' },
]

const mdmBenefits = [
  { icon: Smartphone, title: 'Fleet-Ready Provisioning', desc: 'Roll out hundreds of devices with QR enrollment, auto policy assignment, and centralized control.' },
  { icon: Lock, title: 'Strict Device Lockdown', desc: 'Enforce kiosk mode, app restrictions, and policy compliance with passcode-protected admin controls.' },
  { icon: Shield, title: 'Security by Design', desc: 'Use FRP protection, tamper alerts, and integrity checks to prevent unauthorized access and bypass.' },
  { icon: Layers, title: 'Profile-Based Management', desc: 'Run institute-level and batch-level configurations with immediate switching across groups.' },
  { icon: Wrench, title: 'Remote Operations', desc: 'Troubleshoot, reboot, and monitor devices remotely without physically collecting tablets.' },
  { icon: Headphones, title: 'Operational Reliability', desc: 'Keep deployments stable with live status visibility, alerts, and centralized auditability.' },
]

export function WhyChooseSection({ activeSolution = 'lms' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const isMdm = activeSolution === 'mdm'
  const content = isMdm
    ? {
        title: 'Why institutions choose',
        highlight: 'Acadhub MDM',
        description: 'Purpose-built capabilities for secure, scalable, and low-touch managed device programs.',
        items: mdmBenefits,
      }
    : {
        title: 'Enterprise Value for',
        highlight: 'Educational Institutions',
        description: 'Discover what makes Acadhub the trusted choice for institutions seeking scalable, secure, and comprehensive education management solutions.',
        items: benefits,
      }

  return (
    <section id="about" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <H2 className="tracking-tight mt-10">
          {content.title} <span className="gradient-text">{content.highlight}</span>
          </H2>
          <Text color="muted" fontWeight="semibold" className="leading-relaxed mb-6">
          {content.description}
          </Text>
          <HStack spacing={4} justify="center" className="flex-wrap">
            <HStack spacing={2} align="center">
              {/* <Box className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" /> */}
              {/* <Text fontWeight="medium" color="primary" className="!text-sm">200+ Institutions</Text> */}
            </HStack>
            <HStack spacing={2} align="center">
              {/* <Box className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" /> */}
              {/* <Text fontWeight="medium" color="primary" className="!text-sm">600K+ Students</Text> */}
            </HStack>
          </HStack>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.items.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Box display="flex" className="h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-bg)] mb-3">
                      <Icon className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                    </Box>
                    <Text fontWeight="semibold" className="!text-sm mb-1">{b.title}</Text>
                    <Text color="muted" className="!text-xs leading-relaxed">{b.desc}</Text>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
