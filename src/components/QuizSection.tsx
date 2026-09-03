"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { ymEvent } from "@/components/YandexMetrika";

type FormState = "idle" | "loading" | "success" | "error";

const NICHES = [
  "Медицина / Стоматология",
  "Beauty / SPA",
  "Автосервис",
  "Производство / Завод",
  "Недвижимость / Девелопмент",
  "E-commerce / Магазин",
  "Образование",
  "Юридические услуги",
  "Другое",
];

const EMPLOYEES = [
  "1-5",
  "6-20",
  "21-50",
  "50+",
];

const TASKS = [
  "Квалификация лидов",
  "Запись на услуги",
  "Автоматизация КП и спецификаций",
  "Поддержка 24/7",
  "Интеграция с CRM / 1С",
  "Снижение стоимости лида",
  "Не знаю, подскажите",
  "Другое",
];

interface QuizSectionProps {
  defaultNiche?: string;
}

export default function QuizSection({ defaultNiche = "" }: QuizSectionProps) {
  const [hasSession, setHasSession] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [step, setStep] = useState(defaultNiche ? 2 : 1);
  const [quizDone, setQuizDone] = useState(false);
  const [niche, setNiche] = useState(defaultNiche);
  const [employees, setEmployees] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  
  // Form Fallback State
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsMounted(true);
    // Check if session exists on mount
    const session = localStorage.getItem("samartsev_chat_session");
    if (session) {
      setHasSession(true);
    }

    const handleSessionCreated = () => {
      setHasSession(true);
    };

    window.addEventListener("chat-session-created", handleSessionCreated);
    return () => window.removeEventListener("chat-session-created", handleSessionCreated);
  }, []);

  const toggleTask = (t: string) => {
    if (tasks.includes(t)) {
      setTasks(tasks.filter(task => task !== t));
    } else {
      setTasks([...tasks, t]);
    }
  };

  const handleQuizSubmit = () => {
    ymEvent('quiz_completed', { niche: niche || defaultNiche || 'main' });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("quiz-data", {
          detail: {
            niche: niche || "Не указана",
            employees: employees || "Не указано",
            tasks: tasks.length > 0 ? tasks.join(", ") : "Не указаны",
          },
        })
      );
    }
    setQuizDone(true);
  };

  const renderQuizContent = () => {
    return (
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-card flex flex-col h-full justify-between animate-fade-in-up">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Шаг {step} из 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-6 sm:w-8 rounded-full ${step >= i ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
          </div>

          {niche && step > 1 && (
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-md flex items-center justify-between animate-fade-in-up">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-0.5 font-bold">Выбранная ниша</span>
                <span className="text-base font-display font-bold text-heavy">{niche}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-primary hover:underline hover:text-primary-hover"
              >
                Изменить
              </button>
            </div>
          )}
          
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-6">В какой нише работает ваш бизнес?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NICHES.map(n => (
                  <button
                    key={n}
                    onClick={() => {
                      ymEvent('quiz_started');
                      setNiche(n);
                      setTimeout(() => setStep(2), 200);
                    }}
                    className={`p-3 sm:p-4 text-left border rounded-md transition-all text-sm sm:text-base ${niche === n ? 'border-primary bg-primary/5 text-primary font-medium shadow-sm' : 'border-border text-text-main hover:border-text-muted hover:bg-bg'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-6">Сколько сотрудников работает с клиентами?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EMPLOYEES.map(e => (
                  <button
                    key={e}
                    onClick={() => { setEmployees(e); setTimeout(() => setStep(3), 200); }}
                    className={`p-3 sm:p-4 text-left border rounded-md transition-all text-sm sm:text-base ${employees === e ? 'border-primary bg-primary/5 text-primary font-medium shadow-sm' : 'border-border text-text-main hover:border-text-muted hover:bg-bg'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-2">Что вы хотите делегировать ИИ?</h3>
              <p className="text-sm text-text-muted mb-6">Выберите один или несколько вариантов</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TASKS.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleTask(t)}
                    className={`p-3 sm:p-4 text-left border rounded-md transition-all flex items-start gap-3 text-sm sm:text-base ${tasks.includes(t) ? 'border-primary bg-primary/5 text-primary font-medium shadow-sm' : 'border-border text-text-main hover:border-text-muted hover:bg-bg'}`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${tasks.includes(t) ? 'bg-primary border-primary' : 'border-text-muted'}`}>
                      {tasks.includes(t) && <CheckCircle className="w-3 h-3 text-heavy" />}
                    </div>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`text-sm font-medium flex items-center gap-2 text-text-muted hover:text-heavy transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(prev => Math.min(3, prev + 1))}
              disabled={step === 1 && !niche || step === 2 && !employees}
              className="text-sm font-medium flex items-center gap-2 bg-heavy text-surface px-5 sm:px-6 py-2.5 rounded-md hover:bg-primary hover:text-heavy transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleQuizSubmit}
              disabled={tasks.length === 0}
              className="text-xs sm:text-sm font-semibold flex items-center gap-2 bg-primary text-heavy px-4 sm:px-6 py-2.5 rounded-md hover:bg-heavy hover:text-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Узнать решение
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const nicheSelect = form.elements.namedItem("niche") as HTMLSelectElement;
    const commentInput = form.elements.namedItem("comment") as HTMLTextAreaElement;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const formNiche = nicheSelect.value;
    const comment = commentInput.value.trim();

    if (!name) {
      setFormState("error");
      setErrorMsg("Пожалуйста, введите ваше имя.");
      return;
    }
    if (name.length < 2) {
      setFormState("error");
      setErrorMsg("Имя должно быть не менее 2 символов.");
      return;
    }

    if (!phone) {
      setFormState("error");
      setErrorMsg("Пожалуйста, введите телефон или email.");
      return;
    }

    if (phone.length < 5) {
      setFormState("error");
      setErrorMsg("Пожалуйста, укажите корректный телефон или email.");
      return;
    }

    setFormState("loading");

    const sessionId = typeof window !== "undefined" ? localStorage.getItem("samartsev_chat_session") : null;

    const data = {
      name,
      phone,
      niche: formNiche,
      comment,
      session_id: sessionId,
      source:  "landing_contact_form",
      timestamp: new Date().toISOString(),
    };

    let webhookUrl = process.env.NEXT_PUBLIC_N8N_FORM_WEBHOOK;
    if (webhookUrl && process.env.NODE_ENV === "production") {
      webhookUrl = webhookUrl.replace("/webhook-test/", "/webhook/");
    }

    try {
      if (!webhookUrl) {
        // Demo mode
        await new Promise((r) => setTimeout(r, 1500));
        setFormState("success");
        ymEvent('form_submitted', { niche: formNiche || niche || defaultNiche || 'main' });
        return;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Ошибка сервера");
      setFormState("success");
      ymEvent('form_submitted', { niche: formNiche || niche || defaultNiche || 'main' });
    } catch {
      setFormState("error");
      setErrorMsg("Не удалось отправить заявку. Напишите нам напрямую в Telegram.");
    }
  };

  const renderFallbackForm = () => {
    return (
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-card animate-fade-in-up">
        {formState === "success" ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy">Заявка отправлена!</h3>
            <p className="text-text-muted font-body">
              Свяжусь с вами в течение 24 часов. Проверьте Telegram или почту.
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="mt-4 text-sm text-primary hover:underline font-medium"
            >
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-heavy mb-1.5">
                Имя <span className="text-primary">*</span>
              </label>
              <input
                id="contact-name" name="name" type="text" required
                placeholder="Иван Петров…"
                autoComplete="name"
                spellCheck={false}
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-semibold text-heavy mb-1.5">
                Телефон или Email <span className="text-primary">*</span>
              </label>
              <input
                id="contact-phone" name="phone" type="text" required
                placeholder="+7 (999) 000-00-00 или ivan@company.ru…"
                autoComplete="email"
                spellCheck={false}
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-niche" className="block text-sm font-semibold text-heavy mb-1.5">
                Ниша бизнеса
              </label>
              <select
                id="contact-niche" name="niche"
                defaultValue={defaultNiche || ""}
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Выберите нишу…</option>
                {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="contact-comment" className="block text-sm font-semibold text-heavy mb-1.5">
                Комментарий
              </label>
              <textarea
                id="contact-comment" name="comment" rows={3}
                placeholder="Кратко опишите, что хотите автоматизировать…"
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {formState === "error" && (
              <div role="alert" aria-live="polite" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full flex items-center justify-center gap-2 h-13 px-8 py-4 bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold uppercase tracking-widest text-sm rounded-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Отправляем…</>
              ) : (
                "Получить бесплатный аудит"
              )}
            </button>

            <p className="text-xs text-text-muted text-center font-body">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" className="hover:text-heavy underline underline-offset-2 transition-colors">
                политикой конфиденциальности
              </a>
            </p>
          </form>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left info */}
        <div className="animate-fade-in-up">
          <span className="text-[13px] font-semibold tracking-widest text-text-muted uppercase block mb-4">
            // УЗНАЙТЕ СТОИМОСТЬ И СРОКИ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-heavy mb-6 leading-tight">
            Получите решение для вашего бизнеса
          </h2>
          <p className="text-text-muted mb-10 font-body leading-relaxed text-lg border-b border-border pb-8">
            Пройдите короткий опрос из 3 вопросов — мы подготовим персональное предложение с расчётом окупаемости для вашей ниши.
          </p>
          <ul className="space-y-5">
            {[
              "Бесплатная стратегическая сессия (30 мин)",
              "Расчёт ROI конкретно для вашей ниши",
              "Никаких обязательств при тестировании",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-main font-body">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 p-5 bg-surface border border-border rounded-md">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-3">Или напишите напрямую</p>
            <a
              href="https://t.me/samartsev_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-heavy hover:text-primary transition-colors font-display font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.24.24 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z"/>
              </svg>
              @samartsev_ai
            </a>
          </div>
        </div>

        {/* Right form or quiz */}
        <div className="h-full min-h-[480px]">
          {isMounted && (quizDone ? renderFallbackForm() : renderQuizContent())}
          {!isMounted && (
             <div className="h-full w-full bg-surface/50 border border-border rounded-md animate-pulse"></div>
          )}
        </div>
      </div>
    </section>
  );
}
