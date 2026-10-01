import { PageHero } from '../components/PageHero'
import { PlannedSection } from '../components/PlannedSection'
import { RESOURCES, SOLUTIONS } from '../content/names'

const HOME = { label: 'Home', to: '/' }

export function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[HOME, { label: 'Solutions' }]}
        eyebrow="Solutions"
        title="One platform, shaped to the way your institution works."
        lead="Schools, colleges, coaching institutes and multi-campus groups all run on ONESAZ, each with the products and setup that fit them."
      />
      {SOLUTIONS.map((s, i) => (
        <PlannedSection key={s.id} id={s.id} eyebrow={s.name} title={s.line} phase="Phase 4" alt={i % 2 === 1} />
      ))}
      <PlannedSection id="roles" eyebrow="By role" title="Built for everyone in your institution." phase="Phase 4" />
      <PlannedSection id="services" eyebrow="Services" title="More than software. A team behind your rollout." phase="Phase 4" alt />
    </>
  )
}

export function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[HOME, { label: 'Resources' }]}
        eyebrow="Resources"
        title="Learn ONESAZ, at your own pace."
        lead="Tutorials, product guides and answers to help your team set up ONESAZ and get the most from it every day."
      />
      {RESOURCES.map((r, i) => (
        <PlannedSection key={r.id} id={r.id} eyebrow={r.name} title={r.line} phase="Phase 4" alt={i % 2 === 1} />
      ))}
      <PlannedSection id="our-clients" eyebrow="Our Clients" title="Trusted by leading institutions" phase="Phase 4" alt />
      <PlannedSection id="testimonials" eyebrow="Testimonials" title="Trusted by education leaders" phase="Phase 4" />
      <PlannedSection id="results" eyebrow="Results" title="What changes when institutions move to ONESAZ." phase="Phase 4" alt />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[HOME, { label: 'About Acadhub' }]}
        eyebrow="About Acadhub"
        title="We build ONESAZ, one platform for everything an institution runs."
        lead="Acadhub Edu Tech Pvt. Ltd. is an education technology company based in Hyderabad. Since 2019 we have been building ONESAZ, an AI-powered one-stop solution for schools, colleges and educational institutions."
      />
      <PlannedSection id="who-we-are" eyebrow="Who we are" title="An education technology company, built for institutions." phase="Phase 4" />
      <PlannedSection id="why-onesaz" eyebrow="Why ONESAZ" title="Other companies sell you separate tools. ONESAZ gives you one platform." phase="Phase 4" alt />
      <PlannedSection id="what-we-build" eyebrow="What we build" title="Everything on one ONESAZ platform." phase="Phase 4" />
      <PlannedSection id="services" eyebrow="Services" title="More than software. A team behind your rollout." phase="Phase 4" alt />
      <PlannedSection id="our-clients" eyebrow="Our Clients" title="Trusted by leading institutions" phase="Phase 4" />
      <PlannedSection id="testimonials" eyebrow="Testimonials" title="Trusted by education leaders" phase="Phase 4" alt />
      <PlannedSection id="results" eyebrow="Results" title="What changes when institutions move to ONESAZ." phase="Phase 4" />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[HOME, { label: 'Contact Us' }]}
        eyebrow="Contact Us"
        title="Talk to the ONESAZ team."
        lead="Whether you are exploring ONESAZ for the first time or already use it every day, we are here to help."
      />
      <PlannedSection id="book-a-demo" eyebrow="Book a demo" title="Bring ONESAZ to your institution." phase="Phase 4" />
      <PlannedSection id="support" eyebrow="Technical support" title="Already using ONESAZ? We’re here to help." phase="Phase 4" alt />
      <PlannedSection id="faqs" eyebrow="FAQs" title="Before you get in touch" phase="Phase 4" />
    </>
  )
}

export function CareersPage() {
  return (
    <PageHero
      crumbs={[HOME, { label: 'Careers' }]}
      eyebrow="Careers"
      title="Build the future of education with us."
      lead="We do not have open roles listed right now. Write to us through the contact page and we will keep your details on file."
    />
  )
}
