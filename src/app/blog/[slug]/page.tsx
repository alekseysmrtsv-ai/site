import { ARTICLES, Article } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArticleReadingProgress } from "@/components/blog/ArticleReadingProgress";
import { ArticleShareBar } from "@/components/blog/ArticleShareBar";
import { ArticleTableOfContents } from "@/components/blog/ArticleTableOfContents";
import ConversionSpeedSimulator from "@/components/blog/ConversionSpeedSimulator";
import { extractTocAndProcessContent } from "@/lib/toc";
import { ArrowRight, BookOpen, ChevronRight, HelpCircle } from "lucide-react";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samartsev.tech";
  const imageUrl = article.image 
    ? (article.image.startsWith("http") ? article.image : `${baseUrl}${article.image}`)
    : `${baseUrl}/blog/cat-sales.webp`;

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samartsev.tech";

  // Process ToC and inject IDs into headings
  const { processedHtml, tocItems } = extractTocAndProcessContent(article.content);

  // Find 2 related articles (prefer same category or next in list)
  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 2);

  // Schema.org Microdata
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    image: article.image ? `${baseUrl}${article.image}` : undefined,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      image: `${baseUrl}/founder.webp`,
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

      {/* Reading Progress Indicator */}
      <ArticleReadingProgress />

      <div className="min-h-screen bg-[#F9FAFB] text-[#1A1D20] font-sans">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#828D99] mb-8 overflow-x-auto whitespace-nowrap pb-1">
            <Link href="/" className="hover:text-[#111111] transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/blog" className="hover:text-[#111111] transition-colors">
              Блог
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-[#111111] font-medium truncate max-w-[240px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2.5 text-xs text-[#828D99] mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-md bg-[#00E68A]/10 text-[#00E68A] font-bold">
                {article.category}
              </span>
              <span>•</span>
              <time dateTime={article.date}>{article.date}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] font-display tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author Credibility Box */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm flex-wrap gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00E68A] flex-shrink-0 shadow-sm">
                  <img
                    src="/founder.webp"
                    alt={article.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                    {article.author.name}
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.2 rounded-full">
                      Автор
                    </span>
                  </div>
                  <div className="text-xs text-[#828D99]">{article.author.role}</div>
                </div>
              </div>

              <a
                href="https://t.me/alekseysmrtsv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                Написать в Telegram →
              </a>
            </div>
          </header>

          {/* Table of Contents */}
          <ArticleTableOfContents items={tocItems} />

          {/* Article Main Body Content */}
          <article className="prose prose-neutral max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-sm mb-8">
            <div
              className="space-y-6 text-[#1A1D20] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
          </article>

          {/* Interactive Conversion Speed Simulator for relevant articles */}
          {(article.slug === 'ii-agent-obrabotka-zayavok-24-7' || article.slug === 'skolko-stoit-ii-agent' || article.slug === 'chto-takoe-ii-agent-dlya-biznesa') && (
            <ConversionSpeedSimulator />
          )}

          {/* Share & Copy Link Bar */}
          <ArticleShareBar title={article.title} />

          {/* FAQ Section if present */}
          {article.faq && article.faq.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-sm mb-12">
              <h2 className="text-xl font-bold text-[#111111] font-display mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#00E68A]" />
                Частые вопросы по теме
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                    <h3 className="text-sm sm:text-base font-bold text-[#111111] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles ("Читайте также") */}
          <section className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold font-display text-[#111111] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00E68A]" />
                Читайте также
              </h3>
              <Link href="/blog" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                Все статьи блога →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#00E68A]/50 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#828D99] mb-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                        {rel.category}
                      </span>
                      <span>•</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#00E68A] transition-colors leading-snug mb-2 font-display">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#828D99] line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700 group-hover:text-[#00E68A] transition-colors">
                    <span>Читать разбор</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
