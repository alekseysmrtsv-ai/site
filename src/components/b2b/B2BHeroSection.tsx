"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import B2BChatDemoWidget from "./B2BChatDemoWidget";
import { ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

export default function B2BHeroSection() {
  return (
    <section
      id="hero"
      className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-[100px] pb-16 relative"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Copy & CTA */}
        <div className="flex flex-col gap-8 max-w-[620px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Badge variant="primary" pulse>
                💼 B2B Автоматизация с ИИ
              </Badge>
              <span className="text-xs font-semibold text-text-muted hidden sm:inline-block">
                Продажи · Операционка · Знания
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-heavy leading-[1.08] tracking-tight">
              Автоматизация бизнес-процессов с ИИ для B2B
            </h1>

            <p className="font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              Устраняем невидимые затраты компании: алгоритмы за 30 секунд готовят КП, вытаскивают реквизиты из входящей почты, синхронизируют CRM с 1С и дают команде мгновенный доступ к корпоративной базе знаний.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold pt-1">
              <div className="flex items-center gap-1.5 text-heavy">
                <Zap className="w-4 h-4 text-primary" />
                <span>До -80% рутины команды</span>
              </div>
              <div className="w-px h-3.5 bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 text-heavy">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>152-ФЗ и закрытый контур</span>
              </div>
              <div className="w-px h-3.5 bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 text-heavy">
                <Database className="w-4 h-4 text-primary" />
                <span>Окупаемость от 1 месяца</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Button size="lg" asChild className="w-full sm:w-auto font-bold shadow-md">
                <a href="#contact" aria-label="Заказать аудит процессов">
                  Заказать аудит процессов
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto font-semibold">
                <a
                  href="https://t.me/samartsev_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Обсудить в Telegram"
                  className="flex items-center justify-center gap-2 text-heavy hover:text-primary"
                >
                  <span>Написать в Telegram</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Бесшовно связываем ваши системы:
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {["amoCRM", "Битрикс24", "1С:ERP", "Telegram", "WhatsApp", "YandexGPT"].map((tool) => (
                  <span
                    key={tool}
                    className="font-display font-bold text-sm tracking-tight text-slate-200 hover:text-heavy transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive B2B Demo Agent */}
        <div className="flex justify-center lg:justify-end w-full">
          <B2BChatDemoWidget />
        </div>
      </div>
    </section>
  );
}
