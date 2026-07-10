import type { Metadata } from 'next'
import DownloadApp from '@/components/DownloadApp'

export default function FacebookPage() {
  return (
    <DownloadApp
      platform="Facebook"
      platformColor="bg-gradient-to-br from-blue-600 to-blue-700"
      platformIcon="facebook"
      platformRegex="facebook\.com"
      placeholder="https://facebook.com/watch/..."
      title="Facebook Video İndirme"
      description="Facebook videolarini saniyeler içinde filigransiz indirin"
    />
  )
}

export const metadata: Metadata = {
  title: 'Facebook Video İndir - Ücretsiz & Yüksek Kalite',
  description: 'Facebook videolarını ve Reels\'leri ücretsiz, yüksek kalitede indirin. Facebook downloader ile video ve hikayelerini kolaylıkla kaydet.',
  keywords: ['facebook video indir', 'facebook reels indir', 'facebook downloader türkçe', 'ücretsiz facebook video', 'facebook hikaye indir', 'fb video indir'],
  openGraph: {
    title: 'Facebook Video İndir - Ücretsiz & Yüksek Kalite | LuxSocial',
    description: 'Facebook videolarını ve Reels\'leri ücretsiz ve yüksek kalitede indirin.',
    url: 'https://luxsocialtr.com/facebook',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'Facebook Video İndir - LuxSocial' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facebook Video İndir - Ücretsiz & Yüksek Kalite | LuxSocial',
    description: 'Facebook videolarını ve Reels\'leri ücretsiz ve yüksek kalitede indirin.',
    images: ['https://luxsocialtr.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://luxsocialtr.com/facebook' },
  robots: { index: true, follow: true },
}
