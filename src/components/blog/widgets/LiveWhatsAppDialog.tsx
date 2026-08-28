"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  CheckCheck,
  Send,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CalendarCheck
} from "lucide-react";

export type DialogNiche = "stomatology" | "beauty" | "auto";

interface DialogStep {
  clientText: string;
  clientTime: string;
  agentText: string;
  agentTime: string;
  responseTimeMs: number;
  integrationBadge: string;
  crmActionText: string;
}

interface NicheDialogScenario {
  id: DialogNiche;
  title: string;
  crmName: string;
  avatar: string;
  steps: DialogStep[];
}

const SCENARIOS: Record<DialogNiche, NicheDialogScenario> = {
  stomatology: {
    id: "stomatology",
    title: "Клиника «ДентаПро»",
    crmName: "Ident / YCLIENTS",
    avatar: "🏥",
    steps: [
      {
        clientText: "Здравствуйте! Разболелся зуб под коронкой, пульсирует. Есть окно на завтра к терапевту?",
        clientTime: "23:45",
        agentText: "Добрый вечер! При пульсирующей боли под коронкой важно пройти осмотр терапевта-эндодонтиста с прицельным снимком (КТ — 3 500 ₽, прицельный снимок — 650 ₽).\n\nЗавтра на филиале на Ленина есть свободные окна к доктору Смирнову А.В.:\n• 10:30\n• 14:00\n\nКакое время забронировать за вами?",
        agentTime: "23:45",
        responseTimeMs: 2100,
        integrationBadge: "Слот Ident проверен по API",
        crmActionText: "Создана предзапись пациента в Ident. Памятка отправлена."
      },
      {
        clientText: "Давайте на 10:30. Меня зовут Игорь, 8 (916) 123-45-67.",
        clientTime: "23:46",
        agentText: "Игорь, отлично! Записал вас на завтра в 10:30 к доктору Смирнову А.В. (ул. Ленина, 45).\n\nПаспорт возьмите с собой для первичного договора. У клиники есть бесплатная парковка. Отправил вам памятку перед приемом!",
        agentTime: "23:46",
        responseTimeMs: 1800,
        integrationBadge: "Бронь кресла зафиксирована",
        crmActionText: "Пациент записан в МИС Ident. SMS-напоминание запланировано на утро."
      }
    ]
  },
  beauty: {
    id: "beauty",
    title: "Студия красоты «Эстетика»",
    crmName: "YCLIENTS / Dikidi",
    avatar: "✨",
    steps: [
      {
        clientText: "Добрый вечер! Хочу записаться к Анне на сложное окрашивание аиртач на пятницу или субботу. Какая цена на длинные волосы?",
        clientTime: "21:20",
        agentText: "Добрый вечер! Анна — наш ведущий колорист. Окрашивание Airtouch на 3-ю длину занимает ~3.5–4 часа. Стоимость под ключ с уходом Olaplex — 12 500 ₽.\n\nСвободные окна у Анны:\n• Пятница: 11:00\n• Суббота: 15:30\n\nКакое время забронировать?",
        agentTime: "21:20",
        responseTimeMs: 2200,
        integrationBadge: "YCLIENTS расписание проверено",
        crmActionText: "Проверена занятость мастера Анны (длительность 210 мин)."
      },
      {
        clientText: "Давайте в субботу на 15:30! А успеем еще маску для увлажнения сделать?",
        clientTime: "21:21",
        agentText: "Да, конечно! Добавил в запись молекулярный уход Tokio Inkarami (+2 500 ₽). Он отлично защищает волосы после осветления.\n\nЗаписал вас в субботу в 15:30 к Анне. Ждем вас на ул. Арбат, 12!",
        agentTime: "21:21",
        responseTimeMs: 1900,
        integrationBadge: "Up-sell +2 500 ₽ добавлен в чек",
        crmActionText: "Карточка в YCLIENTS обновлена: Airtouch + Tokio Inkarami (15 000 ₽)."
      }
    ]
  },
  auto: {
    id: "auto",
    title: "Автотехцентр «Моторс»",
    crmName: "1С:Автосервис / Альфа-Авто",
    avatar: "🔧",
    steps: [
      {
        clientText: "Здравствуйте! Плановое ТО на Kia Sportage 2.0 2021 года сколько выйдет по работам и расходникам?",
        clientTime: "22:10",
        agentText: "Здравствуйте! Плановое ТО на Kia Sportage 2.0 (масло синтетика 5W-30 + масляный, воздушный и салонный фильтры + диагностика ходовой в подарок):\n• Работы — 2 200 ₽\n• Масло и фильтры — 6 800 ₽\n\nЗавтра свободен слесарный пост ТО на 11:00 и 16:30. На какое время записать автомобиль?",
        agentTime: "22:10",
        responseTimeMs: 2300,
        integrationBadge: "Прайс 1С:Автосервис подтянут",
        crmActionText: "Проверен регламент ТО и наличие фильтров на складе."
      },
      {
        clientText: "Запишите на 11:00. Госномер О777АА777, Сергей.",
        clientTime: "22:11",
        agentText: "Сергей, забронировал пост №2 на завтра в 11:00 для Kia Sportage (О777АА777). Мастер-приемщик Дмитрий встретит вас у въезда.\n\nГео-метку и схему заезда отправил в следующем сообщении!",
        agentTime: "22:11",
        responseTimeMs: 1700,
        integrationBadge: "Подъемник №2 забронирован",
        crmActionText: "Заказ-наряд сформирован в 1С. Слесарь назначен."
      }
    ]
  }
};

interface LiveWhatsAppDialogProps {
  initialNiche?: DialogNiche;
  showNicheTabs?: boolean;
}

export default function LiveWhatsAppDialog({
  initialNiche = "stomatology",
  showNicheTabs = true
}: LiveWhatsAppDialogProps) {
  const [activeNiche, setActiveNiche] = useState<DialogNiche>(initialNiche);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: "client" | "agent"; text: string; time: string }>>([]);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [activeCrmBadge, setActiveCrmBadge] = useState<string>("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[activeNiche];

  // Reset dialog when switching niche
  useEffect(() => {
    setCurrentStepIndex(0);
    setMessages([]);
    setIsTyping(false);
    setActiveCrmBadge("");
    
    // Auto-trigger first client message after 400ms
    const timer = setTimeout(() => {
      triggerStep(0, activeNiche);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeNiche]);

  const triggerStep = (stepIdx: number, nicheKey: DialogNiche) => {
    const sc = SCENARIOS[nicheKey];
    if (stepIdx >= sc.steps.length) return;

    const currentSt = sc.steps[stepIdx];

    // 1. Add Client message
    setMessages((prev) => [
      ...prev,
      { sender: "client", text: currentSt.clientText, time: currentSt.clientTime }
    ]);
    setIsTyping(true);

    // 2. Wait 1.2s simulated typing -> agent responds
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: currentSt.agentText, time: currentSt.agentTime }
      ]);
      setActiveCrmBadge(currentSt.crmActionText);

      // Scroll to bottom
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 1200);
  };

  // Auto-play loop for Remotion / demo recording
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAutoPlay) {
      timeout = setTimeout(() => {
        if (currentStepIndex < scenario.steps.length - 1) {
          const nextIdx = currentStepIndex + 1;
          setCurrentStepIndex(nextIdx);
          triggerStep(nextIdx, activeNiche);
        } else {
          // Restart
          setCurrentStepIndex(0);
          setMessages([]);
          triggerStep(0, activeNiche);
        }
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isAutoPlay, currentStepIndex, activeNiche]);

  const handleNextStep = () => {
    if (currentStepIndex < scenario.steps.length - 1 && !isTyping) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      triggerStep(nextIdx, activeNiche);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setMessages([]);
    setIsTyping(false);
    setActiveCrmBadge("");
    triggerStep(0, activeNiche);
  };

  return (
    <div className="my-8 bg-[#0F231B] text-white rounded-3xl p-5 sm:p-7 border border-[#00E68A]/30 shadow-2xl overflow-hidden relative font-sans">
      {/* Glow accents */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#00E68A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E68A]/20 border border-[#00E68A]/40 text-[#00E68A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Remotion-Ready Демо
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Интерактивный симулятор диалога в WhatsApp 24/7
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Посмотрите, как ИИ-агент Samartsev AI ведёт ночной диалог, проверяет МИС и закрывает запись за 2 секунды.
          </p>
        </div>

        {/* Action Controls */}
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
            {isAutoPlay ? "Пауза" : "Авто-демо"}
          </button>
          <button
            onClick={handleReset}
            title="Перезапустить диалог"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Niche Switcher Tabs */}
      {showNicheTabs && (
        <div className="flex flex-wrap gap-2 my-5 relative z-10">
          <button
            onClick={() => { setActiveNiche("stomatology"); setIsAutoPlay(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeNiche === "stomatology"
                ? "bg-[#00E68A] text-[#111111] shadow-md shadow-[#00E68A]/20 font-bold"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            <span>🏥</span> Стоматология (Ident)
          </button>
          <button
            onClick={() => { setActiveNiche("beauty"); setIsAutoPlay(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeNiche === "beauty"
                ? "bg-[#00E68A] text-[#111111] shadow-md shadow-[#00E68A]/20 font-bold"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            <span>✨</span> Салон красоты (YCLIENTS)
          </button>
          <button
            onClick={() => { setActiveNiche("auto"); setIsAutoPlay(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeNiche === "auto"
                ? "bg-[#00E68A] text-[#111111] shadow-md shadow-[#00E68A]/20 font-bold"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            <span>🔧</span> Автосервис (1С:Авто)
          </button>
        </div>
      )}

      {/* Main Grid: Phone Frame on Left, Live System Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start relative z-10">
        {/* Smartphone Frame */}
        <div className="bg-[#111b21] rounded-2xl border-2 border-emerald-900/60 shadow-2xl overflow-hidden flex flex-col h-[460px]">
          {/* WhatsApp Header */}
          <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-[#2a3942] text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-[#00E68A]/40 flex items-center justify-center text-base">
                {scenario.avatar}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-gray-100 flex items-center gap-1.5">
                  {scenario.title}
                  <span className="w-2 h-2 rounded-full bg-[#00E68A] animate-ping" />
                </div>
                <div className="text-[11px] text-[#00E68A] font-medium flex items-center gap-1">
                  ИИ-Ассистент 24/7 • в сети
                </div>
              </div>
            </div>
            <div className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-[#00E68A] font-mono">
              WhatsApp
            </div>
          </div>

          {/* Chat Message Thread */}
          <div
            ref={chatScrollRef}
            className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-[#0b141a] bg-opacity-95"
            style={{
              backgroundImage: "radial-gradient(#1f2c34 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          >
            {/* Day timestamp pill */}
            <div className="text-center my-1">
              <span className="text-[10px] bg-[#182229] text-gray-400 px-2.5 py-1 rounded-md shadow-sm">
                СЕГОДНЯ • НЕРАБОЧЕЕ ВРЕМЯ (НОЧЬ)
              </span>
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === "client" ? "items-start" : "items-end"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md whitespace-pre-line ${
                    msg.sender === "client"
                      ? "bg-[#202c33] text-gray-100 rounded-tl-sm border border-[#2a3942]"
                      : "bg-[#005c4b] text-white rounded-tr-sm border border-[#00a884]/40"
                  }`}
                >
                  <p className="m-0">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-300/70">
                    <span>{msg.time}</span>
                    {msg.sender === "agent" && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start animate-in fade-in duration-200">
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-sm border border-[#00a884]/40 flex items-center gap-1.5 text-xs shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce" />
                  <span className="text-[10px] text-emerald-200 ml-1 font-mono">
                    ИИ сверяет слоты в CRM...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Next Step Bar */}
          <div className="p-3 bg-[#202c33] border-t border-[#2a3942] flex items-center justify-between gap-2">
            {currentStepIndex < scenario.steps.length - 1 ? (
              <button
                onClick={handleNextStep}
                disabled={isTyping}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
              >
                <span>Отправить следующий шаг диалога</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="w-full py-2 px-3 rounded-xl bg-emerald-950/80 border border-[#00E68A]/40 text-center text-xs text-[#00E68A] font-medium flex items-center justify-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5" />
                Диалог успешно завершен • Сделка оформлена в {scenario.crmName}
              </div>
            )}
          </div>
        </div>

        {/* Live System Telemetry / Behind the scenes */}
        <div className="space-y-4">
          {/* Card 1: Speed Benchmark */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="text-xs text-gray-400 font-medium mb-2 flex items-center justify-between">
              <span>Скорость первого контакта</span>
              <span className="text-[#00E68A] font-bold font-mono">2.1 сек</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E68A]/20 text-[#00E68A] flex items-center justify-center font-bold font-display shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs text-gray-300 leading-relaxed">
                Пока конкуренты спят или тратят 15+ минут на ручной набор, ИИ моментально забирает лида.
              </div>
            </div>
          </div>

          {/* Card 2: CRM & Database Action */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="text-xs text-gray-400 font-medium mb-2 flex items-center justify-between">
              <span>Синхронизация с базой</span>
              <span className="text-xs text-emerald-400 font-mono">{scenario.crmName}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-200 leading-relaxed">
              {activeCrmBadge || "Ожидание подтверждения брони..."}
            </div>
          </div>

          {/* Card 3: 152-FZ Security Status */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="text-xs text-gray-400 font-medium mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00E68A]" />
              <span>Безопасность 152-ФЗ РФ</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              Номера телефонов и медицинские данные обезличиваются на защищенном VPS-сервере в Москве до обращения к LLM.
            </p>
          </div>

          {/* Direct CTA */}
          <a
            href="https://t.me/samartsev_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-xs inline-flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-[#00E68A]/20 text-center"
          >
            Подключить такой сценарий для {scenario.title} →
          </a>
        </div>
      </div>
    </div>
  );
}
