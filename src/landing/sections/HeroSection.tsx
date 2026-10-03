import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { BRAND, CTA } from '../content/names'
import { ProductTour } from './ProductTour'
import { StatsBand } from './StatsBand'

const HERO_IMAGE = '/images/landing/hero-onesaz.webp'

/** Landing page hero. The headline wording is approved as is. */
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-[128px] text-center max-[639px]:pb-16"
      style={{
        background:
          'radial-gradient(900px 520px at 18% 12%, rgba(99,132,255,.16), rgba(99,132,255,0) 70%), radial-gradient(700px 480px at 10% 58%, rgba(236,120,200,.12), rgba(236,120,200,0) 70%), radial-gradient(900px 520px at 70% 88%, rgba(255,190,120,.14), rgba(255,190,120,0) 70%), radial-gradient(700px 500px at 92% 30%, rgba(120,170,255,.10), rgba(120,170,255,0) 70%), #FBFBFD',
      }}
    >
      {/* Intro band: text on the left, the ONESAZ campus picture on the right (stacked on smaller screens) */}
      <div className="lp-container grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-center gap-12 pb-14 pt-14 text-left max-[1023px]:grid-cols-1 max-[1023px]:gap-10 max-[1023px]:text-center max-[639px]:pb-12 max-[639px]:pt-9">
        <div className="flex flex-col items-start max-[1023px]:items-center">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#C9D4F6] bg-white/85 px-4 py-1.5 text-[14px] font-medium text-[color:var(--brand)] max-[639px]:px-3 max-[639px]:text-[13px]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand)]" />
            {/* Phones show the tagline alone so the badge stays on one line */}
            <span className="max-[639px]:hidden">{BRAND.name} · </span>
            {BRAND.tagline}
          </span>

          {/* Heading in one gradient: navy to brand blue to violet */}
          <h1
            className="lp-display mt-6 !text-[clamp(32px,calc(1.8vw+18px),46px)] max-[1023px]:!text-[clamp(30px,5vw,42px)]"
            style={{
              background: 'linear-gradient(90deg, #0B1426 0%, #2447D1 55%, #6A4BD8 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Transform Your Institution with <span className="whitespace-nowrap">AI-Powered</span> Education Management
          </h1>

          <p className="mt-5 max-w-[560px] text-[clamp(16px,1.3vw,18px)] leading-relaxed text-[color:var(--ink-600)] max-[1023px]:max-w-[720px]">
            {BRAND.name} brings academics, administration, examinations, communication, payments and student learning together on one
            AI-powered platform. Stop paying a different vendor for every part of your institution.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 max-[1023px]:justify-center max-[639px]:w-full max-[639px]:flex-col">
            <Link
              to="/#book-a-demo"
              className="lp-btn lp-btn-primary h-[54px] px-[26px] text-[16px] shadow-[0_12px_28px_-12px_rgba(36,71,209,.7)]"
            >
              {CTA.demo}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/#product-tour"
              className="lp-btn lp-btn-secondary h-[54px] border-white px-[26px] text-[16px] shadow-[0_12px_28px_-14px_rgba(15,23,41,.45)]"
            >
              <Play size={18} />
              Watch demo
            </Link>
          </div>
        </div>

        {/* The ONESAZ campus picture, shown in full */}
        <div className="overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(15,23,41,.45)] ring-1 ring-[#0F1729]/5">
          <img
            src={HERO_IMAGE}
            alt="Students and staff working in a bright ONESAZ campus, with academics, examinations, fees and student management on one platform"
            width={1449}
            height={736}
            className="block h-auto w-full"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="lp-container flex flex-col items-center">
        <StatsBand />
        <ProductTour />
      </div>
    </section>
  )
}
