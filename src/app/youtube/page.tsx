import type { Metadata } from 'next'
import Link from 'next/link'

export default function YouTubePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
          <span>🔧</span> Bakımda
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">YouTube İndirme</h1>
        <p className="text-gray-500 mb-8">Bu özellik şu an bakım sürecinde. Kısa süre içinde kullanıma açılacak.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-700 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
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
