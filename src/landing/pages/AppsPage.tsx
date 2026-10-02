import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { StoreBadges } from '../components/StoreBadges'
import { APPS_HERO, CORE_APPS, INSTITUTION_APPS, type MobileApp } from '../content/apps'
import { CTA, FEATURES } from '../content/names'

/** Small "Google Play" / "App Store" link pills for one app. */
function StoreLinks({ app }: { app: MobileApp }) {
  const pill =
    'inline-flex h-8 items-center gap-1 rounded-full border border-[color:var(--line)] bg-white px-3 text-[12.5px] font-medium text-[color:var(--ink-900)] transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]'
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={app.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className={pill}
        aria-label={`${app.name} on Google Play (opens in a new tab)`}
      >
        Google Play
        <ArrowUpRight size={13} aria-hidden />
      </a>
      {app.appStore && (
        <a
          href={app.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className={pill}
          aria-label={`${app.name} on the App Store (opens in a new tab)`}
        >
          App Store
          <ArrowUpRight size={13} aria-hidden />
        </a>
      )}
    </div>
  )
}

function AppIcon({ app, size }: { app: MobileApp; size: number }) {
  return (
    <img
      src={app.icon}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      // Google's image CDN refuses requests that carry another site's referrer
      referrerPolicy="no-referrer"
      className="shrink-0 rounded-[22%] border border-[color:var(--line)] bg-white object-cover"
      style={{ width: size, height: size }}
    />
  )
}

/** The four ONESAZ apps every institution can use. */
function CoreApps() {
  return (
    <section id="onesaz-apps" className="lp-section">
      <div className="lp-container flex flex-col gap-10">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3.5 text-center">
          <span className="lp-eyebrow">ONESAZ apps</span>
          <h2 className="lp-h2">One app for every role.</h2>
          <p className="lp-lead">The official ONESAZ apps, ready for any institution on the platform.</p>
        </div>
        <ul className="grid grid-cols-2 gap-5 max-[767px]:grid-cols-1">
          {CORE_APPS.map((app) => (
            <li
              key={app.id}
              className="lp-lift flex gap-5 rounded-[18px] border border-[color:var(--line)] bg-white p-6 max-[479px]:flex-col max-[479px]:gap-4"
            >
              <AppIcon app={app} size={72} />
              <div className="flex min-w-0 flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-[color:var(--ink-900)]">
                    {app.name}
                  </h3>
                  <span className="rounded-full bg-[color:var(--brand-tint)] px-2.5 py-0.5 text-[12px] font-medium text-[color:var(--brand)]">
                    {app.audience}
                  </span>
                </div>
                <p className="text-[15px] leading-[1.6] text-[color:var(--ink-600)]">{app.description}</p>
                <StoreLinks app={app} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Institution-branded apps, with a search box to find yours. */
function InstitutionApps() {
  const [query, setQuery] = React.useState('')
  const q = query.trim().toLowerCase()
  const apps = q ? INSTITUTION_APPS.filter((a) => a.name.toLowerCase().includes(q)) : INSTITUTION_APPS

  return (
    <section id="institution-apps" className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <span className="lp-eyebrow">Institution apps</span>
            <h2 className="lp-h2">Your institution’s own app.</h2>
            <p className="lp-lead">
              Many of our clients have their own branded app, built on ONESAZ. Find your institution below, or use the Onesaz app if it
              isn’t listed.
            </p>
          </div>
          <label className="relative w-full max-w-[320px] max-[639px]:max-w-none">
            <span className="sr-only">Search institution apps</span>
            <Search
              size={18}
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--ink-400)]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your institution"
              className="h-12 w-full rounded-[10px] border border-[#D9DCE3] bg-white pl-11 pr-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:border-[color:var(--brand)] focus:shadow-[0_0_0_3px_rgba(36,71,209,.15)]"
            />
          </label>
        </div>

        {apps.length ? (
          <ul className="grid grid-cols-3 gap-4 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1" aria-live="polite">
            {apps.map((app) => (
              <li key={app.id} className="flex items-center gap-4 rounded-2xl border border-[color:var(--line)] bg-white p-4">
                <AppIcon app={app} size={56} />
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="truncate text-[15.5px] font-semibold text-[color:var(--ink-900)]" title={app.name}>
                    {app.name}
                  </h3>
                  <StoreLinks app={app} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p
            role="status"
            className="rounded-2xl border border-dashed border-[#CBD2DE] bg-white px-6 py-10 text-center text-[15px] text-[color:var(--ink-600)]"
          >
            No app matches “{query}”. Use the <b className="font-semibold text-[color:var(--ink-900)]">Onesaz</b> app, or{' '}
            <Link to="/contact#support" className="font-medium text-[color:var(--brand)] hover:underline">
              ask our support team
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  )
}

/** /apps: every ONESAZ mobile app, from the onesaz developer pages on Google Play and the App Store. */
export function AppsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: FEATURES.app }]}
        eyebrow={APPS_HERO.eyebrow}
        title={APPS_HERO.title}
        lead={APPS_HERO.lead}
      >
        <div className="flex flex-col items-center gap-3">
          <StoreBadges className="justify-center" />
          <span className="text-[13px] text-[color:var(--ink-400)]">Opens the ONESAZ developer page with every app</span>
        </div>
      </PageHero>
      <CoreApps />
      <InstitutionApps />
      <section className="bg-white pb-24 max-[639px]:pb-16">
        <div className="lp-container">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-3xl bg-[linear-gradient(135deg,#0B1426_0%,#1B2F7A_60%,#2447D1_100%)] p-14 text-white max-[639px]:px-6 max-[639px]:py-8">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                Want an app with your institution’s name?
              </h2>
              <p className="text-[16px] leading-[1.6] text-[#C3CCE6]">
                We can set up a branded ONESAZ app for your institution on Google Play and the App Store.
              </p>
            </div>
            <Link to={CTA.demoPath} className="lp-btn lp-btn-on-dark">
              {CTA.demo}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
