import { motion } from 'motion/react'
import { Tabs, TabsList, TabsTrigger, TabsContent, Card, CardContent, H2, Text } from '@onesaz/ui'
import {
  BookOpen, Building2, ClipboardCheck, BarChart3, Video, CalendarDays,
  DollarSign, UserPlus, Users, Bus, Receipt, MessageSquare, MessageCircle, Package,
} from 'lucide-react'

const lms = [
  { icon: ClipboardCheck, title: 'Test Creation', desc: 'Create personalized assessments aligned with student performance to foster continuous improvement and learning.' },
  { icon: BookOpen, title: 'Question Bank', desc: 'Access our extensive library to generate multiple question papers tailored to your specific requirements' },
  { icon: BarChart3, title: 'Student Analytics', desc: 'Comprehensive reports and insights to track performance and identify improvement.' },
  { icon: Video, title: 'Virtual Classrooms', desc: 'Secure online classes with full control over access, participants, and session management.' },
  { icon: CalendarDays, title: 'Class Scheduling', desc: 'Automated timetable generation, class management, and attendance tracking system.' },
  { icon: BookOpen, title: 'Assignments & Digital Library', desc: 'Manage assignments and provide e-books and reading materials in one integrated platform.' },
]

const erp = [
  { icon: Building2, title: 'Institute Management', desc: 'Automate enrollment, attendance, fees, exams, and optimize performance.' },
  { icon: DollarSign, title: 'Finance Management', desc: 'Streamlined fee collection, automated transactions, and financial reporting.' },
  { icon: UserPlus, title: 'Admission Management', desc: 'Online applications, document verification, and streamlined workflows.' },
  { icon: Users, title: 'HR & Payroll', desc: 'Staff management, attendance tracking, leave management, and automated payroll.' },
  { icon: Bus, title: 'Transport Management', desc: 'Route planning, vehicle tracking, driver management, and scheduling.' },
  { icon: Receipt, title: 'Expense Management', desc: 'Track expenses, manage budgets, and generate expense reports.' },
  { icon: MessageSquare, title: 'SMS Integration', desc: 'Automated alerts for exam schedules, meetings, and updates via SMS.' },
  { icon: MessageCircle, title: 'WhatsApp Bulk Messaging', desc: 'Send bulk messages to parents, students, and staff.' },
  { icon: Package, title: 'Inventory & Assets', desc: 'Complete tracking of library books, lab equipment, and assets.' },
]

function FeatureGrid({ items }: { items: typeof lms }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((f, i) => {
        const Icon = f.icon
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
            <Card className="h-full hover:shadow-md hover:border-[var(--accent)]/20 transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-bg)] mb-3">
                  <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                </div>
                <Text fontWeight="semibold" className="!text-sm mb-1.5">{f.title}</Text>
                <Text color="muted" className="!text-[13px] leading-relaxed">{f.desc}</Text>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', scrollMarginTop: 'var(--navbar-height)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12 " initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight my-852 mt-10 ">
            Everything you need in <span className="gradient-text">one platform</span>
          </H2>
          <Text color="muted" fontWeight="semibold">Comprehensive features designed to simplify educational management and enhance learning.</Text>
        </motion.div>

        <Tabs defaultValue="lms" className="w-full">
  <div className="flex justify-center mb-10 px-1">
    <TabsList className="flex w-full max-w-2xl items-stretch rounded-xl border border-[var(--border)] bg-[var(--muted)] p-1.5 gap-1.5 shadow-sm min-h-[3.5rem]">

      {/* LMS Tab */}
<TabsTrigger
  value="lms"
  className="
    group flex flex-1 min-h-0 flex-col items-center justify-center
    gap-1 rounded-lg px-3 py-2.5 text-center
    text-xs font-bold
    text-black dark:text-white
    transition-colors duration-200
    hover:text-black dark:hover:text-white
    sm:flex-row sm:gap-2 sm:text-sm
    data-[state=active]:bg-[var(--accent)]
    data-[state=active]:text-white
    dark:data-[state=active]:text-white
    data-[state=active]:shadow-sm
    whitespace-normal
  "
>
  <BookOpen
    className="
      h-4 w-4 shrink-0
      opacity-60
      group-data-[state=active]:opacity-100
      group-data-[state=active]:text-white
    "
    aria-hidden
  />
  <span>Learning Management (LMS)</span>
</TabsTrigger>

{/* ERP Tab */}
<TabsTrigger
  value="erp"
  className="
    group flex flex-1 min-h-0 flex-col items-center justify-center
    gap-1 rounded-lg px-3 py-2.5 text-center
    text-xs font-bold
    text-black dark:text-white
    transition-colors duration-200
    hover:text-black dark:hover:text-white
    sm:flex-row sm:gap-2 sm:text-sm
    data-[state=active]:bg-[var(--accent)]
    data-[state=active]:text-white
    dark:data-[state=active]:text-white
    data-[state=active]:shadow-sm
    whitespace-normal
  "
>
  <Building2
    className="
      h-4 w-4 shrink-0
      opacity-60
      group-data-[state=active]:opacity-100
      group-data-[state=active]:text-white
    "
    aria-hidden
  />
  <span>Enterprise Resource Planning (ERP)</span>
</TabsTrigger>

    </TabsList>
    </div>
          <TabsContent value="lms"><FeatureGrid items={lms} /></TabsContent>
          <TabsContent value="erp"><FeatureGrid items={erp} /></TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
