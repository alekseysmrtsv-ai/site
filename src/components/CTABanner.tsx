export default function CTABanner() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-heavy">
          Готовы остановить потери выручки?
        </h2>
        <p className="text-xl text-heavy/75 max-w-2xl mx-auto font-body font-medium">
          Протестируйте работу ИИ-агента прямо сейчас в Telegram.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/samartsev_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-heavy text-surface font-display font-semibold uppercase tracking-widest text-base px-10 py-5 rounded-md hover:bg-heavy-hover transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Начать диалог с агентом
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-heavy text-heavy font-display font-semibold uppercase tracking-widest text-base px-10 py-5 rounded-md hover:bg-heavy hover:text-surface transition-all duration-200"
          >
            Получить аудит
          </a>
        </div>
      </div>
    </section>
  );
}
