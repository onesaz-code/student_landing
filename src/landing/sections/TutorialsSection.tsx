import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Play } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { TUTORIALS } from '../content/home'

/** Simple screen illustrations on each tutorial cover. */
function CoverArt({ art }: { art: (typeof TUTORIALS)[number]['art'] }) {
  if (art === 'app') {
    return (
      <svg viewBox="0 0 260 130" className="h-[125px] w-[250px] max-w-full" aria-hidden>
        <rect x="96" y="6" width="68" height="120" rx="12" fill="#fff" stroke="#C9D4F6" strokeWidth="2" />
        <rect x="106" y="22" width="48" height="10" rx="5" fill="#DCE3FA" />
        <rect x="106" y="42" width="48" height="34" rx="6" fill="#2447D1" />
        <rect x="106" y="84" width="36" height="8" rx="4" fill="#E7F5EE" />
        <rect x="106" y="98" width="44" height="8" rx="4" fill="#FBF1DE" />
        <circle cx="62" cy="70" r="18" fill="#DCE3FA" />
        <circle cx="198" cy="70" r="18" fill="#E7F5EE" />
      </svg>
    )
  }
  if (art === 'test') {
    return (
      <svg viewBox="0 0 260 130" className="h-[125px] w-[250px] max-w-full" aria-hidden>
        <rect x="70" y="8" width="120" height="114" rx="10" fill="#fff" stroke="#C9D4F6" strokeWidth="2" />
        <rect x="86" y="24" width="70" height="10" rx="5" fill="#DCE3FA" />
        {[46, 68, 90].map((y, i) => (
          <g key={y}>
            <circle cx="92" cy={y + 5} r="6" fill={i === 1 ? '#2447D1' : '#fff'} stroke="#B9C6F0" strokeWidth="2" />
            <rect x="106" y={y} width={i === 1 ? 64 : 52} height="10" rx="5" fill={i === 1 ? '#DCE3FA' : '#EEF1F6'} />
          </g>
        ))}
        <circle cx="200" cy="100" r="18" fill="#1F9D63" />
        <path d="m192 100 6 6 10-12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 260 130" className="h-[125px] w-[250px] max-w-full" aria-hidden>
      <rect x="40" y="18" width="180" height="100" rx="10" fill="#fff" stroke="#C9D4F6" strokeWidth="2" />
      <rect x="40" y="18" width="180" height="16" rx="8" fill="#DCE3FA" />
      <rect x="20" y="118" width="220" height="8" rx="4" fill="#B9C6F0" />
      <circle cx="88" cy="74" r="22" fill="#2447D1" />
      <circle cx="88" cy="74" r="6" fill="#fff" />
      <rect x="122" y="54" width="76" height="10" rx="5" fill="#DCE3FA" />
      <rect x="122" y="72" width="56" height="10" rx="5" fill="#E7F5EE" />
      <rect x="122" y="90" width="66" height="10" rx="5" fill="#FBF1DE" />
    </svg>
  )
}

/** "Resources & Tutorials": three video tutorials (open on YouTube). */
export function TutorialsSection() {
  return (
    <section id="tutorials" className="lp-section lp-section-alt">
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
            <a
              key={t.href}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[color:var(--line)] bg-white transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#DCE3FA] hover:shadow-[0_24px_48px_-28px_rgba(20,40,110,.35)]"
            >
              <div className="relative flex h-[260px] flex-col items-center justify-center gap-3.5 overflow-hidden bg-[linear-gradient(135deg,#EEF2FD_0%,#F8FAFF_60%,#E9F6EF_100%)] pt-11 max-[639px]:h-[230px]">
                <span className="absolute left-[18px] top-[18px] rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-[13px] font-semibold text-[color:var(--ink-900)]">
                  Tutorial
                </span>
                <span className="px-[70px] text-center font-[family-name:var(--font-display)] text-[17px] font-bold leading-[1.25] text-[#1B2E8A] max-[379px]:px-12">
                  {t.cover[0]}
                  <br />
                  {t.cover[1]}
                </span>
                <CoverArt art={t.art} />
                <span className="absolute bottom-[18px] right-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[color:var(--brand)] shadow-[0_10px_24px_-8px_rgba(15,23,41,.35)] transition-transform duration-200 group-hover:scale-110">
                  <Play size={20} fill="currentColor" className="ml-[3px]" />
                </span>
              </div>
              <div className="flex flex-grow flex-col gap-3 px-7 pb-7 pt-6 max-[639px]:px-6">
                <span className="flex items-center gap-2 text-[14px] text-[#667085]">
                  <Calendar size={16} strokeWidth={1.75} />
                  {t.date}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[21px] font-semibold leading-[1.35] tracking-[-0.01em] text-[color:var(--ink-900)] transition-colors group-hover:text-[color:var(--brand)]">
                  {t.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#667085]">{t.text}</p>
                <span className="mt-auto inline-flex items-center gap-2.5 pt-2 text-[16px] font-semibold text-[color:var(--ink-900)]">
                  <span className="border-b-2 border-[color:var(--ink-900)] pb-0.5">Watch tutorial</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand)] text-white">
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </span>
                  <span className="sr-only">(opens YouTube in a new tab)</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <Link to="/resources#tutorials" className="lp-btn lp-btn-primary">
          View all tutorials
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
