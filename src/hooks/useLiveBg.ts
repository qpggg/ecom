import { useCallback, useEffect, useRef } from 'react'

type LiveBgHandlers = {
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
}

function canUseLiveBg() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useLiveBg<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const frame = useRef<number | undefined>(undefined)
  const enabled = useRef(canUseLiveBg())
  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 })

  const tick = useCallback(() => {
    const el = ref.current
    if (!el || !enabled.current) {
      frame.current = undefined
      return
    }

    const p = pointer.current
    p.x += (p.tx - p.x) * 0.07
    p.y += (p.ty - p.y) * 0.07

    el.style.setProperty('--bg-x', p.x.toFixed(4))
    el.style.setProperty('--bg-y', p.y.toFixed(4))

    if (Math.abs(p.tx - p.x) > 0.0002 || Math.abs(p.ty - p.y) > 0.0002) {
      frame.current = requestAnimationFrame(tick)
    } else {
      frame.current = undefined
    }
  }, [])

  const start = useCallback(() => {
    if (!enabled.current || frame.current) return
    frame.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      enabled.current = hoverMq.matches && !motionMq.matches
      if (!enabled.current && ref.current) {
        ref.current.style.setProperty('--bg-x', '0.5')
        ref.current.style.setProperty('--bg-y', '0.5')
      }
    }

    sync()
    hoverMq.addEventListener('change', sync)
    motionMq.addEventListener('change', sync)

    return () => {
      hoverMq.removeEventListener('change', sync)
      motionMq.removeEventListener('change', sync)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled.current) return
      const rect = event.currentTarget.getBoundingClientRect()
      pointer.current.tx = (event.clientX - rect.left) / rect.width
      pointer.current.ty = (event.clientY - rect.top) / rect.height
      start()
    },
    [start],
  )

  const onMouseLeave = useCallback(() => {
    pointer.current.tx = 0.5
    pointer.current.ty = 0.5
    start()
  }, [start])

  return {
    ref,
    bgHandlers: { onMouseMove, onMouseLeave } satisfies LiveBgHandlers,
  }
}
