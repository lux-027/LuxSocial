import type { Metadata } from 'next'
import Link from 'next/link'

export default function InstagramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
          <span>🔧</span> Bakımda
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Instagram İndirme</h1>
        <p className="text-gray-500 mb-8">Bu özellik şu an bakım sürecinde. Kısa süre içinde kullanıma açılacak.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
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
