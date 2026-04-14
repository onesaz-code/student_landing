import { motion } from 'motion/react'
import { Card, CardContent, Chip, H2, Text, Grid } from '@onesaz/ui'
import { Building2, UserPlus, DollarSign, ScanLine, Video, Database, BarChart3, MessageSquare, BookOpen, Receipt, Package, Bus } from 'lucide-react'

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

export function ModulesSection() {
  return (
    <section id="modules" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', scrollMarginTop: 'var(--navbar-height)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight mt-10">
            Complete <span className="gradient-text">AI-Driven</span> Module Suite
          </H2>
          <Text color="muted" fontWeight="semibold">Every module enhanced with artificial intelligence for smarter, faster, and more efficient operations.</Text>
        </motion.div>

        <Grid container spacing={3} columns={12}>
          {modules.map((m, i) => {
            const Icon = m.icon
            return (
              <Grid key={i} item xs={6} sm={4} lg={3}>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}>
                  <Card className="h-full hover:shadow-md hover:border-[var(--accent)]/20 transition-all duration-200">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-bg)] mb-2.5">
                        <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                      </div>
                      <Text fontWeight="semibold" className="!text-sm mb-0.5">{m.name}</Text>
                      <Text color="muted" className="!text-xs">{m.desc}</Text>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}
