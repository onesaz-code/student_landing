import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { BRAND, CTA } from '../content/names'
import { ProductTour } from './ProductTour'

const HERO_IMAGE = '/images/landing/hero-campus.webp'

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
      {/* Intro band: campus photo in full colour, text on a frosted-glass panel */}
      {/* Tall enough to show the whole photo (1456 × 735) on desktop; content centred inside */}
      <div className="relative isolate flex min-h-[50.5vw] flex-col justify-center pb-20 pt-16 max-[899px]:min-h-0 max-[639px]:pb-12 max-[639px]:pt-8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center [mask-image:linear-gradient(to_bottom,#000_95%,transparent)]"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="lp-container flex flex-col items-center">
          <div className="relative flex w-full max-w-[1040px] flex-col items-center px-12 pb-12 pt-10 max-[899px]:px-8 max-[639px]:px-2 max-[639px]:pb-8 max-[639px]:pt-7">
            {/* Frosted panel behind the text; its edges are feathered so there are no hard corners */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-white/55 backdrop-blur-[2px] max-[639px]:-inset-x-3"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)',
                WebkitMaskComposite: 'source-in',
                maskImage:
                  'linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)',
                maskComposite: 'intersect',
              }}
            />
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#C9D4F6] bg-white/85 px-4 py-1.5 text-[14px] font-medium text-[color:var(--brand)] max-[639px]:px-3 max-[639px]:text-[13px]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand)]" />
              {/* Phones show the tagline alone so the badge stays on one line */}
              <span className="max-[639px]:hidden">{BRAND.name} · </span>
              {BRAND.tagline}
            </span>

            <h1 className="lp-display mt-8 !text-[clamp(34px,4vw,58px)] text-[#0B1120] [text-shadow:0_0_24px_rgba(255,255,255,.85)] max-[639px]:mt-6">
              Transform Your Institution with <br className="max-[639px]:hidden" />
              <span
                style={{
                  background: 'linear-gradient(90deg, #4CAF50 0%, #8DB83A 40%, #E8A020 75%, #F39C12 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  whiteSpace: 'nowrap',
                // Gradient text: a glow would show through the transparent fill
                textShadow: 'none',
                }}
              >
                AI-Powered
              </span>{' '}
              Education <br className="max-[639px]:hidden" />
              Management
            </h1>

            <p className="mt-7 max-w-[820px] text-[clamp(16px,1.5vw,20px)] font-medium leading-relaxed text-[#0B1120] [text-shadow:0_0_14px_rgba(255,255,255,.95),0_0_4px_rgba(255,255,255,.9)] max-[639px]:mt-5">
              {BRAND.name} brings academics, administration, examinations, communication, payments and student learning together on one
              AI-powered platform. Stop paying a different vendor for every part of your institution.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 max-[639px]:mt-7 max-[639px]:w-full max-[639px]:flex-col">
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
      </div>

      <div className="lp-container flex flex-col items-center">
        <ProductTour />
      </div>
    </section>
  )
}
