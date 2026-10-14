import * as React from 'react'
import type { PaidPlanId } from './planQuote'

const OPTIONS: { id: PaidPlanId; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
]

/** Same tab control as the pricing page audience switcher, for Monthly and Annual. */
export function PlanTabs({ value, onChange }: { value: PaidPlanId; onChange: (id: PaidPlanId) => void }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === 'ArrowRight' ? (i + 1) % OPTIONS.length : e.key === 'ArrowLeft' ? (i - 1 + OPTIONS.length) % OPTIONS.length : null
    if (next === null) return
    e.preventDefault()
    onChange(OPTIONS[next].id)
    refs.current[next]?.focus()
  }
  return (
    <div role="tablist" aria-label="Plan" className="inline-flex rounded-[12px] border border-white/15 bg-white/[.08] p-1 max-[479px]:w-full">
      {OPTIONS.map((option, i) => {
        const on = option.id === value
        return (
          <button
            key={option.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`relative h-11 rounded-[9px] px-6 text-[14.5px] font-medium transition-colors max-[479px]:flex-1 max-[479px]:px-3 max-[479px]:text-[13.5px] ${
              on ? 'bg-white/10 text-white shadow-[inset_0_-2px_0_#E3DC4B]' : 'text-[#C9C3E6] hover:text-white'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
