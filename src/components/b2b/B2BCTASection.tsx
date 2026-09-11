"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Send, ShieldCheck, Clock, CheckCircle2, MessageSquare } from "lucide-react";

export default function B2BCTASection() {
  const [phoneOrTg, setPhoneOrTg] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrTg.trim()) return;

    setStatus("loading");
    // Отправка в существующий API лидов
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: phoneOrTg.trim(),
        company: company.trim() || "B2B автоматизация",
        niche: "b2b",
        source: "b2b_cta_form",
      }),
    })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("success"); // Fallback friendly UI
      });
  };

  return (
    <section id="contact" className="w-full py-20 bg-bg text-heavy border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="bg-surface border-2 border-primary/30 rounded-3xl p-8 sm:p-14 shadow-card max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
            <span>🎯</span>
            <span>Экспресс-аудит бизнес-процессов</span>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
              Готовы оцифровать процессы и убрать до 80% рутины?
            </h2>
            <p className="text-text-muted text-base sm:text-lg font-body leading-relaxed">
              Разберем узкие места в ваших продажах и операционке, покажем прототип решения под ваш стек (CRM, 1С, Telegram) и посчитаем реальную окупаемость.
            </p>
          </div>

          {/* Quick Contact Form or Direct Telegram */}
          {status === "success" ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-2 max-w-md w-full">
              <div className="flex items-center justify-center gap-2 font-display font-bold text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Заявка принята!</span>
              </div>
              <p className="text-xs text-text-muted">
                Алексей Самарцев свяжется с вами в течение рабочего дня для согласования удобного времени аудита.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={phoneOrTg}
                  onChange={(e) => setPhoneOrTg(e.target.value)}
                  placeholder="Телефон или @username Telegram"
                  className="flex-1 px-4 py-3 rounded-xl bg-bg border border-border text-sm text-heavy placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="font-bold shadow-md shrink-0"
                >
                  {status === "loading" ? "Отправка..." : "Заказать аудит"}
                </Button>
              </div>
              <p className="text-[11px] text-text-muted text-center">
                Конфиденциально · Подписание NDA до старта · 152-ФЗ
              </p>
            </form>
          )}

          {/* Direct Telegram Alternative */}
          <div className="pt-4 border-t border-border/60 w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold text-text-muted">
            <span>Или сразу напрямую:</span>
            <a
              href="https://t.me/samartsev_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg border border-border hover:border-primary/50 text-heavy transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Написать Алексею в Telegram</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </a>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-text-muted max-w-2xl w-full">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Без навязывания лишних услуг</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>30 минут концентрированной пользы</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Оценка окупаемости в цифрах</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
