import * as React from 'react'

interface SegmentedProps<T extends string> {
  label: string
  options: readonly { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  /** id of the panel the buttons control (aria-controls). */
  controls: string
}

/**
 * Pill switcher (Solutions, Roles). Built as a tablist: click or arrow keys switch.
 * Wraps onto several rows on narrow screens.
 */
export function Segmented<T extends string>({ label, options, value, onChange, controls }: SegmentedProps<T>) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = options.length
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : null
    if (next === null) return
    e.preventDefault()
    onChange(options[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex flex-wrap justify-center gap-1 rounded-[10px] border border-[color:var(--line)] bg-white p-1 max-[639px]:w-full"
    >
      {options.map((o, i) => {
        const on = o.id === value
        return (
          <button
            key={o.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={controls}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`h-[42px] rounded-[7px] px-5 text-[14px] font-medium transition-colors duration-150 max-[639px]:flex-[1_1_auto] max-[639px]:px-3.5 ${
              on
                ? 'bg-[color:var(--ink-900)] text-white'
                : 'text-[color:var(--ink-600)] hover:bg-[color:var(--surface-alt)] hover:text-[color:var(--ink-900)]'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
