import * as React from 'react'
import { Play } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { TESTIMONIAL_VIDEO } from '../content/home'

/**
 * "Trusted by education leaders": a poster in the design's style; pressing play
 * swaps in the real testimonial video with native controls.
 */
export function TestimonialsSection() {
  const [playing, setPlaying] = React.useState(false)

  return (
    <section id="testimonials" className="lp-section">
      <div className="lp-container flex flex-col items-center gap-14 max-[639px]:gap-10">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              Trusted by{' '}
              <span className="bg-[linear-gradient(90deg,#1A8FD8,#1FB58F)] bg-clip-text text-transparent">education leaders</span>
            </>
          }
          lead="See what educators say about transforming their institutions with ONESAZ."
        />

        <div className="relative aspect-video w-full max-w-[1080px] overflow-hidden rounded-2xl bg-[radial-gradient(900px_420px_at_50%_0%,#2B5470_0%,#1C2B48_55%,#17213A_100%)] shadow-[0_40px_80px_-40px_rgba(15,23,41,.55)] max-[639px]:rounded-xl">
          {playing ? (
            <video
              src={TESTIMONIAL_VIDEO.src}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full bg-black object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 block h-full w-full text-left"
              aria-label="Play the testimonial video"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:48px_48px]"
              />
              <span
                aria-hidden
                className="absolute inset-x-[14%] inset-y-[23%] flex items-center overflow-hidden rounded-[18px] bg-[#0CCFB0] px-[7%] max-[639px]:inset-x-[8%] max-[639px]:rounded-xl"
              >
                <span className="pointer-events-none absolute right-[22%] top-[-8%] font-[family-name:var(--font-display)] text-[clamp(120px,24vw,340px)] font-bold leading-none text-white/[.14]">
                  ?
                </span>
                <span className="relative max-w-[56%] text-[clamp(13px,2.1vw,28px)] font-semibold leading-[1.45] tracking-[.01em] text-[#0F2A3A]">
                  {TESTIMONIAL_VIDEO.hook}
                </span>
              </span>
              <span className="absolute left-[72%] top-1/2 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[color:var(--brand)] shadow-[0_0_0_12px_rgba(255,255,255,.18),0_20px_40px_-12px_rgba(0,0,0,.5)] transition-transform duration-200 group-hover:scale-105 max-[639px]:h-14 max-[639px]:w-14 max-[639px]:shadow-[0_0_0_8px_rgba(255,255,255,.18)]">
                <Play className="ml-[5px] h-[34px] w-[34px] max-[639px]:ml-[3px] max-[639px]:h-6 max-[639px]:w-6" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
