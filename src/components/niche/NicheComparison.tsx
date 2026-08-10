"use client";

import { ComparisonRow } from "./nicheData";

interface NicheComparisonProps {
  nicheKey: "med" | "beauty" | "auto";
  comparisonRows: ComparisonRow[];
  title: string;
  subtitle: string;
  ctaText: string;
  bgImage?: string;
}

export default function NicheComparison({
  nicheKey,
  comparisonRows,
  title,
  subtitle,
  ctaText,
  bgImage,
}: NicheComparisonProps) {
  const getCompetitorLabel = () => {
    switch (nicheKey) {
      case "med":
        return "Ваш администратор";
      case "beauty":
        return "Менеджер в Instagram";
      case "auto":
        return "Мастер-приемщик / менеджер";
      default:
        return "Обычный менеджер";
    }
  };

  return (
    <section
      id="comparison"
      className="w-full py-16 md:py-24 bg-bg relative overflow-hidden z-0"
    >
      {/* Soft background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 nebula-glow -z-10" />

      <div className="max-w-[1000px] mx-auto px-6 flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[11px] font-display">
            Эффективность
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            {title}
          </h2>
          <p className="text-text-muted text-base md:text-lg font-body">
            {subtitle}
          </p>
        </div>

        {/* Comparison Table Card (Glassmorphism) */}
        <div className="w-full overflow-x-auto rounded-lg shadow-2xl glass-card">
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-border/30 bg-bg/50 font-display text-sm font-bold text-heavy">
                <th className="p-6 w-[30%]">Критерий</th>
                <th className="p-6 w-[35%] text-text-muted">{getCompetitorLabel()}</th>
                <th className="p-6 w-[35%] text-primary relative overflow-hidden bg-primary/5">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
                  ИИ-агент Samartsev AI
                </th>
              </tr>
            </thead>
            <tbody className="font-body text-sm divide-y divide-border/20">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                  <td className="p-6 font-display font-semibold text-heavy">{row.label}</td>
                  <td className="p-6 text-text-muted flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-red-500/80 text-[18px] mt-0.5" aria-hidden="true">
                      cancel
                    </span>
                    <span>{row.before}</span>
                  </td>
                  <td className="p-6 font-medium text-heavy bg-primary/5 relative">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5" aria-hidden="true" style={{ fontVariationSettings: '"FILL" 1' }}>
                        check_circle
                      </span>
                      <span>{row.after}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to action */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <a
            href="#contact"
            className="w-full md:w-auto px-10 py-5 bg-primary text-heavy font-display font-semibold text-base uppercase tracking-widest rounded-full hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_8px_24px_rgba(var(--primary-rgb,0,230,138),0.2)] hover:-translate-y-0.5 cursor-pointer"
          >
            {ctaText}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
          <p className="text-text-muted text-sm font-body">
            Бесплатный технический аудит воронки при записи сегодня
          </p>
        </div>
      </div>
    </section>
  );
}
