import { useState, type FormEvent } from 'react'
import { SceneShell } from './SceneShell'
import { SectionLabel } from './SectionLabel'
import { PLANS, type PlanId } from './PricingSection'
import './LeadFormSection.css'

type LeadFormSectionProps = {
  selectedPlan: PlanId
}

export function LeadFormSection({ selectedPlan }: LeadFormSectionProps) {
  const [sent, setSent] = useState(false)
  const plan = PLANS.find((p) => p.id === selectedPlan)!

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <SceneShell id="form" className="lead">
      <div className="scene__content--wide lead__grid">
        <div className="lead__copy">
          <SectionLabel index="06">Заявка</SectionLabel>
          <h2 className="lead__title">Разберём ваш магазин за один созвон</h2>
          <p className="lead__sub">
            Покажем каталог, админку и сценарий заявок под вашу товарку — без
            обязательств.
          </p>
          <ul className="lead__list">
            <li>Структура каталога под ваш ассортимент</li>
            <li>Сценарий заявки и Telegram</li>
            <li>Оценка сроков и бюджета</li>
          </ul>
        </div>

        <div className="lead__form-wrap panel-3d">
          {sent ? (
            <div className="lead__success">
              <p className="lead__success-title">Заявка отправлена</p>
              <p className="lead__success-text">
                Напишем в Telegram в течение рабочего дня.
              </p>
            </div>
          ) : (
            <form className="lead__form" onSubmit={handleSubmit}>
              <label>
                Имя
                <input name="name" type="text" required placeholder="Анна" />
              </label>
              <label>
                Телефон / Telegram
                <input name="contact" type="text" required placeholder="@username" />
              </label>
              <label>
                Ниша
                <input name="niche" type="text" placeholder="Косметика, подарки…" />
              </label>
              <label>
                Сколько товаров
                <select name="products" defaultValue="50-200">
                  <option value="under50">до 50</option>
                  <option value="50-200">50–200</option>
                  <option value="200plus">200+</option>
                </select>
              </label>
              <label>
                Пакет
                <select name="plan" key={selectedPlan} defaultValue={selectedPlan}>
                  {PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {p.subtitle}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="lead__submit">
                Получить оценку проекта
              </button>
            </form>
          )}
          <p className="lead__plan-note">
            Выбрано: <strong>{plan.name}</strong> · {plan.subtitle}
          </p>
        </div>
      </div>
    </SceneShell>
  )
}
