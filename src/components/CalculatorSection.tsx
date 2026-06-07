"use client";

import { useState, useCallback } from "react";
import content from "../../content/landing/index.json";

const TABS = [

  {
    value: "night",
    label: "Пропущенные ночные записи",
    description: "Клиенты уходят к конкурентам, пока ваши менеджеры спят. ИИ-агент отвечает за 2 секунды круглосуточно.",
  },
  {
    value: "delay",
    label: "Долгий ответ",
    description: "25% лидов уходит, если ответ занимает больше 15 минут. ИИ-агент отвечает мгновенно, в любое время суток.",
  },
  {
    value: "routine",
    label: "Рутина",
    description: "Менеджеры тратят 60% времени на однотипные вопросы. ИИ-агент берёт рутину на себя.",
  },
];

export default function CalculatorSection() {
  const [tab, setTab]     = useState("night");
  const [leads, setLeads] = useState(100); // Теперь это лидов в МЕСЯЦ
  const [check, setCheck] = useState(15000);
  const [loss, setLoss]   = useState(20);

  const lossPerMonth = leads && check && loss ? Math.round(leads * check * (loss / 100)) : 0;

  const fmt = useCallback(
    (n: number) => n.toLocaleString("ru-RU"),
    []
  );

  const trackWidth = useCallback((val: number, min: number, max: number) => {
    const range = max - min;
    return range === 0 ? "0%" : `${((val - min) / range) * 100}%`;
  }, []);

  const getLossColorClass = useCallback((val: number) => {
    if (val <= 15) return "bg-primary";
    if (val <= 35) return "bg-amber-500";
    return "bg-red-500";
  }, []);

  const getResultColorClass = useCallback((val: number) => {
    if (val <= 15) return "text-heavy";
    if (val <= 35) return "text-amber-500 dark:text-amber-400";
    return "text-red-500 dark:text-red-400 animate-pulse-subtle";
  }, []);

  const handleStopLoss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const chatEl = document.getElementById("chat-widget");
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const event = new CustomEvent("calculate-loss", {
      detail: {
        leads,
        check,
        loss,
        lossPerMonth,
      },
    });
    window.dispatchEvent(event);

    const highlightEvent = new CustomEvent("highlight-chat");
    window.dispatchEvent(highlightEvent);
  }, [leads, check, loss, lossPerMonth]);

  return (
    <section
      id="calculator"
      className="w-full py-16 md:py-20 relative"
    >
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-heavy tracking-tight mb-4 text-balance">
            {content.calculator.title}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto font-body">
            Рассчитайте упущенную выручку из-за человеческого фактора и медленных ответов.
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full mb-8">
          <div role="tablist" aria-label="Тип упущенной выручки" className="flex h-12 w-full items-center justify-center rounded-md bg-border/30 p-1 overflow-x-auto no-scrollbar gap-0.5">
            {TABS.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={tab === t.value}
                onClick={() => setTab(t.value)}
                className={`flex cursor-pointer h-full flex-1 min-w-[140px] items-center justify-center rounded-sm px-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  tab === t.value
                    ? "bg-surface shadow-subtle text-heavy"
                    : "text-text-muted hover:text-heavy"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-4 min-h-[48px] text-center">
            <p className="text-sm text-text-muted font-body">
              {TABS.find((t) => t.value === tab)?.description}
            </p>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="w-full bg-surface border border-border rounded-md shadow-subtle p-6 md:p-10 relative overflow-hidden">
          {/* Accent top line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="space-y-10">
            {/* Slider: Leads/month */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-display font-medium text-xs uppercase tracking-wider text-text-muted">
                  {content.calculator.leadsLabel}
                </label>
                <span className="font-display font-bold text-xl text-heavy tabular-nums">{leads}</span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div
                  className="absolute left-0 h-1 bg-primary rounded-l-sm pointer-events-none"
                  style={{ width: trackWidth(leads, 10, 2000) }}
                />
                <input
                  type="range" min={10} max={2000} step={10} value={leads}
                  aria-label="Заявки в месяц"
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="absolute w-full z-10"
                />
              </div>
            </div>

            {/* Slider: Avg check */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-display font-medium text-xs uppercase tracking-wider text-text-muted">
                  {content.calculator.checkLabel}
                </label>
                <span className="font-display font-bold text-xl text-heavy tabular-nums">
                  {fmt(check)}
                </span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div
                  className="absolute left-0 h-1 bg-primary rounded-l-sm pointer-events-none"
                  style={{ width: trackWidth(check, 1000, 200000) }}
                />
                <input
                  type="range" min={1000} max={200000} step={1000} value={check}
                  aria-label="Средний чек"
                  onChange={(e) => setCheck(Number(e.target.value))}
                  className="absolute w-full z-10"
                />
              </div>
            </div>

            {/* Slider: Loss % */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="font-display font-medium text-xs uppercase tracking-wider text-text-muted">
                  {content.calculator.lossLabel}
                </label>
                <span className={`font-display font-bold text-xl tabular-nums transition-colors duration-300 ${loss <= 15 ? "text-heavy" : loss <= 35 ? "text-amber-500 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>{loss}%</span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div
                  className={`absolute left-0 h-1 rounded-l-sm pointer-events-none transition-colors duration-300 ${getLossColorClass(loss)}`}
                  style={{ width: trackWidth(loss, 5, 80) }}
                />
                <input
                  type="range" min={5} max={80} value={loss}
                  aria-label="Процент потерь"
                  onChange={(e) => setLoss(Number(e.target.value))}
                  className="absolute w-full z-10"
                />
              </div>
              <p className="text-xs text-text-muted">
                {loss}% — {loss <= 15 ? "оптимистичная оценка" : loss <= 35 ? "средний показатель по рынку РФ" : "высокий показатель — срочно нужна автоматизация"}.
              </p>
            </div>

            {/* Result */}
            <div className="pt-8 mt-8 border-t border-border flex flex-col items-center">
              <p className="font-display font-medium text-sm text-text-muted mb-2 uppercase tracking-wide">
                {content.calculator.resultLabel}
              </p>
              <div className={`font-display font-bold text-5xl md:text-7xl tracking-tight mb-8 tabular-nums transition-colors duration-300 ${getResultColorClass(loss)}`}>
                {fmt(lossPerMonth)}{" "}
                <span className="text-3xl md:text-5xl text-text-muted">{content.calculator.resultSub}</span>
              </div>
              <a
                href="#chat-widget"
                onClick={handleStopLoss}
                className="w-full md:w-auto px-8 py-4 bg-primary text-heavy font-display font-semibold text-base uppercase tracking-widest rounded-md hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
              >
                Остановить потери
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="mt-8 flex items-center gap-3 text-sm text-text-muted font-body justify-center w-full">
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span>Расчёт основан на средних данных по рынку РФ за 2026 год.</span>
        </div>

        {/* Agent Prompt Box */}
        <div className="mt-8 w-full rounded-md p-6 text-center border border-primary/20 bg-primary/5 shadow-subtle relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
           <h3 className="font-display font-semibold text-lg text-heavy mb-3">
             Как остановить потери? Спросите агента по кнопке выше 👆
           </h3>
           <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto font-body">
             <strong className="text-heavy font-semibold">Это не демо.</strong> Это реальный автономный агент, работающий на том же движке, который мы внедряем клиентам.
             <br className="hidden sm:block" />
             Он <span className="text-primary font-medium">уже знает</span> вашу сумму потерь из калькулятора. Попробуйте спросить его, как вернуть упущенную прибыль.
           </p>
        </div>
      </div>

      {/* Mobile sticky result bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface border-t border-border shadow-floating z-40 md:hidden">
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-display uppercase tracking-wider text-text-muted">Потери / мес</span>
            <span className={`font-display font-bold text-lg tabular-nums transition-colors duration-300 ${getResultColorClass(loss)}`}>{fmt(lossPerMonth)} ₽</span>
          </div>
          <a
            href="#chat-widget"
            onClick={handleStopLoss}
            className="px-6 py-3 bg-primary text-heavy font-display font-semibold text-sm uppercase tracking-wide rounded-md hover:bg-primary-hover transition-colors whitespace-nowrap active:scale-95"
          >
            Остановить
          </a>
        </div>
      </div>
    </section>
  );
}
