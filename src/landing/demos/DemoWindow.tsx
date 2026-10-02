import type { ReactNode } from 'react'
import { BRAND } from '../content/names'

/** The real ONESAZ logo mark, used in every demo window. */
export function OnesazMark({ size }: { size: number }) {
  return (
    <img src={BRAND.logoSrc} alt="" width={size} height={size} className="shrink-0 object-contain" style={{ width: size, height: size }} />
  )
}

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
          <OnesazMark size={22} />
          <span className="truncate">{title}</span>
        </span>
        {meta && <span className="shrink-0 text-[12px] text-[#667085] max-[379px]:hidden">{meta}</span>}
      </div>
      <div className={`bg-[#FBFCFE] p-5 max-[379px]:p-3 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
