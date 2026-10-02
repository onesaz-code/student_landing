import type { ReactNode } from 'react'

interface DemoWindowProps {
  /** Product name in the window bar, e.g. "ONESAZ CRM". */
  title: string
  /** Small grey label on the right of the window bar. */
  meta?: string
  children: ReactNode
  /** Extra classes for the body. */
  bodyClassName?: string
}

/** White app window used by every demo: ONESAZ mark + title bar, then the body. */
export function DemoWindow({ title, meta, children, bodyClassName = '' }: DemoWindowProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(15,23,41,.06)] bg-white shadow-[0_30px_60px_-30px_rgba(20,40,110,.35),0_2px_6px_rgba(15,23,41,.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#F0F2F6] px-5 py-3.5">
        <span className="flex min-w-0 items-center gap-[9px] text-[14px] font-semibold text-[color:var(--ink-900)]">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden className="shrink-0">
            <rect width="32" height="32" rx="8" fill="#2447D1" />
            <circle cx="15" cy="17" r="7" fill="none" stroke="#fff" strokeWidth="3.2" />
            <circle cx="22.5" cy="9.5" r="2.8" fill="#E0A030" />
          </svg>
          <span className="truncate">{title}</span>
        </span>
        {meta && <span className="shrink-0 text-[12px] text-[#667085] max-[379px]:hidden">{meta}</span>}
      </div>
      <div className={`bg-[#FBFCFE] p-5 max-[379px]:p-3 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
