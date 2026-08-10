import { SolutionItem, SolutionFeature } from "@/types/landing";

interface NicheSolutionsProps {
  title: string;
  description: string;
  ctaText: string;
  items: SolutionItem[];
  nicheKey: string;
}

export default function NicheSolutions({
  title,
  description,
  ctaText,
  items,
  nicheKey,
}: NicheSolutionsProps) {
  const getCrmIntegrationTitle = () => {
    switch (nicheKey) {
      case "med":
        return "Интеграция с МИС / CRM";
      case "beauty":
        return "Интеграция с YCLIENTS";
      case "auto":
        return "Интеграция с 1С и CRM";
      default:
        return "Интеграция с CRM";
    }
  };

  const getCrmIntegrationDesc = () => {
    switch (nicheKey) {
      case "med":
        return "Бесшовная и автоматическая передача данных в вашу медицинскую систему (IDENT, YCLIENTS, amoCRM).";
      case "beauty":
        return "Записи мгновенно отображаются в журнале YCLIENTS, amoCRM или Битрикс24 без ручного переноса.";
      case "auto":
        return "Автоматическое создание карточек заезда и лидов напрямую в Альфа-Авто, 1С:Автосервис или amoCRM.";
      default:
        return "Автоматический импорт контактов и истории диалогов непосредственно в вашу рабочую CRM-систему.";
    }
  };

  return (
    <section id="services" className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-24 flex flex-col gap-12 relative">
      {/* Background glow behind bento grid */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/5 nebula-glow -z-10" />

      {/* Solutions Header */}
      <div className="flex flex-col gap-4 max-w-[720px]">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-[11px] font-display">
          Возможности
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-heavy tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-text-muted text-lg font-body leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Card 1 (Bento Big - Left Top) */}
        <div className="md:col-span-8 glass-card p-8 rounded-lg flex flex-col justify-between min-h-[360px] hover:bg-white/[0.04] dark:hover:bg-white/[0.05] transition-colors overflow-hidden relative group">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full nebula-glow group-hover:scale-125 transition-transform duration-700" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-display uppercase tracking-wider">
              {items[0]?.stat || "100% Автономность"}
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy">
              {items[0]?.title}
            </h3>
            <p className="text-text-muted text-sm font-body leading-relaxed max-w-xl">
              {items[0]?.statSub}
            </p>
            
            {/* Embedded features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {items[0]?.features?.map((f: SolutionFeature, fi: number) => (
                <div key={fi} className="flex gap-2 items-start">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">
                    {f.icon}
                  </span>
                  <span className="text-text-muted text-xs font-body leading-relaxed">
                    <span className="font-bold text-heavy">{f.bold}</span> {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6 relative z-10">
            <span className="material-symbols-outlined text-primary/60 text-5xl" aria-hidden="true">
              {items[0]?.icon || "calendar_today"}
            </span>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 text-primary font-bold font-display text-sm hover:translate-x-1 transition-transform"
            >
              {items[0]?.cta || ctaText}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Card 2 (Bento Small - Right Top) */}
        <div className="md:col-span-4 glass-card p-8 rounded-lg flex flex-col justify-between min-h-[360px] hover:bg-white/[0.04] dark:hover:bg-white/[0.05] transition-colors relative group overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-secondary/5 rounded-full nebula-glow group-hover:scale-125 transition-transform duration-700" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/15 border border-secondary/20 text-secondary text-[11px] font-bold font-display uppercase tracking-wider">
              {items[1]?.stat || "24/7 доступность"}
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy">
              {items[1]?.title}
            </h3>
            <p className="text-text-muted text-sm font-body leading-relaxed">
              {items[1]?.statSub}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-6 relative z-10">
            <span className="material-symbols-outlined text-secondary/60 text-5xl" aria-hidden="true">
              {items[1]?.icon || "psychology"}
            </span>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 text-secondary font-bold font-display text-sm hover:translate-x-1 transition-transform"
            >
              {items[1]?.cta || "Подробнее"}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Card 3 (Bento Small - Left Bottom) */}
        <div className="md:col-span-4 glass-card p-8 rounded-lg flex flex-col justify-between min-h-[360px] hover:bg-white/[0.04] dark:hover:bg-white/[0.05] transition-colors relative group overflow-hidden">
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-tertiary/10 rounded-full nebula-glow group-hover:scale-125 transition-transform duration-700" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-[11px] font-bold font-display uppercase tracking-wider">
              CRM Ready
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy">
              {getCrmIntegrationTitle()}
            </h3>
            <p className="text-text-muted text-sm font-body leading-relaxed">
              {getCrmIntegrationDesc()}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-6 relative z-10">
            <span className="material-symbols-outlined text-tertiary/60 text-5xl" aria-hidden="true">
              hub
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-tertiary font-bold font-display text-sm hover:translate-x-1 transition-transform"
            >
              Подключить
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Card 4 (Bento Big - Right Bottom) */}
        <div className="md:col-span-8 glass-card p-8 rounded-lg flex flex-col justify-between min-h-[360px] hover:bg-white/[0.04] dark:hover:bg-white/[0.05] transition-colors overflow-hidden relative group">
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/10 rounded-full nebula-glow group-hover:scale-125 transition-transform duration-700" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-display uppercase tracking-wider">
              Dashboard
            </div>
            <h3 className="font-display text-2xl font-bold text-heavy">
              Умная аналитика
            </h3>
            <p className="text-text-muted text-sm font-body leading-relaxed max-w-xl">
              Отслеживайте эффективность каждого диалога, конверсию в запись и окупаемость вложений в реальном времени через удобный дашборд.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">monitoring</span>
                <span className="text-text-muted text-xs">Контроль конверсии диалогов в реальные лиды</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">query_stats</span>
                <span className="text-text-muted text-xs">Анализ упущенных заявок и причин отказов клиентов</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6 relative z-10">
            <span className="material-symbols-outlined text-primary/60 text-5xl" aria-hidden="true">
              analytics
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-bold font-display text-sm hover:translate-x-1 transition-transform"
            >
              {ctaText}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
