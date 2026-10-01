import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BRAND } from '../content/names'

/**
 * "About Acadhub". The design's metrics row and client stories used placeholder
 * numbers and names, so they are left out until real figures are supplied.
 */
export function AboutSection() {
  return (
    <section id="about" className="lp-section lp-section-alt">
      <div className="lp-container">
        <div className="grid grid-cols-2 items-end gap-16 max-[899px]:grid-cols-1 max-[899px]:gap-5">
          <div className="flex flex-col gap-4">
            <span className="lp-eyebrow">About Acadhub</span>
            <h2 className="lp-h2">An education technology company, built for institutions.</h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p className="lp-lead !text-[17px]">
              {BRAND.company} builds {BRAND.name}, an AI-powered one-stop solution that brings academics, administration, exams,
              communication and payments together for schools, colleges and educational institutions.
            </p>
            <Link to="/about" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[color:var(--brand)]">
              More about Acadhub
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
