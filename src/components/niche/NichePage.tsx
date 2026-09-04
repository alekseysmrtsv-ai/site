"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import CalculatorSection from "@/components/CalculatorSection";
import FounderSection from "@/components/FounderSection";
import CTABanner from "@/components/CTABanner";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import contentRaw from "../../../content/landing/index.json";
import { LandingContent, FAQItem, ChatWidgetContent } from "@/types/landing";
import { NICHE_DATA } from "./nicheData";

const content = contentRaw as LandingContent;

/* ═══════════════════════════════════════════════════
   NICHE CONFIG TYPE
   ═══════════════════════════════════════════════════ */

export interface NicheConfig {
  nicheKey: string;
  quizNiche: string;
  accentColor: string;       // e.g. "#4A9EFF"
  accentColorRGB: string;    // e.g. "74, 158, 255"
  accentHover: string;
  gradientTo: string;
  integrations: string[];
  hero: {
    badge: string;
    headline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats?: { value: number; suffix: string; label: string }[];
  calculator: {
    leads: number;
    check: number;
    loss: number;
  };
  comparison: {
    competitorName: string;
    headline: string;
    subtitle: string;
    rows: { label: string; old: string; ai: string }[];
  };
  scenariosHeadline?: string;
  scenariosSubtitle?: string;
  scenarios: {
    icon: string;
    time: string;
    messages: { from: "user" | "agent"; text: string }[];
    result: string;
  }[];
  faq: FAQItem[];
  blogArticle?: {
    title: string;
    slug: string;
    description: string;
    readTime: string;
  };
  chatWidget?: ChatWidgetContent;
}

/* ═══════════════════════════════════════════════════
   NICHE PAGE TEMPLATE
   ═══════════════════════════════════════════════════ */

/* ── Animated counter hook ────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return ref;
}

function AnimatedStat({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const ref = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-1 px-6">
      <div className="font-display font-bold text-3xl md:text-4xl" style={{ color }}>
        <span ref={ref}>0</span>{suffix}
      </div>
      <span className="text-[12px] text-text-muted font-body uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function NichePage({
  config,
  customHeroWidget,
  customCalculator,
}: {
  config: NicheConfig;
  customHeroWidget?: React.ReactNode;
  customCalculator?: React.ReactNode;
}) {
  const c = config;
  const nicheEntry = (NICHE_DATA as Record<string, any>)[c.nicheKey];
  const chatWidget = c.chatWidget || nicheEntry?.chatWidget || content.chatWidget;

  return (
    <div
      className="dark"
      style={{
        "--color-primary": c.accentColor,
        "--color-primary-hover": c.accentHover,
        "--color-border-hover": c.accentColor,
      } as React.CSSProperties}
    >
      <Header />

      <main>
        {/* ── HERO ───────────────────────────────────── */}
        <section
          id="hero"
          className="relative w-full overflow-hidden"
        >
          {/* Background: large gradient orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
              style={{ background: c.accentColor }}
            />
            <div
              className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
              style={{ background: c.gradientTo }}
            />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(${c.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${c.accentColor} 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-[100px] pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Copy */}
              <div className="flex flex-col gap-8 max-w-[600px]">
                <div className="flex flex-col gap-6">
                  <Badge variant="primary" pulse>
                    {c.hero.badge}
                  </Badge>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-heavy leading-[1.05] tracking-tight">
                    {c.hero.headline.split("\n").map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h1>
                  <p className="font-body text-balance text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl">
                    {c.hero.description}
                  </p>
                  <div className="flex items-center gap-4 text-[13px] font-semibold text-text-muted">
                    <span>Ответ за 2 секунды</span>
                    <div className="w-px h-4 bg-border" />
                    <span>Работает 24/7</span>
                    <div className="w-px h-4 bg-border" />
                    <span>0 пропущенных заявок</span>
                  </div>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Button size="lg" asChild className="w-full sm:w-auto">
                      <a href="#calculator">{c.hero.ctaPrimary}</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                      <a href="#contact">{c.hero.ctaSecondary}</a>
                    </Button>
                  </div>

                  {/* Integration badges */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      Интегрируется с...
                    </span>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      {c.integrations.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center px-3 py-1.5 rounded-md bg-surface/50 text-[12px] font-display font-semibold text-text-muted border border-border/50 hover:border-primary hover:text-primary transition-all"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Chat Demo or Custom Hero Widget */}
              <div className="flex flex-col items-center gap-4 lg:sticky lg:top-24 w-full">
                {customHeroWidget ? (
                  customHeroWidget
                ) : (
                  <>
                    <div className="relative w-full">
                      <ChatWidget chatWidgetData={chatWidget} niche={c.nicheKey} />
                      {/* Glow ring around chat */}
                      <div
                        className="absolute -inset-1 rounded-2xl opacity-20 blur-xl -z-10"
                        style={{ background: c.accentColor }}
                      />
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full border"
                      style={{
                        borderColor: `rgba(${c.accentColorRGB}, 0.3)`,
                        background: `rgba(${c.accentColorRGB}, 0.05)`,
                      }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: c.accentColor }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: c.accentColor }} />
                      </span>
                      <span className="text-[12px] font-display font-semibold" style={{ color: c.accentColor }}>
                        Протестируйте агента в боевых условиях
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── ANIMATED STATS STRIP ────────────────────── */}
        <section className="w-full border-y border-border py-12">
          <div className="max-w-[1000px] mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-0 md:divide-x md:divide-border">
            {c.stats && c.stats.length > 0 ? (
              c.stats.map((s, idx) => (
                <AnimatedStat key={idx} value={s.value} suffix={s.suffix} label={s.label} color={c.accentColor} />
              ))
            ) : (
              <>
                <AnimatedStat value={2} suffix="с" label="Скорость ответа" color={c.accentColor} />
                <AnimatedStat value={24} suffix="/7" label="Без выходных" color={c.accentColor} />
                <AnimatedStat value={0} suffix="" label="Пропущенных заявок" color={c.accentColor} />
                <AnimatedStat value={3} suffix=" дня" label="До запуска" color={c.accentColor} />
              </>
            )}
          </div>
        </section>

        {/* ── LIVE SCENARIOS ───────────────────────────── */}
        <section className="relative w-full py-20 overflow-hidden">
          {/* Background accent glow */}
          <div
            className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.07] -z-10"
            style={{ background: c.accentColor }}
          />

          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy">
                {c.scenariosHeadline || "Возможные сценарии применения"}
              </h2>
              <p className="text-text-muted text-lg font-body">
                {c.scenariosSubtitle || "Как ИИ-агент автоматизирует типовые процессы"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.scenarios.map((s, idx) => (
                <div
                  key={idx}
                  className="group bg-surface rounded-lg border border-border p-6 hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top glow on hover */}
                  <div
                    className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}, transparent)` }}
                  />

                  {/* Time badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[18px] text-text-muted">{s.icon}</span>
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider text-text-muted">
                      {s.time}
                    </span>
                  </div>

                  {/* Chat bubbles */}
                  <div className="flex flex-col gap-2.5 mb-4">
                    {s.messages.map((msg, mi) => (
                      msg.from === "user" ? (
                        <div key={mi} className="self-end bg-bg rounded-lg px-3.5 py-2 max-w-[85%]">
                          <p className="text-[13px] text-text-muted font-body leading-relaxed">{msg.text}</p>
                        </div>
                      ) : (
                        <div
                          key={mi}
                          className="self-start rounded-lg px-3.5 py-2 max-w-[85%] border"
                          style={{
                            background: `rgba(${c.accentColorRGB}, 0.08)`,
                            borderColor: `rgba(${c.accentColorRGB}, 0.2)`,
                          }}
                        >
                          <p className="text-[13px] text-heavy font-body leading-relaxed">{msg.text}</p>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Result */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ color: c.accentColor, fontVariationSettings: '"FILL" 1' }}
                    >
                      check_circle
                    </span>
                    <span className="text-[12px] font-display font-semibold" style={{ color: c.accentColor }}>
                      {s.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALCULATOR / INFOGRAPHIC ────────────────── */}
        {customCalculator ? (
          customCalculator
        ) : (
          <CalculatorSection
            defaultLeads={c.calculator.leads}
            defaultCheck={c.calculator.check}
            defaultLoss={c.calculator.loss}
          />
        )}

        {/* ── COMPARISON ─────────────────────────────── */}
        <section className="relative w-full py-20 overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.06] -z-10 -translate-y-1/2"
            style={{ background: c.accentColor }}
          />

          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-12 space-y-4 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
                {c.comparison.headline}
              </h2>
              <p className="text-text-muted text-base md:text-lg font-body">
                {c.comparison.subtitle}
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border border-border bg-surface shadow-card">
              <table className="w-full border-collapse text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-bg/50 font-display text-sm font-bold text-heavy">
                    <th className="p-6 w-[25%]">Критерий</th>
                    <th className="p-6 w-[37.5%]">{c.comparison.competitorName}</th>
                    <th
                      className="p-6 w-[37.5%] relative overflow-hidden"
                      style={{ color: c.accentColor, background: `rgba(${c.accentColorRGB}, 0.05)` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: c.accentColor }} />
                      ИИ-агент
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm divide-y divide-border/50">
                  {c.comparison.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-bg/25 transition-colors">
                      <td className="p-6 font-display font-semibold text-heavy">{row.label}</td>
                      <td className="p-6 text-text-muted">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-red-500 text-[18px] mt-0.5">cancel</span>
                          <span>{row.old}</span>
                        </div>
                      </td>
                      <td
                        className="p-6 font-medium text-heavy relative"
                        style={{ background: `rgba(${c.accentColorRGB}, 0.05)` }}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className="material-symbols-outlined text-[18px] mt-0.5"
                            style={{ color: c.accentColor, fontVariationSettings: '"FILL" 1' }}
                          >
                            check_circle
                          </span>
                          <span>{row.ai}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────── */}
        <section className="relative w-full py-20 overflow-hidden border-t border-border">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06] -z-10"
            style={{ background: c.accentColor }}
          />

          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy">
                Как это работает
              </h2>
              <p className="text-text-muted text-base md:text-lg font-body">
                3 шага — и ваш бизнес принимает заявки круглосуточно
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[
                { num: "01", icon: "link", title: "Подключаем", desc: "Интегрируем агента с вашим сайтом, мессенджерами и CRM за 3 дня" },
                { num: "02", icon: "tune", title: "Настраиваем", desc: "Загружаем ваш прайс, услуги и частые вопросы клиентов в базу знаний" },
                { num: "03", icon: "bolt", title: "Работает 24/7", desc: "Агент принимает заявки днём и ночью. Вы получаете готовые сделки в CRM" },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="group bg-surface rounded-lg border border-border p-8 flex flex-col gap-6 relative overflow-hidden min-h-[250px]"
                >
                  {/* Number watermark */}
                  <div className="absolute top-4 right-6 font-display font-black text-6xl text-heavy opacity-[0.04] group-hover:opacity-[0.08] transition-opacity select-none pointer-events-none">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300"
                    style={{
                      background: `rgba(${c.accentColorRGB}, 0.1)`,
                      borderColor: `rgba(${c.accentColorRGB}, 0.2)`,
                    }}
                  >
                    <span className="material-symbols-outlined text-[24px]" style={{ color: c.accentColor }}>
                      {step.icon}
                    </span>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <h3 className="font-display text-xl font-bold text-heavy group-hover:transition-colors" style={{ ['--tw-hover-color' as string]: c.accentColor }}>
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm font-body leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Bottom line on hover */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}, transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG CASE STUDY LINK ──────────────────── */}
        {c.blogArticle && (
          <section className="w-full py-12 px-6 bg-surface/50 border-t border-border">
            <div className="max-w-4xl mx-auto">
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:border-primary/40 transition-all">
                <div className="space-y-2 max-w-xl">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded">
                    Практический кейс в блоге • {c.blogArticle.readTime}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-heavy leading-snug">
                    {c.blogArticle.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    {c.blogArticle.description}
                  </p>
                </div>
                <a
                  href={`/blog/${c.blogArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold text-xs tracking-wider uppercase transition-all shrink-0"
                >
                  Читать разбор →
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── FOUNDER ────────────────────────────────── */}
        <FounderSection />

        {/* ── FAQ ────────────────────────────────────── */}
        <section id="faq" className="py-16 px-6 bg-surface border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heavy">
                Частые вопросы
              </h2>
              <p className="text-text-muted text-lg font-body">
                Всё, что нужно знать перед стартом
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.faq.map((item) => (
                <details
                  key={item.q}
                  className="group bg-surface border border-border rounded-md p-6 shadow-subtle hover:border-primary transition-colors duration-200"
                >
                  <summary className="flex justify-between items-center cursor-pointer font-display text-base font-semibold text-heavy gap-4 select-none">
                    <span>{item.q}</span>
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-transform duration-200 group-open:rotate-45 flex-shrink-0">
                      add
                    </span>
                  </summary>
                  <p className="mt-4 text-text-muted leading-relaxed text-sm font-body">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + QUIZ ─────────────────────────────── */}
        <CTABanner />
        <QuizSection defaultNiche={c.quizNiche} />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
