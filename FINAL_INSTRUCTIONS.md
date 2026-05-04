# Samartsev AI — Документация проекта

Сайт полностью готов к работе. Все секции собраны, логика чата и калькулятора реализована на 100%.

## 📁 Путь к проекту
`c:\Antigravity project\ai-landing-app\`

## 🚀 Как запустить (Development)
1. Открой терминал в папке проекта.
2. Выполни:
   ```bash
   npm install
   npm run dev
   ```
3. Открой в браузере: `http://localhost:3000`

## ✨ Реализованные фичи
- **Neo-Mint Design:** Единая современная палитра (#00E68A).
- **Smart Chat:** 
  - 10-секундный таймаут.
  - Если n8n не отвечает > 10с, показывается юмористический fallback.
  - Demo-режим: если вебхук не настроен, бот имитирует ответ.
- **Interactive Calculator:** Живой расчет потерь выручки с ползунками и Mobile Sticky Bar.
- **Bento Tech Stack:** Технологическая секция в стиле Apple/Stripe.
- **Mobile First:** Полностью адаптивное меню (Sheet drawer).
- **SEO & Performance:** Мета-теги, JSON-LD, Sitemap, Robots.txt, Privacy Policy.

## 🔗 Интеграция с n8n
Для боевого режима создай файл `.env.local` на основе `.env.example` и укажи свои вебхуки:
```env
NEXT_PUBLIC_N8N_CHAT_WEBHOOK=...
NEXT_PUBLIC_N8N_FORM_WEBHOOK=...
```

## ⚠️ TinaCMS (Контент)
Файл `tina/config.ts` содержит полную схему данных, но сейчас **закомментирован**, так как библиотека TinaCMS требует установки Node Build Tools (Python/C++) для сборки на Windows. Весь текст сейчас прописан в коде компонентов — его легко менять.

## ✅ Проверка на ошибки
- Гидратация исправлена (`suppressHydrationWarning` на датах).
- `npm run build` проходит успешно.

---
**Senior Tech Lead & Frontend Developer**
**Antigravity AI Agent**
