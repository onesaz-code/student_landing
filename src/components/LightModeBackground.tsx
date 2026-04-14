import { useEffect, useRef } from 'react'

interface Shape {
  x: number; y: number; vx: number; vy: number
  size: number; rotation: number; rotSpeed: number
  type: 'circle' | 'triangle' | 'square' | 'ring'
  color: string; opacity: number
}

const LIGHT_COLORS = [
  'rgba(14,165,233,0.12)',
  'rgba(16,185,129,0.10)',
  'rgba(245,158,11,0.10)',
  'rgba(139,92,246,0.08)',
  'rgba(244,63,94,0.07)',
]

const TYPES: Shape['type'][] = ['circle', 'triangle', 'square', 'ring']

export function LightModeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }

    const init = (count = 40) => {
      shapesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        color: LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)],
        opacity: Math.random() * 0.5 + 0.3,
      }))
    }

    const drawShape = (s: Shape) => {
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(s.rotation)
      ctx.globalAlpha = s.opacity
      ctx.fillStyle = s.color
      ctx.strokeStyle = s.color

      if (s.type === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, s.size, 0, Math.PI * 2); ctx.fill()
      } else if (s.type === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(0, -s.size)
        ctx.lineTo(-s.size * 0.87, s.size * 0.5)
        ctx.lineTo(s.size * 0.87, s.size * 0.5)
        ctx.closePath(); ctx.fill()
      } else if (s.type === 'square') {
        const half = s.size * 0.7
        ctx.fillRect(-half, -half, half * 2, half * 2)
      } else {
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(0, 0, s.size, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.restore()
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of shapesRef.current) {
        s.x += s.vx; s.y += s.vy; s.rotation += s.rotSpeed
        if (s.x < -50) s.x = canvas.width + 50
        if (s.x > canvas.width + 50) s.x = -50
        if (s.y < -50) s.y = canvas.height + 50
        if (s.y > canvas.height + 50) s.y = -50
        drawShape(s)
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    resize(); init()
    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    animate()
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(frameRef.current!) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}
