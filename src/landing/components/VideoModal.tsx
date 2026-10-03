import * as React from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, X } from 'lucide-react'

/** The YouTube video id from a youtu.be or youtube.com link. */
export function youTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : null
}

interface VideoModalProps {
  /** YouTube link of the video to play, or null when closed. */
  url: string | null
  title: string
  onClose: () => void
}

/**
 * Plays a YouTube video in a window on the page instead of sending people to YouTube.
 * Uses YouTube's privacy-enhanced player, closes on Esc, the close button or a click outside,
 * and returns focus to whatever opened it.
 */
export function VideoModal({ url, title, onClose }: VideoModalProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const id = url ? youTubeId(url) : null

  React.useEffect(() => {
    if (!url) return
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // Stop the page scrolling behind the video
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [url, onClose])

  if (!url || !id) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#070B18]/80 p-6 backdrop-blur-sm max-[639px]:p-3"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className="lp-fade w-full max-w-[1040px]">
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <h2 className="min-w-0 truncate text-[16px] font-semibold max-[639px]:text-[14.5px]">{title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] text-white/75 hover:bg-white/10 hover:text-white max-[479px]:hidden"
            >
              Watch on YouTube
              <ExternalLink size={13} aria-hidden />
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>,
    // Inside the landing root so its fonts, colours and animations apply
    document.querySelector('.lp') ?? document.body,
  )
}
