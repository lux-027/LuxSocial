import type { Metadata } from 'next'
import Link from 'next/link'

export default function TwitterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
          <span>🔧</span> Bakımda
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">X / Twitter İndirme</h1>
        <p className="text-gray-500 mb-8">Bu özellik şu an bakım sürecinde. Kısa süre içinde kullanıma açılacak.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
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
