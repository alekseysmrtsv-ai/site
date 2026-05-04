import content from "../../content/landing/index.json";

export default function SolutionsSection() {
  const { solutions, process } = content;
  
  return (
    <section id="services" className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-20 flex flex-col gap-16">
      {/* Solutions */}
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-[720px]">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-heavy tracking-tight leading-tight">
            {solutions.title}
          </h2>
          <p className="text-text-muted text-lg font-body leading-relaxed">
            {solutions.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.items.map((s: any, idx: number) => (
            <div
              key={idx}
              className="card-hover bg-surface rounded-md border border-border p-8 flex flex-col h-full cursor-pointer group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-sm bg-bg flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{s.icon}</span>
                </div>
              </div>
              <div className="flex flex-col gap-6 flex-grow mb-8">
                <h3 className="font-display text-2xl font-bold text-heavy">{s.title}</h3>
                <div className="flex flex-col gap-4">
                  {s.features?.map((f: any, fi: number) => (
                    <div key={fi} className="flex gap-4">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-1">
                        {f.icon}
                      </span>
                      <p className="text-text-muted text-sm font-body leading-relaxed">
                        <span className="font-bold text-heavy">{f.bold}</span>{" "}
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <a href="#contact" className="flex items-center gap-2 text-xs font-display font-semibold text-heavy uppercase tracking-widest group-hover:text-primary transition-colors">
                  Обсудить внедрение
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div id="process" className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 text-center items-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-heavy tracking-tight">
            {process.title}
          </h2>
          <p className="text-text-muted text-base font-body max-w-2xl">
            {process.description}
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto py-8">
          {/* Continuous Connecting Line */}
          <div className="absolute top-[3rem] bottom-[2rem] left-8 md:left-10 w-px bg-border z-0" />

          <div className="flex flex-col gap-12 relative z-10">
            {process.steps.map((step, i) => (
              <div key={i} className="flex flex-row items-start gap-6 md:gap-10 group text-left">
                
                {/* Node Marker */}
                <div className="shrink-0 relative z-10 w-16 md:w-20 flex justify-center">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110 ${
                      i === process.steps.length - 1
                        ? "bg-primary text-heavy shadow-card ring-8 ring-bg"
                        : "bg-surface text-heavy border-2 border-border shadow-subtle group-hover:border-primary ring-8 ring-bg"
                    }`}
                  >
                    <span className="font-display text-xl md:text-2xl font-bold">{step.n}</span>
                  </div>
                </div>

                {/* Text Block */}
                <div className="flex-1 flex flex-col gap-2 md:pt-3 pt-2">
                  <h4 className="font-display text-2xl font-bold text-heavy transition-colors group-hover:text-primary">{step.title}</h4>
                  <p className="text-text-muted text-base md:text-lg font-body leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="#contact"
            className="bg-heavy text-surface font-display font-semibold text-base uppercase tracking-widest px-8 py-4 rounded-md hover:bg-primary hover:text-heavy transition-all duration-300"
          >
            Обсудить ваш проект
          </a>
        </div>
      </div>
    </section>
  );
}
