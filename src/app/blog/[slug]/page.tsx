import { ARTICLES } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samartsev.ai";

  return {
    title: `${article.title} | Samartsev AI`,
    description: article.description,
    alternates: {
      canonical: `${baseUrl}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      url: `${baseUrl}/blog/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samartsev.ai";

  // Schema.org Microdata
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Samartsev AI",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
  };

  const faqSchema = article.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-[#F9FAFB] text-[#1A1D20] font-sans">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#828D99] mb-8">
            <Link href="/" className="hover:text-[#111111] transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#111111] transition-colors">
              Блог
            </Link>
            <span>/</span>
            <span className="text-[#111111] font-medium truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-[#828D99] mb-4">
              <span className="px-2.5 py-0.5 rounded-md bg-[#00E68A]/10 text-[#00E68A] font-semibold">
                {article.category}
              </span>
              <span>•</span>
              <time dateTime={article.date}>{article.date}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#111111] font-display tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB]">
              <div className="w-10 h-10 rounded-full bg-[#00E68A]/20 flex items-center justify-center font-bold text-sm text-[#00E68A]">
                АС
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111]">
                  {article.author.name}
                </div>
                <div className="text-xs text-[#828D99]">{article.author.role}</div>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <article className="prose prose-neutral max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-sm mb-12">
            <div
              className="space-y-6 text-[#1A1D20] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/## (.*)/g, '<h2 class="text-xl sm:text-2xl font-bold text-[#111111] font-display mt-8 mb-4">$1</h2>')
                  .replace(/### (.*)/g, '<h3 class="text-lg font-bold text-[#111111] font-display mt-6 mb-3">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li class="ml-4 list-disc text-[#1A1D20] mb-1">$1</li>')
                  .replace(/```([\s\S]*?)```/g, '<pre class="p-4 bg-[#0F231B] text-[#00E68A] font-mono text-xs rounded-xl overflow-x-auto my-4">$1</pre>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#00E68A] underline font-medium hover:text-[#00E68A]/80">$1</a>')
                  .replace(/\n\n/g, '<br/>'),
              }}
            />
          </article>

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] mb-12">
              <h2 className="text-xl font-bold text-[#111111] font-display mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00E68A]">help</span>
                Частые вопросы по теме
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                    <h3 className="text-sm sm:text-base font-bold text-[#111111] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#828D99] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <div className="bg-[#0F231B] text-white p-8 sm:p-10 rounded-2xl border border-[#00E68A]/30 text-center sm:text-left sm:flex items-center justify-between gap-6">
            <div className="mb-6 sm:mb-0">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                Хотите внедрить такого ИИ-агента в свой бизнес?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Запишитесь на бесплатный аудит процессов и скорости ответов вашего отдела продаж.
              </p>
            </div>

            <a
              href="https://t.me/alekseysmrtsv"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#00E68A] hover:bg-[#00E68A]/90 text-[#111111] font-bold text-sm transition-all whitespace-nowrap"
            >
              Написать в Telegram
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
