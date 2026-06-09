const FOUNDER_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuBwfety_ktLf92tgu5cnEbB_h-2FlYuPndcMH4JEdmRxHGnFvwiEXXD05CDoy04ucABSFYH6zbDb0gJbUFVuz9W1BFyBMI6Exol7F5fUk_CHJ2oeEnDuVCs5oX6z5x6Ga0f0p627QZMJ6uOndlvi98ZYyx7-M-YNuYRjhSIhvhU6_XMJ6ZyBIsOUZegMs6Q11gus7dc0ZTjXD54UxgFb2urJh838WGGYWuw9W2BMJq7JkUWc0YFKG0jbnsuQqJ4J0LTEx-tOTR6I8w";

export default function FounderSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Photo */}
        <div className="relative inline-block group">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border border-border shadow-subtle grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
            <img
              src={FOUNDER_PHOTO}
              alt="Алексей Самарцев — основатель Samartsev AI"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Custom CSS-only B2B Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-heavy text-surface text-xs py-2.5 px-4 rounded-md opacity-0 scale-95 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 shadow-card text-center border border-border z-10">
            Напишите мне в Telegram — обсудим ваш проект лично ☕
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-heavy rotate-45 border-r border-b border-border -mt-[5px]" />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heavy">
            Алексей Самарцев
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-body">
            Внедряю автономных ИИ-агентов на базе n8n, которые квалифицируют лидов и закрывают записи в CRM без участия человека.
            Гарантирую окупаемость за счёт возврата упущенной выручки.
          </p>
          <div className="pt-6 flex flex-col items-center gap-3">
            <span className="font-display text-xl text-text-muted italic opacity-60">
              A. Samartsev
            </span>
            <a
              href="https://t.me/samartsev_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.24.24 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z"/>
              </svg>
              Блог без глянца →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
