import type { ReactNode } from 'react'
import { useLiveBg } from '../hooks/useLiveBg'
import './SceneShell.css'

type SceneShellProps = {
  id?: string
  className?: string
  children: ReactNode
  frame?: boolean
}

export function SceneShell({ id, className = '', children, frame = true }: SceneShellProps) {
  const { ref, bgHandlers } = useLiveBg<HTMLElement>()

  return (
    <section
      ref={ref}
      id={id}
      className={`scene${frame ? ' scene--frame' : ''}${className ? ` ${className}` : ''}`}
      {...bgHandlers}
    >
      <div className="scene__bg" aria-hidden>
        <div className="scene__grid" />
        <div className="scene__glow" />
        <div className="scene__spotlight" />
        <div className="scene__grain" />
      </div>
      <div className="scene__content">{children}</div>
    </section>
  )
}
