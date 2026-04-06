import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export function CTASection() {
  return (
    <section 
      className="relative light:bg-[#F1F5F9] dark:bg-transparent"
      style={{ 
        paddingTop: 'var(--spacing-major-section)', 
        paddingBottom: 'var(--spacing-major-section)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl p-12 md:p-16 text-center dark:bg-[#1E293B] light:bg-white border dark:border-[#334155] light:border-[#E2E8F0] light:shadow-sm"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 dark:bg-[#818CF8]/10 light:bg-[#4F46E5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 dark:bg-[#22D3EE]/10 light:bg-[#06B6D4]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-[#E2E8F0] light:text-[#0F172A] mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-lg dark:text-[#94A3B8] light:text-[#64748B] mb-8 max-w-2xl mx-auto">
              Join 500+ institutions that trust Acadhub for their educational management needs.
              Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}