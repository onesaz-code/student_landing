import * as React from 'react'

export type WaveVariant = 'lines' | 'layers'

/** Option A: three soft colour layers (blue, violet, pink): colour, speed, height and phase. */
const LAYERS = [
  { color: 'rgba(99,132,255,.20)', speed: 0.35, amp: 26, base: 0.5, phase: 0 },
  { color: 'rgba(160,110,240,.16)', speed: 0.5, amp: 20, base: 0.6, phase: 2 },
  { color: 'rgba(236,120,200,.14)', speed: 0.28, amp: 16, base: 0.7, phase: 4 },
]

function drawLayers(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  for (const l of LAYERS) {
    ctx.beginPath()
    ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 8) {
      const y = h * l.base + Math.sin(x / 160 + t * l.speed + l.phase) * l.amp + Math.sin(x / 70 + t * l.speed * 1.6) * l.amp * 0.35
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fillStyle = l.color
    ctx.fill()
  }
}

/** Option B: thin orange lines (same orange as the Services arcs) rippling across, spread over the middle of the area. */
const LINE_COUNT = 18

function drawLines(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const gap = (h * 0.6) / LINE_COUNT
  ctx.lineWidth = 1
  for (let i = 0; i < LINE_COUNT; i++) {
    ctx.beginPath()
    for (let x = 0; x <= w; x += 6) {
      const y = h * 0.2 + i * gap + Math.sin(x / 180 + t * 0.6 + i * 0.25) * 22 + Math.sin(x / 75 - t * 0.4) * 5
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = `rgba(232, ${132 - i * 2}, ${64 - i}, ${0.24 + i * 0.014})`
    ctx.stroke()
  }
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, variant: WaveVariant) {
  ctx.clearRect(0, 0, w, h)
  if (variant === 'lines') drawLines(ctx, w, h, t)
  else drawLayers(ctx, w, h, t)
}

/**
 * Slow wave animation drawn on a canvas (thin lines by default, or soft colour layers), used as a decorative background.
 * Animates only while on screen; with reduced motion it shows one still frame.
 */
export function WaveBackground({
  className = '',
  style,
  variant = 'lines',
}: {
  className?: string
  style?: React.CSSProperties
  variant?: WaveVariant
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = false
    const start = performance.now()

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(ctx, w, h, (performance.now() - start) / 1000, variant)
    }
    const frame = (now: number) => {
      draw(ctx, w, h, (now - start) / 1000, variant)
      raf = requestAnimationFrame(frame)
    }
    const play = () => {
      if (!still && visible && !raf) raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) play()
      else pause()
    })
    io.observe(canvas)
    resize()

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
    }
  }, [variant])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} style={style} />
}
