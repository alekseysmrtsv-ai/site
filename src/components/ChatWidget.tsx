"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, MoreVertical } from "lucide-react";

/* ──────────────── Types ──────────────── */

type Message = {
  role: "bot" | "user";
  text: string;
  time: string;
};

type Status = "idle" | "loading" | "error";

type FaqButtonData = {
  emoji: string;
  label: string;
  answer: string;
  followUp?: string;
  keywords?: string;
};

type ChatWidgetData = {
  greeting?: string;
  subtitle?: string;
  faqButtons?: FaqButtonData[];
};

type ChatWidgetProps = {
  chatWidgetData?: ChatWidgetData;
};

/* ──────────────── Default FAQ (fallback) ──────────────── */

const DEFAULT_FAQ: FaqButtonData[] = [
  {
    emoji: "🤖",
    label: "Что вы делаете?",
    answer: "Мы создаём AI-агентов, которые автоматизируют общение с клиентами, обработку заявок и продажи. Агент работает 24/7, интегрируется с вашей CRM и мессенджерами.",
    followUp: "Расскажите, в какой нише работает ваш бизнес?",
    keywords: "что делаете, чем занимаетесь, что за компания, кто вы",
  },
  {
    emoji: "⚙️",
    label: "Как это работает?",
    answer: "AI-агент подключается к вашему сайту, Telegram, WhatsApp или CRM. Он общается с клиентами как живой менеджер.",
    followUp: "Какие каналы связи с клиентами вы сейчас используете?",
    keywords: "как работает, как устроен, принцип работы",
  },
  {
    emoji: "⏱️",
    label: "Какие сроки?",
    answer: "Первый рабочий прототип — за 2-3 недели. Полное внедрение — 1-2 месяца.",
    followUp: "У вас есть задачи, которые хотите автоматизировать в первую очередь?",
    keywords: "сроки, сколько времени, как быстро, когда будет готов",
  },
];

const DEFAULT_GREETING = "Здравствуйте! Я ИИ-ассистент Алексея Самарцева. Помогу разобраться, как AI-автоматизация может усилить ваш бизнес.";
const DEFAULT_SUBTITLE = "Это реальный ИИ-ассистент Алексея, он поможет вам прямо сейчас";

/* ──────────────── Fuzzy Match ──────────────── */

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^а-яёa-z0-9\s]/g, "").trim();
}

function findFaqMatch(userText: string, faqItems: FaqButtonData[]): FaqButtonData | null {
  const normalized = normalizeText(userText);
  if (normalized.length < 3) return null;

  for (const faq of faqItems) {
    if (!faq.keywords) continue;
    const keywords = faq.keywords.split(",").map((k) => k.trim().toLowerCase());
    for (const kw of keywords) {
      if (kw && normalized.includes(kw)) return faq;
    }
  }
  return null;
}

/* ──────────────── Session ──────────────── */

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "samartsev_chat_session";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

/* ──────────────── Helpers ──────────────── */

const TIMEOUT_MS = 30_000;

const FALLBACK_MESSAGE =
  "Обычно наши ИИ-агенты стабильны на 99.9%. Поздравляю, вы сорвали джекпот и попали в те самые 0.1% 😅 Сервер немного задумался. Но вы всё ещё можете заполнить форму ниже, и мы свяжемся с вами для аудита!";

function nowTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
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

        // Parse bold text **something**
        const parts = cleanLine.split(/\*\*([^*]+)\*\*/g);
        const content = parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return <strong key={partIndex} className="font-extrabold">{part}</strong>;
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={lineIndex} className="flex items-start gap-1.5 pl-1.5">
              <span className="text-primary font-bold mt-1 text-[10px]">•</span>
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

/* ──────────────── Component ──────────────── */

export default function ChatWidget({ chatWidgetData }: ChatWidgetProps) {
  // Данные из TinaCMS или fallback
  const greeting = chatWidgetData?.greeting || DEFAULT_GREETING;
  const subtitle = chatWidgetData?.subtitle || DEFAULT_SUBTITLE;
  const faqItems = chatWidgetData?.faqButtons?.length ? chatWidgetData.faqButtons : DEFAULT_FAQ;

  const [messages, setMessages]       = useState<Message[]>([
    { role: "bot", text: greeting, time: nowTime() },
  ]);
  const [input, setInput]             = useState("");
  const [status, setStatus]           = useState<Status>("idle");
  const [showFaq, setShowFaq]         = useState(true);
  const scrollRef                     = useRef<HTMLDivElement>(null);
  const timeoutRef                    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, status, scrollToBottom]);

  /* ── Add messages ── */

  const addBotMessages = useCallback((texts: string[]) => {
    texts.forEach((text, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text, time: nowTime() }]);
      }, i * 600);
    });
  }, []);

  /* ── FAQ click ── */

  const handleFaqClick = (faq: FaqButtonData) => {
    setMessages((prev) => [...prev, { role: "user", text: faq.label, time: nowTime() }]);
    setShowFaq(false);

    const replies = [faq.answer];
    if (faq.followUp) replies.push(faq.followUp);
    
    setStatus("loading");
    setTimeout(() => {
      setStatus("idle");
      addBotMessages(replies);
    }, 800);
  };

  /* ── Send to n8n ── */

  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text || statusRef.current === "loading") return;

    setMessages((prev) => [...prev, { role: "user", text, time: nowTime() }]);
    setInput("");
    setShowFaq(false);
    setStatus("loading");

    // Проверяем FAQ match перед отправкой в LLM
    const faqMatch = findFaqMatch(text, faqItems);
    if (faqMatch) {
      setTimeout(() => {
        setStatus("idle");
        const replies = [faqMatch.answer];
        if (faqMatch.followUp) replies.push(faqMatch.followUp);
        addBotMessages(replies);
      }, 800);
      return;
    }

    const controller = new AbortController();

    // Нет FAQ match → отправляем в n8n
    timeoutRef.current = setTimeout(() => {
      controller.abort();
      setStatus("idle");
      addBotMessages([FALLBACK_MESSAGE]);
    }, TIMEOUT_MS);

    try {
      let webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK;
      if (webhookUrl && process.env.NODE_ENV === "production") {
        webhookUrl = webhookUrl.replace("/webhook-test/", "/webhook/");
      }

      if (!webhookUrl) {
        await new Promise((r) => setTimeout(r, 1800));
        clearTimeout(timeoutRef.current!);
        setStatus("idle");
        addBotMessages([
          `Интересный вопрос! Для детального ответа давайте обсудим вашу задачу подробнее. Расскажите, с какими процессами вы хотите работать?`,
        ]);
        return;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          session_id: getSessionId(),
          source: "widget",
          timestamp: Date.now(),
        }),
      });

      clearTimeout(timeoutRef.current!);

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || errData?.error || `HTTP ${res.status}`);
      }

      type N8nResponse = {
        response?: string;
        reply?: string;
        text?: string;
      };

      const responseText = await res.text();
      let data: N8nResponse = {};
      try {
        if (responseText) data = JSON.parse(responseText);
      } catch {
        console.warn("Non-JSON response from n8n:", responseText);
      }

      setStatus("idle");
      addBotMessages([data.response || data.reply || data.text || "Спасибо за вопрос! Наш специалист скоро свяжется с вами."]);
    } catch (err: unknown) {
      clearTimeout(timeoutRef.current!);
      if (err instanceof Error && err.name === "AbortError") return;
      setStatus("idle");
      console.error("ChatWidget Error:", err);
      addBotMessages([FALLBACK_MESSAGE]);
    }
  }, [faqItems, addBotMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      sendMessage(text);
    }
  };

  useEffect(() => {
    const handleCalculateLoss = (e: Event) => {
      const customEvent = e as CustomEvent<{
        leads: number;
        check: number;
        loss: number;
        lossPerMonth: number;
      }>;
      const { leads, check, loss, lossPerMonth } = customEvent.detail;
      
      const text = `Я рассчитaл упущенную выручку в калькуляторе:
• Заявки в месяц: ${leads}
• Средний чек: ${check.toLocaleString("ru-RU")} руб.
• Процент упущенных лидов: ${loss}%
• Упущенная выручка: ${lossPerMonth.toLocaleString("ru-RU")} руб./мес.

Как мне остановить эти потери?`;

      sendMessage(text);
    };

    window.addEventListener("calculate-loss", handleCalculateLoss);
    return () => {
      window.removeEventListener("calculate-loss", handleCalculateLoss);
    };
  }, [sendMessage]);

  return (
    <div id="chat-widget" className="relative w-full max-w-[480px] mx-auto lg:ml-auto">
      {/* Glow */}
      <div className="absolute -inset-10 bg-primary/5 blur-[80px] rounded-full -z-10 pointer-events-none" />

      {/* Floating pills */}
      <div className="absolute -top-6 -left-8 z-10 hidden sm:flex items-center gap-2 bg-surface px-4 py-2.5 border border-border shadow-card rounded-md animate-bounce [animation-duration:3s]">
        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-xs font-bold text-heavy tracking-tight">Окупаемость от 1 мес.</span>
      </div>



      <div className="absolute -bottom-6 left-12 z-10 hidden sm:flex items-center gap-2 bg-surface px-4 py-2.5 border border-border shadow-card rounded-md">
        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-xs font-bold text-heavy tracking-tight">Работает 24/7</span>
      </div>

      {/* Chat Card */}
      <div className="bg-surface rounded-md border border-border shadow-card flex flex-col h-[520px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-bg/50">
          <div className="flex items-center gap-3">
            <div className="relative flex w-3 h-3">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </div>
            <div>
              <p className="text-heavy font-display font-bold text-sm tracking-tight">Live Connection</p>
              <p className="text-text-muted text-xs font-medium">Powered by AI</p>
            </div>
          </div>
          <MoreVertical className="w-5 h-5 text-text-muted" />
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 p-5 overflow-y-auto chat-scroll flex flex-col gap-4 bg-bg"
          aria-live="polite"
          role="log"
        >
          {/* Date badge */}
          <div className="flex justify-center mb-1">
            <span suppressHydrationWarning className="bg-bg border border-border text-text-muted text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium">
              Сегодня • {new Date().toLocaleDateString("ru-RU")}
            </span>
          </div>

          {messages.map((msg, i) =>
            msg.role === "bot" ? (
              <div key={i} className="flex flex-col gap-1 max-w-[85%] animate-fade-in-up">
                <div className="bg-bg border border-border text-text-main text-sm p-3 rounded-md rounded-tl-none leading-relaxed break-words">
                  {parseMarkdown(msg.text)}
                </div>
                <span suppressHydrationWarning className="text-[10px] text-text-muted ml-1">{msg.time}</span>
              </div>
            ) : (
              <div key={i} className="flex flex-col gap-1 max-w-[85%] self-end items-end animate-fade-in-up">
                <div className="bg-heavy text-surface text-sm p-3 rounded-md rounded-tr-none leading-relaxed break-words">
                  {parseMarkdown(msg.text)}
                </div>
                <div className="flex items-center gap-1 mr-1">
                  <span suppressHydrationWarning className="text-[10px] text-text-muted">{msg.time}</span>
                  <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                  </svg>
                </div>
              </div>
            )
          )}

          {/* FAQ Quick-Reply Buttons */}
          {showFaq && status !== "loading" && (
            <div className="flex flex-col gap-2 animate-fade-in-up">
              <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider ml-1">Частые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {faqItems.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaqClick(faq)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium
                               bg-surface border border-border rounded-full
                               text-text-main hover:border-primary hover:text-primary
                               transition-all duration-200 hover:shadow-sm
                               active:scale-95"
                  >
                    <span>{faq.emoji}</span>
                    <span>{faq.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Show FAQ again button */}
          {!showFaq && status !== "loading" && (
            <div className="flex justify-center animate-fade-in-up">
              <button
                onClick={() => setShowFaq(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium
                           bg-surface/80 border border-border rounded-full
                           text-text-muted hover:text-primary hover:border-primary
                           transition-all duration-200 active:scale-95"
              >
                <span>💬</span>
                <span>Частые вопросы</span>
              </button>
            </div>
          )}

          {/* Typing indicator */}
          {status === "loading" && (
            <div className="flex flex-col gap-1 max-w-[85%]">
              <div className="bg-bg border border-border p-3.5 rounded-md rounded-tl-none w-16 flex justify-center items-center gap-1 h-[42px]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-text-muted rounded-full typing-dot"
                    style={{ animationDelay: `${-0.32 + i * 0.16}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-border bg-surface flex gap-3 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите сообщение…"
            aria-label="Введите сообщение"
            className="flex-1 bg-bg border border-border rounded-md px-4 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={!input.trim() || status === "loading"}
            aria-label="Отправить"
            className="w-9 h-9 flex items-center justify-center bg-primary text-heavy rounded-md hover:bg-heavy hover:text-surface disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <p className="text-center text-text-muted text-xs mt-4 max-w-[80%] mx-auto font-medium">
        {subtitle}
      </p>
    </div>
  );
}
