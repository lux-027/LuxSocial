'use client'

import Link from 'next/link'
import { Shield, Eye, Cookie, Database, Lock, ArrowLeft, Home } from 'lucide-react'
import Logo from '@/components/Logo'

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen">
      {/* Arka Plan */}
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>
      
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Gizlilik Politikası</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/" 
                className="md:hidden flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-sky-600 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Geri</span>
              </Link>
              <Link 
                href="/" 
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Beyaz İçerik Kutusu */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-sky-200 p-4 sm:p-8 md:p-12">
            
            {/* Güncelleme Tarihi */}
            <div className="mb-6 sm:mb-8 text-center">
              <p className="text-gray-600 text-xs sm:text-sm">
                lütfen bizimle <span className="text-sky-600 font-semibold">luxtrade.0@gmail.com</span> 
              </p>
            </div>

            {/* İçerik */}
            <div className="space-y-6 sm:space-y-8 text-gray-700 text-sm sm:text-base">
              
              {/* Giriş */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Giriş</h2>
                </div>
                <p className="leading-relaxed">
                  LuxSocial olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, 
                  LuxSocial web sitesini ("Hizmet") kullandığınızda kişisel verilerinizin nasıl toplandığını, 
                  kullanıldığını ve korunduğunu açıklamaktadır.
                </p>
              </section>

              {/* Toplanan Bilgiler */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Toplanan Bilgiler</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Otomatik Olarak Toplanan Bilgiler</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>IP adresi ve konum bilgileri</li>
                      <li>Tarayıcı türü ve sürümü</li>
                      <li>Cihaz bilgileri</li>
                      <li>Sitede geçirilen süre ve sayfa görüntüleme verileri</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Çerezler ve Benzer Teknolojiler</h3>
                    <div className="bg-sky-50 rounded-xl p-3 sm:p-4 border border-sky-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
                        <span className="font-semibold text-sm sm:text-base">Google AdSense Çerezleri</span>
                      </div>
                      <p className="text-xs sm:text-sm">
                        Hizmetimizde Google AdSense reklam ağı kullanılmaktadır. Google, 
                        reklamcılara web sitelerine dayalı reklamlar sunmak için çerezler kullanır. 
                        Kullanıcılar Google reklam ayarları sayfasından kişiselleştirilmiş reklamı devre dışı bırakabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bilgi Kullanımı */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bilgi Kullanımı</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Toplanan bilgiler şu amaçlarla kullanılır:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Hizmetlerimizi sunmak ve iyileştirmek</li>
                      <li>Kullanıcı deneyimini kişiselleştirmek</li>
                      <li>İstatistiksel analiz yapmak</li>
                      <li>Yasal gereklilikleri yerine getirmek</li>
                      <li>Reklamları kişiselleştirmek ve göstermek (Google AdSense)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Üçüncü Taraflar */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Üçüncü Taraflarla Paylaşım</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded">
                    <p className="font-semibold text-sm sm:text-base mb-2">Google AdSense</p>
                    <p className="text-xs sm:text-sm">
                      Google AdSense reklamlarını göstermek için kullanıcı verilerinizin bir kısmı 
                      Google ile paylaşılmaktadır. Google'ın veri kullanım politikası için 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-sky-600 hover:underline ml-1">
                        Google Gizlilik Politikası
                      </a> 
                      sayfasını ziyaret edebilirsiniz.
                    </p>
                  </div>
                </div>
              </section>

              {/* Veri Güvenliği */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Veri Güvenliği</h2>
                </div>
                <p className="leading-relaxed">
                  Kişisel verilerinizin güvenliği için endüstri standardı SSL şifreleme, 
                  güvenlik duvarları ve diğer güvenlik önlemlerini uygulamaktayız. 
                  Ancak internet üzerinden yapılan veri aktarımlarının %100 güvenliği garanti edilemez.
                </p>
              </section>

              {/* Kullanıcı Hakları */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Kullanıcı Hakları</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Kullanıcılarımız şu haklara sahiptir:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Kişisel verilerine erişme</li>
                      <li>Verilerinin düzeltilmesini talep etme</li>
                      <li>Verilerinin silinmesini isteme</li>
                      <li>Veri işimine itiraz etme</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Çocukların Gizliliği */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Çocukların Gizliliği</h2>
                </div>
                <p className="leading-relaxed">
                  Hizmetimiz 13 yaşın altındaki çocuklara yönelik değildir. 
                  13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamayız.
                </p>
              </section>

              {/* Politika Değişiklikleri */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Politika Değişiklikleri</h2>
                </div>
                <p className="leading-relaxed">
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. 
                  Değişiklikler bu sayfada yayınlandığı tarihte yürürlüğe girer.
                </p>
              </section>

              {/* İletişim */}
              <section>
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">İletişim</h2>
                </div>
                <p className="leading-relaxed">
                  Gizlilik politikamızla ilgili sorularınız için bize 
                  <a href="mailto:luxtrade.0@gmail.com" className="text-sky-600 hover:underline ml-1">
                    luxtrade.0@gmail.com
                  </a> 
                  adresinden ulaşabilirsiniz.
                </p>
              </section>

            </div>

            <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
                © 2026 LuxSocial. Tüm hakları saklıdır.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
