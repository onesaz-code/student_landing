import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { BRAND, CTA } from '../content/names'

/** Landing page hero. The headline wording is approved as is. */
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-[104px] pt-[104px] text-center max-[639px]:pb-16 max-[639px]:pt-16"
      style={{
        background:
          'radial-gradient(900px 520px at 18% 12%, rgba(99,132,255,.16), rgba(99,132,255,0) 70%), radial-gradient(700px 480px at 10% 58%, rgba(236,120,200,.12), rgba(236,120,200,0) 70%), radial-gradient(900px 520px at 70% 88%, rgba(255,190,120,.14), rgba(255,190,120,0) 70%), radial-gradient(700px 500px at 92% 30%, rgba(120,170,255,.10), rgba(120,170,255,0) 70%), #FBFBFD',
      }}
    >
      <div className="lp-container flex flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#C9D4F6] bg-white/70 px-4 py-1.5 text-[14px] font-medium text-[color:var(--brand)]">
          <span className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
          {BRAND.name} · {BRAND.tagline}
        </span>

        <h1 className="lp-display mt-9 max-w-[1160px] text-[#0B1120]">
          Transform Your Institution with <br className="max-[639px]:hidden" />
          <span
            style={{
              background: 'linear-gradient(90deg, #4CAF50 0%, #8DB83A 40%, #E8A020 75%, #F39C12 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            AI-Powered
          </span>{' '}
          Education <br className="max-[639px]:hidden" />
          Management
        </h1>

        <p className="mt-9 max-w-[820px] text-[clamp(17px,1.5vw,20px)] font-medium leading-relaxed text-[#64748B]">
          {BRAND.name} brings academics, administration, examinations, communication, payments and student learning
          together on one AI-powered platform. Stop paying a different vendor for every part of your institution.
        </p>

        <div className="mt-11 flex flex-wrap justify-center gap-4 max-[639px]:w-full max-[639px]:flex-col">
          <Link to="/#book-a-demo" className="lp-btn lp-btn-primary h-[54px] px-[26px] text-[16px]">
            {CTA.demo}
            <ArrowRight size={18} />
          </Link>
          <Link to="/#product-tour" className="lp-btn lp-btn-secondary h-[54px] px-[26px] text-[16px]">
            <Play size={18} />
            Watch demo
          </Link>
        </div>
      </div>
    </section>
  )
}
