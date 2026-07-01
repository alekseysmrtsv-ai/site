# MEMORY.md — Samartsev AI Agency Site
> Живой документ. Обновляется по итогам каждого этапа.
> Последнее обновление: 2026-05-22 | Роль: Senior Tech Lead

---

## ✅ УТВЕРЖДЁННЫЕ РЕШЕНИЯ (LOCKED)

| # | Вопрос | Решение |
|---|---|---|
| 1 | Мобильное меню | `Sheet` из `shadcn/ui` (Drawer снизу/сбоку) |
| 2 | Cookie banner | Кастомный на Tailwind, floating bar снизу |
| 3 | Chat timeout (30s) | Увеличен до 30с + AbortController. Юмористическое fallback-сообщение + форма ниже |
| 4 | Tech Stack палитра | Унифицируем под neo-mint токены (убираем MD3 мусор) |
| 5 | Язык | Только RU |

---

## 🏗️ СТЕК (УТВЕРЖДЁННЫЙ)

| Слой | Технология |
|---|---|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS v3 (кастомный конфиг) |
| CMS | TinaCMS (Git-based, self-hosted) |
| Backend Forms/Chat | n8n (webhooks) |
| Fonts | Space Grotesk (display) + Manrope (body) — Google Fonts |
| Icons | Material Symbols Outlined |
| Deploy | Vercel (рекомендуется) |

---

## 🎨 ДИЗАЙН-СИСТЕМА (из ассетов)

### Цвета
```
--primary:          #00E68A / #00E599  (neo-mint, акцент)
--heavy / text-heavy: #111111          (основной тёмный)
--surface:          #FFFFFF
--background-light: #F9FAFB
--text-main:        #1A1D20
--text-muted:       #828D99
--border-subtle:    #E5E7EB
--background-dark:  #0F231B            (для тёмной темы)
```

### Типографика
- Display: `Space Grotesk` (600, 700) — заголовки
- Body: `Manrope` (400, 500, 600) — текст
- Tracking heading: `-0.04em`

### Паттерн фона
```css
background-image: radial-gradient(#F2F4F7 1.5px, transparent 1.5px);
background-size: 24px 24px;
```

---

## 📄 АРХИТЕКТУРА СТРАНИЦ

### Одностраничник (SPA-scroll, `/`)
```
Header (sticky, blur)
  └─ Logo | Nav (Услуги, Процесс, FAQ) | CTA "Связаться"
  └─ [MOBILE] Burger Menu → Sheet/Drawer

Section: Hero
  └─ Headline / Sub / CTA Primary / Trust Bar logos
  └─ Chat Demo (правая колонка) — ПОДКЛЮЧЁН к n8n

Section: Pain & Calculator
  └─ Segmented tabs (3 боли)
  └─ Слайдеры × 3 → Live-расчёт потерь
  └─ CTA "Остановить потери" → форма/контакт
  └─ [MOBILE] Sticky floating bar с результатом

Section: Solutions
  └─ 2×2 карточки отраслей (TinaCMS-редактируемые)
  └─ Process 3-шага

Section: Tech Stack
  └─ Bento-Grid карточки (RAG, Конвейер, Безопасность, Стек)

Section: Founder + FAQ
  └─ Фото основателя (grayscale hover)
  └─ Accordion FAQ (TinaCMS-редактируемый)

Section: CTA Banner (full-width, primary bg)

Footer
  └─ Копирайт | Telegram | Email | Политика | Условия
```

---

## ⚠️ АУДИТ — ЧТО БЫЛО УПУЩЕНО

### [UX/UI & Mobile]
- [ ] **Burger-меню отсутствует** — хедер в `hero.html` скрывает nav на мобайле (`hidden md:flex`), но нет кнопки бургера и никакого мобильного меню (Sheet/Drawer)
- [ ] **Нет мобильного состояния Chat Demo** — на 320–375px виджет чата будет сломан; floating pills (`hidden sm:flex`) исчезают, но сам блок не адаптирован
- [ ] **Hover/Focus states на кнопках частичные** — нет `focus-visible` outline для клавиатурной навигации
- [ ] **Active states nav-ссылок** — нет индикации текущей секции при скролле (IntersectionObserver)
- [x] **Калькулятор** — настроена интерактивная логика расчета потерь. При нажатии на кнопку "Остановить потери" происходит скролл к виджету чата и передача рассчитанных данных в чат в виде сообщения.
- [x] **Chat Widget Cleanup** — удален лишний элемент "Интеграция за 5 дней" из виджета чата по просьбе пользователя.
- [x] **Иконки стека в index.json** — прописаны актуальные SVG-логотипы (n8n, PostgreSQL, DeepSeek, Docker, GCP) взамен пустых строк.

### [Надёжность & Edge Cases]
- [x] **N8n timeout** — настроен таймаут чата на 30 секунд (подходящий для LLM цепочек RAG) с отменой запроса через AbortController на фронтенде.
- [x] **Chat demo fallback** — если n8n недоступен или выдал ошибку, виджет отображает корректное fallback-сообщение об ошибке.
- [x] **FOUT для иконок** — добавлены фиксированные стили `.material-symbols-outlined` для предотвращения скачков текста при загрузке шрифта иконок.
- [ ] **Форма без валидации** — нет клиентской валидации полей, состояния успеха/ошибки.
- [ ] **Calculator: деление на ноль** — если все слайдеры на минимуме, может дать 0₽ — нужен guard.

### [Инфраструктура & SEO]
- [x] **Запуск сборки локально** — оптимизирован скрипт `build` в `package.json`: теперь `tinacms build` запускается локально только при наличии API-ключей, что предотвращает ошибки сборки на локальных машинах без Tina Cloud токенов.
- [ ] **Meta tags отсутствуют** — нет `description`, `keywords`, canonical URL.
- [ ] **OpenGraph/Twitter Cards** — нет `og:title`, `og:image`, `og:description`.
- [ ] **Favicon** — не создан, нет `/public/favicon.ico` и иконок для PWA.
- [ ] **Страница 404** — не запланирована (`not-found.tsx` в App Router).
- [ ] **sitemap.xml + robots.txt** — не запланированы.
- [ ] **Cookie consent** — сайт скорее всего использует GA/GTM, нужен баннер (требование 152-ФЗ РФ + GDPR если трафик из ЕС).
- [ ] **Structured Data (JSON-LD)** — `LocalBusiness` / `Person` schema для SEO.
- [ ] **Год в копирайте** — footer говорит «© 2024», должен быть 2026.
- [x] **Несогласованность токенов** — проведена унификация дизайн-системы в Next.js. Избыточные HTML-файлы с конфликтующими стилями перемещены в директорию `dev-resources`.
- [x] **Очистка репозитория** — удалены лишние и неиспользуемые файлы (`New site/`, `agents/`, `download_screens.js`, `extract.py`) во избежание захламления репозитория. Они перенесены в архивную папку `dev-resources`. Также очищены дубликаты `node_modules` и папка `ai landing/` в корне.

### [TinaCMS — блоки для CMS-редактирования]
- [ ] **Не определена схема коллекций** — не проработано, что именно уходит в CMS

---

## 📋 БЛОКИ ДЛЯ TinaCMS (ПЛАН КОЛЛЕКЦИЙ)

```
Collection: site_settings
  ├─ site_name, tagline
  ├─ og_image, favicon_url
  ├─ telegram_url, email
  └─ footer_copyright_year

Collection: hero
  ├─ label (eyebrow text)
  ├─ headline, subheadline
  ├─ cta_primary_text, cta_primary_url
  ├─ stats[] (text items в trust bar)
  └─ trust_logos[] (name)

Collection: solutions
  └─ cards[]: { icon, title, description, link_url }

Collection: process
  └─ steps[]: { number, title, description }

Collection: faq
  └─ items[]: { question, answer }

Collection: tech_stack
  └─ cards[]: { label, title, description }

Collection: founder
  ├─ name, photo_url, bio
  └─ signature_text
```

---

## 🗓️ ПЛАН ЭТАПОВ

### ЭТАП 0 ✅ Аудит завершён
### ЭТАП 1 ✅ Решения утверждены (2026-04-01)
### ЭТАП 2 ✅ Инициализация проекта завершена
- Инициализирован проект Next.js с App Router + Tailwind CSS.
- Настроена единая дизайн-система в `tailwind.config.ts`.
- Создана структура папок (`/components`, `/app`, `/tina`, `/lib`).

### ЭТАП 3 ✅ Компоненты и интеграция UI (2026-05-22)
- Настроен `globals.css` (унифицированная дизайн-система, устранен FOUT для Material Symbols).
- Реализованы все основные секции (`Header`, `HeroSection`, `Calculator`, `SolutionsSection`, `ProcessSection`, `TechStackSection`, `FounderSection`, `FAQSection`, `CTABanner`, `Footer`).
- Интегрирована интерактивная логика калькулятора, передающая расчеты упущенной выручки прямо в чат-виджет в виде пользовательского сообщения при клике на "Остановить потери".
- Проведена очистка репозитория: все старые разрозненные файлы и дублирующие папки перемещены в архивную папку `dev-resources`.
- Внедрены корректные SVG-иконки для используемых технологий в `index.json`.

### ЭТАП 4: N8n интеграция
- [x] Chat webhook с интеграцией GigaChat (PII 152-ФЗ), Postgres (RAG база знаний) и Gemini Flash.
- [x] Добавлено кэширование и предотвращение мульти-вызовов LLM через SQL-агрегацию (`json_agg`).
- [x] Настроен таймаут 30s и отмена запросов (`AbortController`) во фронтенде для предотвращения дублирования ответов.
- [ ] Contact form webhook с валидацией.

### ЭТАП 5: Production-чеклист
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals ✅
- [ ] Cookie consent banner
- [x] Vercel deploy + domain DNS (интегрирован автоматический деплой при пуше в ветку `main`)

---

## 💬 FALLBACK-СООБЩЕНИЕ ЧАТА (ТОЧНЫЙ ТЕКСТ)

> *«Обычно наши ИИ-агенты стабильны на 99.9%. Поздравляю, вы сорвали джекпот и попали в те самые 0.1% 😅 Сервер немного задумался. Но вы всё ещё можете заполнить форму ниже, и мы свяжемся с вами для аудита!»*

Триггер: `setTimeout(10_000)` после отправки сообщения пользователем.
После показа: кнопка-якорь `#contact` прокручивает к форме.
