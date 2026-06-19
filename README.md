# Commerce Studio — landing

Лендинг студии интернет-магазинов под ключ.

## Запуск локально

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Production-сборка

```bash
npm run build
npm run preview:host
```

Статика появится в `dist/`. Проверка локально: http://localhost:4173

## Деплой на сервер

Проект — **статический SPA** (React + Vite). На сервере нужен только nginx или Docker.

### Вариант A — Docker (проще всего)

На сервере с Docker:

```bash
git clone <repo-url> ecom
cd ecom
docker compose up -d --build
```

Сайт на порту `8080` (или задайте `PORT` в `.env`).

Если сайт в подпапке домена:

```bash
VITE_BASE_PATH=/landing/ docker compose up -d --build
```

### Вариант B — nginx + rsync (VPS)

**1. На сервере один раз:**

```bash
sudo mkdir -p /var/www/ecom
sudo chown -R $USER:$USER /var/www/ecom
```

Скопируйте `deploy/nginx-site.conf` → `/etc/nginx/sites-available/ecom`, замените `YOUR_DOMAIN` и путь.

```bash
sudo ln -s /etc/nginx/sites-available/ecom /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d YOUR_DOMAIN
```

**2. С локальной машины:**

```bash
export DEPLOY_HOST=user@your-server-ip
export DEPLOY_PATH=/var/www/ecom
npm run deploy:rsync
```

### Вариант C — Vercel / Netlify (без своего домена)

**Свой домен покупать не нужно.** После деплоя будет бесплатный URL:

- Vercel: `https://ecom-xxxx.vercel.app`
- Netlify: `https://random-name.netlify.app`

#### Vercel — быстрый старт

1. Залейте репозиторий на GitHub / GitLab
2. [vercel.com](https://vercel.com) → Import project
3. Framework: Vite, build: `npm run build`, output: `dist` (уже в `vercel.json`)
4. Deploy → скопируйте ссылку `*.vercel.app`

Или через CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Россия и Vercel

- **Зарегистрироваться и задеплоить** с РФ обычно можно
- **Открыть сайт** у части пользователей в РФ может не получиться: IP Vercel иногда блокируют провайдеры (не официальный бан Vercel, а блокировки на стороне сети)
- **`*.vercel.app`** часто доступнее, чем свой домен на A-записи Vercel — но гарантий нет

**Если дизайнеру из РФ ссылка не открывается:**

1. Попробовать Netlify или Cloudflare Pages (тоже бесплатный тестовый URL)
2. Или ваш VPS / Docker из раздела выше
3. Временно VPN — только для просмотра, не для production

Для передачи дизайнеру **достаточно любой рабочей публичной ссылки** — домен не обязателен.

### Вариант D — Cloudflare Pages / Netlify

- **Build:** `npm run build`
- **Output:** `dist`
- **Node:** 22+

Конфиг Netlify уже в `netlify.toml`.

---

## Передача дизайнеру (чеклист)

Отправьте одним сообщением:

| Что | Зачем |
|-----|--------|
| **Ссылка на preview** | `https://….vercel.app` — смотреть живой UI |
| **Этот README** | структура секций и компонентов |
| **Запись экрана 30–60 сек** | scroll-анимация, hover, grain (в Figma так не передать) |
| **Бриф** | «Не flatten секции; компоненты + variables; raster только для иллюстраций» |

**Секции на сайте (по порядку):** Header → Hero → Scrollytelling → Pain → Metrics → Pricing → Form → Footer.

**Tokens для Figma:** см. `:root` в `src/index.css` (цвета, Tektur 400, 16:9 frame).

**Не нужно покупать домен** — тестового URL хватит, пока нет названия. Свой домен подключите позже в настройках Vercel одной кнопкой.

---

Скопируйте `.env.example` → `.env` при необходимости:

| Variable | Default | Описание |
|----------|---------|----------|
| `VITE_BASE_PATH` | `/` | Базовый URL, если не корень домена |
| `PORT` | `8080` | Порт Docker на хосте |
| `DEPLOY_HOST` | — | `user@ip` для rsync |
| `DEPLOY_PATH` | — | Путь на сервере |

## Стек

- React + TypeScript + Vite
- Framer Motion (hero, scrollytelling)

## Структура

1. **Hero** — обложка (dark + grain + mock магазина)
2. **Scrollytelling** — pinned scroll, 5 фаз
3. **Pain** — блок боли
4. **Metrics** — цифры + кейсы
5. **Pricing** — каталог + корзина-заявка
6. **Form** — заявка с prefill пакета
7. **Footer**

## Компоненты

```
src/components/
  Header.tsx
  HeroSection.tsx
  ScrollytellingSection.tsx
  StoreMock.tsx
  PainSection.tsx
  MetricsSection.tsx
  PricingSection.tsx
  LeadFormSection.tsx
  Footer.tsx
  SectionLabel.tsx
  SceneShell.tsx
```

## Дальше

- Подключить отправку формы в Telegram
- GSAP ScrollTrigger для pro-версии pin
- Figma tokens → CSS variables
