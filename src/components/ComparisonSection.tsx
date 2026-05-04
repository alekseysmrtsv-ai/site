"use client";

export default function ComparisonSection() {
  const negatives = [
    { text: "Теряют смысл диалога", icon: "close" },
    { text: "Не понимают контекст", icon: "close" },
    { text: "Не знают CRM", icon: "close" },
    { text: "Не запрашивают менеджера, если клиент злится", icon: "close" },
    { text: "Разрушаются, когда API падает", icon: "close" },
    { text: "Требуют ручного сопровождения", icon: "close" },
  ];

  const positives = [
    { text: "Память сессий", icon: "check_circle" },
    { text: "RAG по базе знаний клиента", icon: "check_circle" },
    { text: "Протокол безопасности 360°", icon: "check_circle" },
    { text: "Интеграция с CRM (amo/Битрикс24)", icon: "check_circle" },
    { text: "Работают 24/7 без ошибок", icon: "check_circle" },
    { text: "SLA-мониторинг n8n", icon: "check_circle" },
    { text: "5 дней до результата", icon: "check_circle" },
  ];

  return (
    <section
      id="comparison"
      className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-20 flex flex-col gap-16"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 items-center text-center max-w-[800px] mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-heavy tracking-tight leading-tight">
          🔥 Почему обычные чат-боты{" "}
          <span className="text-primary">не работают</span>
        </h2>
        <p className="text-text-muted text-lg font-body leading-relaxed">
          Разрыв между «дешёвой автоматизацией» и клинической точностью
          ИИ-агентов нового поколения.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Standard Bots */}
        <div className="bg-surface rounded-md border border-border p-8 flex flex-col relative overflow-hidden group">
          {/* Red accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400/30 via-red-500 to-red-400/30" />

          <div className="mb-8">
            <div className="w-12 h-12 rounded-sm bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-red-500 text-[28px]">
                smart_toy
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy mb-1">
              Обычные чат-боты
            </h3>
            <span className="text-text-muted text-sm font-body">
              Средний бюджет: 15–20 тыс. ₽
            </span>
          </div>

          <ul className="space-y-5 flex-grow">
            {negatives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group/item">
                <span className="material-symbols-outlined text-red-500 shrink-0 text-[22px] mt-0.5">
                  {item.icon}
                </span>
                <span className="text-text-muted leading-relaxed text-[15px]">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Failed conversation mockup */}
          <div className="mt-8 rounded-md border border-red-200 dark:border-red-500/20 bg-red-50/40 dark:bg-red-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-red-400 text-[16px]">chat_bubble</span>
              <span className="text-[11px] font-display font-semibold text-red-400 uppercase tracking-wider">Типичный диалог</span>
            </div>
            <div className="flex flex-col gap-2 text-[12px] font-body">
              <div className="self-end bg-surface dark:bg-heavy/10 border border-border rounded-md px-3 py-1.5 max-w-[80%] text-text-muted">
                Здравствуйте, хочу узнать статус заказа #4812
              </div>
              <div className="self-start bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-md px-3 py-1.5 max-w-[80%] text-red-600 dark:text-red-400">
                Извините, я не могу найти информацию. Обратитесь к менеджеру.
              </div>
              <div className="self-end bg-surface dark:bg-heavy/10 border border-border rounded-md px-3 py-1.5 max-w-[80%] text-text-muted">
                Я уже 3 раза обращался! Где менеджер?!
              </div>
              <div className="self-start bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-md px-3 py-1.5 max-w-[80%] text-red-600 dark:text-red-400 italic">
                Извините, я вас не понимаю. Повторите запрос.
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-red-400 text-[14px]">sentiment_very_dissatisfied</span>
              <span className="text-[11px] text-red-400 font-medium">Клиент потерян</span>
            </div>
          </div>
        </div>

        {/* Right: Our Agents */}
        <div className="bg-surface rounded-md border-2 border-primary/40 p-8 flex flex-col relative overflow-hidden group shadow-[0_8px_32px_rgba(0,230,138,0.08)]">
          {/* Green accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

          {/* Active badge */}
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-2 text-primary font-bold text-xs font-display uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              ACTIVE
            </span>
          </div>

          <div className="mb-8">
            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-[28px]">
                psychology
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy mb-1">
              Наши ИИ-агенты
            </h3>
            <span className="text-primary text-sm font-display font-semibold uppercase tracking-wider">
              Samartsev AI Enterprise
            </span>
          </div>

          <ul className="space-y-5 flex-grow">
            {positives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group/item">
                <span
                  className="material-symbols-outlined text-primary shrink-0 text-[22px] mt-0.5"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {item.icon}
                </span>
                <span className="text-heavy font-medium leading-relaxed text-[15px]">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Live stats strip */}
          <div className="mt-8 rounded-md border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>monitoring</span>
              <span className="text-[11px] font-display font-semibold text-primary uppercase tracking-wider">Live-метрики</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-xl text-heavy">99.8%</span>
                <span className="text-[10px] font-body text-text-muted uppercase tracking-wide">Uptime</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-xl text-heavy">&lt;2с</span>
                <span className="text-[10px] font-body text-text-muted uppercase tracking-wide">Ответ</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-xl text-heavy">5+</span>
                <span className="text-[10px] font-body text-text-muted uppercase tracking-wide">CRM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Native RU Integrations */}
        <div className="card-hover bg-surface rounded-md border border-border p-6 flex items-start gap-5 cursor-default">
          <div className="w-12 h-12 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[28px]">hub</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold text-lg text-heavy leading-snug">
              Нативные интеграции под&nbsp;РФ
            </h4>
            <p className="text-text-muted text-sm font-body leading-relaxed">
              Готовые коннекторы без костылей — подключаем к вашей CRM за&nbsp;часы, не&nbsp;недели.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {["Bitrix24", "amoCRM", "YClients", "U-ON", "Envybox"].map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center px-2.5 py-1 rounded-sm bg-bg text-[12px] font-display font-semibold text-heavy border border-border"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* No VPN */}
        <div className="card-hover bg-surface rounded-md border border-border p-6 flex items-start gap-5 cursor-default">
          <div className="w-12 h-12 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[28px]">shield</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold text-lg text-heavy leading-snug">
              Работа без&nbsp;VPN
            </h4>
            <p className="text-text-muted text-sm font-body leading-relaxed">
              Архитектура, одобренная для работы в&nbsp;РФ. Никаких блокировок, никаких прокси — стабильная связь 24/7.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                <span className="text-[12px] font-display font-medium text-text-muted">152-ФЗ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                <span className="text-[12px] font-display font-medium text-text-muted">RU-хостинг</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                <span className="text-[12px] font-display font-medium text-text-muted">0% даунтайм</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4">
        <a
          href="#contact"
          className="w-full md:w-auto px-10 py-5 bg-primary text-heavy font-display font-semibold text-base uppercase tracking-widest rounded-md hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_8px_24px_rgba(0,230,138,0.2)] hover:shadow-[0_12px_32px_rgba(0,230,138,0.3)] hover:-translate-y-0.5"
        >
          Спроектировать моего агента
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </a>
        <p className="text-text-muted text-sm font-body">
          Бесплатный технический аудит вашей воронки при записи сегодня
        </p>
      </div>
    </section>
  );
}
