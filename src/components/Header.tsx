import { useEffect, useState } from 'react'
import './Header.css'

const NAV = [
  { label: 'как работает', href: '#scroll', mod: 'header__link--scroll' },
  { label: 'хаос', href: '#pain', mod: 'header__link--pain' },
  { label: 'тарифы', href: '#pricing', mod: 'header__link--pricing' },
  { label: 'заявка', href: '#form', mod: 'header__link--form' },
] as const

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="header">
      <div className="header__viewport">
        <div className="header__design">
          <span className="header__year">//2026</span>

          <button
            type="button"
            className={`header__menu-btn${menuOpen ? ' header__menu-btn--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="header-nav"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="header-nav"
            className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
            aria-label="Основная навигация"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`header__link ${item.mod}`}
                onClick={() => setMenuOpen(false)}
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
