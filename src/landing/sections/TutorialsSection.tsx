import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Play } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { VideoModal } from '../components/VideoModal'
import { TUTORIALS } from '../content/home'

/** "Resources & Tutorials": three video tutorials that play on the page. */
export function TutorialsSection({ id = 'tutorials', showAllLink = true }: { id?: string; showAllLink?: boolean }) {
  const [playing, setPlaying] = React.useState<(typeof TUTORIALS)[number] | null>(null)
  const close = React.useCallback(() => setPlaying(null), [])

  return (
    <section id={id} className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col items-center gap-14 max-[639px]:gap-10">
        <SectionHeader
          eyebrow="Resources"
          title={
            <>
              Resources <span className="bg-[linear-gradient(90deg,#2447D1,#14A38B)] bg-clip-text text-transparent">&amp; Tutorials</span>
            </>
          }
          lead="Step-by-step tutorials, guides and best practices for getting the most from ONESAZ."
        />

        <div className="grid w-full grid-cols-3 gap-7 max-[1099px]:grid-cols-2 max-[639px]:grid-cols-1 max-[639px]:gap-5">
          {TUTORIALS.map((t) => (
            <button
              key={t.href}
              type="button"
              onClick={() => setPlaying(t)}
              aria-label={`Play tutorial: ${t.title}`}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[color:var(--line)] bg-white text-left"
            >
              <div className="relative aspect-video overflow-hidden bg-[color:var(--surface-alt)]">
                <img src={t.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <span className="absolute left-[18px] top-[18px] rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-[13px] font-semibold text-[color:var(--ink-900)]">
                  Tutorial
                </span>
                <span className="absolute bottom-[18px] right-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[color:var(--brand)] shadow-[0_10px_24px_-8px_rgba(15,23,41,.35)] transition-transform duration-200 group-hover:scale-110">
                  <Play size={20} fill="currentColor" className="ml-[3px]" />
                </span>
              </div>
              <div className="flex flex-grow flex-col gap-3 px-7 pb-7 pt-6 max-[639px]:px-6">
                <span className="flex items-center gap-2 text-[14px] text-[#667085]">
                  <Calendar size={16} strokeWidth={1.75} />
                  {t.date}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[21px] font-semibold leading-[1.35] tracking-[-0.01em] text-[color:var(--ink-900)]">
                  {t.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#667085]">{t.text}</p>
                <span className="mt-auto inline-flex items-center gap-2.5 pt-2 text-[16px] font-semibold text-[color:var(--ink-900)]">
                  <span className="border-b-2 border-[color:var(--ink-900)] pb-0.5">Watch tutorial</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand)] text-white">
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>

        <VideoModal url={playing?.href ?? null} title={playing?.title ?? ''} onClose={close} />

        {showAllLink && (
          <Link to="/resources#tutorials" className="lp-btn lp-btn-primary">
            View all tutorials
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  )
}
