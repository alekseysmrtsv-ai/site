"use client";

import { useState } from "react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import contentRaw from "../../content/landing/index.json";
import { LandingContent } from "@/types/landing";

const content = contentRaw as LandingContent;

export default function HeroSection() {
  const { hero, chatWidget } = content;
  
  // Use initializer function to avoid setState in useEffect
  const [headline] = useState(() => {
    if (hero.abTestActive && hero.headlineB && Math.random() > 0.5) {
      return hero.headlineB;
    }
    return hero.headline;
  });

  return (
    <section
      id="hero"
      className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-[80px] pb-16 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Copy & CTA */}
        <div className="flex flex-col gap-8 max-w-[600px]">
          <div className="flex flex-col gap-6">
            <Badge variant="primary" pulse>
              {hero.badge}
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-heavy leading-[1.05] tracking-tight">
              {headline.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <div className="flex flex-col gap-4">
              <p className="font-body text-balance text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl">
                {hero.description}
              </p>
              <div className="flex items-center gap-4 text-[13px] font-semibold text-text-muted">
                <span>100+ часов&nbsp;/ мес. экономии</span>
                <div className="w-px h-4 bg-border" />
                <span>0 пропущенных заявок</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="#calculator" aria-label="Рассчитать стоимость">
                  {hero.ctaPrimary}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a href="#contact" aria-label="Связаться с нами">
                  {hero.ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Niche Solutions Box (Prominent & High-converting) */}
            <div id="niches" className="p-4 sm:p-5 rounded-2xl bg-surface border-2 border-border/80 shadow-md scroll-mt-28 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-display uppercase tracking-wider text-heavy flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Готовые отраслевые решения:
                </span>
                <span className="text-[11px] font-semibold text-primary hidden sm:inline-block">
                  Демо-стенды 24/7
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Link
                  href="/med"
                  className="group flex flex-col justify-between p-3.5 rounded-xl bg-bg border border-border hover:border-[#4A9EFF] hover:bg-[#4A9EFF]/5 transition-all shadow-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">🦷</span>
                      <span className="text-[11px] font-bold text-[#4A9EFF] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Демо →
                      </span>
                    </div>
                    <span className="font-display font-bold text-sm text-heavy group-hover:text-[#4A9EFF] transition-colors block">
                      Стоматологии
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted leading-tight mt-1">
                    Запись 24/7 в Ident & YCLIENTS
                  </span>
                </Link>

                <Link
                  href="/beauty"
                  className="group flex flex-col justify-between p-3.5 rounded-xl bg-bg border border-border hover:border-[#C77DFF] hover:bg-[#C77DFF]/5 transition-all shadow-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">💇‍♀️</span>
                      <span className="text-[11px] font-bold text-[#C77DFF] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Демо →
                      </span>
                    </div>
                    <span className="font-display font-bold text-sm text-heavy group-hover:text-[#C77DFF] transition-colors block">
                      Салоны красоты
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted leading-tight mt-1">
                    WhatsApp-запись к мастерам
                  </span>
                </Link>

                <Link
                  href="/auto"
                  className="group flex flex-col justify-between p-3.5 rounded-xl bg-bg border border-border hover:border-[#FF6B4A] hover:bg-[#FF6B4A]/5 transition-all shadow-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">🚗</span>
                      <span className="text-[11px] font-bold text-[#FF6B4A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Демо →
                      </span>
                    </div>
                    <span className="font-display font-bold text-sm text-heavy group-hover:text-[#FF6B4A] transition-colors block">
                      Автосервисы
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted leading-tight mt-1">
                    Заявки 18:00+, 1С и Vision AI
                  </span>
                </Link>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                Интегрируется с...
              </span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {["n8n.io", "amoCRM", "Bitrix24", "Telegram", "WhatsApp"].map((b) => (
                  <span key={b} className="font-display font-bold text-lg tracking-tight opacity-40 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chat Demo */}
        <ChatWidget chatWidgetData={chatWidget} />
      </div>
    </section>
  );
}

