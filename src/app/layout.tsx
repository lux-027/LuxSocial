import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://luxsocialtr.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'LuxSocial | TikTok, Instagram, YouTube Video İndir - Ücretsiz & Filigransız',
    template: '%s | LuxSocial',
  },
  description: 'TikTok, Instagram, YouTube, Twitter ve Facebook videolarını ücretsiz, filigransız ve yüksek kalitede indirin. LuxSocial ile saniyeler içinde video indirme deneyimi yaşayın.',
  keywords: [
    'video indir', 'tiktok video indir', 'tiktok filigransız indir', 'instagram video indir',
    'youtube video indir', 'twitter video indir', 'facebook video indir',
    'filigransız video indir', 'ücretsiz video indir', 'tiktok downloader',
    'instagram downloader', 'youtube downloader', 'video downloader türkçe',
    'sosyal medya video indir', 'luxsocial', 'lux social'
  ],
  authors: [{ name: 'LuxSocial', url: BASE_URL }],
  creator: 'LuxSocial',
  publisher: 'LuxSocial',
  category: 'technology',
  classification: 'Video Downloader',
  verification: {
    google: 'x7p7UrXXgoM-nDzCeRywW_MTd21rLFo1DxwTJogTKRg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': 'large',
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'LuxSocial | TikTok, Instagram, YouTube Video İndir - Ücretsiz & Filigransız',
    description: 'TikTok, Instagram, YouTube, Twitter ve Facebook videolarını ücretsiz, filigransız ve yüksek kalitede indirin.',
    url: BASE_URL,
    siteName: 'LuxSocial',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'LuxSocial - Ücretsiz Filigransız Video İndirme',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxSocial | TikTok, Instagram, YouTube Video İndir',
    description: 'TikTok, Instagram, YouTube, Twitter ve Facebook videolarını ücretsiz ve filigransız indirin.',
    images: [`${BASE_URL}/opengraph-image`],
    creator: '@luxsocial',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/luxsociallogo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/luxsociallogo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'tr-TR': BASE_URL,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr-TR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/luxsociallogo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/luxsociallogo.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LuxSocial" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "LuxSocial",
                "url": "https://luxsocialtr.com",
                "description": "TikTok, Instagram, YouTube, Twitter ve Facebook videolarını ücretsiz ve filigransız indirin.",
                "inLanguage": "tr-TR",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://luxsocialtr.com/?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "LuxSocial Video Downloader",
                "url": "https://luxsocialtr.com",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "TRY"
                },
                "description": "TikTok, Instagram, YouTube, Twitter ve Facebook videolarını ücretsiz, filigransız ve yüksek kalitede indirin.",
                "featureList": [
                  "Filigransız video indirme",
                  "Ücretsiz kullanım",
                  "Yüksek kalite",
                  "TikTok, Instagram, YouTube, Twitter, Facebook desteği"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "LuxSocial",
                "url": "https://luxsocialtr.com",
                "logo": "https://luxsocialtr.com/logo.svg",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "luxsocialtr@gmail.com",
                  "contactType": "customer service",
                  "availableLanguage": "Turkish"
                }
              }
            ])
          }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
