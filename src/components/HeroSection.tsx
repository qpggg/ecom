import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLiveBg } from '../hooks/useLiveBg'
import { StoreMock, type HeroModule } from './StoreMock'
import './HeroSection.css'

const CHIPS: { id: HeroModule; label: string }[] = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'orders', label: 'Заявки 24/7' },
  { id: 'crm', label: 'CRM' },
  { id: 'admin', label: 'Админка' },
]

const PROOF = [
  { value: '24/7', label: 'приём заявок' },
  { value: '200+', label: 'товаров в каталоге' },
  { value: '1', label: 'панель управления' },
]

export function HeroSection() {
  const [activeModule, setActiveModule] = useState<HeroModule | null>(null)
  const { ref, bgHandlers } = useLiveBg<HTMLElement>()

  return (
    <section ref={ref} className="hero frame-16-9" id="hero" {...bgHandlers}>
      <div className="hero__bg" aria-hidden>
        <div className="hero__terrain" />
        <div className="hero__vignette" />
        <div className="hero__grid-lines" />
      </div>

      <div className="hero__layout">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__label">Commerce studio</p>
          <h1 className="hero__title">
            Интернет-магазины
            <br />
            как <em>система продаж</em>
          </h1>
          <p className="hero__sub">
            Каталог, заявки, CRM и админка — в одном рабочем контуре. Быстрее и
            доступнее классической студии.
          </p>

          <div className="hero__chips">
            {CHIPS.map((chip, i) => (
              <button
                key={chip.id}
                type="button"
                className={`hero__chip${activeModule === chip.id ? ' hero__chip--active' : ''}`}
                onMouseEnter={() => setActiveModule(chip.id)}
                onMouseLeave={() => setActiveModule(null)}
                onFocus={() => setActiveModule(chip.id)}
                onBlur={() => setActiveModule(null)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.5 }}
                >
                  {chip.label}
                </motion.span>
              </button>
            ))}
          </div>

          <div className="hero__proof">
            {PROOF.map((item) => (
              <div key={item.label} className="hero__proof-item">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__actions">
            <a href="#form" className="hero__cta hero__cta--primary">
              Разобрать магазин
            </a>
            <a href="#scroll" className="hero__cta hero__cta--ghost">
              Как работает ↓
            </a>
          </div>
        </motion.div>

        <div className="hero__mock-wrap">
          <StoreMock variant="hero" activeModule={activeModule} />
        </div>
      </div>

      <div className="hero__spotlight" aria-hidden />
      <div className="hero__grain" aria-hidden />
    </section>
  )
}
