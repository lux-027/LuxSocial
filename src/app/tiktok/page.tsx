import type { Metadata } from 'next'
import DownloadApp from '@/components/DownloadApp'

export default function TikTokPage() {
  return (
    <DownloadApp
      platform="TikTok"
      platformColor="bg-gradient-to-br from-black to-gray-800"
      platformIcon="tiktok"
      platformRegex="tiktok\.com"
      placeholder="https://tiktok.com/@user/video/..."
      title="TikTok Video İndirme"
      description="TikTok videolarını saniyeler içinde filigransiz indirin"
    />
  )
}

export const metadata: Metadata = {
  title: 'TikTok Video İndir - Ücretsiz & Filigransız',
  description: 'TikTok videolarını saniyeler içinde ücretsiz ve filigransız indirin. Watermark olmadan yüksek kalitede TikTok video indirme aracı. Hızlı, güvenli ve kolay kullanım.',
  keywords: [
    'tiktok video indir', 'tiktok filigransız indir', 'tiktok downloader türkçe',
    'tiktok watermark kaldır', 'tiktok mp4 indir', 'ücretsiz tiktok indir', 'tiktok indir'
  ],
  openGraph: {
    title: 'TikTok Video İndir - Ücretsiz & Filigransız | LuxSocial',
    description: 'TikTok videolarını saniyeler içinde ücretsiz ve filigransız indirin.',
    url: 'https://luxsocialtr.com/tiktok',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'TikTok Video İndir - LuxSocial' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video İndir - Ücretsiz & Filigransız | LuxSocial',
    description: 'TikTok videolarını saniyeler içinde ücretsiz ve filigransız indirin.',
    images: ['https://luxsocialtr.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://luxsocialtr.com/tiktok' },
  robots: { index: true, follow: true },
}
