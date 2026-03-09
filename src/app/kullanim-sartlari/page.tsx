'use client'

import Link from 'next/link'
import { FileText, Shield, AlertTriangle, ArrowLeft, Home, DownloadCloud, Cookie, Eye, Lock } from 'lucide-react'

export default function KullanimSartlari() {
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
                <FileText className="w-7 h-7 text-lux-purple" />
              </div>
              <h1 className="text-3xl font-bold text-white">Kullanım Şartları</h1>
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
            
            {/* Güncelleme Tarihi */}
            <div className="mb-8 text-center">
              <p className="text-gray-600 text-sm">
                Son Güncelleme: <span className="font-semibold">9 Mart 2026</span>
              </p>
            </div>

            {/* İçerik */}
            <div className="space-y-8 text-gray-700">
              
              {/* Kabul Edilme */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Kullanım Şartlarının Kabulü</h2>
                </div>
                <p className="leading-relaxed">
                  LuxSocial web sitesini ("Hizmet") kullanarak, bu Kullanım Şartları'nı 
                  kabul etmiş olursunuz. Bu şartlara uymadığınız takdirde Hizmeti kullanmamalısınız.
                </p>
              </section>

              {/* Hizmet Tanımı */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <DownloadCloud className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Hizmet Tanımı</h2>
                </div>
                <p className="leading-relaxed">
                  LuxSocial, sosyal medya platformlarından video indirme hizmeti sunan bir web uygulamasıdır. 
                  Kullanıcılar bu hizmeti TikTok, Instagram, YouTube, Facebook ve X / Twitter platformlarından 
                  videoları indirmek için kullanabilirler.
                </p>
              </section>

              {/* Kullanıcı Sorumlulukları */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Sorumlulukları</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="font-semibold mb-2">Önemli Uyarı</p>
                    <p className="text-sm">
                      Kullanıcılar, indirdikleri videoların telif haklarına saygı göstermekten 
                      sorumludur. Telifli materyalleri izinsiz indirmek yasa dışıdır.
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>İndirdiğiniz videoların telif haklarını kontrol etmelisiniz</li>
                    <li>Kişisel kullanım için videoları indirebilirsiniz</li>
                    <li>Ticari amaçla kullanım için izin almalısınız</li>
                    <li>Yasalara aykırı içerik indirmemelisiniz</li>
                    <li>Üçüncü şahısların haklarına saygı göstermelisiniz</li>
                  </ul>
                </div>
              </section>

              {/* Fikri Mülkiyet Hakları */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Fikri Mülkiyet Hakları</h2>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    LuxSocial, platformlarda paylaşılan videoların içeriğinden sorumlu değildir. 
                    Tüm videoların fikri mülkiyet hakları orijinal içerik üreticilerine aittir.
                  </p>
                  <div className="bg-lux-plum/50 rounded-xl p-4 border border-lux-purple/20">
                    <h3 className="font-semibold mb-2">Telif Uyarısı</h3>
                    <p className="text-sm">
                      Eğer telif haklarınızı ihlal ettiğimizi düşünüyorsanız, 
                      lütfen bizimle <span className="text-lux-purple font-semibold">luxtrade.0@gmail.com</span> 
                      adresinden iletişime geçin. İlgili içerikleri en kısa sürede kaldıracağız.
                    </p>
                  </div>
                </div>
              </section>

              {/* Hizmet Kullanımı */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Hizmet Kullanımı Kuralları</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Yasaklı Faaliyetler:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Hizmeti yasa dışı amaçlarla kullanmak</li>
                      <li>Zarlı yazılım veya virüs indirmek</li>
                      <li>Hizmeti aşırı yüklemek (DDoS saldırıları)</li>
                      <li>Otomatik script'ler ile kötüye kullanmak</li>
                      <li>Başka kullanıcıların deneyimini engellemek</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Gizlilik ve Veriler */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Cookie className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Gizlilik ve Veriler</h2>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    Hizmetimizi kullanırken belirli verileri toplamaktayız. Veri kullanımımız 
                    hakkında detaylı bilgi için <Link href="/gizlilik-politikasi" className="text-lux-purple hover:underline">Gizlilik Politikası</Link> sayfamızı ziyaret edin.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="font-semibold mb-2">Google AdSense</p>
                    <p className="text-sm">
                      Hizmetimizde Google AdSense reklamları bulunmaktadır. Google, 
                      kullanıcı verilerini reklam kişiselleştirme için kullanabilir. 
                      Reklam ayarlarınızı <a href="https://adssettings.google.com" target="_blank" rel="noopener" className="text-lux-purple hover:underline ml-1">
                        Google Reklam Ayarları
                      </a> sayfasından yönetebilirsiniz.
                    </p>
                  </div>
                </div>
              </section>

              {/* Hizmet Değişiklikleri */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Hizmet Değişiklikleri</h2>
                </div>
                <p className="leading-relaxed">
                  LuxSocial, Hizmeti herhangi bir zamanda değiştirme, askıya alma veya 
                  sonlandırma hakkını saklı tutar. Önemli değişiklikler hakkında kullanıcıları 
                  web sitesi üzerinden bilgilendireceğiz.
                </p>
              </section>

              {/* Sorumluluk Reddi */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">Sorumluluk Reddi</h2>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    LuxSocial, Hizmetin "olduğu gibi" sağlanmasını garanti eder ve aşağıdaki 
                    durumlarda sorumluluk kabul etmez:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hizmetin kesintisiz veya hatasız çalışması</li>
                    <li>İndirilen videoların kalitesi veya içeriği</li>
                    <li>Üçüncü parti platformların erişilebilirliği</li>
                    <li>Kullanıcıların Hizmeti kullanımından kaynaklanan zararlar</li>
                  </ul>
                </div>
              </section>

              {/* İletişim */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-lux-purple" />
                  <h2 className="text-2xl font-bold text-gray-900">İletişim</h2>
                </div>
                <p className="leading-relaxed">
                  Kullanım şartlarımızla ilgili sorularınız için bize 
                  <a href="mailto:luxtrade.0@gmail.com" className="text-lux-purple hover:underline ml-1">
                    luxtrade.0@gmail.com
                  </a> 
                  adresinden ulaşabilirsiniz.
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
