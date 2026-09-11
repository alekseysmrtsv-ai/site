"use client";

import React from "react";
import { SearchCheck, Rocket, Scaling, ArrowRight, CheckCircle2 } from "lucide-react";

export default function B2BWorkflowSteps() {
  const steps = [
    {
      num: "01",
      badge: "1–3 дня",
      title: "Аудит процессов и оцифровка потерь",
      description:
        "Анализируем, где ваша команда тратит больше всего часов на рутину: задержки в выставлении КП, дублирование данных в 1С или постоянные вопросы руководству. Рассчитываем точную экономику и ROI.",
      bullets: [
        "Интервью с руководителями и фиксация узких мест",
        "Карта интеграций (CRM, 1С, мессенджеры, почта)",
        "ТЗ и расчет срока окупаемости в цифрах",
      ],
      icon: <SearchCheck className="w-6 h-6 text-primary" />,
    },
    {
      num: "02",
      badge: "10–14 дней",
      title: "Быстрый MVP-прототип под ключ",
      description:
        "Не создаем проект на полгода: берем один ключевой участок с наибольшим эффектом (квалификация лидов, генерация КП или база знаний) и запускаем работающего ИИ-агента в боевом контуре.",
      bullets: [
        "Настройка логики на n8n и подключение к CRM",
        "Калибровка на 50+ ваших реальных исторических заявках",
        "Тестирование сотрудниками без риска ошибок",
      ],
      icon: <Rocket className="w-6 h-6 text-emerald-500" />,
    },
    {
      num: "03",
      badge: "от 1 месяца",
      title: "Масштабирование и SLA-сопровождение",
      description:
        "После подтверждения окупаемости MVP масштабируем решение на другие отделы: подключаем операционку, автодоговоры, отчетность и корпоративный RAG. Обеспечиваем бесперебойную поддержку 24/7.",
      bullets: [
        "Сквозное объединение продаж, бэк-офиса и базы знаний",
        "Обучение команды и онбординг сотрудников",
        "Мониторинг доступности 99.9% и постоянное дообучение",
      ],
      icon: <Scaling className="w-6 h-6 text-amber-500" />,
    },
  ];

  return (
    <section id="workflow" className="w-full py-20 bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider">
            <span>🚀</span>
            <span>Понятный путь внедрения</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            Как мы внедряем автоматизацию: от аудита до масштабирования
          </h2>
          <p className="text-slate-700 text-base md:text-lg font-body leading-relaxed">
            Без затягивания сроков на месяцы. Вы видите первый осязаемый результат и экономию времени уже через две недели после старта.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-bg border-2 border-border hover:border-slate-400 transition-all flex flex-col justify-between space-y-6 shadow-subtle group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-3xl text-emerald-500 group-hover:scale-105 transition-transform">
                    {step.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs font-bold text-slate-700">
                    {step.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-inner">
                  {step.icon}
                </div>

                <h3 className="font-display font-bold text-xl text-heavy leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                {step.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
