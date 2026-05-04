"use client";

import { useState } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const NICHES = [
  "Медицина / Стоматология",
  "Beauty / SPA",
  "Автосервис",
  "Недвижимость",
  "E-commerce / Магазин",
  "Образование",
  "Юридические услуги",
  "Другое",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      phone:   (form.elements.namedItem("phone")   as HTMLInputElement).value,
      niche:   (form.elements.namedItem("niche")   as HTMLSelectElement).value,
      comment: (form.elements.namedItem("comment") as HTMLTextAreaElement).value,
      source:  "landing_contact_form",
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_FORM_WEBHOOK;

    try {
      if (!webhookUrl) {
        // Demo mode
        await new Promise((r) => setTimeout(r, 1500));
        setState("success");
        return;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Ошибка сервера");
      setState("success");
    } catch {
      setState("error");
      setErrorMsg("Не удалось отправить заявку. Напишите нам напрямую в Telegram.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left info */}
        <div>
          <span className="text-[13px] font-semibold tracking-widest text-text-muted uppercase block mb-4">
            // БЕСПЛАТНЫЙ АУДИТ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-heavy mb-6 leading-tight">
            Готовы автоматизировать бизнес?
          </h2>
          <p className="text-text-muted mb-10 font-body leading-relaxed text-lg border-b border-border pb-8">
            Получите бесплатный аудит ваших процессов и узнайте, как ИИ-агент вернёт упущенную выручку уже в первый месяц.
          </p>
          <ul className="space-y-5">
            {[
              "Бесплатная стратегическая сессия (30 мин)",
              "Расчёт ROI конкретно для вашей ниши",
              "Никаких обязательств при тестировании",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-main font-body">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
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
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.24.24 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z"/>
              </svg>
              @samartsev_ai
            </a>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-surface border border-border rounded-md p-8 shadow-card">
          {state === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-heavy">Заявка отправлена!</h3>
              <p className="text-text-muted font-body">
                Свяжусь с вами в течение 24 часов. Проверьте Telegram или почту.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-4 text-sm text-primary hover:underline font-medium"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-heavy mb-1.5">
                  Имя <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-name" name="name" type="text" required
                  placeholder="Иван Петров"
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-heavy mb-1.5">
                  Телефон или Email <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-phone" name="phone" type="text" required
                  placeholder="+7 (999) 000-00-00 или ivan@company.ru"
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-niche" className="block text-sm font-semibold text-heavy mb-1.5">
                  Ниша бизнеса
                </label>
                <select
                  id="contact-niche" name="niche"
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Выберите нишу...</option>
                  {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="contact-comment" className="block text-sm font-semibold text-heavy mb-1.5">
                  Комментарий
                </label>
                <textarea
                  id="contact-comment" name="comment" rows={3}
                  placeholder="Кратко опишите, что хотите автоматизировать..."
                  className="w-full bg-bg border border-border rounded-md px-4 py-3 text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {state === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full flex items-center justify-center gap-2 h-13 px-8 py-4 bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold uppercase tracking-widest text-sm rounded-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Отправляем...</>
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
      </div>
    </section>
  );
}
