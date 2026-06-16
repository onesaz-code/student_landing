import { Caption, Box } from '@onesaz/ui'

/** Logo files in `public/images/`. */
const INSTITUTION_LOGOS = [
  { alt: 'Bhashyam Medex', src: '/images/523cc89e09841093d8d0e4f1bc2aeb26dba9f7e3-9UEntu-E.png' },
  { alt: 'Agastya IIT-JEE Academy', src: '/images/5d2e2c50eda75af419a91341a59e351936135bc7-CyaB5-Y7.png' },
  { alt: 'SR Ekluvya', src: '/images/5e11a78fc96223a1b49bac8302827a23aff36624-CKRNAiq9.png' },
  { alt: 'Turito', src: '/images/7c05ad389050b250977a51b2da7a634b1c0046eb-CqC1mqbQ.png' },
  { alt: 'MIIT', src: '/images/829e4a90576f0a5e5aca38c261ed0f9619160e2c-H01NUPi9.png' },
  { alt: 'Bhashyam Educational Institutions', src: '/images/9eb39e2401b690179d4aeb5a695cd365c5806939-B1HGUPBB.png' },
] as const

function LogoCard({ item }: { item: (typeof INSTITUTION_LOGOS)[number] }) {
  return (
    <div className="flex shrink-0 items-center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="h-[104px] min-w-[200px] max-w-[280px] rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-4 sm:h-[112px] sm:min-w-[220px] sm:max-w-[300px] sm:px-8"
      >
        <img
          src={item.src}
          alt={item.alt}
          width={260}
          height={104}
          className="h-[72px] w-auto max-h-[72px] max-w-full object-contain object-center sm:h-[88px] sm:max-h-[88px]"
          loading="lazy"
          decoding="async"
          style={{ filter: 'none' }}
        />
      </Box>
    </div>
  )
}

export function LogosSection(_props: { activeSolution?: 'lms' | 'erp' | 'mdm' }) {
  const title = <>Trusted by leading <span className="gradient-text">Institutions</span></>

  return (
    <section className="py-10 border-y border-[var(--border)]">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        <Caption
          fontWeight="bold"
          className="mb-6 block text-center text-xl uppercase tracking-widest underline decoration-2 underline-offset-4"
        >
          {title}
        </Caption>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />
          {/*
            Marquee uses two identical strips so translateX(-50%) loops seamlessly (standard CSS trick).
            Only the first strip is exposed to screen readers.
          */}
          <div className="flex w-max animate-marquee items-center">
            <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10">
              {INSTITUTION_LOGOS.map((item) => (
                <LogoCard key={item.src} item={item} />
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10" aria-hidden>
              {INSTITUTION_LOGOS.map((item) => (
                <LogoCard key={`loop-${item.src}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
