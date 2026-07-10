import type { Metadata } from 'next'
import DownloadApp from '@/components/DownloadApp'

export default function YouTubePage() {
  return (
    <DownloadApp
      platform="YouTube"
      platformColor="bg-gradient-to-br from-red-600 to-red-700"
      platformIcon="youtube"
      platformRegex="youtube\.com"
      placeholder="https://youtube.com/watch?v=..."
      title="YouTube Video İndirme"
      description="YouTube videolarini ve shorts\'lari saniyeler içinde filigransiz indirin"
    />
  )
}

export const metadata: Metadata = {
  title: 'YouTube Video İndir - MP4 & Shorts Ücretsiz',
  description: 'YouTube videolarını ve Shorts\'ları ücretsiz ve yüksek kalitede indirin. MP4 formatında YouTube video indirme aracı. Hızlı ve güvenli YouTube downloader.',
  keywords: ['youtube video indir', 'youtube mp4 indir', 'youtube shorts indir', 'youtube downloader türkçe', 'ücretsiz youtube indir', 'youtube 1080p indir'],
  openGraph: {
    title: 'YouTube Video İndir - MP4 & Shorts Ücretsiz | LuxSocial',
    description: 'YouTube videolarını ve Shorts\'ları ücretsiz ve yüksek kalitede indirin.',
    url: 'https://luxsocialtr.com/youtube',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'YouTube Video İndir - LuxSocial' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video İndir - MP4 & Shorts Ücretsiz | LuxSocial',
    description: 'YouTube videolarını ve Shorts\'ları ücretsiz ve yüksek kalitede indirin.',
    images: ['https://luxsocialtr.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://luxsocialtr.com/youtube' },
  robots: { index: true, follow: true },
}
