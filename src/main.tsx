import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/figma-layout.css'
import './styles/mobile.css'
import App from './App.tsx'

const MOBILE_BREAKPOINT = 768

// Figma frame is 1440px wide; scale only on tablet/desktop canvases
function syncFigmaScale() {
  const width = document.documentElement.clientWidth
  const isMobile = width < MOBILE_BREAKPOINT

  document.documentElement.style.setProperty('--fig-mobile', isMobile ? '1' : '0')

  if (isMobile) {
    document.documentElement.style.setProperty('--fig-scale', '1')
    document.documentElement.style.setProperty('--header-height', '64px')
    return
  }

  const scale = width / 1440
  document.documentElement.style.setProperty('--fig-scale', String(scale))
  document.documentElement.style.setProperty('--header-height', `${scale * 90}px`)
}
syncFigmaScale()
window.addEventListener('resize', syncFigmaScale)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
