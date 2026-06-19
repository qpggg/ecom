import { useState } from 'react'
import { SceneShell } from './SceneShell'
import { SectionLabel } from './SectionLabel'
import './PricingSection.css'

export type PlanId = 'start' | 'base' | 'pro'

type Plan = {
  id: PlanId
  name: string
  subtitle: string
  price: string
  features: string[]
  recommended?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'start',
    name: 'Start',
    subtitle: 'Каталог',
    price: 'от 95 000 – 120 000 ₽',
    features: ['Витрина и каталог', 'Форма заявки', 'Telegram-уведомления', 'Базовая админка'],
  },
  {
    id: 'base',
    name: 'Base',
    subtitle: 'Интернет-магазин',
    price: 'от 170 000 – 220 000 ₽',
    features: [
      'Персональный дизайн',
      'Кастомная админка',
      'Telegram / CRM',
      'Аналитика и запуск',
    ],
    recommended: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Автоматизация',
    price: 'от 300 000 – 450 000 ₽',
    features: ['Оплата и доставка', 'Остатки', 'Интеграции', 'Отчёты и n8n'],
  },
]

type PricingSectionProps = {
  onSelectPlan: (id: PlanId) => void
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [cartPlan, setCartPlan] = useState<PlanId>('base')
  const plan = PLANS.find((p) => p.id === cartPlan)!

  const addToCart = (id: PlanId) => {
    setCartPlan(id)
    onSelectPlan(id)
  }

  return (
    <SceneShell id="pricing" className="pricing">
      <div className="scene__content--wide pricing__inner grid-12">
        <div className="pricing__intro">
          <SectionLabel index="05">Тарифы</SectionLabel>
          <h2 className="pricing__title">Выберите пакет как товар</h2>
          <p className="pricing__sub">
            Корзина — сборка заявки, не оплата. Точная смета после брифа.
          </p>
        </div>

        <div className="pricing__layout">
          <div className="pricing__catalog">
            {PLANS.map((p) => (
              <article
                key={p.id}
                className={`pricing__product panel-3d${p.recommended ? ' pricing__product--featured' : ''}${cartPlan === p.id ? ' pricing__product--in-cart' : ''}`}
              >
                {p.recommended && <span className="pricing__badge">Основной продукт</span>}
                <p className="pricing__product-name">{p.name}</p>
                <p className="pricing__product-sub">{p.subtitle}</p>
                <p className="pricing__product-price">{p.price}</p>
                <ul className="pricing__features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button type="button" className="pricing__add" onClick={() => addToCart(p.id)}>
                  {cartPlan === p.id ? 'В корзине' : 'Добавить в заявку'}
                </button>
              </article>
            ))}
          </div>

          <aside className="pricing__cart panel-3d">
            <p className="pricing__cart-label">Корзина · заявка</p>
            <div className="pricing__cart-item">
              <div>
                <strong>{plan.name}</strong>
                <span>{plan.subtitle}</span>
              </div>
              <p className="pricing__cart-price">{plan.price}</p>
            </div>
            <a href="#form" className="pricing__checkout">
              Оформить заявку на проект
            </a>
            <p className="pricing__footnote">
              Сайт — инфраструктура продаж. Трафик и реклама настраиваются отдельно.
            </p>
          </aside>
        </div>
      </div>
    </SceneShell>
  )
}

export { PLANS }
