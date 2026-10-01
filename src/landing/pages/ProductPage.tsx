import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { PlannedSection } from '../components/PlannedSection'
import { CTA, productBySlug } from '../content/names'
import { NotFoundPage } from './NotFoundPage'

/** One template renders all 11 product pages at /products/:slug. */
export function ProductPage() {
  const { slug = '' } = useParams()
  const product = productBySlug(slug)
  if (!product) return <NotFoundPage />

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/#products' }, { label: product.name }]}
        eyebrow={product.badge}
        title={product.name}
        lead={product.line}
      >
        <div className="flex justify-center gap-3">
          <Link to={CTA.demoPath} className="lp-btn lp-btn-primary" style={{ background: product.color }}>
            {CTA.demo}
            <ArrowRight size={18} />
          </Link>
          <Link to="#features" className="lp-btn lp-btn-secondary">
            Explore features
          </Link>
        </div>
      </PageHero>
      <PlannedSection id="features" eyebrow="Features" title={`Everything in ${product.name}`} phase="Phase 3" />
      <PlannedSection id="how-it-works" eyebrow="How it works" title="Three steps" phase="Phase 3" alt />
      <PlannedSection id="who-its-for" eyebrow="Who it’s for" title="Built for everyone who uses it" phase="Phase 3" />
      <PlannedSection id="works-with" eyebrow="One platform" title="Works with the rest of ONESAZ." phase="Phase 3" alt />
      <PlannedSection id="faqs" eyebrow="FAQs" title={`Questions about ${product.name}`} phase="Phase 3" />
    </>
  )
}
