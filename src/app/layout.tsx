import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MatrixMode from "@/components/MatrixMode";

export const metadata: Metadata = {
  metadataBase: new URL("https://samartsev.ai"),
  title: {
    default: "Samartsev AI — Ваш бизнес продаёт, пока вы спите",
    template: "%s | Samartsev AI",
  },
  description:
    "Внедряю автономных ИИ-агентов на базе n8n, которые квалифицируют лидов и закрывают записи в CRM без участия человека. Окупаемость от 1 месяца.",
  keywords: [
    "ИИ агент", "автоматизация бизнеса", "n8n", "чат-бот", "CRM интеграция",
    "amoCRM", "Bitrix24", "Telegram бот", "лид квалификация", "AI автоматизация",
  ],
  authors: [{ name: "Алексей Самарцев", url: "https://samartsev.ai" }],
  creator: "Алексей Самарцев",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://samartsev.ai",
    siteName: "Samartsev AI",
    title: "Samartsev AI — Ваш бизнес продаёт, пока вы спите",
    description:
      "Автономные ИИ-агенты на базе n8n. Квалифицируем лидов, закрываем записи в CRM 24/7. Окупаемость от 1 месяца.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samartsev AI — ИИ-автоматизация для малого бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samartsev AI — Ваш бизнес продаёт, пока вы спите",
    description:
      "Автономные ИИ-агенты на базе n8n. Квалифицируем лидов, закрываем записи в CRM 24/7.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://samartsev.ai/#person",
      name: "Алексей Самарцев",
      url: "https://samartsev.ai",
      jobTitle: "AI Automation Engineer",
      description:
        "Внедряю автономных ИИ-агентов на базе n8n для малого и среднего бизнеса",
      knowsAbout: ["n8n", "AI Agents", "CRM Integration", "Business Automation"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://samartsev.ai/#business",
      name: "Samartsev AI",
      url: "https://samartsev.ai",
      founder: { "@id": "https://samartsev.ai/#person" },
      description:
        "ИИ-автоматизация для малого бизнеса: чат-боты, лид-квалификация, интеграция с CRM",
      areaServed: "RU",
      availableLanguage: "Russian",
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="dot-grid font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MatrixMode />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
