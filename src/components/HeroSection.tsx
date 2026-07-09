import './HeroSection.css'

export function HeroSection() {
  return (
    <section className="hero frame-16-9" id="hero">
      <div className="hero__viewport">
        <div className="hero__design" aria-label="grizzard">
          <p className="hero__griz">griz</p>
          <p className="hero__zard">zard</p>

          <p className="hero__title">Цифровая опора товарного бизнеса</p>
          <p className="hero__sub">
            Собираем надежную систему прямых продаж в интернете: современный дизайн,
            продающий каталог, доставка заявок в CRM
          </p>

          <span className="hero__line hero__line--v" aria-hidden />
          <span className="hero__line hero__line--h" aria-hidden />
          <span className="hero__line hero__line--cta-v" aria-hidden />

          <a href="#form" className="hero__cta-link">
            разобрать магазин
          </a>
          <p className="hero__cta-note">
            Покажем путь от операционного хаоса к стабильной системе
          </p>
        </div>
      </div>
    </section>
  )
}
