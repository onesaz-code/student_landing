import { motion, useScroll, useTransform } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Principal',
    institution: 'Cambridge International School',
    feedback: 'Acadhub has completely transformed how we manage our school. Having everything in one platform has saved us countless hours and significantly improved our operational efficiency.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Academic Coordinator',
    institution: 'Tech Valley Academy',
    feedback: 'What impressed me most is how intuitive Acadhub is. Our teachers adapted quickly, and the student engagement features have noticeably improved learning outcomes.',
    rating: 5,
  },
  {
    name: 'Dr. Aisha Rahman',
    role: 'Vice Principal',
    institution: 'Sunrise Public School',
    feedback: 'The parent engagement tools are outstanding. Parents can track their child\'s progress in real-time, and communication has never been easier.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      className="relative dark:bg-transparent light:bg-white overflow-hidden"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)'
      }}
    >
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 dark:bg-[#818CF8]/5 light:bg-[#4F46E5]/5 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 dark:bg-[#22D3EE]/5 light:bg-[#06B6D4]/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2 
            className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Trusted by Education Leaders
          </motion.h2>
          <motion.p 
            className="text-lg dark:text-[#94A3B8] light:text-[#64748B] mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See what educators and administrators say about transforming their institutions with Acadhub.
          </motion.p>

          {/* Video Section */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden dark:bg-[#1E293B] light:bg-white border dark:border-[#334155] light:border-[#E2E8F0] shadow-2xl group">
              <motion.div
                className="aspect-video w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/video-thumbnail.jpg"
                >
                  <source src="/your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
              
              {/* Video overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid with Perspective Rotation */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: 45, z: -200 }}
              whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
              className="dark:bg-[#1E293B] light:bg-white rounded-xl p-6 border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm dark:hover:border-[#818CF8] light:hover:border-[#4F46E5] transition-all duration-300 relative group"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-xl dark:bg-gradient-to-br dark:from-[#818CF8]/0 dark:to-[#22D3EE]/0 light:bg-gradient-to-br light:from-[#4F46E5]/0 light:to-[#06B6D4]/0 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                {/* Quote Icon with rotation */}
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="w-8 h-8 dark:text-[#818CF8] light:text-[#4F46E5] mb-4" />
                </motion.div>
                
                {/* Rating with stagger animation */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + i * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.3
                      }}
                    >
                      <Star className="w-4 h-4 dark:fill-[#818CF8] dark:text-[#818CF8] light:fill-[#4F46E5] light:text-[#4F46E5]" />
                    </motion.div>
                  ))}
                </div>

                {/* Feedback with typing effect simulation */}
                <motion.p 
                  className="text-sm dark:text-[#94A3B8] light:text-[#64748B] leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                >
                  "{testimonial.feedback}"
                </motion.p>

                {/* Author with slide in */}
                <motion.div 
                  className="border-t dark:border-[#334155] light:border-[#E2E8F0] pt-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <div className="font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs dark:text-[#94A3B8] light:text-[#64748B] mt-1">
                    {testimonial.role} • {testimonial.institution}
                  </div>
                </motion.div>
              </div>
              
              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 dark:bg-[#818CF8] light:bg-[#4F46E5] opacity-0 group-hover:opacity-10 rounded-bl-full"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}