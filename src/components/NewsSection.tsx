import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button as OnesazButton, H2, Text } from '@onesaz/ui';
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

export function NewsSection() {
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
          <Text color="muted" fontWeight="semibold">Stay updated with the latest tutorials, guides, and best practices for using Acadhub.</Text>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {newsUpdates.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="dark:bg-[#1E293B] light:bg-white rounded-xl overflow-hidden border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm dark:hover:border-[#818CF8] light:hover:border-[#4F46E5] transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 dark:bg-[#1E293B] light:bg-white/90 dark:text-[#E2E8F0] light:text-[#0F172A] text-xs font-semibold rounded-full border dark:border-[#334155] light:border-[#E2E8F0]">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{news.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-2 group-hover:text-[#4F46E5] transition-colors">
                  {news.title}
                </h3>
                
                <Text color="muted" fontWeight="regular">
                  {news.description}
                </Text>

                <OnesazButton
  onClick={() => window.open(news.youtubeUrl, '_blank')}
  variant="ghost"
  className="
    dark:text-[#818CF8]
    light:text-[#4F46E5]
    hover:bg-transparent
    p-0
    h-auto
    font-semibold
    underline
    underline-offset-4
    decoration-2
    hover:decoration-2
    flex items-center gap-2
    group/btn
    mt-4
  "
>
  Watch Tutorial

  <ArrowRight
    className="h-4 w-4 bg-[#6933d3] text-white rounded-full"
  />
</OnesazButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <OnesazButton
          size="lg" endIcon={<ArrowRight className="h-4 w-4 bg-[#6933d3]" />} className="text-sm px-6"  
          >
            View All Resources
          </OnesazButton>
        </div>
      </div>
    </section>
  );
}