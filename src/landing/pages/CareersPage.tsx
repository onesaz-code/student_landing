import { PageHero } from '../components/PageHero'

const HOME = { label: 'Home', to: '/' }

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
