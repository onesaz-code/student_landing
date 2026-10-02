import { BRAND } from '../content/names'

/** Official store badge artwork, as Google's and Apple's brand guidelines require. */
const STORE_BADGES = [
  {
    label: 'Get ONESAZ apps on Google Play',
    href: BRAND.apps.googlePlay,
    src: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
    // Google's PNG has transparent padding built in, so it is drawn larger and pulled in to line up
    className: '-my-[9px] -mx-[9px] h-[58px]',
  },
  {
    label: 'Download ONESAZ apps on the App Store',
    href: BRAND.apps.appStore,
    src: 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us',
    className: 'h-10',
  },
]

/** Google Play + App Store badges linking to the ONESAZ developer pages (every app). */
export function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {STORE_BADGES.map((b) => (
        <a
          key={b.href}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${b.label} (opens in a new tab)`}
          className="block overflow-hidden rounded-lg transition hover:-translate-y-px hover:opacity-90"
        >
          <img src={b.src} alt="" className={`block w-auto ${b.className}`} />
        </a>
      ))}
    </div>
  )
}
