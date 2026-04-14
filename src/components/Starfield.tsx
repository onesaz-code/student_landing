import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; z: number; px: number; py: number
  color: [number, number, number]
}

/** Classic monochrome starfield — white stars only (no rainbow particles). */
const WHITE: [number, number, number] = [255, 255, 255]

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }

    const init = (count = 700) => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        px: 0, py: 0,
        color: WHITE,
      }))
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.fillStyle = 'rgba(11, 17, 32, 0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2, cy = canvas.height / 2

      for (const p of particlesRef.current) {
        p.z -= 0.6
        if (p.z <= 0) {
          p.x = Math.random() * canvas.width - cx
          p.y = Math.random() * canvas.height - cy
          p.z = canvas.width
          p.px = 0; p.py = 0
          p.color = WHITE
        }

        const k = 128 / p.z
        const x = p.x * k + cx, y = p.y * k + cy
        const size = (1 - p.z / canvas.width) * 2.5
        const opacity = (1 - p.z / canvas.width) * 0.85
        const [r, g, b] = p.color

        if (p.px !== 0) {
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.4})`
          ctx.lineWidth = size * 0.6
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.fill()

        if (opacity > 0.55) {
          ctx.shadowBlur = 12
          ctx.shadowColor = `rgba(${r},${g},${b},0.6)`
          ctx.fill()
          ctx.shadowBlur = 0
        }

        p.px = x; p.py = y
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
