import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LuxSocial | TikTok, Instagram, YouTube Filigransız Video İndir',
  description: 'TikTok, Instagram, YouTube ve Twitter videolarını saniyeler içinde, ücretsiz ve filigransız (no watermark) olarak indir. LuxSocial ile en yüksek kalitede medya indirme deneyimi.',
  keywords: 'video indir, tiktok filigransız indir, instagram video downloader, youtube mp4 indir, filigransız video, luxsocial',
  verification: {
    google: 'x7p7UrXXgoM-nDzCeRywW_MTd21rLFo1DxwTJogTKRg'
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
    title: 'LuxSocial | TikTok, Instagram, YouTube Filigransız Video İndir',
    description: 'TikTok, Instagram, YouTube ve Twitter videolarını saniyeler içinde, ücretsiz ve filigransız (no watermark) olarak indir. LuxSocial ile en yüksek kalitede medya indirme deneyimi.',
    url: 'https://luxsocial.vercel.app',
    siteName: 'LuxSocial',
    images: [
      {
        url: 'https://luxsocial.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LuxSocial - Filigransız Video İndirme',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxSocial | TikTok, Instagram, YouTube Filigransız Video İndir',
    description: 'TikTok, Instagram, YouTube ve Twitter videolarını saniyeler içinde, ücretsiz ve filigransız (no watermark) olarak indir. LuxSocial ile en yüksek kalitede medya indirme deneyimi.',
    images: ['https://luxsocial.vercel.app/og-image.jpg'],
  },
  language: 'tr-TR',
  alternates: {
    canonical: 'https://luxsocial.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr-TR">
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
