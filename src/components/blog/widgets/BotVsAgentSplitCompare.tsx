"use client";

import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle2, Bot, Sparkles, Play, Pause, RotateCcw, ArrowRight, Zap } from "lucide-react";

interface CompareScenario {
  id: string;
  label: string;
  clientQuery: string;
  clientTime: string;
  botResponse: string;
  botStatus: string;
  agentResponse: string;
  agentStatus: string;
  agentCrmNote: string;
}

const SCENARIOS: CompareScenario[] = [
  {
    id: "slang",
    label: "Сленг и разговорная речь",
    clientQuery: "Салют! Завтра после шести вечера можно залететь на замену колодок и сколько по бабкам выйдет на Солярис?",
    clientTime: "19:40",
    botResponse: "Извините, я вас не понял. Пожалуйста, выберите нужный пункт меню цифрой:\n1. Услуги\n2. Прайс-лист\n3. Адрес",
    botStatus: "💀 Тупик диалога: клиент закрывает чат и уходит к конкурентам",
    agentResponse: "Добрый вечер! Замена передних колодок на Hyundai Solaris — 1 600 ₽ (колодки оригинал/Hi-Q в наличии от 2 100 ₽).\n\nЗавтра после 18:00 есть свободный слесарный пост на 18:30 и 19:15. Какое время забронировать за вами?",
    agentStatus: "🔥 100% понимание сленга: бронь создана за 2 секунды",
    agentCrmNote: "Заказ-наряд #4928 создан в 1С:Автосервис. Пост №3."
  },
  {
    id: "night_symptoms",
    label: "Ночные симптомы (Медицина)",
    clientQuery: "Добрый вечер! Удалили зуб 2 дня назад, сейчас ноет десна и температура 37.4. Это нормально или срочно к врачу?",
    clientTime: "23:15",
    botResponse: "Режим работы клиники с 09:00 до 21:00. Оставьте номер телефона, администратор перезвонит вам завтра в рабочее время.",
    botStatus: "❌ Ночной слив: пациент в панике вызывает скорую или идет в круглосуточную",
    agentResponse: "Здравствуйте! Небольшая температура до 37.5 в первые 48 часов возможна, но нарастающая ноющая боль требует осмотра хирурга, чтобы исключить воспаление лунки (альвеолит).\n\nЗавтра на 09:00 есть экстренное окно к дежурному хирургу клиники на Ленина. Записать вас?",
    agentStatus: "✔ Эмпатия и экспертность: пациент успокоен и записан на утро",
    agentCrmNote: "Экстренная карточка создана в МИС Ident. Окно 09:00."
  },
  {
    id: "complex_beauty",
    label: "Многосоставный запрос (Бьюти)",
    clientQuery: "Здравствуйте, хочу на маникюр со снятием и френчем, но у меня только 1.5 часа свободного времени. Успеем?",
    clientTime: "14:20",
    botResponse: "Спасибо за обращение! Нажмите 1 чтобы посмотреть прайс на маникюр.",
    botStatus: "❌ Игнорирование ограничения по времени: потеря клиента",
    agentResponse: "Добрый день! Комплекс «снятие + маникюр + френч» у мастера в 2 руки занимает ровно 1 час 45 минут, но мы можем сделать эту процедуру в 4 руки за 60 минут (+500 ₽)!\n\nСвободное окно на экспресс в 4 руки есть сегодня в 16:00. Подходит?",
    agentStatus: "✦ Продажа в 4 руки (+500 ₽) с учетом лимита времени",
    agentCrmNote: "Создана запись в YCLIENTS на 2 мастеров параллельно."
  }
];

export default function BotVsAgentSplitCompare() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const scenario = SCENARIOS[activeIdx];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % SCENARIOS.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className="my-8 bg-[#0F231B] text-white rounded-3xl p-5 sm:p-7 border border-[#00E68A]/30 shadow-2xl overflow-hidden relative font-sans">
      {/* Background accents */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#00E68A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E68A]/20 border border-[#00E68A]/40 text-[#00E68A] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            Remotion Сплит-Сравнение
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Кнопочный бот за 15к vs Автономный ИИ-агент
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Посмотрите наглядно, почему жесткие скрипты убивают конверсию на первом же нестандартном вопросе.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
              isAutoPlay
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
            }`}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoPlay ? "Пауза" : "Авто-ролик"}
          </button>
        </div>
      </div>

      {/* Scenario Selector Chips */}
      <div className="flex flex-wrap gap-2 my-5 relative z-10">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => { setActiveIdx(idx); setIsAutoPlay(false); }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              idx === activeIdx
                ? "bg-white text-[#111111] shadow-lg font-bold"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Client Message Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Входящее сообщение клиента</span>
          <span className="text-gray-400 font-mono">{scenario.clientTime}</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-100 font-medium leading-relaxed m-0 italic">
          «{scenario.clientQuery}»
        </p>
      </div>

      {/* Split Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        {/* Left Column: Legacy Bot (Fail) */}
        <div className="bg-[#1a1113] rounded-2xl border border-rose-500/30 p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Обычный чат-бот (Дерево кнопок)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 font-mono">
                15 000 ₽ на Авито
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-rose-900/30 text-xs sm:text-sm text-gray-300 whitespace-pre-line leading-relaxed mb-4 font-mono">
              {scenario.botResponse}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/40 text-xs text-rose-300 flex items-start gap-2">
            <span className="shrink-0 mt-0.5 font-bold">✖</span>
            <span>{scenario.botStatus}</span>
          </div>
        </div>

        {/* Right Column: Autonomous AI Agent (Win) */}
        <div className="bg-[#0b1f17] rounded-2xl border border-[#00E68A]/40 p-5 flex flex-col justify-between shadow-xl ring-1 ring-[#00E68A]/20">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#00E68A]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00E68A]">
                <CheckCircle2 className="w-4 h-4 text-[#00E68A]" />
                <span>Автономный ИИ-агент Samartsev AI</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/90 text-[#00E68A] font-mono border border-emerald-800">
                NLU + RAG + 152-ФЗ
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs sm:text-sm text-gray-100 whitespace-pre-line leading-relaxed mb-4">
              {scenario.agentResponse}
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-[#00E68A]/10 border border-[#00E68A]/30 text-xs text-[#00E68A] flex items-start gap-2 font-medium">
              <span className="shrink-0 mt-0.5">✔</span>
              <span>{scenario.agentStatus}</span>
            </div>
            <div className="text-[11px] text-gray-300 font-mono pl-1">
              ⚡ {scenario.agentCrmNote}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="text-xs sm:text-sm text-gray-300">
          ИИ-агент удерживает <strong className="text-white">конверсию 80%+</strong> даже на разговорном сленге и в нестандартных ситуациях.
        </div>
        <a
          href="/#calculator"
          className="px-4 py-2 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-xs inline-flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
        >
          Рассчитать эффект внедрения <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
