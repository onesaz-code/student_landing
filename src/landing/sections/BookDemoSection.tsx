import { Phone } from 'lucide-react'
import { DemoForm } from '../components/DemoForm'
import { BRAND } from '../content/names'

/** Closing call to action: dark panel with the demo form. */
export function BookDemoSection({ id = 'book-a-demo' }: { id?: string }) {
  return (
    <section id={id} className="bg-[color:var(--surface-alt)] pb-28 pt-[104px] max-[899px]:py-20 max-[639px]:py-16">
      <div className="lp-container">
        <div className="relative flex items-center justify-between gap-16 overflow-hidden rounded-[20px] bg-[color:var(--ink-900)] p-20 max-[999px]:flex-col max-[999px]:items-stretch max-[999px]:gap-10 max-[999px]:p-12 max-[639px]:rounded-2xl max-[639px]:p-5 max-[639px]:pt-10">
          <div
            aria-hidden
            className="absolute -right-40 -top-[200px] h-[640px] w-full max-w-[640px] rounded-full bg-[radial-gradient(circle,rgba(36,71,209,.45),rgba(36,71,209,0)_65%)]"
          />
          <div className="relative flex w-full max-w-[560px] flex-col gap-5 max-[639px]:px-1">
            <h2 className="lp-h2 text-white">Bring ONESAZ to your institution.</h2>
            <p className="text-[18px] leading-[1.6] text-[#AEB6C6] max-[639px]:text-[16px]">
              Tell us about your institution. Our team will show you the products that fit and plan your rollout with you.
            </p>
            <a
              href={BRAND.phoneHref}
              className="inline-flex items-center gap-2.5 self-start text-[15px] font-medium text-white hover:underline"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Phone size={16} />
              </span>
              Prefer to talk? Call {BRAND.phone}
            </a>
          </div>
          <div className="relative w-[420px] shrink-0 rounded-[14px] bg-white p-8 max-[999px]:w-full max-[639px]:p-5">
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  )
}
