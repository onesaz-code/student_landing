import * as React from 'react'
import { CircleCheck, LoaderCircle } from 'lucide-react'
import { INSTITUTION_TYPES } from '../content/home'
import { BRAND, CTA } from '../content/names'

/** Netlify Forms name. A matching hidden form in index.html lets Netlify detect the fields at build time. */
export const DEMO_FORM_NAME = 'book-a-demo'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'h-[46px] w-full rounded-lg border border-[#D9DCE3] bg-white px-3.5 text-[15px] font-normal text-[color:var(--ink-900)] outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:border-[color:var(--brand)] focus:shadow-[0_0_0_3px_rgba(36,71,209,.15)]'
const labelClass = 'flex flex-col gap-1.5 text-[13px] font-medium text-[color:var(--ink-600)]'

/** "Book a demo with our team" form. Posts to Netlify Forms and shows a thank-you state. */
export function DemoForm() {
  const [status, setStatus] = React.useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="lp-fade flex flex-col items-center gap-3.5 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F5EE] text-[#1F7A4F]">
          <CircleCheck size={24} strokeWidth={1.75} />
        </span>
        <span className="font-[family-name:var(--font-display)] text-[20px] font-semibold">Thanks, we have your details.</span>
        <span className="text-[14px] leading-[1.5] text-[color:var(--ink-600)]">
          The {BRAND.name} team will contact you to schedule your walkthrough.
        </span>
      </div>
    )
  }

  return (
    <form
      name={DEMO_FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value={DEMO_FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <h3 className="font-[family-name:var(--font-display)] text-[20px] font-semibold">Book a demo with our team</h3>
      <label className={labelClass}>
        Full name
        <input className={inputClass} type="text" name="name" placeholder="Your name" autoComplete="name" required />
      </label>
      <label className={labelClass}>
        Institution name
        <input
          className={inputClass}
          type="text"
          name="institution"
          placeholder="Name of your institution"
          autoComplete="organization"
          required
        />
      </label>
      <label className={labelClass}>
        Work email
        <input className={inputClass} type="email" name="email" placeholder="name@institution.edu" autoComplete="email" required />
      </label>
      <label className={labelClass}>
        Phone number
        <input className={inputClass} type="tel" name="phone" placeholder="+91" autoComplete="tel" inputMode="tel" />
      </label>
      <label className={labelClass}>
        Institution type
        <select
          className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%237C879B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`}
          name="institution-type"
          defaultValue={INSTITUTION_TYPES[0]}
        >
          {INSTITUTION_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      {status === 'error' && (
        <p role="alert" className="rounded-lg bg-[#FDEFEC] px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[color:var(--danger)]">
          We could not send your request. Please try again, or call us on{' '}
          <a href={BRAND.phoneHref} className="whitespace-nowrap font-semibold underline">
            {BRAND.phone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="lp-btn lp-btn-primary mt-1 w-full disabled:cursor-wait disabled:opacity-80"
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          CTA.demo
        )}
      </button>
    </form>
  )
}
