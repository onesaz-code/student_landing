import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Button as OnesazButton } from '@onesaz/ui';

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
      className="relative light:bg-[#F8FAFC] dark:bg-transparent"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
            Resources & Tutorials
          </h2>
          <p className="text-lg dark:text-[#94A3B8] light:text-[#64748B]">
            Stay updated with the latest tutorials, guides, and best practices for using Acadhub.
          </p>
        </div>

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
                <div className="flex items-center gap-2 text-xs dark:text-[#94A3B8] light:text-[#64748B] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{news.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] mb-2 group-hover:text-[#4F46E5] transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-sm dark:text-[#94A3B8] light:text-[#64748B] mb-4">
                  {news.description}
                </p>

                <Button
                  onClick={() => window.open(news.youtubeUrl, '_blank')}
                  variant="ghost"
                  className="dark:text-[#818CF8] light:text-[#4F46E5] hover:bg-transparent p-0 h-auto font-semibold group/btn"
                >
                  Watch Tutorial
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <OnesazButton
            variant="outline"
            className="bg-[#6933d3] text-white"
          >
            View All Resources
          </OnesazButton>
        </div>
      </div>
    </section>
  );
}