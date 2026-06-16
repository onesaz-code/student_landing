import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button as OnesazButton, Card, CardContent, Badge, H2, Text } from '@onesaz/ui';
const newsUpdates = [
  {
    title: 'Configure Settings in Acadhub',
    description: 'Learn how to configure the Settings section in Acadhub, including Organization Settings and Admission Settings.',
    image: 'https://img.youtube.com/vi/aTQP5eip46o/maxresdefault.jpg',
    date: 'Nov 20, 2024',
    category: 'Tutorial',
    youtubeUrl: 'https://youtu.be/aTQP5eip46o?si=6SVysuohq5LuBonY',
  },
  {
    title: 'Student App & Parent Login - Exam Analysis',
    description: 'Discover how students and parents can view exams and detailed exam analysis through the Acadhub app.',
    image: 'https://img.youtube.com/vi/tybGsgFb3DM/maxresdefault.jpg',
    date: 'Nov 18, 2024',
    category: 'Tutorial',
    youtubeUrl: 'https://youtu.be/tybGsgFb3DM?si=Xz2DVpUKXRtFf1FG',
  },
  {
    title: 'How to Create a Test in Acadhub Platform',
    description: 'Step-by-step guide on creating tests in Acadhub, from selecting classes to choosing questions from the question bank.',
    image: 'https://img.youtube.com/vi/K4zNGrLcDU0/maxresdefault.jpg',
    date: 'Nov 15, 2024',
    category: 'Tutorial',
    youtubeUrl: 'https://youtu.be/K4zNGrLcDU0?si=eitpRSRlFmaFc4pY',
  },
];

export function NewsSection(_props: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const updates = newsUpdates

  return (
    <section
      id="resources"
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', scrollMarginTop: 'var(--navbar-height)' }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight mt-10">
          Resources <span className="gradient-text">& Tutorials</span>
          </H2>
          <Text color="muted" fontWeight="semibold">
            Stay updated with the latest tutorials, guides, and best practices for using Acadhub.
          </Text>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {updates.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden p-0 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--accent)]/40">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                      {news.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>

                  <Text fontWeight="semibold" className="!text-lg mb-2 transition-colors group-hover:text-[var(--accent)]">
                    {news.title}
                  </Text>

                  <Text color="muted" className="!text-sm leading-relaxed">
                    {news.description}
                  </Text>

                  <OnesazButton
                    onClick={() => window.open(news.youtubeUrl, '_blank')}
                    variant="link"
                    className="mt-4 h-auto p-0 font-semibold text-[var(--accent)] underline underline-offset-4 decoration-2 hover:bg-transparent"
                    endIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Watch Tutorial
                  </OnesazButton>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <OnesazButton
            size="lg"
            className="px-6 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
            endIcon={<ArrowRight className="h-4 w-4" />}
          >
            View All Tutorials
          </OnesazButton>
        </div>
      </div>
    </section>
  );
}
