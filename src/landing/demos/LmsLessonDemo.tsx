import * as React from 'react'
import { DemoWindow } from './DemoWindow'

/** Lesson parts: subtitle and chapter chip, in order. */
const PARTS = [
  { chip: 'Sunlight', caption: 'Plants make their own food using sunlight.' },
  { chip: 'Water', caption: 'Roots pull water up through the stem.' },
  { chip: 'Carbon dioxide', caption: 'Leaves take in carbon dioxide from the air.' },
  { chip: 'Oxygen', caption: 'And they give out the oxygen we breathe.' },
]
/** Steps after the video; each one moves the marker to the next stop. */
const TASKS = ['Watch the lesson', 'Read the notes', 'Quick quiz · 5 questions']
const LESSON_SECONDS = 760
const TICKS_PER_PART = 10
const TICK_MS = 260
/** The marker waits at Intro before the video starts. */
const INTRO_MS = 900
/** Learning path stops above the video. */
const STOPS = ['Intro', 'Video', 'Notes', 'Quiz']
/** Stop positions on the 400 × 58 path drawing. */
const STOP_X = [30, 150, 270, 370]

const SVG_NS = 'http://www.w3.org/2000/svg'
type Kind = 'beam' | 'drop' | 'co2' | 'o2'

/** Starts one moving particle in the scene; it removes itself when its trip ends. */
function spawn(layer: SVGGElement, kind: Kind) {
  const start = performance.now()
  const isText = kind === 'co2' || kind === 'o2'
  const node = document.createElementNS(SVG_NS, isText ? 'text' : 'circle')
  if (isText) {
    node.textContent = kind === 'co2' ? 'CO₂' : 'O₂'
    node.setAttribute('font-size', '9')
    node.setAttribute('font-family', 'sans-serif')
    node.setAttribute('fill', kind === 'co2' ? '#5A6577' : '#1F7A4F')
  } else {
    node.setAttribute('r', kind === 'beam' ? '3' : '2.6')
    node.setAttribute('fill', kind === 'beam' ? '#FFE066' : '#3FA9F5')
  }
  layer.appendChild(node)
  const duration = kind === 'beam' ? 1200 : kind === 'drop' ? 1400 : 1800
  const y0 = 60 + Math.random() * 30
  const x0 = 120 + Math.random() * 30
  const step = (now: number) => {
    const p = (now - start) / duration
    if (p > 1 || !node.isConnected) return node.remove()
    const set = (x: number, y: number, o = 1) => {
      node.setAttribute(isText ? 'x' : 'cx', String(x))
      node.setAttribute(isText ? 'y' : 'cy', String(y))
      node.setAttribute('opacity', String(o))
    }
    if (kind === 'beam') set(70 + p * 70, 55 + p * 15, 1 - p * 0.3)
    else if (kind === 'drop') set(170, 150 - p * 60)
    else if (kind === 'co2') set(300 - p * 110, y0, p < 0.85 ? 1 : (1 - p) * 6)
    else set(x0 - p * 30, 60 - p * 40, 1 - p)
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * LMS demo: a lesson player with an animated photosynthesis lesson (sunlight, water, CO₂ in, O₂ out),
 * subtitles, the teacher in picture-in-picture and a progress bar; when it ends the chapter tasks tick off.
 * With reduced motion it shows the finished lesson.
 */
export default function LmsLessonDemo() {
  const [part, setPart] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [done, setDone] = React.useState(0)
  const [ended, setEnded] = React.useState(false)
  const raysRef = React.useRef<SVGGElement>(null)
  const mouthRef = React.useRef<SVGEllipseElement>(null)
  const layerRef = React.useRef<SVGGElement>(null)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPart(PARTS.length - 1)
      setProgress(1)
      setEnded(true)
      setDone(TASKS.length)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const frame = (now: number) => {
      const t = (now - t0) / 1000
      raysRef.current?.setAttribute('transform', `rotate(${t * 20})`)
      mouthRef.current?.setAttribute('ry', (1 + Math.abs(Math.sin(t * 9)) * 2.2).toFixed(2))
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const kinds: Kind[] = ['beam', 'drop', 'co2', 'o2']
    const total = PARTS.length * TICKS_PER_PART

    const run = () => {
      setEnded(false)
      setDone(0)
      setProgress(0)
      for (let i = 0; i < total; i++) {
        later(
          () => {
            const p = Math.floor(i / TICKS_PER_PART)
            setPart(p)
            setProgress((i + 1) / total)
            const layer = layerRef.current
            if (layer) {
              spawn(layer, kinds[p])
              if (p > 0 && i % 2) spawn(layer, 'beam')
            }
          },
          INTRO_MS + TICK_MS * i,
        )
      }
      const end = INTRO_MS + TICK_MS * total
      later(() => setEnded(true), end)
      TASKS.forEach((_, i) => later(() => setDone(i + 1), end + 300 + i * 800))
      later(run, end + 300 + TASKS.length * 800 + 3000)
    }
    run()
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      layerRef.current?.replaceChildren()
    }
  }, [])

  const seconds = Math.round(progress * LESSON_SECONDS)
  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  const chapter = [0, 0.4, 0.7, 1][done]
  // Path stop: Intro before playback, Video while it plays, then Notes and Quiz as the steps complete
  const stop = done === TASKS.length ? STOPS.length : done > 0 ? done + 1 : progress > 0 ? 1 : 0
  const markerAt = Math.min(stop, STOPS.length - 1)

  return (
    <div aria-hidden>
      <DemoWindow title="ONESAZ LMS" meta="Science · Chapter 4" bodyClassName="flex flex-col gap-3">
        {/* Learning path: the marker walks Intro → Video → Notes → Quiz */}
        <div className="relative h-[58px]">
          <svg viewBox="0 0 400 58" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path
              d="M30 28 C 90 6, 120 50, 160 28 S 250 6, 280 28 S 340 50, 370 28"
              fill="none"
              stroke="#C9D3EA"
              strokeWidth="3"
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
          </svg>
          {STOPS.map((label, i) => (
            <span
              key={label}
              className={`absolute top-[28px] flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] text-[10px] font-semibold transition-colors duration-300 ${
                i < stop
                  ? 'border-[#2447D1] bg-[#2447D1] text-white'
                  : i === stop
                    ? 'border-[#2447D1] bg-white text-[#2447D1]'
                    : 'border-[#D6DCE6] bg-white text-[#98A2B3]'
              }`}
              style={{ left: `${STOP_X[i] / 4}%` }}
            >
              {i + 1}
              <span className="absolute top-[26px] whitespace-nowrap text-[10px] font-normal text-[#475467]">{label}</span>
            </span>
          ))}
          <span
            className="absolute top-[28px] z-[1] h-[18px] w-[18px] -translate-x-1/2 -translate-y-[150%] rounded-full border-[2.5px] border-white shadow-[0_3px_8px_-2px_rgba(0,0,0,.35)] transition-[left] duration-700 ease-out"
            style={{ left: `${STOP_X[markerAt] / 4}%`, background: 'linear-gradient(90deg,#08C5A7 50%,#3FBBEE 50%)' }}
          />
        </div>

        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-start gap-4 max-[639px]:grid-cols-1">
          <div>
            <div className="relative overflow-hidden rounded-[10px] bg-[#0B1220]">
              <svg viewBox="0 0 320 190" className="block h-auto w-full">
                <defs>
                  <linearGradient id="lms-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#BFE3FF" />
                    <stop offset="1" stopColor="#EAF6FF" />
                  </linearGradient>
                  <linearGradient id="lms-grass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#8BCF7A" />
                    <stop offset="1" stopColor="#5BAE5B" />
                  </linearGradient>
                </defs>
                <rect width="320" height="190" fill="url(#lms-sky)" />
                <rect y="150" width="320" height="40" fill="url(#lms-grass)" />
                <g transform="translate(52 42)">
                  <g ref={raysRef}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="-23"
                        x2="0"
                        y2="-30"
                        stroke="#FFC93C"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${i * 45})`}
                      />
                    ))}
                  </g>
                  <circle r="17" fill="#FFC93C" />
                </g>
                <path d="M170 150 C 168 120, 172 100, 170 78" stroke="#4E8F3A" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M170 98 C 140 92, 122 70, 128 52 C 150 56, 168 76, 170 98 Z" fill="#4CAF50" />
                <path d="M171 86 C 200 80, 222 58, 216 40 C 192 46, 174 64, 171 86 Z" fill="#43A047" />
                <g ref={layerRef} />
                <text
                  x="146"
                  y="20"
                  fontSize="10"
                  fill="#0F1729"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  className="transition-opacity duration-500"
                  opacity={ended ? 1 : 0}
                >
                  6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
                </text>
              </svg>

              {/* Teacher picture-in-picture */}
              <div className="absolute right-2 top-2 h-[54px] w-[54px] overflow-hidden rounded-[10px] border-2 border-white/70">
                <svg viewBox="0 0 54 54" className="h-full w-full">
                  <rect width="54" height="54" fill="#33415F" />
                  <circle cx="27" cy="22" r="10" fill="#E8B48A" />
                  <path d="M17 20 Q27 6 37 20" fill="#3A2A20" />
                  <rect x="11" y="34" width="32" height="22" rx="10" fill="#2447D1" />
                  <ellipse ref={mouthRef} cx="27" cy="27" rx="3" ry="1" fill="#8A3B2B" />
                </svg>
              </div>

              <span className="absolute bottom-11 left-1/2 max-w-[92%] -translate-x-1/2 truncate rounded-[5px] bg-black/65 px-2 py-0.5 text-[11px] text-white">
                {ended ? 'That is photosynthesis!' : PARTS[part].caption}
              </span>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-2 pt-1.5 text-[10px] text-white">
                <div className="relative mb-1.5 h-1 rounded-full bg-white/25">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#3FBBEE]" style={{ width: `${progress * 100}%` }} />
                  {[25, 50, 75].map((x) => (
                    <span key={x} className="absolute -top-0.5 h-2 w-0.5 bg-white/70" style={{ left: `${x}%` }} />
                  ))}
                </div>
                <div className="flex justify-between">
                  <span>❚❚&nbsp; {clock} / 12:40</span>
                  <span>CC&nbsp; 1x&nbsp; ⛶</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[14px] font-semibold text-[#0F1729]">Photosynthesis</div>
            <div className="mt-0.5 text-[11.5px] text-[#667085]">Ms. Rao · 12 min lesson</div>
            <div className="mt-3 text-[11.5px] text-[#475467]">{stop < STOPS.length ? `Now: ${STOPS[markerAt]}` : 'All steps done'}</div>
            <span
              className={`mt-3 inline-block rounded-full bg-[#FDF3E2] px-2.5 py-0.5 text-[11px] text-[#9A6200] transition-transform duration-300 ease-[cubic-bezier(.2,.9,.3,1.4)] ${
                stop === STOPS.length ? 'scale-100' : 'scale-0'
              }`}
            >
              🏅 Chapter 4 complete
            </span>
            <div className="mt-3 text-[11px] text-[#667085]">Chapter progress</div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF1F7]">
              <div className="h-full rounded-full bg-[#2447D1] transition-[width] duration-500" style={{ width: `${chapter * 100}%` }} />
            </div>
          </div>
        </div>
      </DemoWindow>
    </div>
  )
}
