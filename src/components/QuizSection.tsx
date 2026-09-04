"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, AlertCircle, ArrowRight, ArrowLeft, Send } from "lucide-react";
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
  "Запись на услуги / приём",
  "Автоматизация КП и спецификаций",
  "Поддержка клиентов 24/7",
  "Интеграция с CRM и 1С",
  "Снижение стоимости лида",
  "Не знаю, нужна консультация",
  "Другое",
];

const CHANNELS = [
  { id: "Telegram", label: "Telegram", icon: "📱" },
  { id: "WhatsApp", label: "WhatsApp", icon: "💬" },
  { id: "Телефон", label: "Телефон", icon: "📞" },
] as const;

interface QuizSectionProps {
  defaultNiche?: string;
}

export default function QuizSection({ defaultNiche = "" }: QuizSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  const [step, setStep] = useState(defaultNiche ? 2 : 1);
  const [niche, setNiche] = useState(defaultNiche);
  const [employees, setEmployees] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  // Step 4 contact details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredChannel, setPreferredChannel] = useState<string>("Telegram");
  const [comment, setComment] = useState("");
  
  // Submission State
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTask = (t: string) => {
    if (tasks.includes(t)) {
      setTasks(tasks.filter(task => task !== t));
    } else {
      setTasks([...tasks, t]);
    }
  };

  const handleNextToContacts = () => {
    ymEvent("quiz_completed", {
      niche: niche || defaultNiche || "main",
      employees,
      tasks_count: tasks.length,
    });
    setStep(4);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setFormState("error");
      setErrorMsg("Пожалуйста, укажите ваше имя.");
      return;
    }
    if (trimmedName.length < 2) {
      setFormState("error");
      setErrorMsg("Имя должно содержать не менее 2 символов.");
      return;
    }

    if (!trimmedPhone) {
      setFormState("error");
      setErrorMsg("Пожалуйста, укажите телефон или Telegram для связи.");
      return;
    }

    if (trimmedPhone.length < 5) {
      setFormState("error");
      setErrorMsg("Пожалуйста, укажите корректный номер телефона или Telegram.");
      return;
    }

    setFormState("loading");

    const sessionId = typeof window !== "undefined" ? localStorage.getItem("samartsev_chat_session") : null;

    const summaryComment = `[КВИЗ] Ниша: ${niche || "Не указана"}, Сотрудников: ${employees || "Не указано"}, Задачи: ${tasks.length > 0 ? tasks.join(", ") : "Не указаны"}${comment.trim() ? `. Примечание: ${comment.trim()}` : ""}`;

    const payload = {
      name: trimmedName,
      phone: trimmedPhone,
      niche: niche || defaultNiche || "Не указана",
      comment: summaryComment,
      preferred_channel: preferredChannel,
      session_id: sessionId,
      source: "quiz_funnel",
      answers: {
        niche: niche || defaultNiche || "",
        employees,
        tasks,
        preferred_channel: preferredChannel,
        comment: comment.trim(),
      },
      timestamp: new Date().toISOString(),
    };

    let webhookUrl = process.env.NEXT_PUBLIC_N8N_FORM_WEBHOOK;
    if (webhookUrl && process.env.NODE_ENV === "production") {
      webhookUrl = webhookUrl.replace("/webhook-test/", "/webhook/");
    }

    try {
      if (!webhookUrl) {
        // Demo mode fallback
        await new Promise((r) => setTimeout(r, 1200));
        setFormState("success");
        ymEvent("quiz_lead_captured", { niche: niche || defaultNiche || "main", channel: preferredChannel });
        ymEvent("form_submitted", { niche: niche || defaultNiche || "main", source: "quiz_funnel" });
        return;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Ошибка сервера при отправке");
      }

      setFormState("success");
      ymEvent("quiz_lead_captured", { niche: niche || defaultNiche || "main", channel: preferredChannel });
      ymEvent("form_submitted", { niche: niche || defaultNiche || "main", source: "quiz_funnel" });
    } catch {
      setFormState("error");
      setErrorMsg("Не удалось отправить заявку через форму. Пожалуйста, напишите нам напрямую в Telegram @samartsev_ai — мы сразу ответим.");
    }
  };

  const handleReset = () => {
    setFormState("idle");
    setErrorMsg("");
    setName("");
    setPhone("");
    setComment("");
    setTasks([]);
    setEmployees("");
    if (!defaultNiche) {
      setNiche("");
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const renderSuccessState = () => (
    <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-card flex flex-col items-center justify-center text-center py-10 sm:py-12 space-y-6 animate-fade-in-up">
      <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="font-display text-2xl font-bold text-heavy">
          Заявка принята! Расчёт формируется
        </h3>
        <p className="text-text-muted font-body text-sm leading-relaxed">
          Мы уже изучаем специфику для ниши {niche ? <strong className="text-heavy">«{niche}»</strong> : "вашего бизнеса"} и подготовим индивидуальный расчёт окупаемости с планом внедрения.
        </p>
      </div>

      <div className="w-full max-w-sm bg-bg border border-border rounded-md p-4 text-xs sm:text-sm text-text-main text-left space-y-2">
        <div className="flex justify-between">
          <span className="text-text-muted">Контактное лицо:</span>
          <span className="font-semibold text-heavy">{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Канал связи:</span>
          <span className="font-semibold text-heavy">{preferredChannel}: {phone}</span>
        </div>
        {tasks.length > 0 && (
          <div className="pt-2 border-t border-border/60">
            <span className="text-text-muted block mb-1">Выбранные задачи:</span>
            <div className="flex flex-wrap gap-1">
              {tasks.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-primary/10 text-heavy text-[11px] rounded font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 w-full max-w-sm">
        <a
          href="https://t.me/samartsev_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 h-12 px-6 bg-primary text-heavy hover:bg-heavy hover:text-surface font-display font-semibold uppercase tracking-wider text-xs rounded-md transition-all duration-300 shadow-sm"
        >
          <Send className="w-4 h-4" /> Написать основателю в Telegram
        </a>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-text-muted hover:text-heavy underline underline-offset-4 transition-colors block mx-auto cursor-pointer"
        >
          Пройти опрос заново
        </button>
      </div>
    </div>
  );

  const renderQuizContent = () => (
    <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-card flex flex-col h-full justify-between animate-fade-in-up">
      <div>
        {/* Progress header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {step === 4 ? "Шаг 4 из 4: Контакты" : `Шаг ${step} из 4`}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-5 sm:w-7 rounded-full transition-all ${
                  step >= i ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Niche Badge if selected and on step > 1 */}
        {niche && step > 1 && (
          <div className="mb-6 p-3.5 bg-primary/5 border border-primary/20 rounded-md flex items-center justify-between animate-fade-in-up">
            <div className="truncate mr-3">
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-0.5 font-bold">
                Выбранная ниша
              </span>
              <span className="text-sm sm:text-base font-display font-bold text-heavy truncate block">
                {niche}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-primary hover:underline hover:text-primary-hover flex-shrink-0 cursor-pointer"
            >
              Изменить
            </button>
          </div>
        )}

        {/* Step 1: Niche */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-2">
              В какой нише работает ваш бизнес?
            </h3>
            <p className="text-sm text-text-muted mb-6">
              Это поможет подобрать проверенные кейсы и рассчитать окупаемость
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NICHES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    ymEvent("quiz_started");
                    setNiche(n);
                    setTimeout(() => setStep(2), 180);
                  }}
                  className={`p-3 sm:p-4 text-left border rounded-md transition-all text-sm sm:text-base cursor-pointer ${
                    niche === n
                      ? "border-primary bg-primary/5 text-primary font-medium shadow-sm"
                      : "border-border text-text-main hover:border-text-muted hover:bg-bg"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Employees */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-2">
              Сколько сотрудников работает с клиентами?
            </h3>
            <p className="text-sm text-text-muted mb-6">
              Отдел продаж, администраторы, операторы поддержки или колл-центр
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EMPLOYEES.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => {
                    setEmployees(e);
                    setTimeout(() => setStep(3), 180);
                  }}
                  className={`p-3 sm:p-4 text-left border rounded-md transition-all text-sm sm:text-base cursor-pointer ${
                    employees === e
                      ? "border-primary bg-primary/5 text-primary font-medium shadow-sm"
                      : "border-border text-text-main hover:border-text-muted hover:bg-bg"
                  }`}
                >
                  <span className="font-display font-bold text-lg mr-2">{e}</span>
                  <span className="text-xs sm:text-sm text-text-muted">чел.</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Tasks */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-2">
              Что вы хотите делегировать ИИ?
            </h3>
            <p className="text-sm text-text-muted mb-6">
              Выберите один или несколько ключевых процессов
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TASKS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTask(t)}
                  className={`p-3 sm:p-4 text-left border rounded-md transition-all flex items-start gap-3 text-sm sm:text-base cursor-pointer ${
                    tasks.includes(t)
                      ? "border-primary bg-primary/5 text-primary font-medium shadow-sm"
                      : "border-border text-text-main hover:border-text-muted hover:bg-bg"
                  }`}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${
                      tasks.includes(t)
                        ? "bg-primary border-primary"
                        : "border-text-muted"
                    }`}
                  >
                    {tasks.includes(t) && (
                      <CheckCircle className="w-3 h-3 text-heavy" />
                    )}
                  </div>
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Contact capture right inside the quiz */}
        {step === 4 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy mb-2">
              Куда прислать расчёт и план внедрения?
            </h3>
            <p className="text-sm text-text-muted mb-5">
              Подготовим смету окупаемости и пример сценария под ваши задачи. Без спама.
            </p>

            {/* Chosen parameters recap */}
            <div className="mb-5 p-3.5 bg-bg border border-border rounded-md text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-heavy">Параметры вашего запроса:</span>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-primary hover:underline font-bold text-[11px] cursor-pointer"
                >
                  Изменить
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 text-text-main">
                <span className="px-2 py-0.5 bg-surface border border-border rounded">
                  💼 {niche || "Любая ниша"}
                </span>
                <span className="px-2 py-0.5 bg-surface border border-border rounded">
                  👥 {employees ? `${employees} сотр.` : "Команда не указана"}
                </span>
                <span className="px-2 py-0.5 bg-surface border border-border rounded">
                  ⚡ Задач: {tasks.length}
                </span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="quiz-name"
                  className="block text-xs font-semibold text-heavy mb-1"
                >
                  Ваше имя <span className="text-primary">*</span>
                </label>
                <input
                  id="quiz-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров…"
                  autoComplete="name"
                  className="w-full bg-bg border border-border rounded-md px-3.5 py-2.5 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="quiz-phone"
                  className="block text-xs font-semibold text-heavy mb-1"
                >
                  Телефон или Telegram <span className="text-primary">*</span>
                </label>
                <input
                  id="quiz-phone"
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00 или @username…"
                  autoComplete="tel"
                  className="w-full bg-bg border border-border rounded-md px-3.5 py-2.5 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-heavy mb-1.5">
                  Удобный способ связи
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPreferredChannel(ch.id)}
                      className={`py-2 px-2 text-center border rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        preferredChannel === ch.id
                          ? "border-primary bg-primary/10 text-heavy font-semibold shadow-xs"
                          : "border-border text-text-muted hover:border-text-muted hover:text-text-main"
                      }`}
                    >
                      <span>{ch.icon}</span>
                      <span className="truncate">{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="quiz-comment"
                  className="block text-xs font-semibold text-heavy mb-1"
                >
                  Комментарий или ссылка на сайт <span className="text-text-muted font-normal">(необязательно)</span>
                </label>
                <input
                  id="quiz-comment"
                  name="comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Адрес сайта, специфика или пожелания…"
                  className="w-full bg-bg border border-border rounded-md px-3.5 py-2.5 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {formState === "error" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-start gap-2 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full flex items-center justify-center gap-2 h-12 px-6 bg-primary text-heavy hover:bg-heavy hover:text-surface font-display font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-md transition-all duration-300 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {formState === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Отправляем заявку…
                  </>
                ) : (
                  "Получить персональный расчёт →"
                )}
              </button>

              <p className="text-[11px] text-text-muted text-center font-body">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a
                  href="/privacy"
                  className="hover:text-heavy underline underline-offset-2 transition-colors"
                >
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        )}
      </div>

      {/* Navigation footer for steps 1-3 */}
      {step < 4 && (
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            className={`text-sm font-medium flex items-center gap-2 text-text-muted hover:text-heavy transition-colors cursor-pointer ${
              (step === 1 || (step === 2 && Boolean(defaultNiche)))
                ? "opacity-0 pointer-events-none"
                : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => Math.min(3, prev + 1))}
              disabled={(step === 1 && !niche) || (step === 2 && !employees)}
              className="text-sm font-medium flex items-center gap-2 bg-heavy text-surface px-5 sm:px-6 py-2.5 rounded-md hover:bg-primary hover:text-heavy transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Далее <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextToContacts}
              disabled={tasks.length === 0}
              className="text-xs sm:text-sm font-semibold flex items-center gap-2 bg-primary text-heavy px-4 sm:px-6 py-2.5 rounded-md hover:bg-heavy hover:text-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer"
            >
              Куда прислать расчёт? <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left info column */}
        <div className="animate-fade-in-up">
          <span className="text-[13px] font-semibold tracking-widest text-text-muted uppercase block mb-4">
            // УЗНАЙТЕ СТОИМОСТЬ И СРОКИ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-heavy mb-6 leading-tight">
            Получите решение для вашего бизнеса
          </h2>
          <p className="text-text-muted mb-10 font-body leading-relaxed text-lg border-b border-border pb-8">
            Пройдите короткий опрос из 4 шагов — мы подготовим персональное предложение с расчётом окупаемости для вашей ниши.
          </p>
          <ul className="space-y-5">
            {[
              "Бесплатная стратегическая сессия (30 мин)",
              "Расчёт ROI конкретно для вашей ниши",
              "Никаких обязательств при тестировании",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-text-main font-body"
              >
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 p-5 bg-surface border border-border rounded-md">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-3">
              Или напишите напрямую
            </p>
            <a
              href="https://t.me/samartsev_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-heavy hover:text-primary transition-colors font-display font-semibold"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.24.24 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z" />
              </svg>
              @samartsev_ai
            </a>
          </div>
        </div>

        {/* Right card container */}
        <div className="h-full min-h-[500px]">
          {isMounted ? (
            formState === "success" ? (
              renderSuccessState()
            ) : (
              renderQuizContent()
            )
          ) : (
            <div className="h-full w-full bg-surface/50 border border-border rounded-md animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}
