import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MatrixMode from "@/components/MatrixMode";
import YandexMetrika from "@/components/YandexMetrika";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samartsev.tech"),
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
  authors: [{ name: "Алексей Самарцев", url: "https://www.samartsev.tech" }],
  creator: "Алексей Самарцев",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://www.samartsev.tech",
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
      "@id": "https://www.samartsev.tech/#person",
      name: "Алексей Самарцев",
      url: "https://www.samartsev.tech",
      jobTitle: "AI Automation Engineer",
      description:
        "Внедряю автономных ИИ-агентов на базе n8n для малого и среднего бизнеса",
      knowsAbout: ["n8n", "AI Agents", "CRM Integration", "Business Automation"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.samartsev.tech/#business",
      name: "Samartsev AI",
      url: "https://www.samartsev.tech",
      founder: { "@id": "https://www.samartsev.tech/#person" },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=111790160','ym');
            ym(111790160,'init',{
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/111790160" style={{position:'absolute',left:'-9999px'}} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
