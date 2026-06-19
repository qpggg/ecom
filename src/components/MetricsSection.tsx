import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SectionLabel } from './SectionLabel'
import './MetricsSection.css'

const STATS = [
  {
    value: '200+',
    label: 'товаров в одном каталоге',
    case: 'усафонова.рф',
    href: 'https://усафонова.рф',
  },
  {
    value: 'сек',
    label: 'заявка уходит в Telegram',
    case: 'рабочий сценарий заказа',
  },
  {
    value: '1',
    label: 'Telegram вместо пяти чатов',
    case: 'система заявок',
  },
  {
    value: 'auto',
    label: 'фиксация оплаченного заказа',
    case: 'Baekkey · платёжный контур',
    href: 'https://baekkey.kz',
  },
]

export function MetricsSection() {
  return (
    <SceneShell id="metrics" className="metrics">
      <div className="scene__content--wide metrics__inner">
        <SectionLabel index="04">Решение</SectionLabel>

        <motion.div
          className="metrics__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="metrics__title">
            Когда хаос собран — <em>цифры по делу</em>
          </h2>
          <p className="metrics__sub">
            Не «+500% продаж». Рабочая инфраструктура: каталог, заявки, статусы — уже
            у клиентов.
          </p>
        </motion.div>

        <div className="metrics__grid">
          {STATS.map((stat, i) => (
            <motion.article
              key={stat.label}
              className="metrics__card panel-3d"
              initial={{ opacity: 0, y: 36, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="metrics__value">{stat.value}</p>
              <p className="metrics__label">{stat.label}</p>
              {stat.href ? (
                <a href={stat.href} target="_blank" rel="noreferrer" className="metrics__case">
                  {stat.case} ↗
                </a>
              ) : (
                <p className="metrics__case">{stat.case}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
