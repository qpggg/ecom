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
  const opacity = useTransform(progress, [0, 0.92, 1], [1, 1, 0])

  return (
    <motion.div
      className="scroll-section__progress"
      aria-hidden
      style={{ opacity }}
    >
      <motion.div className="scroll-section__progress-bar" style={{ width }} />
    </motion.div>
  )
}
