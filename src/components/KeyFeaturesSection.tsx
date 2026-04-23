import { motion } from 'motion/react'
import { Card, CardContent, Badge, H2, Text } from '@onesaz/ui'
import { Settings, Shield, ScanLine, TrendingUp, GraduationCap, FileQuestion, Smartphone, Lock, Wrench, MapPin, Globe, ShieldAlert } from 'lucide-react'

const features = [
  { icon: Settings, title: 'Customized Applications', desc: 'Our tech-savvy team listens to your needs and delivers fast, tailored solutions that fit your institution perfectly.' },
  { icon: Shield, title: '4-Layer Security', desc: 'Your data is protected by enterprise-grade security with real-time monitoring and instant notifications.' },
  { icon: ScanLine, title: 'OMR Scan Analysis', desc: 'Scan any OMR sheet with your mobile camera and get instant, comprehensive analysis with 14 detailed insights.' },
  { icon: TrendingUp, title: 'Adaptive Learning', desc: 'Advanced algorithms analyze individual student performance and preferences to personalize learning paths.' },
  { icon: GraduationCap, title: 'School Operating System', desc: 'Seamlessly integrate all aspects of education management from enrollment to graduation.' },
  { icon: FileQuestion, title: 'Question Bank', desc: 'Access 600,000+ expertly curated questions across all subjects for comprehensive assessment.' },
]

const mdmFeatures = [
  { icon: Smartphone, title: 'Zero-Touch Enrollment', desc: 'Enroll devices in minutes with QR provisioning and automatic policy assignment.' },
  { icon: Lock, title: 'Kiosk Enforcement', desc: 'Lock devices into single-app or multi-app mode with strict navigation restrictions.' },
  { icon: Shield, title: 'FRP + Tamper Resistance', desc: 'Protect against reset bypass, SIM swaps, and unauthorized agent removal.' },
  { icon: Wrench, title: 'Remote Support Tools', desc: 'Diagnose and resolve issues with remote view, control, screenshots, and reboot.' },
  { icon: MapPin, title: 'Live Tracking + Geofence', desc: 'Monitor location in real time, review history, and trigger rules by boundary.' },
  { icon: Globe, title: 'Web and App Governance', desc: 'Whitelist approved apps/sites and block unauthorized browsing and installs.' },
]

export function KeyFeaturesSection({ activeSolution = 'lms' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const content = activeSolution === 'mdm'
    ? {
        title: 'Core Capabilities That',
        highlight: 'Drive MDM Success',
        description: 'Powerful MDM capabilities designed to secure, control, and support institute devices at scale.',
        items: mdmFeatures,
      }
    : {
        title: 'Core Capabilities That',
        highlight: 'Drive Success',
        description: 'Powerful features designed to transform how educational institutions operate and deliver learning outcomes.',
        items: features,
      }

  return (
    <section id="features" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight mt-10">
          {content.title} <span className="gradient-text">{content.highlight}</span>
          </H2>
          <Text color="muted" fontWeight="semibold">{content.description}</Text>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.items.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-bg)] mb-4">
                      <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                    </div>
                    <Text fontWeight="semibold" className="!text-base mb-1.5">{f.title}</Text>
                    <Text color="muted" className="!text-sm leading-relaxed">{f.desc}</Text>
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
