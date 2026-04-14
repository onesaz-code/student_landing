import { useRef, useState, useEffect } from 'react'
import { useInView } from 'motion/react'
import { Card, CardContent, Box, Text, Caption } from '@onesaz/ui'
import { School, Users, TrendingUp, BookOpen } from 'lucide-react'

const stats = [
  { icon: School, value: 200, suffix: '+', label: 'Institutions', desc: 'Trust Acadhub nationwide' },
  { icon: Users, value: 600000, suffix: '+', label: 'Students', desc: 'Learning every day' },
  { icon: TrendingUp, value: 99, suffix: '%', label: 'Success Rate', desc: 'Proven results' },
  { icon: BookOpen, value: 600000, suffix: '+', label: 'Question Bank', desc: 'Enhanced with integrated AI'},
]

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start: number; let frame: number
    const run = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      setCount(Math.floor(p * value))
      if (p < 1) frame = requestAnimationFrame(run); else setCount(value)
    }
    frame = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export function StatsSection() {
  return (
    <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-[var(--container-max)] mx-auto mt-9 px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Box display="inline-flex" className="h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-bg)] mt-5">
                    <Icon className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
                  </Box>
                  <Text fontWeight="bold" className="!text-2xl md:!text-3xl">
                    <Counter value={s.value} />{s.suffix}
                  </Text>
                  <Text fontWeight="medium" className="!text-sm mt-1">{s.label}</Text>
                  <Caption color="muted" className="mt-0.5 text-sm">{s.desc}</Caption>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
