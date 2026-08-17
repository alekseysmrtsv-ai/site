"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/#niches",     label: "Решения" },
  { href: "/#services",   label: "Услуги" },
  { href: "/#cases",      label: "Кейсы" },
  { href: "/#calculator", label: "Калькулятор" },
  { href: "/#faq",        label: "FAQ" },
  { href: "/blog",        label: "Блог" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.detail === 3) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("toggle-matrix-mode"));
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3 text-heavy group select-none"
          aria-label="Samartsev AI — главная"
        >
          <div className="w-5 h-5 text-primary flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                fillRule="evenodd" clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Samartsev AI</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active === link.href
                    ? "text-heavy"
                    : "text-text-muted hover:text-heavy"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <a
            href="#contact"
            className="flex items-center gap-2 h-10 px-5 rounded-md border border-border hover:border-primary bg-surface hover:bg-bg text-heavy text-sm font-display font-semibold uppercase tracking-widest transition-all duration-200 group"
          >
            Связаться
            <svg className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.19.4z" />
            </svg>
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-border bg-surface text-heavy hover:border-primary transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>Samartsev AI</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="text-base font-medium text-text-muted hover:text-heavy py-3 border-b border-border transition-colors last:border-0"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href="#contact"
                  className="mt-6 flex items-center justify-center h-12 px-6 rounded-md bg-heavy text-surface hover:bg-primary hover:text-heavy font-display font-semibold text-sm uppercase tracking-widest transition-all duration-300"
                >
                  Связаться
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
