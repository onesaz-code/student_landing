import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { BRAND, CTA } from '../content/names'
import { ProductTour } from './ProductTour'
import { StatsBand } from './StatsBand'

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
      {/* Follows the photo's shape (1456 × 735) but is capped at 640px so the hero never gets too tall */}
      <div className="relative isolate flex min-h-[min(50.5vw,640px)] flex-col justify-center pb-12 pt-10 max-[899px]:min-h-0 max-[639px]:pb-12 max-[639px]:pt-8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center [mask-image:linear-gradient(to_bottom,#000_95%,transparent)]"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="lp-container flex flex-col items-center">
          <div className="relative flex w-full max-w-[1040px] flex-col items-center px-12 pb-9 pt-8 max-[899px]:px-8 max-[639px]:px-2 max-[639px]:pb-8 max-[639px]:pt-7">
            {/* Light white backing behind the text (no blur), feathered so there are no hard corners */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 max-[639px]:-inset-x-3"
              style={{
                // Brightest behind the text, fading out towards the edges so the photo still shows around it
                background:
                  'radial-gradient(ellipse 60% 65% at 50% 50%, rgba(255,255,255,.5) 0%, rgba(255,255,255,.28) 60%, rgba(255,255,255,0) 100%)',
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

            {/* Heading in one gradient: navy to brand blue to violet (dark enough to read on the light photo) */}
            <h1
              className="lp-display mt-6 !text-[clamp(34px,4vw,58px)] max-[639px]:mt-6"
              style={{
                background: 'linear-gradient(90deg, #0B1426 0%, #2447D1 55%, #6A4BD8 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                // Soft white glow around the letters keeps them readable without hiding the photo
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,.95)) drop-shadow(0 0 2px rgba(255,255,255,.9))',
              }}
            >
              Transform Your Institution with <br className="max-[639px]:hidden" />
              <span className="whitespace-nowrap">AI-Powered</span> Education <br className="max-[639px]:hidden" />
              Management
            </h1>

            <p className="relative isolate mt-5 max-w-[820px] text-[clamp(16px,1.5vw,20px)] font-semibold leading-relaxed text-black [text-shadow:0_0_12px_rgba(255,255,255,1),0_0_2px_rgba(255,255,255,1)] max-[639px]:mt-5">
              {/* Soft white band behind the paragraph only: solid behind every line, feathered on all edges */}
              <span
                aria-hidden
                className="absolute -inset-x-12 -inset-y-4 -z-10 backdrop-blur-[2px] max-[639px]:-inset-x-4"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,.8) 9%, rgba(255,255,255,.8) 91%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)',
                  maskImage: 'linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)',
                }}
              />
              {BRAND.name} brings academics, administration, examinations, communication, payments and student learning together on one
              AI-powered platform. Stop paying a different vendor for every part of your institution.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 max-[639px]:mt-7 max-[639px]:w-full max-[639px]:flex-col">
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
        <StatsBand />
        <ProductTour />
      </div>
    </section>
  )
}
