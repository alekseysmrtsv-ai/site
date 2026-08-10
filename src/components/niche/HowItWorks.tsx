"use client";

interface Step {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: "search",
    title: "Исследование",
    desc: "Анализируем ваши текущие процессы и скрипты продаж для обучения ИИ-агента.",
  },
  {
    num: "02",
    icon: "sync_alt",
    title: "Интеграция",
    desc: "Подключаем систему к МИС / CRM, мессенджерам и сайту клиники или автосервиса.",
  },
  {
    num: "03",
    icon: "rocket_launch",
    title: "Запуск",
    desc: "Агент начинает работу, принося первые записи и сохраняя лидов уже в первый день.",
  },
];

interface HowItWorksProps {
  bgImage?: string;
}

export default function HowItWorks({ bgImage }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="w-full py-16 md:py-24 relative overflow-hidden bg-bg/50 border-t border-border z-0"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[11px] font-display">
            Процесс
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy">
            Путь к внедрению
          </h2>
          <p className="text-text-muted text-base md:text-lg font-body">
            Всего 3 простых шага для запуска автономного ИИ-ассистента в вашем бизнесе.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative items-stretch">
          
          {/* Continuous Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-6 relative z-10 group cursor-default"
            >
              {/* Glowing Node */}
              <div className="w-20 h-20 rounded-full glass-card border border-primary/30 flex items-center justify-center font-display text-primary text-3xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] hover:border-primary select-none">
                {step.num}
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-heavy group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm font-body leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
