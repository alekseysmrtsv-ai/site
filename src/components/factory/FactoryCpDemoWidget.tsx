"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText,
  Send,
  X,
  FileCheck2,
  Sparkles,
  Bot,
  Layers,
  MessageSquare
} from "lucide-react";
import { ymEvent } from "@/components/YandexMetrika";

interface QAReply {
  question: string;
  answer: string;
}

const QUICK_QUESTIONS: QAReply[] = [
  {
    question: "Как система подключается к нашей 1С?",
    answer:
      "Подключение идет по официальным API (OData, REST, HTTP-сервисы). Мы не переписываем вашу конфигурацию 1С:ERP / 1С:УНФ и не снимаем её с поддержки. ИИ считывает остатки и сам формирует проект документа «Коммерческое предложение» в вашей базе.",
  },
  {
    question: "Как ИИ считывает сложные сканы и чертежи?",
    answer:
      "Используется модуль Vision OCR: он с точностью 99.4% распознает ГОСТы, марки стали, допуски и размеры даже из рукописных пометок на бланках и многостраничных PDF со сложными таблицами.",
  },
  {
    question: "Сколько стоит пилотный проект?",
    answer:
      "Пилот на одну товарную группу запускается за 10–14 рабочих дней (от 150 000 ₽). Мы настраиваем векторизацию номенклатуры, скидочные сетки завода и калибруем расчет на 50 ваших реальных прошлых спецификациях.",
  },
  {
    question: "Безопасность коммерческой тайны?",
    answer:
      "Все данные остаются в закрытом периметре сертифицированных серверов в РФ или на локальном сервере вашего завода (on-premise). Коммерческие прайсы не передаются в публичные внешние сети. Обязательно подписываем NDA.",
  },
];

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "samartsev_chat_session";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
    window.dispatchEvent(new Event("chat-session-created"));
  }
  return id;
}

function parseMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, lineIndex) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ");
        let cleanLine = line;
        if (isBullet) {
          cleanLine = trimmed.replace(/^([-*•]\s+)/, "");
        }

        const parts = cleanLine.split(/\*\*([^*]+)\*\*/g);
        const content = parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return <strong key={partIndex} className="font-bold text-amber-500">{part}</strong>;
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={lineIndex} className="flex items-start gap-1.5 pl-1">
              <span className="text-amber-500 font-bold mt-1 text-[10px]">•</span>
              <span className="flex-1 text-inherit leading-relaxed">{content}</span>
            </div>
          );
        }

        return (
          <p key={lineIndex} className="min-h-[1em] text-inherit leading-relaxed">
            {content}
          </p>
        );
      })}
    </div>
  );
}

export default function FactoryCpDemoWidget() {
  const [activeTab, setActiveTab] = useState<"demo" | "chat">("demo");
  const [demoMessages, setDemoMessages] = useState<Array<{ role: "client" | "ai" | "user"; text?: string }>>([
    { role: "client" },
    { role: "ai" },
  ]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "ai" | "user"; text: string }>>([
    {
      role: "ai",
      text: "Здравствуйте! Я специализированный ИИ-ассистент Алексея Самарцева по автоматизации заводов и производств.\n\nПомогу разобраться, как сократить расчет сложных спецификаций и выставление КП в 1С с 2–3 дней до 30 секунд. Чем занимается ваше предприятие?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollRefDemo = useRef<HTMLDivElement>(null);
  const scrollRefChat = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (activeTab === "demo" && scrollRefDemo.current) {
      scrollRefDemo.current.scrollTop = scrollRefDemo.current.scrollHeight;
    } else if (activeTab === "chat" && scrollRefChat.current) {
      scrollRefChat.current.scrollTop = scrollRefChat.current.scrollHeight;
    }
  }, [activeTab]);

  useEffect(() => {
    scrollToBottom();
  }, [demoMessages, chatMessages, isLoading, scrollToBottom]);

  // Direct send to n8n AI Agent with prompt-tailored fallback
  const sendToBackendAgent = async (query: string): Promise<string> => {
    try {
      let webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK;
      if (webhookUrl && process.env.NODE_ENV === "production") {
        webhookUrl = webhookUrl.replace("/webhook-test/", "/webhook/");
      }

      if (!webhookUrl) {
        throw new Error("No webhook configured");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          session_id: getSessionId(),
          source: "widget",
          timestamp: Date.now(),
          niche: "prom",
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      return (
        data.response ||
        data.reply ||
        data.text ||
        "Принял ваш запрос! Свяжемся с вами для детального разбора спецификаций вашего завода."
      );
    } catch {
      // Smart local fallback for factory questions
      const lower = query.toLowerCase();
      if (lower.includes("1с") || lower.includes("erp") || lower.includes("унф") || lower.includes("баз")) {
        return "Интеграция с 1С выполняется через штатный протокол OData / REST API. ИИ считывает остатки со складов завода, учитывает резервы и автоматически создает проект документа «Коммерческое предложение» в вашей 1С без доработки конфигурации.\n\nКакую конфигурацию 1С вы используете на предприятии?";
      } else if (lower.includes("чертеж") || lower.includes("скан") || lower.includes("pdf") || lower.includes("тз") || lower.includes("гост")) {
        return "Модуль Vision OCR оцифровывает спецификации из многостраничных PDF, Excel и чертежей деталей: извлекает марку стали, ГОСТ, габариты и рассчитывает норматив станко-часов цехов.\n\nВ каком формате заказчики чаще всего присылают заявки — PDF или Excel?";
      } else if (lower.includes("цен") || lower.includes("стоим") || lower.includes("срок") || lower.includes("пилот")) {
        return "Базовый пилот на одну товарную группу запускается за 10–14 рабочих дней (от 150 000 ₽). Мы калибруем точность расчета на массиве из 50 ваших реальных прошлых спецификаций.\n\nХотите провести бесплатный экспресс-аудит спецификаций?";
      } else if (lower.includes("безопасн") || lower.includes("тайн") || lower.includes("152") || lower.includes("сервер")) {
        return "Все данные остаются в закрытом периметре сертифицированных серверов в РФ (Selectel) или локально on-premise на сервере завода. Коммерческие прайсы защищены по 152-ФЗ и соглашению NDA.\n\nЕсть ли у вашей службы безопасности строгие регламенты?";
      }

      return "Отличный вопрос по вашему производству! Мы настраиваем алгоритмы расчета индивидуально под технологические карты цехов. Оставьте контакты (телефон или Telegram) — Алексей Самарцев подготовит технический разбор под ваш завод.";
    }
  };

  const handleAskQuickQuestion = async (qa: QAReply) => {
    ymEvent("chat_message_sent", { niche: "prom" });

    if (activeTab === "demo") {
      setDemoMessages((prev) => [
        ...prev,
        { role: "user", text: qa.question },
      ]);
      setIsLoading(true);

      const reply = await sendToBackendAgent(qa.question);
      setIsLoading(false);
      setDemoMessages((prev) => [
        ...prev,
        { role: "ai", text: reply },
      ]);
    } else {
      setChatMessages((prev) => [
        ...prev,
        { role: "user", text: qa.question },
      ]);
      setIsLoading(true);

      const reply = await sendToBackendAgent(qa.question);
      setIsLoading(false);
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: reply },
      ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const query = inputText.trim();
    setInputText("");

    // Track analytics & leads
    ymEvent("chat_message_sent", { niche: "prom" });
    const hasContact = /(\+7|8\d{10}|@\w+|[\w.-]+@[\w.-]+)/i.test(query);
    if (hasContact) {
      ymEvent("chat_lead_captured", { niche: "prom" });
    }

    if (activeTab === "demo") {
      setDemoMessages((prev) => [...prev, { role: "user", text: query }]);
    } else {
      setChatMessages((prev) => [...prev, { role: "user", text: query }]);
    }

    setIsLoading(true);
    const reply = await sendToBackendAgent(query);
    setIsLoading(false);

    if (activeTab === "demo") {
      setDemoMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } else {
      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden font-sans flex flex-col h-[560px]">
      {/* Header */}
      <div className="px-5 py-3 bg-bg/70 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg shrink-0">
            🏭
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-display text-heavy">
                ИИ-инженер завода
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                1С:ERP Онлайн
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              Расчет сложных спецификаций за 30 секунд
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-surface border border-border/80 text-xs">
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-2.5 py-1 rounded-lg font-display text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "demo"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-text-muted hover:text-heavy"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Стенд 1С</span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-2.5 py-1 rounded-lg font-display text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "chat"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-text-muted hover:text-heavy"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Чат с ИИ</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive 1C CP Generation Showcase */}
      {activeTab === "demo" && (
        <div ref={scrollRefDemo} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* 1. Client message bubble */}
          <div className="flex flex-col items-start gap-1 max-w-[92%]">
            <span className="text-[10px] font-medium text-text-muted px-1">
              Заказчик (Отдел комплектации)
            </span>
            <div className="bg-bg border border-border p-3 rounded-2xl rounded-tl-sm text-heavy space-y-2 shadow-subtle">
              <p className="leading-relaxed text-xs">
                Добрый день! Прошу рассчитать поставку трубы бесшовной 159х6 ст20 по ГОСТ 8732-78 — 14 тонн, и фланцы воротниковые 150-16 — 40 шт. Доставка в Екатеринбург.
              </p>
              <div className="p-2 rounded-xl bg-surface border border-border/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-semibold text-heavy truncate text-[11px]">
                    Спецификация_СеверСтрой_№144.pdf
                  </span>
                </div>
                <span className="text-[10px] text-text-muted shrink-0 font-mono">240 КБ</span>
              </div>
            </div>
          </div>

          {/* 2. AI response bubble */}
          <div className="flex flex-col items-end gap-1 max-w-[95%] ml-auto">
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 px-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              ИИ-инженер завода (ответ за 28 секунд)
            </span>
            <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl rounded-tr-sm text-heavy space-y-2.5 shadow-subtle">
              <p className="leading-relaxed text-xs">
                Здравствуйте! Спецификацию оцифровал, номенклатуру и наличие сверил с базой 1С:ERP:
              </p>

              <div className="space-y-1.5 font-mono text-[11px] bg-bg/90 p-2.5 rounded-xl border border-border/70">
                <div className="flex justify-between">
                  <span>1. Труба 159х6 ст20 (14 т):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Склад Екб (22 т)</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Фланец 150-16 ст20 (40 шт):</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">Цех №2 (3 раб. дня)</span>
                </div>
                <div className="flex justify-between border-t border-border pt-1 font-bold text-heavy">
                  <span>Итого со скидкой завода 7.5%:</span>
                  <span className="text-amber-600 dark:text-amber-400">1 334 000 ₽ с НДС</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Посмотреть готовое КП № 482 в PDF</span>
              </button>
            </div>
          </div>

          {/* Additional dialogue bubbles */}
          {demoMessages.slice(2).map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 max-w-[90%] ${
                msg.role === "user" ? "items-end ml-auto" : "items-start"
              }`}
            >
              <span className="text-[10px] font-medium text-text-muted px-1">
                {msg.role === "user" ? "Вы" : "ИИ-инженер"}
              </span>
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-slate-950 font-semibold rounded-tr-sm"
                    : "bg-bg border border-border text-heavy rounded-tl-sm shadow-subtle"
                }`}
              >
                {msg.text ? parseMarkdown(msg.text) : null}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-text-muted p-2 rounded-xl bg-bg/50 border border-border/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>ИИ-инженер сверяет базу 1С и готовит ответ…</span>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Dedicated Interactive Chat with Factory AI Agent */}
      {activeTab === "chat" && (
        <div ref={scrollRefChat} className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 max-w-[90%] ${
                msg.role === "user" ? "items-end ml-auto" : "items-start"
              }`}
            >
              <span className="text-[10px] font-medium text-text-muted px-1 flex items-center gap-1">
                {msg.role === "user" ? (
                  "Вы"
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-amber-500" />
                    <span>ИИ-консультант Samartsev AI</span>
                  </>
                )}
              </span>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-slate-950 font-semibold rounded-tr-sm"
                    : "bg-bg border border-border text-heavy rounded-tl-sm shadow-subtle"
                }`}
              >
                {parseMarkdown(msg.text)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-text-muted p-2.5 rounded-xl bg-bg border border-border/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>ИИ-консультант печатает ответ…</span>
            </div>
          )}
        </div>
      )}

      {/* Suggested Quick Questions */}
      <div className="px-3.5 py-2 bg-bg/50 border-t border-border">
        <div className="text-[10px] font-medium text-text-muted mb-1.5 flex items-center justify-between">
          <span>Быстрые вопросы (нажмите для мгновенной проверки):</span>
          <span className="text-[10px] text-amber-500 font-semibold">1С:ERP & OCR</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
          {QUICK_QUESTIONS.map((qa, i) => (
            <button
              key={i}
              onClick={() => handleAskQuickQuestion(qa)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface/80 border border-border text-[11px] font-medium text-heavy hover:border-amber-500/50 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
            >
              💬 {qa.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-surface border-t border-border flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Спросите про 1С, номенклатуру, ГОСТы или пилот..."
          disabled={isLoading}
          className="flex-1 bg-bg border border-border rounded-xl px-3.5 py-2 text-xs text-heavy placeholder:text-text-muted focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* PDF Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-surface text-heavy rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-bg text-text-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-amber-500 pb-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-heavy">
                  КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                  № КП-2026/09-482
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Поставщик: Завод трубного проката и металлоконструкций
              </p>
            </div>

            <div className="space-y-2 mb-4 text-xs font-mono">
              <div className="p-2.5 bg-bg rounded-lg border border-border flex justify-between">
                <div>
                  <div className="font-bold text-heavy">Труба 159х6 ст20 г/д ГОСТ 8732-78</div>
                  <div className="text-[11px] text-text-muted">Количество: 14.0 т · Склад Екб</div>
                </div>
                <div className="font-bold text-heavy">1 246 000 ₽</div>
              </div>
              <div className="p-2.5 bg-bg rounded-lg border border-border flex justify-between">
                <div>
                  <div className="font-bold text-heavy">Фланец 1-150-16 ст20 ГОСТ 33259</div>
                  <div className="text-[11px] text-text-muted">Количество: 40 шт · Цех фасонных изделий</div>
                </div>
                <div className="font-bold text-heavy">146 000 ₽</div>
              </div>
            </div>

            <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/30 mb-4 flex justify-between items-center text-sm font-bold text-heavy">
              <span>Итого со скидкой 7.5%:</span>
              <span className="text-amber-600 dark:text-amber-400 font-display text-base">
                1 334 000 ₽ с НДС
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://t.me/samartsev_ai"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-colors shadow-sm"
              >
                Обсудить внедрение на наш завод
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-bg hover:bg-bg/80 text-text-muted font-medium text-xs transition-colors border border-border cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

