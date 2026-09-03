import { Metadata } from "next";
import NichePage from "@/components/niche/NichePage";
import { PROM_CONFIG } from "@/components/niche/nicheConfigs";
import FactoryCpDemoWidget from "@/components/factory/FactoryCpDemoWidget";
import FactoryEconomicInfographic from "@/components/factory/FactoryEconomicInfographic";

export const metadata: Metadata = {
  title: "ИИ для завода — автоматический расчёт сложных КП и спецификаций за 30 секунд | Samartsev AI",
  description:
    "Автоматизация подготовки КП для производств и заводов. Распознавание PDF-спецификаций и чертежей, мгновенная сверка с номенклатурой 1С:ERP, расчёт скидок и генерация КП в PDF за 30 секунд.",
  keywords: [
    "ИИ для завода",
    "автоматизация КП производство",
    "расчет коммерческих предложений 1с ии",
    "обработка спецификаций нейросеть 1с",
    "автоматизация отдела продаж завода",
    "генератор кп по гост и чертежам",
    "интеграция 1С ERP нейросеть"
  ],
  openGraph: {
    title: "ИИ для завода: расчет сложных КП и спецификаций за 30 секунд | Samartsev AI",
    description:
      "Устраняем 2-3 дня ожидания сметчика. ИИ мгновенно распознает спецификации в PDF, сверяет склад 1С:ERP и генерирует готовое КП со скидками завода.",
    url: "https://www.samartsev.tech/prom",
    siteName: "Samartsev AI",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ИИ для завода: расчет сложных КП и спецификаций 1С",
      },
    ],
  },
  alternates: {
    canonical: "https://www.samartsev.tech/prom",
  },
};

export default function PromPage() {
  const baseUrl = "https://www.samartsev.tech";

  const breadcrumbSchema = {
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
        name: "ИИ для завода и производства (Расчет КП 1С)",
        item: `${baseUrl}/prom`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Внедрение ИИ для заводов и производств: автоматический расчет КП по спецификациям 1С",
    provider: {
      "@type": "Person",
      name: "Алексей Самарцев",
      url: baseUrl,
    },
    areaServed: "RU",
    description:
      "Разработка и интеграция автономных ИИ-систем обработки сложных спецификаций, опросных листов и чертежей для производственных предприятий. Мгновенная сверка с 1С:ERP, расчет стоимости с учетом ГОСТ и генерация КП в PDF.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROM_CONFIG.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <NichePage
        config={PROM_CONFIG}
        customHeroWidget={<FactoryCpDemoWidget />}
        customCalculator={<FactoryEconomicInfographic />}
      />
    </>
  );
}
