import { SceneShell } from './SceneShell'
import './Footer.css'

export function Footer() {
  return (
    <SceneShell className="footer-scene" frame={false}>
      <div className="scene__content--wide footer__inner">
        <p className="footer__brand">grizzard</p>
        <div className="footer__links">
          <a href="https://усафонова.рф" target="_blank" rel="noreferrer">
            усафонова.рф
          </a>
          <a href="https://baekkey.kz" target="_blank" rel="noreferrer">
            Baekkey
          </a>
          <a href="#form">Связаться</a>
        </div>
        <p className="footer__copy">© 2026 · Интернет-магазины под ключ</p>
      </div>
    </SceneShell>
  )
}
