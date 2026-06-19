import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EntropyWorkflow } from './EntropyWorkflow'
import './ScrollytellingSection.css'

export function ScrollytellingSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="scroll-section" id="scroll" ref={ref}>
      <div className="scroll-section__track">
        <div className="scroll-section__sticky">
          <EntropyWorkflow progress={scrollYProgress} full />
          <ScrollProgress progress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

function ScrollProgress({
  progress,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="scroll-section__progress" aria-hidden>
      <motion.div className="scroll-section__progress-bar" style={{ width }} />
    </div>
  )
}
