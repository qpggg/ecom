import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './StoreMock.css'

export type HeroModule = 'catalog' | 'orders' | 'crm' | 'admin'

type HeroPhase = 0 | 1 | 2 | 3 | 4

type StoreMockProps = {
  variant?: 'hero' | 'phase-catalog' | 'phase-product' | 'phase-telegram' | 'phase-admin'
  compact?: boolean
  activeModule?: HeroModule | null
}

const PRODUCTS = [
  { name: 'Мёд липовый', price: '890 ₽', tone: 'a' },
  { name: 'Набор подарочный', price: '2 400 ₽', tone: 'b' },
  { name: 'Свеча восковая', price: '650 ₽', tone: 'c' },
  { name: 'Крем для рук', price: '720 ₽', tone: 'd' },
]

const PIPELINE = ['Каталог', 'Карточка', 'Заявка', 'Telegram', 'Админка'] as const

const PHASE_STATUS: Record<HeroPhase, string> = {
  0: 'Клиент выбирает товар в каталоге',
  1: 'Карточка · нажата «Оставить заявку»',
  2: 'Новая заявка · Мёд липовый · 890 ₽',
  3: 'Telegram · менеджер уведомлён',
  4: 'Админка · остаток обновлён · 11 шт',
}

const PHASE_MS = 1200

function phaseFromModule(module: HeroModule): HeroPhase {
  switch (module) {
    case 'catalog':
      return 0
    case 'orders':
      return 2
    case 'crm':
      return 3
    case 'admin':
      return 4
  }
}

export function StoreMock({ variant = 'hero', compact, activeModule = null }: StoreMockProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<HeroPhase>(0)

  const isHero = variant === 'hero'
  const showCatalog = isHero || variant === 'phase-catalog'
  const showProduct = isHero || variant === 'phase-product'
  const showCrm = isHero || variant === 'phase-telegram'
  const showAdmin = isHero || variant === 'phase-admin'

  useEffect(() => {
    if (reducedMotion && isHero && !activeModule) setPhase(4)
  }, [reducedMotion, isHero, activeModule])

  useEffect(() => {
    if (!isHero || reducedMotion || activeModule) return
    const interval = window.setInterval(() => {
      setPhase((prev) => ((prev + 1) % 5) as HeroPhase)
    }, PHASE_MS)
    return () => window.clearInterval(interval)
  }, [isHero, reducedMotion, activeModule])

  useEffect(() => {
    if (activeModule) setPhase(phaseFromModule(activeModule))
  }, [activeModule])

  if (isHero) {
    const activePhase = activeModule ? phaseFromModule(activeModule) : phase
    const showCard = activePhase >= 1
    const showOrder = activePhase >= 2
    const showTelegram = activePhase >= 3
    const showAdminStatus = activePhase >= 4
    const showPaid = activePhase >= 4
    const btnPressed = activePhase === 1

    return (
      <div
        className="store-mock-scene store-mock-scene--hero"
        data-phase={activePhase}
        aria-label="Сценарий заказа"
      >
        <div className="hero-machine">
          <div className="hero-machine__glow" aria-hidden />

          <div className="hero-machine__stage">
            <div className="hero-machine__window">
              <div className="store-mock store-mock--layer-back">
                <div className="store-mock__chrome">
                  <span />
                  <span />
                  <span />
                  <span className="store-mock__chrome-live">live</span>
                </div>

                <div className="store-mock__rail">
                  {PIPELINE.map((label, i) => (
                    <span
                      key={label}
                      className={`store-mock__rail-item${activePhase === i ? ' store-mock__rail-item--active' : ''}${activePhase > i ? ' store-mock__rail-item--done' : ''}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="store-mock__panel store-mock__panel--catalog-back">
                  <p className="store-mock__label">Каталог</p>
                  <div className="store-mock__grid store-mock__grid--portrait">
                    {PRODUCTS.map((p, i) => (
                      <div
                        key={p.name}
                        className={`store-mock__card store-mock__card--${p.tone}${i === 0 ? ' store-mock__card--active store-mock__card--pick' : ''}`}
                      >
                        <div className="store-mock__thumb" />
                        <span className="store-mock__name">{p.name}</span>
                        <span className="store-mock__price">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="hero-machine__status" key={activePhase}>{PHASE_STATUS[activePhase]}</p>
              </div>
            </div>

            <div className="hero-machine__side">
              <div className={`hero-machine__card${showCard ? ' hero-machine__card--on' : ''}`}>
                <p className="store-mock__label">Карточка</p>
                <div className="store-mock__product-img store-mock__card--a" />
                <strong>Мёд липовый 500г</strong>
                <span className="store-mock__detail">Липовый · стекло · 500г</span>
                <span className="store-mock__detail store-mock__detail--price">890 ₽</span>
                <button
                  type="button"
                  className={`store-mock__btn store-mock__btn--outline${btnPressed ? ' store-mock__btn--pressed' : ''}`}
                >
                  Оставить заявку
                </button>
              </div>

              <div className="hero-machine__widgets">
              <div className={`hero-widget hero-widget--order${showOrder ? ' hero-widget--on' : ''}`}>
                <div className="hero-widget__head">
                  <span className="hero-widget__tag">Заявка #104</span>
                  <span className="hero-widget__badge hero-widget__badge--new">Новая</span>
                  <span className="hero-widget__time">12:04</span>
                </div>
                <div className="hero-widget__order-row">
                  <span className="hero-widget__thumb store-mock__card--a" />
                  <div>
                    <strong>Мёд липовый</strong>
                    <span>890 ₽ · Анна</span>
                  </div>
                </div>
              </div>

              <div className={`hero-widget hero-widget--tg${showTelegram ? ' hero-widget--on' : ''}`}>
                <div className="hero-widget__tg-bar">
                  <span className="hero-widget__tg-dot" />
                  <span>Telegram · bot</span>
                </div>
                <div className="hero-widget__bubble">
                  <strong>Новая заявка</strong>
                  <span>Мёд липовый · 890 ₽</span>
                  <span className="hero-widget__bubble-meta">@anna_shop · ✓ отправлено</span>
                </div>
              </div>

              <div className={`hero-widget hero-widget--pay${showPaid ? ' hero-widget--on' : ''}`}>
                <div className="hero-widget__pay-mark">₽</div>
                <div className="hero-widget__pay-body">
                  <strong>890 ₽</strong>
                  <span>СБП · оплачено</span>
                </div>
                <div className="hero-widget__pay-stamp">OK</div>
              </div>

              <div className={`hero-widget hero-widget--stock${showAdminStatus ? ' hero-widget--on' : ''}`}>
                <div className="hero-widget__head">
                  <span className="hero-widget__tag">Склад</span>
                  <span className="hero-widget__time">авто</span>
                </div>
                <p className="hero-widget__stock-name">Мёд липовый</p>
                <div className="hero-widget__stock-delta">
                  <span className="hero-widget__stock-old">12</span>
                  <span className="hero-widget__stock-arrow" aria-hidden>→</span>
                  <span className="hero-widget__stock-new">11</span>
                  <span className="hero-widget__stock-unit">шт</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`store-mock-scene${compact ? ' store-mock-scene--compact' : ''}`}>
      <div className={`store-mock${compact ? ' store-mock--compact' : ''}`}>
        <div className="store-mock__chrome">
          <span />
          <span />
          <span />
        </div>

        <div className="store-mock__body">
          {showCatalog && (
            <div className="store-mock__panel store-mock__panel--catalog">
              <p className="store-mock__label">Каталог</p>
              <div className="store-mock__grid">
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.name}
                    className={`store-mock__card store-mock__card--${p.tone}${i === 0 ? ' store-mock__card--active' : ''}`}
                  >
                    <div className="store-mock__thumb" />
                    <span className="store-mock__name">{p.name}</span>
                    <span className="store-mock__price">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showProduct && (
            <div className="store-mock__panel store-mock__panel--product">
              <p className="store-mock__label">Карточка</p>
              <div className="store-mock__product">
                <div className="store-mock__product-img store-mock__card--a" />
                <div>
                  <strong>Мёд липовый 500г</strong>
                  <span>890 ₽</span>
                  <button type="button" className="store-mock__btn">
                    Оставить заявку
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAdmin && (
            <div className="store-mock__panel store-mock__panel--admin">
              <p className="store-mock__label">Админка</p>
              <div className="store-mock__rows">
                <div className="store-mock__row">
                  <span className="store-mock__badge store-mock__badge--new">Новая</span>
                  <span>Мёд липовый</span>
                  <span>12:04</span>
                </div>
                <div className="store-mock__row">
                  <span className="store-mock__badge store-mock__badge--work">В работе</span>
                  <span>Набор подарочный</span>
                  <span>11:42</span>
                </div>
                <div className="store-mock__row">
                  <span className="store-mock__badge store-mock__badge--paid">Оплачена</span>
                  <span>Свеча восковая</span>
                  <span>10:15</span>
                </div>
              </div>
            </div>
          )}

          {showCrm && (
            <motion.div
              className="store-mock__toast"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="store-mock__toast-icon">CRM</span>
              <div>
                <strong>Новая заявка</strong>
                <span>Мёд липовый · 890 ₽</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ChaosLayer() {
  return (
    <div className="chaos-layer" aria-hidden>
      <div className="chaos-layer__bubble chaos-layer__bubble--1">сколько стоит?</div>
      <div className="chaos-layer__bubble chaos-layer__bubble--2">перезвоните</div>
      <div className="chaos-layer__bubble chaos-layer__bubble--3">а фото есть?</div>
      <div className="chaos-layer__sheet">прайс.xlsx</div>
      <div className="chaos-layer__photo" />
      <div className="chaos-layer__badge">не ответили</div>
    </div>
  )
}
