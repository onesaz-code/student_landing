import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How long does it take to implement Acadhub?',
    answer: 'Implementation typically takes 2-4 weeks depending on your institution size and requirements. Our dedicated onboarding team ensures a smooth transition with minimal disruption.',
  },
  {
    question: 'Is training provided for staff and teachers?',
    answer: 'Yes, we provide comprehensive training for all users including administrators, teachers, and staff. Training includes live sessions, video tutorials, and ongoing support.',
  },
  {
    question: 'Can Acadhub integrate with our existing systems?',
    answer: 'Acadhub offers robust API integration capabilities and can connect with most existing educational systems, payment gateways, and third-party applications.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We provide 24/7 technical support via phone, email, and chat. Our support team is always ready to help with any questions or issues.',
  },
  {
    question: 'Is my data secure with Acadhub?',
    answer: 'Absolutely. We use bank-grade encryption, maintain regular backups, and comply with all data protection regulations. Your data security is our top priority.',
  },
  {
    question: 'Can I customize Acadhub for my institution?',
    answer: 'Yes, Acadhub is highly customizable. We can tailor workflows, reports, and features to match your specific institutional requirements.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section 
      className="relative dark:bg-transparent light:bg-white"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg dark:text-[#94A3B8] light:text-[#64748B]">
            Find answers to common questions about Acadhub and how it can benefit your institution.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="dark:bg-[#1E293B] light:bg-white rounded-xl border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left dark:hover:bg-[#334155]/30 light:hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold dark:text-[#E2E8F0] light:text-[#0F172A] pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 dark:text-[#94A3B8] light:text-[#64748B] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 dark:text-[#94A3B8] light:text-[#64748B] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}