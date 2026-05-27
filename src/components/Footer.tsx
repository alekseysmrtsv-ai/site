export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
          <span className="font-display font-bold text-heavy text-base tracking-tight">Samartsev AI</span>
          <span suppressHydrationWarning>© {year}. Все права защищены.</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a
            href="https://t.me/samartsev_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-heavy transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.24.24 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z"/>
            </svg>
            Telegram
          </a>
          <a
            href="mailto:hello@samartsev.ai"
            className="text-text-muted hover:text-heavy transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            hello@samartsev.ai
          </a>
          <a href="/privacy" className="text-text-muted hover:text-heavy transition-colors">
            Политика конфиденциальности
          </a>
          <a href="/terms" className="text-text-muted hover:text-heavy transition-colors">
            Условия использования
          </a>
        </div>
      </div>
    </footer>
  );
}
