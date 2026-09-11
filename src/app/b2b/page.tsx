import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import B2BHeroSection from "@/components/b2b/B2BHeroSection";
import B2BPillarsSection from "@/components/b2b/B2BPillarsSection";
import B2BWorkflowSteps from "@/components/b2b/B2BWorkflowSteps";
import B2BSecuritySection from "@/components/b2b/B2BSecuritySection";
import B2BFAQSection from "@/components/b2b/B2BFAQSection";
import { B2B_FAQS } from "@/data/b2bFaq";
import B2BCTASection from "@/components/b2b/B2BCTASection";

export const metadata: Metadata = {
  title: "Автоматизация бизнес-процессов с ИИ для B2B — продажи, операционка и база знаний | Samartsev AI",
  description:
    "Комплексная ИИ-автоматизация для B2B: обработка заявок 24/7, генерация КП за 30 секунд, авто-договоры, синхронизация с 1С и корпоративная база знаний. Закрытый контур в РФ, 152-ФЗ.",
  keywords: [
    "автоматизация бизнес процессов",
    "ИИ для B2B",
    "генерация КП нейросетью",
    "автоматизация отдела продаж",
    "корпоративная база знаний ИИ",
    "RAG база знаний",
    "интеграция 1С и CRM",
    "автоматизация документов 152-ФЗ",
  ],
  alternates: {
    canonical: "https://www.samartsev.tech/b2b",
  },
  openGraph: {
    title: "Автоматизация бизнес-процессов с ИИ для B2B | Samartsev AI",
    description:
      "Устраняем скрытые потери компании: продажи, операционка и база знаний с ИИ. Окупаемость от 1 месяца.",
    url: "https://www.samartsev.tech/b2b",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Автоматизация бизнес-процессов с ИИ для B2B — Samartsev AI",
      },
    ],
  },
};

export default function B2BPage() {
  const baseUrl = "https://www.samartsev.tech";

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Автоматизация бизнес-процессов с ИИ для B2B",
    serviceType: "Внедрение искусственного интеллекта и автоматизация бизнес-процессов",
    description:
      "Разработка и интеграция ИИ-решений для отделов продаж, бэк-офиса и корпоративных баз знаний на базе n8n, YandexGPT и 1С.",
    provider: {
      "@type": "Person",
      name: "Алексей Самарцев",
      jobTitle: "AI Automation Architect",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    url: `${baseUrl}/b2b`,
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "B2B Автоматизация с ИИ",
        item: `${baseUrl}/b2b`,
      },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: B2B_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <Header />

      <main>
        <B2BHeroSection />
        <B2BPillarsSection />
        <B2BWorkflowSteps />
        <B2BSecuritySection />
        <B2BFAQSection />
        <B2BCTASection />
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
