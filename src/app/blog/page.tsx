import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ARTICLES } from "@/data/articles";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог и База Знаний ИИ-автоматизации B2B | Samartsev AI",
  description: "Практические статьи, разборы 152-ФЗ, n8n архитектуры, экономика ИИ-агентов и инструкции по повышению конверсии отдела продаж.",
  alternates: {
    canonical: "https://www.samartsev.tech/blog",
  },
  openGraph: {
    title: "Блог и База Знаний ИИ-автоматизации B2B | Samartsev AI",
    description: "Практические статьи, разборы 152-ФЗ, n8n архитектуры, экономика ИИ-агентов и инструкции по повышению конверсии отдела продаж.",
    url: "https://www.samartsev.tech/blog",
    type: "website",
    images: [
      {
        url: "https://www.samartsev.tech/blog/cat-sales.webp",
        width: 1200,
        height: 630,
        alt: "Блог Samartsev AI",
      },
    ],
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог Samartsev AI — ИИ-автоматизация бизнеса",
    description: "Статьи и гайды по внедрению ИИ-агентов, n8n и 152-ФЗ.",
    url: "https://www.samartsev.tech/blog",
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      url: `https://samartsev.tech/blog/${a.slug}`,
      image: `https://samartsev.tech${a.image || "/blog/cat-sales.webp"}`,
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
          <div className="mb-10 text-center sm:text-left">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00E68A] bg-[#00E68A]/10 rounded-full mb-3">
              База Знаний & Кейсы
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] font-display mb-4">
              ИИ-Автоматизация & Экономика ОП
            </h1>
            <p className="text-base sm:text-lg text-[#828D99] max-w-2xl leading-relaxed">
              Практические руководства по соблюдению 152-ФЗ, проектированию n8n воркфлоу и ликвидации упущенной выручки в B2B.
            </p>
          </div>

          {/* Interactive Articles Grid with Sidebar */}
          <BlogIndexClient articles={ARTICLES} />
        </main>

        <Footer />
      </div>
    </>
  );
}
