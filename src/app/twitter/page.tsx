import type { Metadata } from 'next'
import DownloadApp from '@/components/DownloadApp'

export default function TwitterPage() {
  return (
    <DownloadApp
      platform="X / Twitter"
      platformColor="from-sky-500 to-sky-600"
      platformIcon="twitter"
      platformRegex="x\\.com|twitter\\.com"
      placeholder="https://x.com/kullanici/status/..."
      title="X / Twitter Video İndir"
      description="X (Twitter) videolarını yüksek kalitede indirin."
    />
  )
}

export const metadata: Metadata = {
  title: 'X / Twitter Video İndir - Ücretsiz & Hızlı',
  description: 'X (Twitter) videolarını ücretsiz ve yüksek kalitede indirin. Tweet videolarını MP4 olarak kaydet. Hızlı ve kolay Twitter video downloader.',
  keywords: ['twitter video indir', 'x video indir', 'tweet video indir', 'twitter downloader türkçe', 'x.com video indir', 'ücretsiz twitter video'],
  openGraph: {
    title: 'X / Twitter Video İndir - Ücretsiz & Hızlı | LuxSocial',
    description: 'X (Twitter) videolarını ücretsiz ve yüksek kalitede indirin.',
    url: 'https://luxsocialtr.com/twitter',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'Twitter Video İndir - LuxSocial' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X / Twitter Video İndir - Ücretsiz & Hızlı | LuxSocial',
    description: 'X (Twitter) videolarını ücretsiz ve yüksek kalitede indirin.',
    images: ['https://luxsocialtr.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://luxsocialtr.com/twitter' },
  robots: { index: true, follow: true },
}
