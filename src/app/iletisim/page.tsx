'use client'

import Link from 'next/link'
import { Mail, ArrowLeft, Home, Send, MapPin, Clock } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Iletisim() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo className="w-8 h-8 sm:w-12 sm:h-12" />
              <h1 className="text-lg sm:text-3xl font-bold text-gray-900">İletişim</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors duration-300"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base hidden sm:inline">Ana Sayfa</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-10">

          {/* Hero */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">Bizimle İletişime Geçin</h2>
            <p className="text-sm sm:text-base text-gray-600">Sorularınız, önerileriniz veya teknik destek için buradayız.</p>
          </div>

          <div className="space-y-5 sm:space-y-6">

            {/* E-posta */}
            <div className="flex items-start space-x-3 sm:space-x-4 bg-sky-50 rounded-xl p-4 sm:p-5 border border-sky-100">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-sky-500 rounded-xl flex items-center justify-center shrink-0 shadow">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">E-posta</h3>
                <a
                  href="mailto:luxsocialtr@gmail.com"
                  className="text-sky-600 hover:underline text-sm sm:text-base font-medium"
                >
                  luxsocialtr@gmail.com
                </a>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Her türlü soru ve destek talebi için</p>
              </div>
            </div>

            {/* Yanıt süresi */}
            <div className="flex items-start space-x-3 sm:space-x-4 bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-400 rounded-xl flex items-center justify-center shrink-0 shadow">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Yanıt Süresi</h3>
                <p className="text-gray-700 text-sm sm:text-base">Genellikle 24-48 saat içinde yanıt veriyoruz.</p>
              </div>
            </div>

            {/* Hizmet Bölgesi */}
            <div className="flex items-start space-x-3 sm:space-x-4 bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-400 rounded-xl flex items-center justify-center shrink-0 shadow">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Hizmet Bölgesi</h3>
                <p className="text-gray-700 text-sm sm:text-base">Türkiye ve tüm dünya genelinde hizmet veriyoruz.</p>
              </div>
            </div>

            {/* E-posta CTA */}
            <div className="pt-2">
              <a
                href="mailto:luxsocialtr@gmail.com"
                className="flex items-center justify-center space-x-2 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-colors duration-300 text-sm sm:text-base shadow-lg"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>E-posta Gönder</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 LuxSocial. Tüm hakları saklıdır.
          </p>
        </div>
      </main>
    </div>
  )
}
