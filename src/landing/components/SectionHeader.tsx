interface SectionHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  lead?: string
  align?: 'center' | 'left'
  onDark?: boolean
}

/** Eyebrow + H2 + optional lead, used at the top of every section. */
export function SectionHeader({ eyebrow, title, lead, align = 'center', onDark = false }: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <div className={`flex max-w-[760px] flex-col gap-3.5 max-[639px]:gap-2 ${center ? 'mx-auto items-center text-center' : 'items-start'}`}>
      {eyebrow && (
        <span className="lp-eyebrow" style={onDark ? { color: 'var(--accent)' } : undefined}>
          {eyebrow}
        </span>
      )}
      <h2 className="lp-h2" style={onDark ? { color: '#fff' } : undefined}>
        {title}
      </h2>
      {lead && (
        <p className="lp-lead" style={onDark ? { color: '#A9B2C3' } : undefined}>
          {lead}
        </p>
      )}
    </div>
  )
}
