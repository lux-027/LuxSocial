import type { Metadata } from 'next'
import DownloadApp from '@/components/DownloadApp'

export default function InstagramPage() {
  return (
    <DownloadApp
      platform="Instagram"
      platformColor="bg-gradient-to-br from-purple-600 to-pink-500"
      platformIcon="instagram"
      platformRegex="instagram\.com"
      placeholder="https://instagram.com/p/..."
      title="Instagram Video İndirme"
      description="Instagramdan videolari ve reelsleri saniyeler içinde filigransiz indirin"
    />
  )
}

export const metadata: Metadata = {
  title: 'Instagram Video İndir - Reels & Story Filigransız',
  description: 'Instagram Reels, story ve videolarını ücretsiz, filigransız ve yüksek kalitede indirin. Instagram downloader ile saniyeler içinde video kaydet.',
  keywords: [
    'instagram video indir', 'instagram reels indir', 'instagram story indir',
    'filigransız instagram', 'instagram downloader türkçe', 'instagram mp4 indir'
  ],
  openGraph: {
    title: 'Instagram Video İndir - Reels & Story Filigransız | LuxSocial',
    description: 'Instagram Reels, story ve videolarını ücretsiz ve filigransız indirin.',
    url: 'https://luxsocialtr.com/instagram',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'Instagram Video İndir - LuxSocial' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Video İndir - Reels & Story Filigransız | LuxSocial',
    description: 'Instagram Reels, story ve videolarını ücretsiz ve filigransız indirin.',
    images: ['https://luxsocialtr.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://luxsocialtr.com/instagram' },
  robots: { index: true, follow: true },
}
