import { Link } from 'react-router-dom'
import { BRAND } from '../content/names'

interface LogoProps {
  /** Light text for dark backgrounds (footer). */
  onDark?: boolean
  size?: 'md' | 'lg'
}

/** ONESAZ lockup: logo mark + "ONESAZ" + "by Acadhub". Always links home. */
export function Logo({ onDark = false, size = 'md' }: LogoProps) {
  // The mark is cropped tight, so its height matches the two-line wordmark.
  const mark = size === 'lg' ? 'h-[32px] w-[32px]' : 'h-[28px] w-[28px]'
  const word = size === 'lg' ? 'text-[20px]' : 'text-[17px]'
  return (
    <Link to="/" aria-label={`${BRAND.name} home`} className="flex shrink-0 items-center gap-2">
      <img src={BRAND.logoSrc} alt="" width={28} height={28} className={`${mark} shrink-0 object-contain`} />
      <span className="flex flex-col leading-none">
        <span
          className={`${word} font-extrabold tracking-[0.02em]`}
          style={{ fontFamily: 'var(--font-display)', color: onDark ? '#fff' : 'var(--ink-900)' }}
        >
          {BRAND.name.slice(0, -1)}
          {/* The Z, animated for AI: teal-blue like the mark, a light scan, then a sparkle */}
          <span className="lp-z">
            {BRAND.name.slice(-1)}
            <span className="lp-z-scan" aria-hidden>
              {BRAND.name.slice(-1)}
            </span>
            <span className="lp-z-spark" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z"
                />
              </svg>
            </span>
          </span>
        </span>
        <span className="mt-[2px] text-[9.5px] font-medium" style={{ color: onDark ? '#9AA4B5' : 'var(--ink-400)' }}>
          by Acadhub
        </span>
      </span>
    </Link>
  )
}
