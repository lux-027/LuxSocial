import type { Metadata } from 'next'
import Link from 'next/link'

export default function FacebookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
          <span>🔧</span> Bakımda
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Facebook İndirme</h1>
        <p className="text-gray-500 mb-8">Bu özellik şu an bakım sürecinde. Kısa süre içinde kullanıma açılacak.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
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
