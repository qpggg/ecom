import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/figma-layout.css'
import App from './App.tsx'

// Figma frame is 1440px wide; scale factor for the absolute-positioned canvases
function syncFigmaScale() {
  const scale = document.documentElement.clientWidth / 1440
  document.documentElement.style.setProperty('--fig-scale', String(scale))
}
syncFigmaScale()
window.addEventListener('resize', syncFigmaScale)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
