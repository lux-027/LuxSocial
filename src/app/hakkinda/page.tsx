'use client'

import Link from 'next/link'
import { Info, DownloadCloud, Play, Instagram, Youtube, Facebook, Twitter, ArrowLeft, Home, Shield, Zap, Users } from 'lucide-react'

export default function Hakkinda() {
  return (
    <div className="min-h-screen">
      {/* Arka Plan */}
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>
      
      {/* Header */}
      <header className="header-gradient shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg neon-glow">
                <Info className="w-7 h-7 text-lux-purple" />
              </div>
              <h1 className="text-3xl font-bold text-white">Hakkında</h1>
            </div>
            <Link 
              href="/" 
              className="hidden md:flex items-center space-x-2 text-white hover:text-lux-plum transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfa</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Beyaz İçerik Kutusu */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-lux-purple/20 p-8 md:p-12">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-lux-purple to-lux-purple-light rounded-2xl flex items-center justify-center shadow-lg neon-glow">
                  <DownloadCloud className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">LuxSocial</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sosyal medya platformlarından filigransız video indirme hizmeti
              </p>
            </div>

            {/* İçerik */}
            <div className="space-y-8 text-gray-700">
              
              {/* Misyonumuz */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
                </div>
                <p className="leading-relaxed">
                  LuxSocial olarak, sosyal medya kullanıcılarının en kaliteli videoları 
                  filigransız ve kolay bir şekilde indirmelerini sağlamak için çalışıyoruz. 
                  Kullanıcı dostu arayüzümüz ve hızlı indirme sistemimizle sosyal medya deneyiminizi 
                  bir üst seviyeye taşımayı hedefliyoruz.
                </p>
              </section>

              {/* Desteklenen Platformlar */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Desteklenen Platformlar</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">TikTok</span>
                  </div>
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">Instagram</span>
                  </div>
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">YouTube</span>
                  </div>
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">Facebook</span>
                  </div>
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">X / Twitter</span>
                  </div>
                </div>
              </section>

              {/* Özelliklerimiz */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Özelliklerimiz</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-lux-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <DownloadCloud className="w-4 h-4 text-lux-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Filigransız İndirme</h3>
                      <p className="text-sm text-gray-600">
                        Videoları orijinal kalitesinde ve filigransız olarak indirin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-lux-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-lux-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Hızlı İndirme</h3>
                      <p className="text-sm text-gray-600">
                        Saniyeler içinde videolarınızı cihazınıza indirin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-lux-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-lux-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Güvenli</h3>
                      <p className="text-sm text-gray-600">
                        Verileriniz güvende, indirmeler güvenli
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-lux-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-lux-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Ücretsiz</h3>
                      <p className="text-sm text-gray-600">
                        Tüm özelliklerimiz tamamen ücretsiz
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Nasıl Çalışır? */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Info className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Nasıl Çalışır?</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-lux-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Video Linkini Kopyala</h3>
                      <p className="text-sm text-gray-600">
                        Sosyal medya platformundan video linkini kopyalayın
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-lux-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Linki Yapıştır</h3>
                      <p className="text-sm text-gray-600">
                        Linki LuxSocial arama çubuğuna yapıştırın
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-lux-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">İndir</h3>
                      <p className="text-sm text-gray-600">
                        İndirme butonuna tıklayarak videoyu cihazınıza kaydedin
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* İletişim */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Info className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">İletişim</h2>
                </div>
                <p className="leading-relaxed">
                  Sorularınız, önerileriniz veya teknik destek için bize 
                  <a href="mailto:luxtrade.0@gmail.com" className="text-lux-purple hover:underline ml-1">
                    luxtrade.0@gmail.com
                  </a> 
                  adresinden ulaşabilirsiniz. Mesajlarınız en kısa sürede değerlendirilecektir.
                </p>
              </section>

            </div>

            {/* Ana Sayfaya Dön Butonu */}
            <div className="mt-12 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-lux-purple to-lux-purple-light text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Ana Sayfaya Dön</span>
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
