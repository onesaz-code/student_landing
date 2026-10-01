import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { FOOTER_COLUMNS } from '../content/navigation'
import { BRAND, CTA } from '../content/names'

// TODO: replace the '#' placeholders with the ONESAZ YouTube, Facebook, Instagram and X profile URLs.
const SOCIAL: { label: string; href: string; path: JSX.Element }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/onesaz',
    path: <path d="M4 9h3.5v11H4zM5.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.3 2.3 4.3 5.4V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20H10z" fill="currentColor" />,
  },
  {
    label: 'YouTube',
    href: '#',
    path: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" />
        <path d="m10 9 5 3-5 3z" fill="#0E1116" />
      </>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    path: <path d="M14 8.5V7c0-.8.4-1.3 1.4-1.3H17V2.5h-2.6C11.6 2.5 10.5 4.2 10.5 7v1.5H8V12h2.5v9.5H14V12h2.7l.4-3.5z" fill="currentColor" />,
  },
  {
    label: 'Instagram',
    href: '#',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'X',
    href: '#',
    path: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.73H5.58z" fill="currentColor" />,
  },
]

const linkClass = 'text-[14px] text-[#C9D0DC] transition-colors hover:text-white'

/** Dark, structured footer (Scalefusion pattern): logo + social, six link columns, demo link, about, legal bar. */
export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[color:var(--surface-footer)] pb-8 pt-16 text-[#C9D0DC] max-[639px]:pt-12">
      <div className="lp-container">
        <div className="flex items-center justify-between gap-6 border-b border-[color:var(--brand)] pb-8 max-[639px]:flex-col max-[639px]:items-start">
          <Logo onDark size="lg" />
          <div className="flex items-center gap-[18px]">
            {SOCIAL.map((s) => {
              const placeholder = s.href === '#'
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(placeholder
                    ? { onClick: (e: React.MouseEvent) => e.preventDefault() }
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="text-white opacity-90 transition hover:-translate-y-px hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                    {s.path}
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-[1.25fr_1.6fr_1.1fr_.8fr_.75fr_.95fr] gap-6 py-11 max-[1099px]:grid-cols-3 max-[1099px]:gap-y-10 max-[639px]:grid-cols-2 max-[639px]:gap-x-5 max-[639px]:gap-y-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex min-w-0 flex-col gap-3.5">
              <span className="mb-1.5 text-[16px] font-semibold text-white">{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex min-w-0 flex-col gap-3.5">
            <span className="mb-1.5 text-[16px] font-semibold text-white">Contact Sales</span>
            <a href={BRAND.phoneHref} className={`${linkClass} whitespace-nowrap`}>
              {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} className={linkClass}>
              {BRAND.email}
            </a>
            <span className="text-[14px]">{BRAND.headquarters}</span>
            <Link to={CTA.demoPath} className={linkClass}>
              {CTA.demo}
            </Link>
            <Link to="/contact#support" className={linkClass}>
              Technical support
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 border-b border-[#262C36] pb-9 max-[759px]:flex-col max-[759px]:items-start">
          <Link
            to={CTA.demoPath}
            className="inline-flex items-center gap-1.5 border-b-2 border-dotted border-[#5B6B88] pb-1.5 text-[19px] font-semibold text-white hover:border-white max-[639px]:text-[17px]"
          >
            Book a free demo
            <ChevronRight size={18} />
          </Link>
          <span className="inline-flex items-center gap-2 text-[14px] text-[#9AA4B5]">
            <span className="h-2 w-2 rounded-full bg-[#34D399]" />
            Serving schools, colleges and institutes across India
          </span>
        </div>

        <div className="max-w-[860px] py-9">
          <span className="text-[20px] font-semibold text-white">About {BRAND.name}</span>
          <p className="mt-3.5 text-[15px] leading-[1.75] text-[#AEB6C4]">
            {BRAND.name} is an AI-powered, one-stop solution for educational institutions, built by{' '}
            <span className="text-white">{BRAND.company}</span> It brings academics, administration, examinations,
            communication, payments and student learning together on one platform, so institutions can simplify
            operations, connect everyone and make better decisions.
          </p>
        </div>

        <div className="border-t border-[color:var(--brand)] py-9">
          <span className="block text-[20px] font-semibold text-white">Our Office</span>
          <div className="mt-3 flex items-start gap-3">
            <MapPin size={18} className="mt-[3px] shrink-0 text-white" aria-hidden />
            <div>
              <address className="text-[15px] not-italic leading-[1.7] text-[#AEB6C4]">
                <span className="block font-medium text-white">{BRAND.company}</span>
                {BRAND.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={BRAND.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1 text-[14px] font-medium text-white hover:underline"
              >
                Get directions
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[#262C36] pt-6 text-[13.5px] text-[#8A93A3] max-[759px]:flex-col max-[759px]:items-start">
          <span>
            © {year} {BRAND.company} All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className={linkClass}>
              Terms of Use
            </Link>
            <Link to="/contact" className={linkClass}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
