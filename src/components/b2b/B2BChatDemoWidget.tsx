"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  FileCheck2,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  ArrowRight,
  FileText,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  time: string;
  actionBtn?: {
    label: string;
    onClick: () => void;
  };
}

function getNowTime() {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PRESET_TOPICS = [
  {
    id: "sales",
    buttonLabel: "📈 Как ускорить продажи и расчет КП?",
    userPrompt: "Расскажите, как автоматизировать продажи и подготовку КП?",
    botReply:
      "Мы внедряем OCR-оцифровку входящих заявок из почты и мессенджеров со связкой с вашей 1С или CRM:\n\n• Заказчик присылает спецификацию в PDF или Excel.\n• Алгоритм за 30 секунд сверяет наличие на складе и считает скидку.\n• Менеджер получает готовое брендированное КП в PDF.\n\nВремя подготовки КП сокращается с 3 часов до 30 секунд.",
    actionLabel: "📄 Посмотреть пример сформированного КП в PDF",
  },
  {
    id: "ops",
    buttonLabel: "⚙️ Как автоматизировать договоры и 1С?",
    userPrompt: "Как убрать рутину с документами, договорами и переносом данных в 1С?",
    botReply:
      "В операционке ИИ закрывает самую дорогую скрытую рутину:\n\n• Извлекает реквизиты (ИНН, КПП, расчетный счет, подписант) из сканов или почты.\n• Проверяет контрагента по ЕГРЮЛ и автоматически формирует договор и счет.\n• Синхронизирует данные между CRM и 1С без ручной перебивки операторами.",
    actionLabel: "📄 Посмотреть пример сгенерированного договора",
  },
  {
    id: "knowledge",
    buttonLabel: "🧠 Как работает умная база знаний?",
    userPrompt: "Как создать базу знаний, чтобы сотрудники не отвлекали руководство?",
    botReply:
      "Корпоративный RAG индексирует все ваши регламенты, инструкции, файлы Google Drive и Notion в единый защищенный векторный индекс:\n\n• Сотрудник задает вопрос в Telegram или чате компании.\n• ИИ за 1.5 секунды находит точный пункт регламента с цитатой.\n• РОП и старшие специалисты освобождаются от 80% однотипных вопросов.",
    actionLabel: "💡 Посмотреть пример регламентного ответа",
  },
];

export default function B2BChatDemoWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "bot",
      text: "Здравствуйте! Я ИИ-ассистент по автоматизации бизнеса Samartsev AI.\n\nГотов показать, как ИИ ускоряет продажи, убирает рутину в операционке и отвечает сотрудникам по базе знаний компании. О чем рассказать?",
      time: getNowTime(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const openPdfModal = (type: "sales" | "ops" | "knowledge") => {
    if (type === "sales") {
      setModalTitle("Коммерческое предложение № КП-2026/09-71");
      setModalContent(
        <div className="space-y-4 text-xs sm:text-sm font-sans">
          <div className="p-3.5 bg-bg rounded-xl border border-border">
            <div className="font-bold text-heavy text-sm">Заказчик: ООО «Инфраструктура-Юг»</div>
            <div className="text-slate-300 text-xs mt-0.5">Менеджер: Автоматический расчет Samartsev AI</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border/70 text-slate-200">
              <span>Серверный шкаф 42U 800x1000 (8 шт.)</span>
              <span className="font-mono font-bold text-heavy">680 000 ₽</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/70 text-slate-200">
              <span>Коммутаторы L3 48 PoE+ (12 шт.)</span>
              <span className="font-mono font-bold text-heavy">1 440 000 ₽</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/70 text-slate-200">
              <span>Комплект кабельных трасс и патч-панелей</span>
              <span className="font-mono font-bold text-heavy">360 000 ₽</span>
            </div>
          </div>
          <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/40 flex justify-between items-center text-sm font-bold">
            <span className="text-heavy">Итого со скидкой 5%:</span>
            <span className="text-primary font-display text-base">2 480 000 ₽ с НДС</span>
          </div>
        </div>
      );
    } else if (type === "ops") {
      setModalTitle("Проект договора поставки № Д-142/26");
      setModalContent(
        <div className="space-y-3.5 text-xs sm:text-sm">
          <p className="text-slate-200 leading-relaxed">
            Договор сформирован по типовому юридическому шаблону компании. Все реквизиты покупателя (ИНН 7701894210, КПП, расчетный счет, БИК банка, Генеральный директор) подставлены автоматически из входящей карточки.
          </p>
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-medium">
            ✓ Документ зарегистрирован в 1С и прикреплен к сделке в amoCRM / Битрикс24.
          </div>
        </div>
      );
    } else {
      setModalTitle("Ответ из корпоративной базы знаний RAG");
      setModalContent(
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 bg-bg rounded-xl border border-border text-slate-200">
            <span className="font-bold text-heavy block mb-1">Регламент продаж (п. 4.2 «Ценообразование»):</span>
            «Скидки до 10% применяет менеджер самостоятельно. Скидки от 10% до 15% утверждает РОП в Telegram-боте. Скидки свыше 15% требуют визы Коммерческого директора».
          </div>
          <div className="text-xs text-primary font-semibold">
            ✓ Ответ найден за 1.4 секунды без отвлечения руководителя
          </div>
        </div>
      );
    }
    setIsModalOpen(true);
  };

  const handleTopicClick = (topic: typeof PRESET_TOPICS[0]) => {
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: topic.userPrompt,
      time: getNowTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "bot",
        text: topic.botReply,
        time: getNowTime(),
        actionBtn: {
          label: topic.actionLabel,
          onClick: () => openPdfModal(topic.id as "sales" | "ops" | "knowledge"),
        },
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const lower = query.toLowerCase();
    setInputText("");

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: query,
      time: getNowTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    let replyText =
      "Отличный вопрос! Мы проектируем архитектуру автоматизации индивидуально под ваш бизнес-стек. Напишите нам в Telegram (@samartsev_ai) — Алексей разберет ваши процессы на экспресс-аудите.";

    if (lower.includes("crm") || lower.includes("амо") || lower.includes("битрикс") || lower.includes("1с")) {
      replyText =
        "Мы нативно интегрируемся с amoCRM, Битрикс24, 1С (любые конфигурации) и кастомными базами данных через REST API и n8n. Никакой ручной перебивки: лиды, сметы и остатки синхронизируются в реальном времени.";
    } else if (lower.includes("цен") || lower.includes("стоим") || lower.includes("срок") || lower.includes("пилот") || lower.includes("деньг")) {
      replyText =
        "Стоимость пилотного внедрения под ключ — от 150 000 ₽. Срок запуска работающего MVP на одном процессе — 10–14 рабочих дней. Окупаемость обычно наступает за 1–2 месяца.";
    } else if (lower.includes("безопасн") || lower.includes("152") || lower.includes("сервер") || lower.includes("контур") || lower.includes("тайн")) {
      replyText =
        "Полное соответствие 152-ФЗ: развертывание в РФ на защищенных серверах или On-Premise в вашем ЦОД. До старта подписываем юридический NDA: данные и коммерческие прайсы не передаются во внешние публичные сети.";
    } else if (lower.includes("баз") || lower.includes("знан") || lower.includes("rag") || lower.includes("регламент")) {
      replyText =
        "Корпоративный RAG индексирует файлы Google Drive, Word, PDF и Notion. Ваши сотрудники получают ответы за 1.5 секунды со строгой ссылкой на утвержденные правила компании.";
    }

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "bot",
        text: replyText,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-surface border-2 border-border shadow-2xl overflow-hidden font-sans flex flex-col h-[580px] relative">
      {/* Header with clear Live Status */}
      <div className="px-6 py-4 bg-bg/90 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center text-primary text-lg shrink-0">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-display text-heavy">
                B2B ИИ-ассистент
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                В сети
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Живой демо-диалог · Отвечает за 1 секунду
            </p>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1.5 ${
              msg.role === "user" ? "items-end ml-auto max-w-[88%]" : "items-start max-w-[92%]"
            }`}
          >
            <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400 font-medium">
              <span>{msg.role === "user" ? "Вы" : "ИИ-ассистент"}</span>
              <span>·</span>
              <span>{msg.time}</span>
            </div>

            <div
              className={`p-4 rounded-2xl leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-primary text-surface font-semibold rounded-tr-sm"
                  : "bg-bg border border-border text-heavy rounded-tl-sm space-y-3"
              }`}
            >
              <p className="whitespace-pre-line text-xs sm:text-sm font-medium">
                {msg.text}
              </p>

              {msg.actionBtn && (
                <button
                  onClick={msg.actionBtn.onClick}
                  className="w-full mt-2 py-2.5 px-3.5 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{msg.actionBtn.label}</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Live Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bg border border-border w-fit text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>ИИ-ассистент печатает ответ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Scenario Buttons */}
      <div className="px-4 py-2.5 bg-bg/80 border-t border-border space-y-1.5">
        <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
          Нажмите, чтобы протестировать сценарий:
        </div>
        <div className="flex flex-col gap-1.5">
          {PRESET_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              disabled={isTyping}
              className="w-full text-left px-3 py-2 rounded-xl bg-surface hover:bg-surface/80 border border-border hover:border-primary/60 text-xs font-semibold text-heavy transition-all flex items-center justify-between group disabled:opacity-50"
            >
              <span className="group-hover:text-primary transition-colors">
                {topic.buttonLabel}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Field with clear visual focus */}
      <form
        onSubmit={handleCustomSubmit}
        className="p-3.5 bg-surface border-t border-border flex items-center gap-2.5"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Или задайте свой вопрос (про 1С, CRM, сроки)..."
          className="flex-1 bg-bg border-2 border-border focus:border-primary rounded-xl px-4 py-2.5 text-xs sm:text-sm text-heavy placeholder:text-slate-400 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-3 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold transition-colors disabled:opacity-40 shrink-0 shadow-sm"
          aria-label="Отправить вопрос"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface text-heavy rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-bg text-slate-300 hover:text-heavy transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-primary pb-3.5 mb-5">
              <h3 className="font-display font-bold text-base sm:text-lg text-heavy">
                {modalTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Пример автоматического документа в контуре Samartsev AI
              </p>
            </div>

            <div className="mb-6">{modalContent}</div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href="https://t.me/samartsev_ai"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-surface font-bold text-xs sm:text-sm text-center transition-colors shadow-md"
              >
                Внедрить такой процесс в вашу компанию
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-bg hover:bg-bg/80 text-slate-200 font-medium text-xs transition-colors border border-border"
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
