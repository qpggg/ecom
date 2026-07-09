import './Header.css'

const NAV = [
  { label: 'как работает', href: '#scroll', mod: 'header__link--scroll' },
  { label: 'хаос', href: '#pain', mod: 'header__link--pain' },
  { label: 'тарифы', href: '#pricing', mod: 'header__link--pricing' },
  { label: 'заявка', href: '#form', mod: 'header__link--form' },
] as const

export function Header() {
  return (
    <header className="header">
      <div className="header__viewport">
        <div className="header__design">
          <span className="header__year">//2026</span>

          <nav className="header__nav" aria-label="Основная навигация">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`header__link ${item.mod}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <span className="header__arrow-line" aria-hidden />
          <a href="#form" className="header__arrow-hit" aria-label="Заявка" />
        </div>
      </div>
    </header>
  )
}
