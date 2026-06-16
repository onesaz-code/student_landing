import { motion } from 'motion/react'
import { Card, CardContent, Separator, H2, Text, Caption, Box } from '@onesaz/ui'
import { Star, Quote } from 'lucide-react'

const TESTIMONIAL_VIDEO_SRC = '/video-B5skbVmn.mp4'

const testimonials = [
  { name: 'Dr. Sarah Mitchell', role: 'Principal', org: 'Cambridge International School', feedback: "Acadhub has completely transformed how we manage our school. Having everything in one platform has saved us countless hours and significantly improved our operational efficiency." },
  { name: 'Priya Sharma', role: 'Academic Coordinator', org: 'Tech Valley Academy', feedback: "What impressed me most is how intuitive Acadhub is. Our teachers adapted quickly, and the student engagement features have noticeably improved learning outcomes." },
  { name: 'Dr. Aisha Rahman', role: 'Vice Principal', org: 'Sunrise Public School', feedback: "The parent engagement tools are outstanding. Parents can track their child's progress in real-time, and communication has never been easier." },
]

export function TestimonialsSection({ activeSolution = 'lms' }: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  if (activeSolution === 'mdm') {
    return null
  }

  const showWalkthroughVideo = true
  const content = {
    titlePrefix: 'Trusted by',
    titleAccent: 'education leaders',
    description: 'See what educators say about transforming their institutions with Acadhub.',
    items: testimonials,
  }

  return (
    <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight mt-10">
            {content.titlePrefix} <span className="gradient-text">{content.titleAccent}</span>
          </H2>
          <Text color="muted" fontWeight="semibold">{content.description}</Text>
        </motion.div>

        {showWalkthroughVideo ? (
          <motion.div className="max-w-3xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <Card className="overflow-hidden p-0">
              <div className="aspect-video w-full bg-[var(--muted)]">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  src={TESTIMONIAL_VIDEO_SRC}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>
          </motion.div>
        ) : null}

        <div className="grid md:grid-cols-3 gap-4">
          {content.items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <Quote className="w-6 h-6 text-[var(--accent)] mb-3 opacity-40" />
                  <Box display="flex" gap={1} className="mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                    ))}
                  </Box>
                  <Text color="muted" className="!text-sm leading-relaxed mb-5">&quot;{t.feedback}&quot;</Text>
                  <Separator className="mb-4" />
                  <Box display="flex" alignItems="center" gap={3}>
                    {/* <Avatar fallback={t.name.split(' ').map(n => n[0]).join('')} size="sm" /> */}
                    <div>
                      <Text fontWeight="medium" className="!text-sm">{t.name}</Text>
                      <Caption color="muted">{t.role} &bull; {t.org}</Caption>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
