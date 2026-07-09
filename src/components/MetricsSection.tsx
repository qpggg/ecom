import './MetricsSection.css'

const STATS = [
  {
    num: '01',
    head: 'До 45% выручки',
    body:
      'Съедают комиссии, штрафы и логистика посредников. Это не расходы, это налог на отсутствие своей системы.',
  },
  {
    num: '02',
    head: '30% заявок в корзину',
    body:
      'Теряются из-за человеческого фактора и отсутствия сквозной аналитики. Вы платите за рекламу, чтобы просто «выбросить» треть бюджета.',
  },
  {
    num: '03',
    head: 'В 5 раз ниже стоимость продажи',
    body:
      'Повторные продажи своей базе — самый дешевый способ роста. Без своей системы вы лишены этого рычага масштабирования.',
  },
]

export function MetricsSection() {
  return (
    <section id="metrics" className="metrics">
      <div className="metrics__design">
        <span className="metrics__ellipse" aria-hidden />
        <span className="metrics__line27" aria-hidden />

        <div className="metrics__labels">
          <span className="metrics__label metrics__label--index">//03</span>
          <span className="metrics__label metrics__label--title">цифры</span>
        </div>

        <h2 className="metrics__statement">
          Цифры отражают действительные трудности без собственной инфраструктуры
        </h2>

        <span className="metrics__arrow6" aria-hidden />

        <div className="metrics__list">
          {STATS.map((item, index) => (
            <div key={item.num} className="metrics__entry">
              <span className="metrics__num">{item.num}</span>
              <p className="metrics__row">
                <span className="metrics__row-head">{item.head}</span>
                <span className="metrics__row-body">{item.body}</span>
              </p>
              {index < STATS.length - 1 && (
                <span className="metrics__line" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
