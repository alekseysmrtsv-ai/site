"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/data/articles";
import { ArrowRight, BookOpen, Calculator, Sparkles, TrendingUp, UserCheck } from "lucide-react";

interface Props {
  articles: Article[];
}

const CATEGORIES = [
  { id: "all", label: "Все материалы", count: 7 },
  { id: "cases", label: "Отраслевые кейсы", count: 3 },
  { id: "roi", label: "Экономика & ROI", count: 2 },
  { id: "tech", label: "Архитектура & Ошибки", count: 2 },
];

export function BlogIndexClient({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = articles.filter((article) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "cases") return article.category === "Отраслевые кейсы";
    if (activeCategory === "roi") return article.category === "Экономика & ROI";
    if (activeCategory === "tech") {
      return article.category === "Архитектура & Стек" || article.category === "Практика & Антикейсы";
    }
    return true;
  });

  const mustReadArticles = [
    {
      slug: "skolko-stoit-ii-agent",
      title: "Сколько стоит ИИ-агент для бизнеса: тарифы и окупаемость",
      tag: "Экономика",
    },
    {
      slug: "oshibki-vnedreniya-ii-agentov",
      title: "7 фатальных ошибок при внедрении ИИ-агентов",
      tag: "Антикейсы",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E7EB] pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#111111] text-[#00E68A] shadow-sm"
                  : "bg-white border border-[#E5E7EB] text-[#828D99] hover:text-[#111111] hover:border-gray-300"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? "bg-[#00E68A]/20 text-[#00E68A]" : "bg-gray-100 text-gray-500"
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Main Layout: Articles on Left, Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* Left: Articles List */}
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] hover:border-[#00E68A]/50 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col sm:flex-row gap-6 items-start"
            >
              {article.image && (
                <Link
                  href={`/blog/${article.slug}`}
                  className="w-full sm:w-52 h-44 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[#E5E7EB] block p-1"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
              )}

              <div className="flex-1 flex flex-col justify-between h-full w-full min-h-[160px]">
                <div>
                  <div className="flex items-center gap-2.5 text-xs text-[#828D99] mb-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00E68A]/10 text-[#00E68A] font-semibold">
                      {article.category}
                    </span>
                    <span>•</span>
                    <time dateTime={article.date}>{article.date}</time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#00E68A] transition-colors mb-2.5 font-display leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-[#828D99] text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/30 flex-shrink-0">
                      <img
                        src={article.author.avatar || "/founder.webp"}
                        alt={article.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#111111]">
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] group-hover:text-[#00E68A] transition-colors"
                  >
                    Читать разбор
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right: Sticky Sidebar */}
        <aside className="space-y-6 sticky top-28">
          {/* Telegram Channel Widget */}
          <div className="bg-[#0F231B] text-white p-6 rounded-2xl border border-[#00E68A]/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E68A]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00E68A] bg-[#00E68A]/20 rounded mb-3">
              Telegram-канал
            </span>
            <h3 className="text-lg font-bold font-display text-white mb-2 leading-tight">
              Блог Алексея Самарцева
            </h3>
            <p className="text-xs text-gray-300 mb-5 leading-relaxed">
              Публикуем схемы воркфлоу n8n, реальные сценарии диалогов, разборы 152-ФЗ и бэкстейдж разработки ИИ-агентов.
            </p>
            <a
              href="https://t.me/samartsev_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-xs transition-all shadow-md"
            >
              Подписаться на @samartsev_blog
            </a>
          </div>

          {/* Author Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00E68A] flex-shrink-0 shadow-sm">
                <img
                  src="/founder_portrait.webp"
                  alt="Алексей Самарцев"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111111] font-display">Алексей Самарцев</h4>
                <p className="text-xs text-emerald-700 font-medium">Основатель Samartsev AI</p>
                <p className="text-[11px] text-gray-400">Архитектор n8n & ИИ-систем</p>
              </div>
            </div>
            <p className="text-xs text-[#828D99] leading-relaxed mb-4">
              Внедряю автономных цифровых сотрудников для клиник, автосервисов и B2B. Ликвидирую потери на ночных и медленных ответах.
            </p>
            <a
              href="https://t.me/samartsev_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-800 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Задать вопрос Алексею в TG
            </a>
          </div>

          {/* Top Guides (Must-Read) */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <h3 className="text-sm font-bold text-[#111111] font-display uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00E68A]" />
              Топ-разборы
            </h3>
            <div className="space-y-3">
              {mustReadArticles.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/blog/${item.slug}`}
                  className="block p-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-100 hover:border-emerald-200 transition-all group"
                >
                  <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">
                    {item.tag}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Calculator Teaser */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1.5">
              <Calculator className="w-4 h-4 text-emerald-700" /> Калькулятор потерь
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed mb-3">
              Рассчитайте упущенную выручку из-за задержек ответов менеджеров за 1 минуту.
            </p>
            <Link
              href="/#calculator"
              className="inline-flex items-center justify-center gap-1 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Перейти к расчету →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
