# AI Automation Agency - UI Design System

## 🎨 Design Foundations: Premium AI Minimalism (Dark Mode)

Вдохновлено эстетикой OpenAI, Linear и Vercel. Дизайн строится вокруг глубокого фона, чистой типографики, эффектов матового стекла (Glassmorphism) и мягкого неонового свечения (Neon Glow), подчеркивающего технологичность ИИ.

### 1. Color System (HEX Palette)

Строгая **Темная тема** — единственный и основной режим интерфейса.

*   **Background (Base)**: `#030712` (Глубокий, насыщенный почти черный с минимальным синим подтоном).
*   **Surface (Glass Cards)**: `#111827` (Базовый цвет для карточек, в реализации будет использоваться с прозрачностью 40-60%).
*   **Primary Accent 1 (Neon Blue)**: `#4F46E5` (Для кнопок, свечений и активных состояний).
*   **Primary Accent 2 (Neon Violet)**: `#8B5CF6` (Для создания красивых градиентов вместе с Neon Blue).
*   **Secondary Accent (Success/Action)**: `#10B981` (Изумрудный — индикатор онлайна ИИ-бота, успешная отправка формы).
*   **Text Primary**: `#F8FAFC` (Яркий белый с легчайшим холодным оттенком, идеален для заголовков).
*   **Text Secondary**: `#94A3B8` (Приглушенный серый для описаний и плейсхолдеров).
*   **Borders (Glass Edges)**: `#1E293B` (Твердый цвет) ИЛИ полупрозрачный белый `rgba(255, 255, 255, 0.08)` (для эффекта стекла).

### 2. Typography System

Связка из 2 современных шрифтов Google Fonts, обеспечивающая правильный контраст между "технологичностью" заголовков и "чистотой" основного текста.

*   **Primary Font (Заголовки / Display)**: `Space Grotesk`
    *   **Вес**: 500 (Medium), 700 (Bold).
    *   **Использование**: H1, H2, H3, крупные цифры метрик, логотип. Дает тот самый "инженерно-космический" вайб ИИ-стартапа.
*   **Secondary Font (Основной текст / UI)**: `Inter`
    *   **Вес**: 400 (Regular), 500 (Medium).
    *   **Использование**: Наборный текст, лейблы кнопок, текст внутри инпутов и сообщения чат-бота. Идеальная читаемость на экранах любой плотности.

---

## 🧱 UI Components & Element Styling

### 1. Buttons (Primary CTA)
*   **Стиль**: Градиентная заливка от `#4F46E5` к `#8B5CF6`.
*   **Эффекты**: 
    *   **Тень (Glow)**: Мягкое неоновое свечение вокруг кнопки в тон градиенту.
    *   **Внутренний блик**: Сверху тонкий полупрозрачный белый border (`rgba(255,255,255,0.2)`), создающий эффект объема и премиальности.
*   **Состояние Hover**: Увеличение яркости градиента, легкое масштабирование (`scale: 1.02`), расширение зоны неоновой тени.

### 2. Form Inputs (Lead Capture)
*   **Стиль**: Глубокий темный фон (`rgba(255, 255, 255, 0.03)`), дающий легкий контраст с фоном BackgroundBase.
*   **Бордер**: Тонкий, едва заметный край (`rgba(255,255,255,0.1)`).
*   **Внутренние отступы**: Просторные (`padding: 16px`), скругление углов (`border-radius: 12px`).
*   **Состояние Focus**: Бордер плавно окрашивается в градиент или цвет Primary Accent (`#4F46E5`), появляется мягкая внешняя тень акцентного цвета.

### 3. Interactive AI Bot Window
*   **Стиль (Glassmorphism)**: Абсолютно прозрачная основа с размытием заднего фона (Blur). 
*   **Окружение**: Панель как бы парит над контентом.
*   **Подсветка (Neon Backdrop)**: Под самим окном чата располагается крупное пятно размытого цвета (микс Primary Accent 1 и 2), которое "просвечивает" сквозь матовое стекло чата.
*   **Сообщения (Bubbles)**:
    *   *Бот*: Темно-серый полупрозрачный бабл.
    *   *Пользователь*: Акцентный градиентный бабл.
*   **Шапка бота**: Индикатор зеленого цвета (`#10B981`) с эффектом пульсации ("Online").

---

## 💻 Developer Handoff: Tailwind CSS Recommendations

Для точного воссоздания визуальных эффектов (Glassmorphism и Neon), мы рекомендуем использовать следующие классы Tailwind CSS:

### Окна, Карточки и Чат-бот (Glassmorphism)
Используйте комбинацию белого фона с микро-прозрачностью, сильного блюра заднего фона и тончайшей белой рамки:
```html
<div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
  <!-- Content here -->
</div>
```

### Неоновое свечение (Neon Glow Backgrounds)
Для создания глубокого эффекта погружения и "магии ИИ", поместите эти декоративные элементы на задний план (под Glass-карточки):
```html
<!-- Фиолетово-синее размытое пятно (Свечение на фоне) -->
<div class="absolute -z-10 bg-indigo-500/20 w-96 h-96 blur-[120px] rounded-full mix-blend-screen"></div>

<!-- Менее интенсивное пятно для акцента -->
<div class="absolute -z-10 bg-violet-600/20 w-72 h-72 blur-[100px] rounded-full mix-blend-screen right-0"></div>
```

### Кнопка с неоновой тенью (Primary Button)
```html
<button class="bg-gradient-to-r from-indigo-500 to-violet-600 
               text-white font-medium rounded-xl px-6 py-3
               border border-white/20 
               shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]
               hover:shadow-[0_0_40px_0_rgba(139,92,246,0.6)] 
               transition-all duration-300 hover:scale-[1.02]">
  Book a Demo
</button>
```

### Инпуты формы (Form Inputs focus glow)
```html
<input class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
              text-slate-200 placeholder-slate-500
              focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 
              focus:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]
              transition-all duration-300" 
       placeholder="Your Email" />
```

---
**UI Designer**: Antigravity
**Date**: 2026-03-26
**QA Notes**: Убедитесь, что эффект `backdrop-blur-xl` поддерживается в целевых браузерах, и шрифты предварительно загружены (`preload`) для устранения FOUT. Фоновые пятна свечения не должны перекрывать кликабельность (обязательно `-z-10` или `pointer-events-none`).
