import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SectionLabel } from './SectionLabel'
import './PainSection.css'

const PAINS = [
  'Заявки живут в Telegram и WhatsApp',
  'Цены и фото скидывает менеджер вручную',
  'Нет нормального каталога — клиент не выбирает сам',
  'Заказы теряются, статусов нет',
  'Рекламу некуда вести — некуда приземлить трафик',
]

export function PainSection() {
  return (
    <SceneShell id="pain" className="pain">
      <div className="scene__content--wide pain__inner">
        <SectionLabel index="03">Боль</SectionLabel>

        <div className="pain__layout">
          <motion.div
            className="pain__copy"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="pain__title">
              Устали вести бизнес <em>в хаосе?</em>
            </h2>
            <p className="pain__lead">
              Товарный бизнес уже продаёт — но инфраструктура тормозит. Не «нет сайта»,
              а нет системы: каталог, заявка, статус, отчёт.
            </p>
            <p className="pain__note">
              Если узнали себя — вы только что прошли этот хаос в анимации выше.
            </p>
          </motion.div>

          <div className="pain__cards">
            {PAINS.map((text, i) => (
              <motion.div
                key={text}
                className="pain__card panel-3d"
                initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: i % 2 === 0 ? -8 : 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformPerspective: 900 }}
              >
                <span className="pain__card-index">{String(i + 1).padStart(2, '0')}</span>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  )
}
