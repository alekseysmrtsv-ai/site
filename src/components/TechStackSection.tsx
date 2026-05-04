import content from "../../content/landing/index.json";

export default function TechStackSection() {
  const { techStack } = content;
  return (
    <section id="tech" className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">
          {techStack.label}
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tight max-w-2xl leading-none text-heavy">
          {techStack.title.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* RAG Card */}
        <div className="md:col-span-8 bg-surface p-8 rounded-md border border-border relative overflow-hidden group hover:border-primary transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">ЗНАНИЯ И ИНТЕЛЛЕКТ</p>
          <h3 className="font-display text-2xl font-bold mb-3 text-heavy">
            Корпоративный Мозг <span className="text-primary font-medium">(RAG)</span>
          </h3>
          <p className="text-text-muted text-sm mb-8 max-w-md leading-relaxed">
            Превращаем хаос документов в структурированную базу знаний.
            ИИ находит ответы только в <strong className="text-heavy">ваших данных</strong>.
          </p>
          {/* Simulated flow UI */}
          <div className="bg-bg rounded-md border border-border p-4 flex items-center gap-3 text-xs font-mono">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded border border-border shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-heavy font-bold">CONTRACT.PDF</span>
              </div>
              <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded border border-border shadow-subtle opacity-50">
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="text-heavy font-bold">WIKI_PAGES</span>
              </div>
            </div>
            <div className="flex-1 text-center text-[9px] font-bold uppercase tracking-widest text-primary">
              → Chunking →
            </div>
            <div className="w-12 h-12 bg-heavy rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">database</span>
            </div>
            <div className="flex-1 text-center text-[9px] text-text-muted">→ Vector DB →</div>
            <div className="bg-surface rounded-md border border-border p-2 text-[10px]">
              <p className="text-text-muted mb-1">Query: срок поставки</p>
              <p className="text-heavy font-bold">14 рабочих дней ✓</p>
              <p className="text-primary text-[9px]">contract_v2.pdf, стр. 4</p>
            </div>
          </div>
        </div>

        {/* Pipeline Card */}
        <div className="md:col-span-4 bg-bg p-8 rounded-md border border-border flex flex-col relative overflow-hidden group hover:border-primary transition-colors duration-300">
          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">АВТОМАТИЗАЦИЯ ВЫВОДА</p>
          <h3 className="font-display text-2xl font-bold mb-4 text-heavy">Конвейер Документов</h3>
          <p className="text-text-muted text-sm mb-8 leading-relaxed">
            Трансформация сырых данных в <strong className="text-heavy">безупречные контракты</strong>.
          </p>
          <div className="mt-auto flex items-center justify-center gap-4 py-4">
            <div className="w-12 h-16 bg-surface border border-border rounded opacity-50 flex flex-col justify-center items-center gap-1 p-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full h-0.5 bg-border rounded" />
              ))}
            </div>
            <svg className="w-5 h-5 text-primary animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
            <div className="w-14 h-20 bg-surface border-2 border-primary rounded shadow-card rotate-[2deg] flex flex-col p-2 gap-1">
              <div className="w-full h-1 bg-primary/30 rounded" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-0.5 bg-border rounded" />
              ))}
              <div className="mt-auto self-end">
                <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="md:col-span-6 bg-surface p-8 rounded-md border border-border relative overflow-hidden group hover:border-primary transition-colors duration-300">
          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">БЕЗОПАСНОСТЬ И КОНТРОЛЬ</p>
          <h3 className="font-display text-2xl font-bold mb-6 text-heavy">Протокол Безопасности 360°</h3>
          <div className="flex items-center gap-4 py-4">
            <div className="w-12 h-12 bg-bg rounded-xl flex items-center justify-center border border-border">
              <span className="material-symbols-outlined text-text-muted">smart_toy</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent" />
            <div className="w-16 h-16 bg-heavy rounded-full flex items-center justify-center border-2 border-primary shadow-card">
              <span className="material-symbols-outlined text-primary text-3xl">shield</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
            <div className="flex flex-col gap-2">
              <span className="bg-primary text-heavy text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-heavy animate-ping" />
                AI RESPONSE
              </span>
              <span className="bg-bg text-text-muted text-[9px] font-bold px-3 py-1 rounded-full border border-border">
                HUMAN OPERATOR
              </span>
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed mt-4">
            <strong className="text-heavy">Human-in-the-Loop</strong>: Критические решения всегда проходят через фильтр безопасности или живого оператора.
          </p>
        </div>

        {/* Stack Card */}
        <div className="md:col-span-6 bg-surface p-8 rounded-md border border-border relative overflow-hidden group hover:border-primary transition-colors duration-300">
          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">ИНФРАСТРУКТУРА</p>
          <h3 className="font-display text-2xl font-bold mb-8 text-heavy">Технический Стек</h3>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            {techStack.items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center border border-border hover:border-primary transition-colors p-3 overflow-hidden">
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-display font-bold text-xs text-heavy">{item.name.slice(0, 2)}</span>
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted text-center">{item.name}</span>
              </div>
            ))}

            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center border border-dashed border-border hover:border-primary transition-colors cursor-help">
                <span className="material-symbols-outlined text-text-muted text-xl">add</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">And More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
