import * as React from 'react'
import { ChevronLeft, ChevronRight, Play, Quote, Star } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { TESTIMONIALS, TESTIMONIAL_VIDEO } from '../content/home'

type Testimonial = (typeof TESTIMONIALS)[number]

/** How far the row has to move to bring the next card fully into view. */
function cardStep(list: HTMLElement) {
  const card = list.querySelector('li')
  if (!card) return list.clientWidth * 0.8
  const styles = getComputedStyle(list)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 24
  return card.getBoundingClientRect().width + gap
}

/**
 * Speech-bubble quotes from ONESAZ client institutions, in a snap-scroll row
 * with prev/next arrows — same layout as the reference carousel.
 */
function FeedbackCarousel() {
  const listRef = React.useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(true)

  const syncArrows = React.useCallback(() => {
    const el = listRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  React.useEffect(() => {
    const el = listRef.current
    if (!el) return
    syncArrows()
    el.addEventListener('scroll', syncArrows, { passive: true })
    const ro = new ResizeObserver(syncArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', syncArrows)
      ro.disconnect()
    }
  }, [syncArrows])

  const scrollByCard = (dir: -1 | 1) => {
    const el = listRef.current
    if (!el) return
    el.scrollBy({ left: dir * cardStep(el), behavior: 'smooth' })
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex gap-2.5">
        <ArrowButton label="Previous client feedback" disabled={!canPrev} onClick={() => scrollByCard(-1)}>
          <ChevronLeft size={18} strokeWidth={1.75} />
        </ArrowButton>
        <ArrowButton label="Next client feedback" disabled={!canNext} onClick={() => scrollByCard(1)}>
          <ChevronRight size={18} strokeWidth={1.75} />
        </ArrowButton>
      </div>

      <ul
        ref={listRef}
        className="lp-no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-1 max-[639px]:gap-4"
        aria-label="Feedback from ONESAZ client institutions"
      >
        {TESTIMONIALS.map((item) => (
          <li
            key={item.name}
            className="w-[min(320px,86%)] shrink-0 snap-start min-[720px]:w-[calc((100%-1.5rem)/2)] min-[1100px]:w-[calc((100%-4.5rem)/4)]"
          >
            <FeedbackCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#3F3F46] transition-colors hover:border-[#C4C4C8] disabled:cursor-default disabled:opacity-35"
    >
      {children}
    </button>
  )
}

function FeedbackCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex flex-col">
      <div className="relative">
        <div className="relative min-h-[168px] rounded-[20px] px-[22px] pb-[22px] pt-5" style={{ background: item.tint }}>
          <Quote size={20} strokeWidth={2.25} className="mb-3 text-[#1A1A1E]" aria-hidden />
          <p className="text-[14.5px] leading-[1.65] text-[#3F4758]">{item.quote}</p>
        </div>
        <svg aria-hidden viewBox="0 0 18 10" className="absolute left-7 top-full -mt-px h-2.5 w-[18px]">
          <path d="M0 0h18C9 1 5 6 0 10Z" fill={item.tint} />
        </svg>
      </div>

      <div className="mt-5 flex items-center gap-3 px-1">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[13px] font-semibold tracking-[.02em] text-[#6B6560]"
        >
          {item.initials}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[14.5px] font-semibold leading-tight text-[color:var(--ink-900)]">{item.name}</span>
          <span className="text-[13px] leading-tight text-[#8A8494]">{item.role}</span>
        </span>
      </div>

      <p className="mt-2.5 flex items-center gap-0.5 px-1" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < item.rating ? '#F5B942' : 'none'}
            stroke={i < item.rating ? 'none' : '#D9D6DE'}
            strokeWidth={1.6}
          />
        ))}
      </p>
    </article>
  )
}

/**
 * "Trusted by education leaders": a poster in the design's style; pressing play
 * swaps in the real testimonial video with native controls. Client feedback
 * sits under the video as speech-bubble cards.
 */
export function TestimonialsSection({ id = 'testimonials' }: { id?: string }) {
  const [playing, setPlaying] = React.useState(false)

  return (
    <section id={id} className="lp-section">
      <div className="lp-container flex flex-col items-center gap-14 max-[639px]:gap-10">
        <SectionHeader
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

        <FeedbackCarousel />
      </div>
    </section>
  )
}
