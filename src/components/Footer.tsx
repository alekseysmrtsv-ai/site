import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-border/60">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-heavy text-lg tracking-tight">Samartsev AI</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Разработка и внедрение автономных ИИ-агентов для бизнеса. Обработка входящих обращений 24/7.
            </p>
          </div>

          {/* Col 2: Нишевые решения */}
          <div className="space-y-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-heavy block">
              Отраслевые решения
            </span>
            <ul className="space-y-2 text-xs font-medium text-text-muted">
              <li>
                <Link href="/med" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🦷</span> ИИ для стоматологий
                </Link>
              </li>
              <li>
                <Link href="/beauty" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>💇‍♀️</span> ИИ для салонов красоты
                </Link>
              </li>
              <li>
                <Link href="/auto" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🚗</span> ИИ для автосервисов
                </Link>
              </li>
              <li>
                <Link href="/prom" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🏭</span> ИИ для заводов и B2B
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Материалы */}
          <div className="space-y-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-heavy block">
              База знаний
            </span>
            <ul className="space-y-2 text-xs font-medium text-text-muted">
              <li>
                <Link href="/blog" className="hover:text-heavy transition-colors">
                  Статьи и кейсы блога
                </Link>
              </li>
              <li>
                <a href="https://t.me/samartsev_blog" target="_blank" rel="noopener noreferrer" className="hover:text-heavy transition-colors">
                  Telegram-канал автора
                </a>
              </li>
              <li>
                <a href="/#calculator" className="hover:text-heavy transition-colors">
                  Калькулятор потерь
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Контакты */}
          <div className="space-y-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-heavy block">
              Контакты
            </span>
            <ul className="space-y-2 text-xs font-medium text-text-muted">
              <li>
                <a href="https://t.me/samartsev_ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>✈️</span> Telegram (@samartsev_ai)
                </a>
              </li>
              <li>
                <a href="mailto:aleksei.samartsev.ya@yandex.ru" className="hover:text-heavy transition-colors">
                  aleksei.samartsev.ya@yandex.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <span suppressHydrationWarning>© {year} Samartsev AI. Все права защищены.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-heavy transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-heavy transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
