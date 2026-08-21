'use client';

import React, { useState, useEffect } from 'react';
import { Zap, TrendingDown, Play, Pause, ArrowRight, ShieldCheck } from 'lucide-react';

interface TimeStep {
  id: string;
  timeLabel: string;
  subLabel: string;
  conversion: number;
  lossPercent: number;
  revenuePer100Leads: number; // при среднем чеке 15 000 ₽
  status: string;
  statusType: 'success' | 'warning' | 'danger' | 'critical';
  clientAction: string;
  quote: string;
}

const TIME_STEPS: TimeStep[] = [
  {
    id: '3sec',
    timeLabel: '⚡ 3 секунды',
    subLabel: 'ИИ-агент Samartsev AI',
    conversion: 82,
    lossPercent: 0,
    revenuePer100Leads: 1230000,
    status: '🔥 Максимальный захват',
    statusType: 'success',
    clientAction: 'Клиент держит телефон в руках. Ответ мгновенный — запись оформляется за 60 секунд.',
    quote: '«Здравствуйте! У нас есть окно завтра на 10:30 и 16:00. Записать вас?»'
  },
  {
    id: '5min',
    timeLabel: '⏱️ 5 минут',
    subLabel: 'Шустрый менеджер',
    conversion: 56,
    lossPercent: 26,
    revenuePer100Leads: 840000,
    status: '⚡ Внимание остывает',
    statusType: 'warning',
    clientAction: 'Клиент уже отвлекся на дела или открыл сайт второго конкурента в выдаче Яндекса.',
    quote: '«Добрый день, минутку, сейчас уточню свободное время у мастера...»'
  },
  {
    id: '30min',
    timeLabel: '⏳ 30 минут',
    subLabel: 'Средний отдел продаж',
    conversion: 21,
    lossPercent: 61,
    revenuePer100Leads: 315000,
    status: '⚠️ Критическое падение',
    statusType: 'danger',
    clientAction: 'Клиент отправил запросы в 4 другие компании. 1-й ответивший уже забирает лид.',
    quote: '«Извините за ожидание, вы ещё ищете запись на завтра?»'
  },
  {
    id: '2hours',
    timeLabel: '😴 2 часа',
    subLabel: 'Обед / Занятость',
    conversion: 7,
    lossPercent: 75,
    revenuePer100Leads: 105000,
    status: '❌ Сделка сорвана',
    statusType: 'critical',
    clientAction: 'Потребность закрыта конкурентом. Диалог переходит в категорию «прочитано без ответа».',
    quote: '«Спасибо, мне уже перезвонили из другой клиники и записали»'
  },
  {
    id: '12hours',
    timeLabel: '🌙 12 часов',
    subLabel: 'Заявка ночью до утра',
    conversion: 2,
    lossPercent: 80,
    revenuePer100Leads: 30000,
    status: '💀 Полная потеря рекламного бюджета',
    statusType: 'critical',
    clientAction: 'Утром клиент уже забыл, что оставлял заявку. Рекламный клик слит впустую.',
    quote: '«Неактуально. Уже не нужно, спасибо.»'
  }
];

export default function ConversionSpeedSimulator() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeStep = TIME_STEPS[activeIndex];

  // Auto-play simulator loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % TIME_STEPS.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const maxRevenue = TIME_STEPS[0].revenuePer100Leads;
  const lostRevenue = maxRevenue - activeStep.revenuePer100Leads;

  return (
    <div className="my-10 bg-[#0F231B] text-white rounded-3xl p-6 sm:p-8 border border-[#00E68A]/30 shadow-xl overflow-hidden relative">
      {/* Background Neon Glow Accent */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#00E68A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E68A]/20 border border-[#00E68A]/40 text-[#00E68A] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            Интерактивный симулятор
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Зависимость конверсии от скорости первого ответа
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Нажмите на интервал времени или запустите автосимуляцию, чтобы увидеть математику потерь
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shrink-0 ${
            isPlaying
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Пауза
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Автосимуляция
            </>
          )}
        </button>
      </div>

      {/* Time Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8 relative z-10">
        {TIME_STEPS.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.id}
              onClick={() => {
                setActiveIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-2xl text-left transition-all duration-300 relative border ${
                isActive
                  ? 'bg-[#183B2E] border-[#00E68A] shadow-lg shadow-[#00E68A]/20 scale-[1.02] ring-2 ring-[#00E68A]/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="font-bold text-xs sm:text-sm text-white mb-0.5">{step.timeLabel}</div>
              <div className="text-[10px] text-gray-400 truncate">{step.subLabel}</div>
            </button>
          );
        })}
      </div>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 relative z-10">
        {/* Metric 1: Conversion Rate */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div className="text-xs text-gray-400 font-medium mb-1">Конверсия входящей заявки</div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-4xl sm:text-5xl font-black font-display transition-all duration-500 ${
                activeStep.conversion >= 50
                  ? 'text-[#00E68A]'
                  : activeStep.conversion >= 20
                  ? 'text-amber-400'
                  : 'text-rose-500'
              }`}
            >
              {activeStep.conversion}%
            </span>
            {activeStep.lossPercent > 0 && (
              <span className="text-xs font-bold text-rose-400">
                (-{activeStep.lossPercent}%)
              </span>
            )}
          </div>
          {/* Progress bar */}
          <div className="w-full bg-white/10 h-2.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                activeStep.conversion >= 50
                  ? 'bg-[#00E68A]'
                  : activeStep.conversion >= 20
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${activeStep.conversion}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Revenue / Losses per 100 Leads */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div className="text-xs text-gray-400 font-medium mb-1">
            Выручка на 100 лидов (чек 15 000 ₽)
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display transition-all duration-300">
              {activeStep.revenuePer100Leads.toLocaleString('ru-RU')} ₽
            </div>
            {lostRevenue > 0 ? (
              <div className="text-xs font-bold text-rose-400 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                Слито в трубу: -{lostRevenue.toLocaleString('ru-RU')} ₽
              </div>
            ) : (
              <div className="text-xs font-bold text-[#00E68A] mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                0 ₽ потерь (100% потенциала)
              </div>
            )}
          </div>
          <div className="text-[10px] text-gray-400 mt-2">
            *При среднем цикле сделки и конверсии в продажу
          </div>
        </div>

        {/* Metric 3: Client Psychological State */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-1">Поведение клиента в момент ответа</div>
            <div className="text-sm font-bold text-white mb-1.5 transition-all duration-300">{activeStep.status}</div>
            <p className="text-xs text-gray-300 leading-relaxed min-h-[36px]">{activeStep.clientAction}</p>
          </div>
          <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] italic text-gray-300">
            {activeStep.quote}
          </div>
        </div>
      </div>

      {/* Bottom Takeaway / CTA Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
          <div className="w-8 h-8 rounded-full bg-[#00E68A]/20 text-[#00E68A] flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-white">Автономный ИИ-агент Samartsev AI</strong> отвечает за 2.5 секунды круглосуточно и удерживает конверсию на уровне 80%+.
          </div>
        </div>

        <a
          href="/#calculator"
          className="px-5 py-2.5 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-xs inline-flex items-center gap-2 transition-transform hover:scale-105 shrink-0 shadow-lg shadow-[#00E68A]/20"
        >
          Рассчитать потери в калькуляторе <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
