import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Soletra - Busca de Palavras em Português | Encontre Palavras com Letras Específicas",
    template: "%s | Soletra - Busca de Palavras"
  },
  description: "Ferramenta online gratuita para encontrar palavras em português com base em letras específicas. Ideal para jogos de palavras, palavras cruzadas, Spelling Bee e desafios linguísticos. Mais de 100.000 palavras disponíveis.",
  keywords: [
    "busca de palavras",
    "palavras em português",
    "gerador de palavras",
    "spelling bee português",
    "palavras cruzadas",
    "anagramas",
    "jogos de palavras",
    "dicionário português",
    "ferramenta linguística",
    "buscar palavras com letras",
    "solver palavras",
    "palavras por tamanho",
    "letra obrigatória",
    "combinações de letras"
  ],
  authors: [{ name: "Soletra" }],
  creator: "Soletra",
  publisher: "Soletra",
  category: "Educação",
  classification: "Ferramentas Linguísticas",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://t-gamer.github.io/soletrasolver/",
    siteName: "Soletra - Busca de Palavras",
    title: "Soletra - Encontre Palavras em Português com Letras Específicas",
    description: "Ferramenta online gratuita para buscar palavras em português. Ideal para jogos de palavras, palavras cruzadas e desafios linguísticos. Mais de 100.000 palavras disponíveis.",
    images: [
      {
        url: "https://t-gamer.github.io/soletrasolver/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soletra - Busca de Palavras em Português",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@soletra",
    creator: "@soletra",
    title: "Soletra - Busca de Palavras em Português",
    description: "Ferramenta online gratuita para encontrar palavras com letras específicas. Ideal para jogos de palavras e desafios linguísticos.",
    images: ["https://t-gamer.github.io/soletrasolver/og-image.png"]
  },
  alternates: {
    canonical: "https://t-gamer.github.io/soletrasolver/",
    languages: {
      'pt-BR': 'https://t-gamer.github.io/soletrasolver/',
      'pt': 'https://t-gamer.github.io/soletrasolver/'
    }
  },
  verification: {
    google: "google-site-verification-code", // TODO: Adicionar código real do Google Search Console
    yandex: "yandex-verification-code", // TODO: Adicionar se necessário
    bing: "bing-verification-code" // TODO: Adicionar se necessário
  },
  other: {
    "msapplication-TileColor": "#3f51b5",
    "theme-color": "#3f51b5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Soletra - Busca de Palavras",
              "description": "Ferramenta online gratuita para encontrar palavras em português com base em letras específicas",
              "url": "https://t-gamer.github.io/soletrasolver/",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL"
              },
              "creator": {
                "@type": "Organization",
                "name": "Soletra"
              },
              "featureList": [
                "Busca de palavras por letras específicas",
                "Filtro por tamanho de palavra",
                "Letra obrigatória",
                "Mais de 100.000 palavras em português",
                "Interface responsiva",
                "Gratuito e sem cadastro"
              ],
              "inLanguage": "pt-BR",
              "isAccessibleForFree": true
            })
          }}
        />

        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Soletra" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
