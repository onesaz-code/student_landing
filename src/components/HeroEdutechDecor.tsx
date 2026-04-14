/**
 * Hero background wireframes — stacked cards + central rings only.
 */
export function HeroEdutechDecor({ isDark }: { isDark: boolean }) {
  const ink = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(71, 85, 105, 0.28)'
  const inkFaint = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.12)'
  const accent = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(14, 165, 233, 0.4)'
  const emerald = isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(16, 185, 129, 0.28)'
  const violet = isDark ? 'rgba(167, 139, 250, 0.35)' : 'rgba(139, 92, 246, 0.32)'

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stacked “courses” / modules cards — bottom right */}
      <svg
        className="absolute -bottom-2 right-[2%] h-[min(36vw,220px)] w-[min(50vw,280px)] sm:right-[6%] sm:bottom-4"
        viewBox="0 0 260 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="24" y="48" width="200" height="120" rx="10" stroke={inkFaint} strokeWidth="1.2" transform="rotate(-6 124 108)" />
        <rect x="36" y="40" width="200" height="120" rx="10" stroke={ink} strokeWidth="1.3" transform="rotate(-2 136 100)" fill={isDark ? 'rgba(19,28,49,0.35)' : 'rgba(255,255,255,0.45)'} />
        <rect x="48" y="32" width="200" height="120" rx="10" stroke={accent} strokeWidth="1.4" fill={isDark ? 'rgba(11,17,32,0.4)' : 'rgba(248,250,252,0.5)'} />
        <path d="M68 58h120M68 78h90M68 98h100" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity={0.45} />
        <rect x="68" y="118" width="36" height="8" rx="2" fill={emerald} opacity={0.25} />
      </svg>

      {/* Central soft ring + arc — behind headline */}
      <svg
        className="pointer-events-none absolute left-1/2 top-[28%] h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="200" cy="200" r="168" stroke={inkFaint} strokeWidth="1" opacity={0.9} />
        <circle cx="200" cy="200" r="142" stroke={accent} strokeWidth="0.75" opacity={0.2} strokeDasharray="8 14" />
        <path
          d="M200 88c-48 32-72 88-56 144"
          stroke={violet}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.35}
        />
      </svg>
    </div>
  )
}
