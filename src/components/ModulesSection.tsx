import { motion } from 'motion/react'
import { Card, CardContent, H2, Text } from '@onesaz/ui'
import {
  Building2,
  UserPlus,
  DollarSign,
  ScanLine,
  Video,
  Database,
  BarChart3,
  MessageSquare,
  BookOpen,
  Receipt,
  Package,
  Bus,
  ShieldCheck,
  Network,
  Activity,
  LayoutDashboard,
} from 'lucide-react'

const modules = [
  { icon: Building2, name: 'Organization', desc: 'AI-Powered Org Structure' },
  { icon: UserPlus, name: 'Admissions', desc: 'Intelligent Enrollment' },
  { icon: DollarSign, name: 'Finance', desc: 'Predictive Analytics' },
  { icon: ScanLine, name: 'Attendance', desc: 'Face Recognition AI' },
  { icon: Video, name: 'Live Classes', desc: 'Interactive Learning' },
  { icon: Database, name: 'Question Bank', desc: 'AI Question Generator' },
  { icon: BarChart3, name: 'Analytics', desc: 'Deep Learning Insights' },
  { icon: MessageSquare, name: 'Communications', desc: 'Smart Notifications' },
  { icon: BookOpen, name: 'Academics', desc: 'Adaptive Curriculum' },
  { icon: Receipt, name: 'Payroll', desc: 'Automated Processing' },
  { icon: Package, name: 'Inventory', desc: 'Smart Tracking' },
  { icon: Bus, name: 'Transport', desc: 'Route Optimization' },
]

const mdmModules = [
  { icon: LayoutDashboard, name: 'Policy Automation', desc: 'Auto policy assignment on enrollment, instant profile switching, and cloning for fast institute rollouts.' },
  { icon: Network, name: 'Network Governance', desc: 'Push Wi-Fi and VPN profiles, restrict unknown networks, and monitor per-device data usage.' },
  { icon: ShieldCheck, name: 'Security & Recovery', desc: 'Enforce FRP, block MDM uninstall, detect tampering, and remotely lock or wipe lost devices.' },
  { icon: Activity, name: 'Live Audit Visibility', desc: 'Track activity logs, compliance status, inventory, and app usage with real-time alerts.' },
]

export function ModulesSection({ activeSolution = 'lms' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const content = activeSolution === 'mdm'
    ? {
        titlePrefix: 'Complete',
        titleAccent: 'MDM',
        titleSuffix: 'Control Suite',
        description: 'Every module required to manage, secure, and operate institutional Android fleets from one dashboard.',
        items: mdmModules,
      }
    : {
        titlePrefix: 'Complete',
        titleAccent: 'AI-Driven',
        titleSuffix: 'Module Suite',
        description: 'Every module enhanced with artificial intelligence for smarter, faster, and more efficient operations.',
        items: modules,
      }

  return (
    <section
      id="modules"
      className="relative overflow-hidden bg-[#F9FAFB] dark:bg-[#0f1419]"
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', scrollMarginTop: 'var(--navbar-height)' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full border border-violet-200/40 bg-violet-100/20 dark:border-violet-500/10 dark:bg-violet-500/5" />
        <div className="absolute -right-8 top-24 h-32 w-32 rotate-12 rounded-2xl border border-emerald-200/35 bg-emerald-100/15 dark:border-emerald-500/10 dark:bg-emerald-500/5" />
        <div className="absolute bottom-12 left-[12%] h-20 w-20 rounded-full border border-sky-200/30 bg-sky-100/10 dark:border-sky-500/10 dark:bg-sky-500/5" />
        <div className="absolute -bottom-10 right-[8%] h-40 w-40 rounded-full border border-violet-200/30 bg-violet-100/10 dark:border-violet-500/10 dark:bg-violet-500/5" />
      </div>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <H2 className="tracking-tight mt-10">
            {content.titlePrefix}{' '}
            <span className="gradient-text">{content.titleAccent}</span>{' '}
            {content.titleSuffix}
          </H2>
          <Text
            color="muted" fontWeight="semibold"
          >
            {content.description}
          </Text>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {content.items.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Card className="h-full bg-[var(--card)] border border-[var(--border)] shadow-sm rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--accent)]/40">
                  <CardContent className="p-4 sm:p-5 text-center flex flex-col items-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-bg)] mb-3">
                      <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                    </div>
                    <Text
                      fontWeight="semibold"
                      className="!text-sm sm:!text-[15px] mb-1"
                    >
                      {m.name}
                    </Text>
                    <Text color="muted" className="!text-xs sm:!text-[13px] leading-snug">
                      {m.desc}
                    </Text>
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
