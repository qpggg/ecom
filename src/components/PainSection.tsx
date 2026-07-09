import './PainSection.css'

const PAINS = [
  {
    num: '01',
    muted: false,
    head: 'Зависимость от правил.',
    body:
      'Маркетплейсы диктуют комиссии, меняют выдачу и штрафуют без объяснения причин. Вы строите бизнес на чужой территории, которой не владеете.',
  },
  {
    num: '02',
    muted: false,
    head: 'Операционный хаос.',
    body:
      'Ручная обработка заявок в мессенджерах и разрыв между складом и витриной. До 30% «горячих» клиентов уходят к конкурентам, пока менеджеры ищут остатки.',
  },
  {
    num: '03',
    muted: true,
    head: 'Нулевой LTV.',
    body:
      'Вы платите за привлечение одного и того же клиента при каждой новой сделке. Без собственного D2C-канала накопленная лояльная база остается недоступным активом.',
  },
]

export function PainSection() {
  return (
    <section id="pain" className="pain">
      <div className="pain__design">
        <span className="pain__ellipse" aria-hidden />

        <span className="pain__label pain__label--index">//02</span>
        <span className="pain__label pain__label--title">хаос</span>

        <h2 className="pain__statement">
          Товарный бизнес теряет контроль над клиентом и системой.
        </h2>

        <span className="pain__line24" aria-hidden />
        <span className="pain__arrow5" aria-hidden />

        <div className="pain__list">
          {PAINS.map((item, index) => (
            <div
              key={item.num}
              className={`pain__entry${item.muted ? ' pain__entry--muted' : ''}`}
            >
              <span
                className={`pain__num${item.muted ? ' pain__num--muted' : ''}`}
              >
                {item.num}
              </span>
              <p className={`pain__item${item.muted ? ' pain__item--muted' : ''}`}>
                <span className="pain__item-head">{item.head}</span>
                <span className="pain__item-body">{item.body}</span>
              </p>
              {index < PAINS.length - 1 && (
                <span className="pain__divider" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <span className="pain__line27" aria-hidden />
      </div>
    </section>
  )
}
