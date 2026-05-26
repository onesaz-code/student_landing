import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button, Card, CardContent, H2, Text, HStack, Box } from '@onesaz/ui'
import { motion } from 'motion/react'
import { Headphones, MessageCircle } from 'lucide-react'
import { mdmHomeAnchors } from '../data/mdmSiteContent'

const faqs = [
  { q: 'How long does it take to implement Acadhub?', a: 'Implementation typically takes 2-4 weeks depending on your institution size. Our team ensures a smooth transition.' },
  { q: 'Is training provided for staff and teachers?', a: 'Yes, we provide comprehensive training including live sessions, video tutorials, and ongoing support.' },
  { q: 'Can Acadhub integrate with existing systems?', a: 'Acadhub offers robust API integration with most educational systems, payment gateways, and third-party apps.' },
  { q: 'What kind of support do you offer?', a: 'We provide 24/7 technical support via phone, email, and chat.' },
  { q: 'Is my data secure with Acadhub?', a: 'Absolutely. We use bank-grade encryption, maintain regular backups, and comply with all data protection regulations.' },
  { q: 'Can I customize Acadhub for my institution?', a: 'Yes, Acadhub is highly customizable. We tailor workflows, reports, and features to your requirements.' },
]

export function FAQSection() {
  return (
    <section
      id={mdmHomeAnchors.helpCenter.id}
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        scrollMarginTop: 'var(--navbar-height)',
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <H2 className="tracking-tight mt-10">
            Frequently asked <span className="gradient-text">questions</span>
          </H2>
          <Text color="muted" fontWeight="semibold">Find answers to common questions about Acadhub and how it can benefit your institution.</Text>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-left">{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <Text color="muted" className="!text-sm leading-relaxed">{faq.a}</Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* <motion.div className="max-w-2xl mx-auto mt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="border-[var(--accent)]/20">
            <CardContent className="p-5">
              <HStack spacing={4} align="center" className="flex-col sm:flex-row">
                <Box display="flex" className="h-10 w-10 items-center justify-center rounded-lg accent-gradient flex-shrink-0">
                  <Headphones className="h-5 w-5 text-white" />
                </Box>
                <div className="flex-1 text-center sm:text-left">
                  <Text fontWeight="medium" className="!text-sm">Still have questions?</Text>
                  <Text color="muted" className="!text-xs">Our support team is here 24/7 to help you.</Text>
                </div>
                <Button size="sm" startIcon={<MessageCircle className="h-4 w-4" />}>Chat Now</Button>
              </HStack>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </section>
  )
}
