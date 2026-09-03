"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Server, Lock, Database, Cpu, ArrowRight, Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";

interface PipelineNode {
  id: string;
  stepNumber: number;
  title: string;
  sub: string;
  iconName: "chat" | "server" | "shield" | "db" | "ai" | "crm";
  techStack: string;
  securityNote: string;
  latency: string;
}

const NODES: PipelineNode[] = [
  {
    id: "inbound",
    stepNumber: 1,
    title: "Входящий канал",
    sub: "WhatsApp / Telegram / Сайт",
    iconName: "chat",
    techStack: "Официальные API (WABA, Telegram Bot API)",
    securityNote: "Шифрование трафика по SSL/TLS. Прямой вебхук на выделенный VPS.",
    latency: "50 мс"
  },
  {
    id: "docker_vps",
    stepNumber: 2,
    title: "Контур n8n в РФ",
    sub: "Защищенный Docker (Москва)",
    iconName: "server",
    techStack: "Self-hosted Docker n8n Community",
    securityNote: "Сервер физически расположен в РФ. Корневой сертификат НУЦ Минцифры РФ.",
    latency: "120 мс"
  },
  {
    id: "sanitizer",
    stepNumber: 3,
    title: "Санитайзер 152-ФЗ",
    sub: "Модуль деперсонализации",
    iconName: "shield",
    techStack: "RegEx Sanitizer + PII Masking",
    securityNote: "Автоматически вырезает телефоны, ФИО и медицинские данные до отправки в сеть.",
    latency: "30 мс"
  },
  {
    id: "rag_db",
    stepNumber: 4,
    title: "Postgres RAG База",
    sub: "Векторные регламенты",
    iconName: "db",
    techStack: "PostgreSQL pgvector / JSON-кэш",
    securityNote: "Локальное хранилище прайс-листов, структуры услуг и расписания.",
    latency: "80 мс"
  },
  {
    id: "llm_router",
    stepNumber: 5,
    title: "LLM Роутер",
    sub: "GigaChat / Gemini",
    iconName: "ai",
    techStack: "GigaChat Pro (152-ФЗ) / Gemini Flash",
    securityNote: "Анализ смысла обезличенного запроса без риска утечки персональных данных.",
    latency: "1.2 сек"
  },
  {
    id: "crm_sync",
    stepNumber: 6,
    title: "Двусторонняя CRM",
    sub: "Ident / YCLIENTS / 1C",
    iconName: "crm",
    techStack: "REST API + Webhooks",
    securityNote: "Создание заказ-наряда или бронирование слота в расписании в реальном времени.",
    latency: "250 мс"
  }
];

export default function SecurityPipelineFlow() {
  const [activeNodeId, setActiveNodeId] = useState<string>("sanitizer");
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[2];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoTour) {
      interval = setInterval(() => {
        setActiveNodeId((prevId) => {
          const currentIdx = NODES.findIndex((n) => n.id === prevId);
          const nextIdx = (currentIdx + 1) % NODES.length;
          return NODES[nextIdx].id;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoTour]);

  return (
    <div className="my-8 bg-[#0F231B] text-white rounded-3xl p-5 sm:p-7 border border-[#00E68A]/30 shadow-2xl overflow-hidden relative font-sans">
      {/* Background neon glows */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#00E68A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E68A]/20 border border-[#00E68A]/40 text-[#00E68A] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Инфраструктура & 152-ФЗ РФ
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Архитектура защищенного контура Samartsev AI
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Нажмите на любой узел пайплайна, чтобы увидеть протоколы шифрования и деперсонализации данных.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAutoTour(!isAutoTour)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
              isAutoTour
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
            }`}
          >
            {isAutoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoTour ? "Пауза" : "Авто-тур"}
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Steps Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 my-6 relative z-10">
        {NODES.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => { setActiveNodeId(node.id); setIsAutoTour(false); }}
              className={`p-3 rounded-2xl text-left transition-all relative border flex flex-col justify-between min-h-[110px] ${
                isActive
                  ? "bg-[#183B2E] border-[#00E68A] shadow-lg shadow-[#00E68A]/20 ring-2 ring-[#00E68A]/40 scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[#00E68A]">
                  #{node.stepNumber}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{node.latency}</span>
              </div>

              <div>
                <div className="font-bold text-xs text-white leading-tight mb-1">{node.title}</div>
                <div className="text-[10px] text-gray-300 truncate">{node.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Active Node */}
      <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-[#00E68A]/30 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E68A]/20 text-[#00E68A] flex items-center justify-center font-bold font-display shrink-0">
              #{activeNode.stepNumber}
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                {activeNode.title}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-[#00E68A] border border-emerald-800 font-normal">
                  {activeNode.sub}
                </span>
              </h4>
              <p className="text-xs text-gray-300 font-mono mt-0.5">Стек: {activeNode.techStack}</p>
            </div>
          </div>

          <div className="text-xs text-[#00E68A] font-mono bg-[#00E68A]/10 px-3 py-1.5 rounded-lg border border-[#00E68A]/20 shrink-0">
            ⚡ Задержка узла: {activeNode.latency}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00E68A]" />
              Защита и соответствие 152-ФЗ РФ
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed m-0">
              {activeNode.securityNote}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E68A]" />
              Гарантия надежности Samartsev AI
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed m-0">
              Все компоненты разворачиваются на сервере заказчика (Self-Hosted). Никаких сторонних подписок и риска блокировки аккаунтов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
