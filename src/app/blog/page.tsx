import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог и База Знаний ИИ-автоматизации B2B | Samartsev AI",
  description: "Практические статьи, разборы 152-ФЗ, n8n архитектуры, экономика ИИ-агентов и инструкции по повышению конверсии отдела продаж.",
  alternates: {
    canonical: "https://samartsev.ai/blog",
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог Samartsev AI — ИИ-автоматизация бизнеса",
    description: "Статьи и гайды по внедрению ИИ-агентов, n8n и 152-ФЗ.",
    url: "https://samartsev.ai/blog",
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      url: `https://samartsev.ai/blog/${a.slug}`,
      author: {
        "@type": "Person",
        name: a.author.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#F9FAFB] text-[#1A1D20] font-sans">
        <Header />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          {/* Header section */}
          <div className="mb-12 text-center sm:text-left">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00E68A] bg-[#00E68A]/10 rounded-full mb-3">
              База Знаний & GEO-Хаб
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] font-display mb-4">
              ИИ-Автоматизация & Экономика ОП
            </h1>
            <p className="text-lg text-[#828D99] max-w-2xl">
              Практические руководства по соблюдению 152-ФЗ, проектированию n8n воркфлоу и ликвидации упущенной выручки в B2B.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            <div className="md:col-span-2 space-y-6">
              {ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] hover:border-[#00E68A]/50 transition-all duration-200 shadow-sm hover:shadow-md group flex flex-col sm:flex-row gap-6 items-start"
                >
                  {article.image && (
                    <div className="w-full sm:w-44 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-[#828D99] mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#F3F4F6] text-[#111111] font-medium">
                          {article.category}
                        </span>
                        <span>•</span>
                        <time dateTime={article.date}>{article.date}</time>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#00E68A] transition-colors mb-2 font-display">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-[#828D99] text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#00E68A]/20 flex items-center justify-center font-bold text-[10px] text-[#00E68A]">
                          АС
                        </div>
                        <span className="text-xs font-semibold text-[#111111]">
                          {article.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] group-hover:text-[#00E68A] transition-colors"
                      >
                        Читать
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-[#0F231B] text-white p-6 rounded-2xl border border-[#00E68A]/20 shadow-lg">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00E68A] bg-[#00E68A]/20 rounded mb-3">
                  Бесплатный расчет
                </span>
                <h3 className="text-xl font-bold font-display mb-2">
                  Сколько вы теряете на ответе &gt; 15 мин?
                </h3>
                <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                  Используйте наш интерактивный калькулятор потерь для расчета упущенной выручки вашего ОП.
                </p>
                <Link
                  href="/#calculator"
                  className="block text-center w-full py-3 px-4 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-sm transition-all"
                >
                  Рассчитать потери
                </Link>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB]">
                <h3 className="text-base font-bold text-[#111111] font-display mb-2">
                  Канал с анонсами & разборами
                </h3>
                <p className="text-xs text-[#828D99] mb-4">
                  Публикуем схему воркфлоу n8n, фичи и бекстейдж разработки ИИ-агентов.
                </p>
                <a
                  href="https://t.me/samartsev_blog"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] text-xs font-semibold transition-colors"
                >
                  Подписаться на @samartsev_blog
                </a>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
