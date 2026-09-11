"use client";

import React, { useState } from "react";
import {
  FileText,
  Send,
  X,
  FileCheck2,
  Database,
  Briefcase,
  Layers,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
} from "lucide-react";

type ModeKey = "sales" | "ops" | "knowledge";

interface ScenarioMessage {
  role: "system_event" | "client" | "ai" | "user";
  text?: string;
  badge?: string;
  attachment?: { name: string; size: string };
  metrics?: { label: string; value: string; color?: string }[];
  actionBtn?: { label: string; action: () => void };
}

export default function B2BChatDemoWidget() {
  const [activeMode, setActiveMode] = useState<ModeKey>("sales");
  const [inputText, setInputText] = useState("");
  const [customMessages, setCustomMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // Quick questions bank
  const quickQuestions = [
    {
      q: "С какими CRM работает?",
      a: "Интегрируемся с amoCRM, Битрикс24, 1С (любые конфигурации по REST/OData) и кастомными системами через webhooks и n8n.",
    },
    {
      q: "Сроки и стоимость пилота?",
      a: "Пилотный MVP на один процесс запускаем за 10–14 рабочих дней (от 150 000 ₽). Вы получаете работающий сценарий на реальных данных.",
    },
    {
      q: "Безопасность 152-ФЗ?",
      a: "Все данные обрабатываются в закрытом контуре серверов в РФ (Yandex Cloud, On-Premise) с маскированием персональных данных.",
    },
  ];

  // Pre-configured scenario streams for each pillar
  const scenarios: Record<ModeKey, ScenarioMessage[]> = {
    sales: [
      {
        role: "client",
        text: "Добрый день! Нужен расчет поставки оборудования на 4 объекта. Спецификация во вложении. Сроки поджимают.",
        attachment: { name: "ТЗ_Комплектация_Объекты_Юг.xlsx", size: "420 КБ" },
      },
      {
        role: "ai",
        badge: "ИИ-ассистент отдела продаж · 24 сек",
        text: "Здравствуйте! ТЗ оцифровано, позиции сопоставлены со складом и прайсом в CRM. Сформировал персонализированное КП со скидкой за объем.",
        metrics: [
          { label: "Позиций обработано", value: "38 SKU", color: "text-emerald-500" },
          { label: "Сверка остатков", value: "100% в наличии", color: "text-primary" },
          { label: "Сумма по смете", value: "2 480 000 ₽", color: "text-amber-500" },
        ],
        actionBtn: {
          label: "Посмотреть сформированное КП в PDF",
          action: () => {
            setModalTitle("Коммерческое предложение № КП-2026/09-71");
            setModalContent(
              <div className="space-y-4 text-xs font-sans">
                <div className="p-3 bg-bg rounded-xl border border-border">
                  <div className="font-bold text-heavy">Клиент: ООО «Инфраструктура-Юг»</div>
                  <div className="text-text-muted">Менеджер: Автоматический расчет Samartsev AI</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-border text-text-muted">
                    <span>Серверный шкаф 42U 800x1000 (8 шт.)</span>
                    <span className="font-mono font-bold text-heavy">680 000 ₽</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border text-text-muted">
                    <span>Коммутаторы L3 48 PoE+ (12 шт.)</span>
                    <span className="font-mono font-bold text-heavy">1 440 000 ₽</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border text-text-muted">
                    <span>Комплект кабельных трасс и патч-панелей</span>
                    <span className="font-mono font-bold text-heavy">360 000 ₽</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/30 flex justify-between items-center text-sm font-bold">
                  <span>Итого со скидкой 5%:</span>
                  <span className="text-primary font-display text-base">2 480 000 ₽ с НДС</span>
                </div>
              </div>
            );
            setIsModalOpen(true);
          },
        },
      },
    ],
    ops: [
      {
        role: "client",
        text: "Входящее письмо с темой «Реквизиты и карточка предприятия для заключения договора поставки».",
        attachment: { name: "Карточка_ООО_ВостокТрейд_ИНН7701.pdf", size: "180 КБ" },
      },
      {
        role: "ai",
        badge: "Операционный ИИ-агент · 12 сек",
        text: "Реквизиты распознаны, юрлицо проверено по ЕГРЮЛ. Сгенерирован типовой договор поставки и счет без участия бэк-офиса.",
        metrics: [
          { label: "ИНН / ОГРН", value: "7701894210 / проверен", color: "text-emerald-500" },
          { label: "Риск-скоринг", value: "Надежный контрагент", color: "text-primary" },
          { label: "Сверка систем", value: "Синхронизировано с 1С", color: "text-primary" },
        ],
        actionBtn: {
          label: "Посмотреть сформированный договор",
          action: () => {
            setModalTitle("Проект договора поставки № Д-142/26");
            setModalContent(
              <div className="space-y-3 text-xs">
                <p className="text-text-muted leading-relaxed">
                  Договор сформирован по регламентному шаблону компании. Все реквизиты покупателя (ИНН 7701894210, р/с, БИК банка, Генеральный директор) подставлены автоматически без ручных ошибок.
                </p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Автоматически зарегистрирован в учетной системе и прикреплен к сделке.
                </div>
              </div>
            );
            setIsModalOpen(true);
          },
        },
      },
    ],
    knowledge: [
      {
        role: "user",
        text: "Какой у нас регламент согласования скидки клиенту свыше 10% и кто ее утверждает?",
      },
      {
        role: "ai",
        badge: "Корпоративный RAG-ассистент · 1.5 сек",
        text: "Согласно регламенту продаж (п. 4.2 «Ценообразование и скидки»):\n• Скидки до 10% — применяет менеджер самостоятельно.\n• Скидки 10%–15% — утверждает РОП в Telegram нажатием кнопки.\n• Скидки от 15% — требует визы Коммерческого директора.",
        metrics: [
          { label: "Источник", value: "Регламент_продаж_v4.docx", color: "text-primary" },
          { label: "Время ответа", value: "1.4 сек (без отвлечения РОПа)", color: "text-emerald-500" },
        ],
      },
    ],
  };

  const handleAskQuick = (qa: { q: string; a: string }) => {
    setCustomMessages((prev) => [
      ...prev,
      { role: "user", text: qa.q },
      { role: "ai", text: qa.a },
    ]);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const lower = query.toLowerCase();
    setInputText("");

    let reply =
      "Отличный запрос! В рамках B2B-автоматизации мы настраиваем сценарии индивидуально под ваш бизнес-стек. Напишите нам в Telegram (@samartsev_ai) — Алексей разберет ваши процессы на экспресс-аудите.";

    if (lower.includes("crm") || lower.includes("амо") || lower.includes("битрикс") || lower.includes("1с")) {
      reply =
        "Мы бесшовно интегрируемся с amoCRM, Битрикс24, 1С и кастомными базами данных. Никакой дублирующей рутины: лиды, сметы и отчеты синхронизируются в реальном времени.";
    } else if (lower.includes("цен") || lower.includes("стоим") || lower.includes("срок") || lower.includes("пилот")) {
      reply =
        "Стоимость пилотного внедрения под ключ — от 150 000 ₽. Срок запуска первого работающего MVP — 10–14 рабочих дней.";
    } else if (lower.includes("безопасн") || lower.includes("152") || lower.includes("сервер") || lower.includes("контур")) {
      reply =
        "Полное соответствие 152-ФЗ: развертывание на защищенных серверах в РФ или On-Premise в вашем контуре. Подписываем официальный NDA до начала работ.";
    } else if (lower.includes("баз") || lower.includes("знан") || lower.includes("rag") || lower.includes("регламент")) {
      reply =
        "Корпоративный RAG индексирует ваши регламенты, договоры и инструкции. Сотрудники получают точные ответы за 2 секунды со ссылками на первоисточники.";
    }

    setCustomMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "ai", text: reply },
    ]);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-surface border border-border shadow-xl overflow-hidden font-sans flex flex-col h-[550px]">
      {/* Header & Pillar Mode Switcher */}
      <div className="px-5 py-3.5 bg-bg/80 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-display text-heavy">
                  B2B ИИ-ассистент
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Онлайн
                </span>
              </div>
              <p className="text-[11px] text-text-muted">
                Выберите процесс для интерактивной демонстрации:
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillar Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface rounded-xl border border-border/70 text-xs">
          <button
            onClick={() => {
              setActiveMode("sales");
              setCustomMessages([]);
            }}
            className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === "sales"
                ? "bg-primary text-surface shadow-sm"
                : "text-text-muted hover:text-heavy hover:bg-bg/50"
            }`}
          >
            <span>📈</span>
            <span className="truncate">Продажи</span>
          </button>
          <button
            onClick={() => {
              setActiveMode("ops");
              setCustomMessages([]);
            }}
            className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === "ops"
                ? "bg-primary text-surface shadow-sm"
                : "text-text-muted hover:text-heavy hover:bg-bg/50"
            }`}
          >
            <span>⚙️</span>
            <span className="truncate">Операционка</span>
          </button>
          <button
            onClick={() => {
              setActiveMode("knowledge");
              setCustomMessages([]);
            }}
            className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === "knowledge"
                ? "bg-primary text-surface shadow-sm"
                : "text-text-muted hover:text-heavy hover:bg-bg/50"
            }`}
          >
            <span>🧠</span>
            <span className="truncate">База знаний</span>
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {/* Scenario Messages */}
        {scenarios[activeMode].map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 max-w-[95%] ${
              msg.role === "client" || msg.role === "user"
                ? "items-start"
                : "items-end ml-auto"
            }`}
          >
            {msg.badge && (
              <span className="text-[10px] font-medium text-primary px-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {msg.badge}
              </span>
            )}
            <div
              className={`p-4 rounded-2xl shadow-subtle space-y-2.5 ${
                msg.role === "client" || msg.role === "user"
                  ? "bg-bg border border-border text-heavy rounded-tl-sm"
                  : "bg-primary/5 dark:bg-primary/10 border border-primary/30 text-heavy rounded-tr-sm"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

              {/* Attachment card if any */}
              {msg.attachment && (
                <div className="p-2 rounded-xl bg-surface border border-border/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold text-heavy truncate">
                      {msg.attachment.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted shrink-0">
                    {msg.attachment.size}
                  </span>
                </div>
              )}

              {/* Metrics grid if any */}
              {msg.metrics && (
                <div className="space-y-1.5 font-mono text-xs bg-bg/80 p-2.5 rounded-xl border border-border/60">
                  {msg.metrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-text-muted">{m.label}:</span>
                      <span className={`font-bold ${m.color || "text-heavy"}`}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              {msg.actionBtn && (
                <button
                  onClick={msg.actionBtn.action}
                  className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm mt-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{msg.actionBtn.label}</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Custom interactive conversation messages */}
        {customMessages.map((msg, i) => (
          <div
            key={`custom-${i}`}
            className={`flex flex-col gap-1 max-w-[90%] ${
              msg.role === "user" ? "items-end ml-auto" : "items-start"
            }`}
          >
            <span className="text-[10px] font-medium text-text-muted px-1">
              {msg.role === "user" ? "Вы" : "B2B-ассистент"}
            </span>
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-surface font-semibold rounded-tr-sm"
                  : "bg-bg border border-border text-heavy rounded-tl-sm shadow-subtle"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-4 py-2 bg-bg/50 border-t border-border">
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {quickQuestions.map((qa, i) => (
            <button
              key={i}
              onClick={() => handleAskQuick(qa)}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface/80 border border-border text-[11px] font-medium text-heavy hover:border-primary/50 transition-colors shrink-0"
            >
              💬 {qa.q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleCustomSend}
        className="p-3 bg-surface border-t border-border flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Спросите про CRM, 1С, документы или базу знаний..."
          className="flex-1 bg-bg border border-border rounded-xl px-3.5 py-2 text-xs text-heavy placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-surface text-heavy rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-bg text-text-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-primary pb-3 mb-4">
              <span className="font-display font-bold text-base text-heavy">
                {modalTitle}
              </span>
              <p className="text-xs text-text-muted mt-0.5">
                Автоматически сгенерировано ИИ-конвейером Samartsev AI
              </p>
            </div>

            <div className="mb-6">{modalContent}</div>

            <div className="flex items-center gap-2">
              <a
                href="https://t.me/samartsev_ai"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold text-xs text-center transition-colors shadow-sm"
              >
                Обсудить такой процесс для вашей компании
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
