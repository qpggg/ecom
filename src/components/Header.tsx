import './Header.css'

const NAV = [
  { label: 'Как работает', href: '#scroll' },
  { label: 'Боль', href: '#pain' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Заявка', href: '#form' },
]

export function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="#" className="header__logo">
          commerce<span className="header__logo-dot">.</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#form" className="header__cta">
          Разобрать магазин
        </a>
      </div>
    </header>
  )
}
