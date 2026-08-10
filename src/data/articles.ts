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
    title: "Как не получить штраф 18 млн ₽: Безопасный ИИ-автоответчик в amoCRM за 3 дня",
    description: "Боевое руководство по настройке двухконтурной архитектуры n8n. Как отвечать лидам за 3 секунды и при этом 100% соблюдать 152-ФЗ.",
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
<p class="text-base sm:text-lg text-[#111111] leading-relaxed mb-6 font-semibold">
Самая частая ошибка владельцев бизнеса при внедрении ИИ — подключение готовых плагинов, которые напрямую отправляют тексты переписок с клиентами во внешние нейросети (ChatGPT / Claude). Если в сообщении есть имя, телефон или e-mail — вы прямо нарушаете 152-ФЗ «О персональных данных» и рискуете получить штраф до 18 млн рублей.
</p>

<div class="bg-[#FEF2F2] border-l-4 border-red-500 p-5 rounded-r-2xl mb-8">
  <div class="flex items-center gap-2 text-red-600 font-bold text-sm mb-1">
    ⚠️ Главный риск 2026 года
  </div>
  <p class="text-xs sm:text-sm text-[#1A1D20] m-0 leading-relaxed">
    Роскомнадзор жестко отслеживает передачу ПДн российских граждан на зарубежные серверы. Любое прямое отправление имени или телефона клиента в сторонние API без предварительной анонимизации влечет за собой внеплановую проверку и блокировку.
  </p>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
Как решить проблему: Двухконтурная защита n8n
</h2>

<p class="mb-4 text-[#374151] leading-relaxed">
Вместо прямой передачи данных мы собираем двухконтурный пайплайн автоматизации на базе self-hosted платформы n8n. Вся связка работает на вашем собственном защищенном VPS-сервере в Москве:
</p>

<div class="my-6 text-center">
  <img src="/blog/funnel-scheme.png" alt="Схема двухконтурной защиты ПДн" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-full mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Архитектура двухконтурной очистки данных в РФ-контуре</span>
</div>

<div class="space-y-4 my-6">
  <div class="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
    <div class="font-bold text-sm text-[#111111] mb-1">1. Приём обращения</div>
    <p class="text-xs text-[#4B5563] m-0">Сообщение из Telegram, WhatsApp или amoCRM попадает в изолированный VPS-контейнер n8n в РФ.</p>
  </div>
  <div class="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
    <div class="font-bold text-sm text-[#111111] mb-1">2. РФ-Санитайзер (Очистка ПДн)</div>
    <p class="text-xs text-[#4B5563] m-0">Локальная отечественная модель (GigaChat / regex-фильтр) заменяет все телефоны и имена на анонимные маркеры: <code>"Иван, +79991234567"</code> ➔ <code>"Пользователь [ID_12], [PHONE_HIDDEN]"</code>.</p>
  </div>
  <div class="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
    <div class="font-bold text-sm text-[#111111] mb-1">3. Генерация ответа ИИ</div>
    <p class="text-xs text-[#4B5563] m-0">Нейросеть генерирует умный ответ по вашей базе знаний (RAG), работая только с обезличенным бизнес-контекстом.</p>
  </div>
  <div class="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
    <div class="font-bold text-sm text-[#111111] mb-1">4. Реконструкция и отправка</div>
    <p class="text-xs text-[#4B5563] m-0">На локальном сервере подставляется персональное обращение, и клиент получает готовый ответ за 2 секунды.</p>
  </div>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
Сравнение расходов и рисков
</h2>

<div class="overflow-x-auto my-6 border border-[#E5E7EB] rounded-2xl bg-white shadow-sm">
  <table class="w-full text-left text-sm text-[#1A1D20]">
    <thead class="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs uppercase font-bold text-[#828D99]">
      <tr>
        <th class="p-4">Параметр</th>
        <th class="p-4">Прямое подключение к API</th>
        <th class="p-4 text-[#00E68A]">Решение Samartsev AI</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#E5E7EB]">
      <tr>
        <td class="p-4 font-semibold">Соблюдение 152-ФЗ</td>
        <td className="p-4 text-red-500 font-medium">Нет (прямая утечка ПДн)</td>
        <td class="p-4 text-[#00E68A] font-bold">100% в РФ-контуре</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Время ответа</td>
        <td class="p-4">3–5 секунд</td>
        <td class="p-4 font-bold">2–3 секунды</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Автосоздание сделки в CRM</td>
        <td class="p-4">Нужен отдельный программист</td>
        <td class="p-4 font-bold">Включено в n8n пайплайн</td>
      </tr>
    </tbody>
  </table>
</div>
`,
    faq: [
      {
        question: "Где физически хранятся данные переписок?",
        answer: "На вашем собственном VPS-сервере в российском дата-центре (Selectel / Timeweb Cloud). Ни у кого кроме вашей компании нет доступа к PostgreSQL."
      },
      {
        question: "Сколько времени занимает запуск системы?",
        answer: "Аудит процессов и сборка воркфлоу n8n занимают 3 рабочих дня с момента согласовании базы знаний."
      }
    ]
  },
  {
    slug: "n8n-vs-make-dlya-biznesa",
    title: "Зачем переходить с Make на n8n: Считаем экономику и санкционные риски",
    description: "Сравнение расходов: $299/мес за Make vs 0 ₽ за операции в n8n. Как избавиться от валютных подписок и лимитов.",
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
<p class="text-base sm:text-lg text-[#111111] leading-relaxed mb-6 font-semibold">
Многие компании начинали автоматизацию с сервиса Make.com (Integromat). Но по мере роста количества заявок подписка превращается в регулярную финансовую дыру. За каждые 100 000 операций Make заставляет платить около $299 в месяц — при этом карты РФ не принимаются, а риски неожиданной блокировки аккаунта остаются высокими.
</p>

<div class="my-6 text-center">
  <img src="/blog/cat-funnel.png" alt="Кот размышляет у доски автоматизации" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-md mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Визуальный скриптинг n8n позволяет сопоставить логику любой сложности</span>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
Финансовое сравнение на 1 год работы
</h2>

<div class="overflow-x-auto my-6 border border-[#E5E7EB] rounded-2xl bg-white shadow-sm">
  <table class="w-full text-left text-sm text-[#1A1D20]">
    <thead class="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs uppercase font-bold text-[#828D99]">
      <tr>
        <th class="p-4">Критерий</th>
        <th class="p-4">Make.com</th>
        <th class="p-4 text-[#00E68A]">n8n (Self-Hosted)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#E5E7EB]">
      <tr>
        <td class="p-4 font-semibold">Стоимость за 100k операций/мес</td>
        <td class="p-4 text-red-500 font-medium">~$3 500 в год</td>
        <td class="p-4 text-[#00E68A] font-bold">~6 000 ₽ в год (только VPS)</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Ограничение на количество шагов</td>
        <td class="p-4">Каждый шаг списывает баллы</td>
        <td class="p-4 font-bold">Безлимитно</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Независимость от санкций</td>
        <td class="p-4 text-red-500">Низкая (риск блокировки)</td>
        <td class="p-4 font-bold text-[#00E68A]">Абсолютная (Open-Source в РФ)</td>
      </tr>
    </tbody>
  </table>
</div>

<p class="text-[#374151] leading-relaxed mb-4">
Главное преимущество n8n — вы владеете своим кодом и воркфлоу на 100%. Сервер работает у вас, а данные не утекают сторонним операторам.
</p>
`,
    faq: [
      {
        question: "Насколько сложно перенести действующие воркфлоу из Make?",
        answer: "Перенос сценария средней сложности занимает от 1 до 2 дней. Логика роутинга и вебхуков полностью совпадает."
      }
    ]
  },
  {
    slug: "kalkulyator-poter-ot-medlennyh-otvetov",
    title: "Где сгорают ваши лиды: Аудит ночных ответов и упущенная выручка",
    description: "Как проведать свой отдел продаж за 15 минут. Экспресс-формула подсчета чистых убытков из-за паузы в ответах.",
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
<p class="text-base sm:text-lg text-[#111111] leading-relaxed mb-6 font-semibold">
Реальный кейс: клиент оставляет заявку в 21:15 в пятницу. Менеджер перезванивает в субботу в 11:30. В 90% случаев клиент ответит: <em>«Спасибо, я уже договорился с другими»</em>. Пока ваш менеджер спал, автоответчик конкурента дал первичный ответ за 3 секунды и забронировал встречу.
</p>

<div class="my-6 text-center">
  <img src="/blog/cat-crisis.png" alt="Кот в утомлении у ноутбука" class="rounded-xl border border-[#E5E7EB] shadow-sm max-w-md mx-auto" />
  <span class="block text-xs text-[#828D99] mt-2">Типичная картина: пропущенные обращения в нерабочие часы</span>
</div>

<div class="bg-[#F9FAFB] border-l-4 border-[#00E68A] p-5 rounded-r-2xl my-6 border border-[#E5E7EB]">
  <div class="font-bold text-sm text-[#111111] mb-2">📐 Формула расчета потерянной выручки:</div>
  <code class="text-xs sm:text-sm text-[#00E68A] bg-[#0F231B] p-3 rounded-xl font-mono block overflow-x-auto">
Упущенная прибыль = (Лидов в мес) × (% ответов > 15 мин) × (Средний чек) × (Конверсия) × 0.35
  </code>
</div>

<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">
Как провести экспресс-аудит за 15 минут:
</h2>

<ol class="space-y-3 mb-6">
  <li class="flex items-start gap-2 text-sm text-[#374151]">
    <span class="font-bold text-[#00E68A]">1.</span>
    <span>Зайдите в вашу amoCRM или Битрикс24 в раздел сделок.</span>
  </li>
  <li class="flex items-start gap-2 text-sm text-[#374151]">
    <span class="font-bold text-[#00E68A]">2.</span>
    <span>Отфильтруйте входящие лиды за прошлые выходные или за вечер после 19:00.</span>
  </li>
  <li class="flex items-start gap-2 text-sm text-[#374151]">
    <span class="font-bold text-[#00E68A]">3.</span>
    <span>Сравните время создания сделки и время отправки первого сообщения менеджера. Вы удивитесь объему пропущенных денег!</span>
  </li>
</ol>
`,
    faq: [
      {
        question: "Может ли ИИ-агент сам закрыть клиента на оплату?",
        answer: "ИИ-агент квалифицирует лид, ответит на частые вопросы по прайсу и забронирует слот в CRM. Финальное закрытие сделки выполняет менеджер по подготовленной карточке."
      }
    ]
  }
];
