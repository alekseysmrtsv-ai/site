"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "samartsev_ai_cookie_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Slight delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className={`fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-6 md:max-w-md z-50 bg-surface border border-border rounded-md shadow-card p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <p className="text-sm text-text-muted font-body leading-relaxed flex-1">
        🍪 Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
        <a href="/privacy" className="text-heavy underline underline-offset-2 hover:text-primary transition-colors">
          политикой конфиденциальности
        </a>
        .
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={accept}
          className="px-5 py-2.5 bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold text-sm uppercase tracking-wider rounded-md transition-all duration-200 whitespace-nowrap"
        >
          Принять
        </button>
        <button
          onClick={accept}
          className="px-4 py-2.5 border border-border hover:border-heavy text-text-muted hover:text-heavy font-medium text-sm rounded-md transition-all duration-200 whitespace-nowrap"
          aria-label="Отклонить"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
