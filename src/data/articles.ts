export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  faq?: Array<{ question: string; answer: string }>;
}

export const ARTICLES: Article[] = [
  {
    slug: "vnedrenie-ai-agentov-v-otdel-prodazh-152-fz",
    title: "Внедрение ИИ-агентов в отдел продаж с соблюдением 152-ФЗ в 2026 году",
    description: "Пошаговый разбор безопасной интеграции ИИ-автоответчиков в amoCRM и Битрикс24 без передачи персональных данных во внешние нейросети.",
    date: "2026-08-10",
    readTime: "7 мин",
    category: "Безопасность & 152-ФЗ",
    image: "/blog/cat-sales.png",
    author: {
      name: "Алексей Самарцев",
      role: "Основатель Samartsev AI",
      avatar: "/founder.jpg"
    },
    content: `
<p class="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-medium">
Большинство B2B-компаний теряют от 15% до 35% входящих заявок из-за человеческого фактора: менеджеры заняты текучкой, не успевают ответить в мессенджере в первые 5 минут или уходят на выходные. Внедрение автономного ИИ-агента позволяет отвечать за 2–3 секунды 24 часа в сутки. Но главная юридическая дилемма 2026 года — <strong>как не нарушить Федеральный закон № 152-ФЗ «О персональных данных»</strong> при работе с LLM-моделями?
</p>

<div class="bg-[#0F231B]/5 border border-[#00E68A]/30 rounded-2xl p-5 mb-8">
  <div class="flex items-center gap-2 text-[#00E68A] font-bold text-sm mb-2">
    <span class="material-symbols-outlined text-base">shield</span>
    Ключевое правило безопасности
  </div>
  <p class="text-xs sm:text-sm text-[#1A1D20] m-0">
    Передача неанонимизированных персональных данных (ФИО, номера телефонов, адреса) клиентов в сторонние облачные нейросети грозит штрафами до 18 млн рублей. По закону обработка ПДн должна происходить исключительно в защищенном РФ-контуре.
  </p>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
1. Двухконтурная архитектура: Как это работает на практике
</h2>

<p class="mb-4">
Для защиты бизнеса мы используем двухконтурную схему взаимодействия n8n, отечественных санитайзеров и генеративных языковых моделей:
</p>

<div class="my-6 text-center">
  <img src="/blog/funnel-scheme.png" alt="Схема интеграции ИИ и безопасной работы" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-full mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Схема двухконтурной обработки данных и передача сообщений</span>
</div>

<ul class="space-y-2 mb-6">
  <li class="flex items-start gap-2 text-sm text-[#1A1D20]">
    <span class="text-[#00E68A] font-bold">1.</span>
    <span><strong>Захват сообщения:</strong> Клиент пишет в мессенджер (TG, WhatsApp) или оставляет заявку на сайте. Данные поступают в изолированный Docker-контейнер n8n на VPS в РФ.</span>
  </li>
  <li class="flex items-start gap-2 text-sm text-[#1A1D20]">
    <span class="text-[#00E68A] font-bold">2.</span>
    <span><strong>Санитайзер (Очистка ПДн):** Российский модуль на базе GigaChat / regex удаляет все телефоны, имена и e-mail, заменяя их на токены <code>[USER_ID]</code>.</span>
  </li>
  <li class="flex items-start gap-2 text-sm text-[#1A1D20]">
    <span class="text-[#00E68A] font-bold">3.</span>
    <span><strong>Формирование ответа ИИ:</strong> Очищенный контекст передается нейросети для формирования экспертного ответа по вашей базе знаний (RAG).</span>
  </li>
  <li class="flex items-start gap-2 text-sm text-[#1A1D20]">
    <span class="text-[#00E68A] font-bold">4.</span>
    <span><strong>Реконструкция ответа:</strong> На локальном сервере в РФ происходит подстановка обращений к клиенту по имени, и текст уходит человеку за 2 секунды.</span>
  </li>
</ul>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
2. Сравнение эффективности: Штат vs ИИ-агент
</h2>

<div class="overflow-x-auto my-6 border border-[#E5E7EB] rounded-2xl bg-white shadow-sm">
  <table class="w-full text-left text-sm text-[#1A1D20]">
    <thead class="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs uppercase font-bold text-[#828D99]">
      <tr>
        <th class="p-4">Критерий</th>
        <th class="p-4">Штатный менеджер</th>
        <th class="p-4 text-[#00E68A]">ИИ-агент Samartsev AI</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#E5E7EB]">
      <tr>
        <td class="p-4 font-semibold">Время ответа</td>
        <td class="p-4 text-red-500 font-medium">15–90 минут</td>
        <td class="p-4 text-[#00E68A] font-bold">2–3 секунды</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Режим работы</td>
        <td class="p-4">5/2, с 9:00 до 18:00</td>
        <td class="p-4 font-semibold">24/7/365 без перерывов</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Затраты на внедрение</td>
        <td class="p-4">От 60 000 ₽ / мес ФОТ + налоги</td>
        <td class="p-4 font-semibold">Фиксированный проект (окупаемость 1 мес)</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Защита 152-ФЗ</td>
        <td class="p-4">Риск утечек из-за человеческого фактора</td>
        <td class="p-4 font-semibold">Двухконтурная изоляция на серверах РФ</td>
      </tr>
    </tbody>
  </table>
</div>
`,
    faq: [
      {
        question: "Соответствует ли решение требованиям 152-ФЗ?",
        answer: "Да. Персональные данные хранятся и обрабатываются только на защищенном сервере в РФ (Postgres + n8n). Внешние языковые модели получают только обезличенный текст."
      },
      {
        question: "С какими CRM поддерживается интеграция?",
        answer: "amoCRM, Битрикс24, YCLIENTS, 1С, RetailCRM, а также любые корпоративные системы по REST API."
      }
    ]
  },
  {
    slug: "n8n-vs-make-dlya-biznesa",
    title: "n8n vs Make vs Custom Code: Что выбрать российскому бизнесу для автоматизации CRM",
    description: "Честный сравнительный анализ платформ автоматизации: расходы на инфраструктуру, устойчивость к санкциям и лимиты операторов.",
    date: "2026-08-08",
    readTime: "6 мин",
    category: "Архитектура & Стек",
    image: "/blog/cat-funnel.png",
    author: {
      name: "Алексей Самарцев",
      role: "Основатель Samartsev AI",
      avatar: "/founder.jpg"
    },
    content: `
<p class="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-medium">
Выбор технологического стека — фундаментальный выбор для любого растущего B2B-бизнеса. Облачные зарубежные сервисы вроде Make (Integromat) или Zapier привязаны к валютным подпискам и сторонней инфраструктуре. Переход на self-hosted n8n позволяет бизнесу полностью владеть своими данными и цепочками автоматизации.
</p>

<div class="my-6 text-center">
  <img src="/blog/cat-funnel.png" alt="Кот разбирает сценарии автоматизации у доски" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-md mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Проектирование логики сценариев и условных переходов на доске</span>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
Сравнение характеристик платформ
</h2>

<div class="overflow-x-auto my-6 border border-[#E5E7EB] rounded-2xl bg-white shadow-sm">
  <table class="w-full text-left text-sm text-[#1A1D20]">
    <thead class="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs uppercase font-bold text-[#828D99]">
      <tr>
        <th class="p-4">Характеристика</th>
        <th class="p-4">Make.com</th>
        <th class="p-4 text-[#00E68A]">Self-Hosted n8n</th>
        <th class="p-4">Custom Code</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#E5E7EB]">
      <tr>
        <td class="p-4 font-semibold">Локализация данных</td>
        <td class="p-4 text-red-500">Зарубежные сервера</td>
        <td class="p-[#00E68A] p-4 font-bold">100% РФ сервер (VPS)</td>
        <td class="p-4">РФ сервер</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Оплата за операции</td>
        <td class="p-4">Плата за каждое действие</td>
        <td class="p-4 font-bold text-[#00E68A]">Безлимитно (только VPS)</td>
        <td class="p-4">Безлимитно</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Скорость внесения правок</td>
        <td class="p-4">Высокая</td>
        <td class="p-4 font-bold text-[#00E68A]">Высокая (Low-code визуализатор)</td>
        <td class="p-4 text-red-500">Низкая (нужен разработчик)</td>
      </tr>
    </tbody>
  </table>
</div>
`,
    faq: [
      {
        question: "Сложно ли перенести готовые связки с Make на n8n?",
        answer: "Нет. Логика узлов переносится 1:1, а благодаря встроенному обработчику JavaScript в n8n кастомизация становится еще гибче."
      }
    ]
  },
  {
    slug: "kalkulyator-poter-ot-medlennyh-otvetov",
    title: "Как рассчитать упущенную выручку от медленных ответов менеджеров отдела продаж",
    description: "Методология аутсорсинга и расчета финансовых потерь бизнеса из-за паузы между первыми сообщениями клиента и реакцией продавца.",
    date: "2026-08-05",
    readTime: "5 мин",
    category: "Экономика & ROI",
    image: "/blog/cat-crisis.png",
    author: {
      name: "Алексей Самарцев",
      role: "Основатель Samartsev AI",
      avatar: "/founder.jpg"
    },
    content: `
<p class="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-medium">
Если клиент оставил заявку вечером в 20:30, а менеджер перезвонил только утром в 10:00 — конверсия в успешную сделку стремится к нулю. Клиент за это время уходит к конкуренту, чей ИИ-автоответчик мгновенно дал консультацию и забронировал слот на замер или прием.
</p>

<div class="my-6 text-center">
  <img src="/blog/cat-crisis.png" alt="Кот в утомлении у ноутбука из-за пропущенных звонков" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-md mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Типичная ситуация: пропущенные звонки и сообщения в нерабочее время</span>
</div>

<div class="bg-[#F3F4F6] border-l-4 border-[#00E68A] p-5 rounded-r-2xl my-6">
  <div class="font-bold text-sm text-[#111111] mb-1">📐 Математическая формула упущенной прибыли:</div>
  <code class="text-xs sm:text-sm text-[#1A1D20] font-mono block bg-white p-3 rounded-lg border border-[#E5E7EB]">
    Потери = (Входящие лиды / мес) × (% ответов > 15 мин) × (Ср. чек) × (Конверсия) × 0.35
  </code>
</div>

<p class="mb-4">
Воспользуйтесь нашим интерактивным калькулятором на главной странице, чтобы мгновенно подставить показатели вашего отдела продаж и получить детальную финансовую раскладку.
</p>
`,
    faq: [
      {
        question: "Как проверить реальное время ответа у моих менеджеров?",
        answer: "Проведите проверку методом тайного покупателя (Mystery Shopping) в 19:30 или скачайте отчёт по первому касанию сделки в amoCRM / Битрикс24."
      }
    ]
  }
];
