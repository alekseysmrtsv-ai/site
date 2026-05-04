import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Страница не найдена | Samartsev AI",
  description: "Страница не существует. Вернитесь на главную.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center dot-grid">
      <div className="max-w-md">
        <div className="font-display font-bold text-[120px] leading-none text-border select-none">
          404
        </div>
        <h1 className="font-display text-2xl font-bold text-heavy mb-4 -mt-4">
          Страница не найдена
        </h1>
        <p className="text-text-muted font-body mb-10">
          Кажется, этот URL потерялся. Даже наши ИИ-агенты не смогли его найти 😅
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center h-12 px-8 rounded-md bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold uppercase tracking-widest text-sm transition-all duration-300"
          >
            На главную
          </Link>
          <Link
            href="/#contact"
            className="flex items-center justify-center h-12 px-8 rounded-md border border-border hover:border-primary text-heavy text-sm font-display font-semibold uppercase tracking-widest transition-all duration-200"
          >
            Связаться
          </Link>
        </div>
      </div>
    </div>
  );
}
