import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://127.0.0.1:5174/#scroll', { waitUntil: 'networkidle' })

const track = await page.locator('.scroll-section__track')
const box = await track.boundingBox()
if (box) {
  await page.evaluate((y) => window.scrollTo(0, y), box.y + box.height * 0.92)
}
await page.waitForTimeout(800)
await page.screenshot({ path: '/tmp/entropy-end.png' })
await browser.close()
