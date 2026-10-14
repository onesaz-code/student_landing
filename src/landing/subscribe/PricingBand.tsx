import type { ReactNode } from 'react'

/** Same dark band as the pricing page. */
export const PRICING_BAND = 'radial-gradient(70% 90% at 50% 100%, #6D28D9 0%, #3B1A8C 45%, #140B33 80%, #0B0820 100%)'

export function PricingBand({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="pb-[170px] pt-6 text-center max-[639px]:pb-[140px] max-[639px]:pt-6" style={{ background: PRICING_BAND }}>
      <div className="lp-container flex flex-col items-center gap-4">
        <h1 className="lp-h1 max-w-[760px] !text-[clamp(32px,3.6vw,48px)] !text-white">{title}</h1>
        <p className="-mt-1 max-w-[640px] text-[17px] leading-[1.6] text-[#C9C3E6] max-[639px]:text-[15.5px]">{lead}</p>
        {children}
      </div>
    </section>
  )
}

export function PricingPanel({ children }: { children: ReactNode }) {
  return (
    <section className="relative z-[1] -mt-[140px] pb-20 max-[639px]:-mt-[110px] max-[639px]:pb-14">
      <div className="lp-container lp-fade">{children}</div>
    </section>
  )
}

export const pricingCardClass =
  'mx-auto w-full max-w-[560px] rounded-[18px] border border-[#E6E8EF] bg-white px-8 pb-7 pt-6 shadow-[0_30px_70px_-40px_rgba(20,10,60,.45)] max-[639px]:px-5'
