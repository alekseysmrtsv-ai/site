"use client";

import React, { useState } from "react";
import {
  FileText,
  Send,
  Eye,
  X,
  FileCheck2
} from "lucide-react";

interface QAReply {
  question: string;
  answer: string;
}

const QUICK_QUESTIONS: QAReply[] = [
  {
    question: "Как система подключается к нашей 1С?",
    answer:
      "Подключение идет по официальным API (OData, REST, HTTP-сервисы). Мы не переписываем вашу конфигурацию 1С:ERP / 1С:УНФ и не снимаем её с поддержки. ИИ считывает остатки и сам формирует документ «Коммерческое предложение» в вашей базе.",
  },
  {
    question: "Как ИИ считывает сложные сканы и чертежи?",
    answer:
      "Используется модуль Vision OCR: он с точностью 99% распознает ГОСТы, марки стали, допуски и размеры даже из рукописных пометок на бланках и многостраничных PDF со сложными таблицами.",
  },
  {
    question: "Сколько стоит пилотный проект?",
    answer:
      "Пилот на одну товарную группу запускается за 10–14 рабочих дней (от 150 000 ₽). Мы настраиваем векторизацию прайса, скидочные сетки завода и калибруем расчет на 50 ваших реальных прошлых заявках.",
  },
];

export default function FactoryCpDemoWidget() {
  const [messages, setMessages] = useState<Array<{ role: "client" | "ai" | "user"; text?: string }>>([
    { role: "client" },
    { role: "ai" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAskQuickQuestion = (qa: QAReply) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: qa.question },
      { role: "ai", text: qa.answer },
    ]);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const lower = query.toLowerCase();
    setInputText("");

    let reply =
      "Отличный вопрос по вашему производству! Мы настраиваем правила индивидуально под ваши цеха. Напишите нам в Telegram (@samartsev_ai) — Алексей разберёт интеграцию именно под ваши регламенты.";

    if (lower.includes("1с") || lower.includes("erp") || lower.includes("унф") || lower.includes("баз")) {
      reply =
        "Интеграция с 1С выполняется через штатный протокол OData / REST API. ИИ берет актуальные остатки со складов, учитывает резервы и автоматически создает проект документа в вашей 1С.";
    } else if (lower.includes("чертеж") || lower.includes("скан") || lower.includes("pdf") || lower.includes("тз")) {
      reply =
        "Система Vision AI разбирает как стандартные опросные листы, так и чертежи деталей: извлекает марку стали, габариты и рассчитывает норматив станко-часов по вашим технологическим картам.";
    } else if (lower.includes("цен") || lower.includes("стоим") || lower.includes("срок") || lower.includes("пилот")) {
      reply =
        "Базовый пилот запускается за 10–14 рабочих дней. Стоимость проекта — от 150 000 ₽ под ключ с калибровкой на массиве ваших реальных спецификаций.";
    } else if (lower.includes("безопасн") || lower.includes("тайн") || lower.includes("152")) {
      reply =
        "Все данные остаются в закрытом периметре сертифицированных серверов в РФ или на локальном сервере вашего завода. Коммерческие прайсы не передаются в публичные внешние сети.";
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "ai", text: reply },
    ]);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-surface border border-border shadow-xl overflow-hidden font-sans flex flex-col h-[540px]">
      {/* Header */}
      <div className="px-5 py-3.5 bg-bg/60 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg shrink-0">
            🏭
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-display text-heavy">
                ИИ-инженер завода
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                1С:ERP Онлайн
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              Расчет сложных спецификаций за 30 секунд
            </p>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {/* 1. Client message bubble */}
        <div className="flex flex-col items-start gap-1 max-w-[90%]">
          <span className="text-[10px] font-medium text-text-muted px-1">
            Заказчик (Отдел комплектации)
          </span>
          <div className="bg-bg border border-border p-3.5 rounded-2xl rounded-tl-sm text-heavy space-y-2.5 shadow-subtle">
            <p className="leading-relaxed">
              Добрый день! Прошу рассчитать поставку трубы бесшовной 159х6 ст20 по ГОСТ 8732-78 — 14 тонн, и фланцы воротниковые 150-16 — 40 шт. Доставка в Екатеринбург.
            </p>
            <div className="p-2 rounded-xl bg-surface border border-border/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold text-heavy truncate">
                  Спецификация_СеверСтрой_№144.pdf
                </span>
              </div>
              <span className="text-[11px] text-text-muted shrink-0">240 КБ</span>
            </div>
          </div>
        </div>

        {/* 2. AI response bubble */}
        <div className="flex flex-col items-end gap-1 max-w-[95%] ml-auto">
          <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 px-1">
            ИИ-инженер завода (ответ за 28 секунд)
          </span>
          <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl rounded-tr-sm text-heavy space-y-3 shadow-subtle">
            <p className="leading-relaxed">
              Здравствуйте! Спецификацию оцифровал, номенклатуру и наличие сверил с базой 1С:ERP:
            </p>

            <div className="space-y-1.5 font-mono text-xs bg-bg/80 p-2.5 rounded-xl border border-border/60">
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

            <p className="text-xs text-text-muted">
              Сформировал официальный бланк КП со всеми реквизитами завода:
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Посмотреть сформированное КП № 482</span>
            </button>
          </div>
        </div>

        {/* Dynamic Q&A bubbles */}
        {messages.slice(2).map((msg, i) => (
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
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-amber-500 text-slate-950 font-semibold rounded-tr-sm"
                  : "bg-bg border border-border text-heavy rounded-tl-sm shadow-subtle"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Quick Questions */}
      <div className="px-4 py-2.5 bg-bg/50 border-t border-border">
        <div className="text-[11px] font-medium text-text-muted mb-1.5">
          Быстрые вопросы (нажмите для проверки):
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {QUICK_QUESTIONS.map((qa, i) => (
            <button
              key={i}
              onClick={() => handleAskQuickQuestion(qa)}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface/80 border border-border text-[11px] font-medium text-heavy hover:border-amber-500/50 transition-colors shrink-0"
            >
              💬 {qa.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendCustomMessage}
        className="p-3 bg-surface border-t border-border flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Спросите про 1С, номенклатуру или ГОСТы..."
          className="flex-1 bg-bg border border-border rounded-xl px-3.5 py-2 text-xs text-heavy placeholder:text-text-muted focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors disabled:opacity-40"
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
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-bg text-text-muted transition-colors"
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
                className="py-2.5 px-4 rounded-xl bg-bg hover:bg-bg/80 text-text-muted font-medium text-xs transition-colors border border-border"
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
