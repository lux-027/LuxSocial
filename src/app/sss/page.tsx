'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'

const faqs = [
  {
    category: 'Genel',
    items: [
      {
        q: 'LuxSocial nedir?',
        a: 'LuxSocial, TikTok, Instagram, YouTube, Twitter (X) ve Facebook gibi sosyal medya platformlarından videoları ücretsiz olarak indirmenizi sağlayan bir web uygulamasıdır. Kayıt gerektirmez, tamamen ücretsizdir.',
      },
      {
        q: 'LuxSocial kullanmak için üyelik gerekli mi?',
        a: 'Hayır, herhangi bir üyelik veya hesap oluşturmanıza gerek yoktur. Siteye girerek direkt video indirmeye başlayabilirsiniz.',
      },
      {
        q: 'LuxSocial ücretsiz mi?',
        a: 'Evet, LuxSocial tamamen ücretsizdir. Gizli ödeme, abonelik veya premium üyelik bulunmamaktadır.',
      },
      {
        q: 'Hangi cihazlarda çalışır?',
        a: 'LuxSocial tüm modern cihazlarda çalışır: akıllı telefonlar (Android, iOS), tabletler, dizüstü ve masaüstü bilgisayarlar. Tarayıcınız yeterlidir, uygulama indirmeniz gerekmez.',
      },
    ],
  },
  {
    category: 'Video İndirme',
    items: [
      {
        q: 'Hangi platformlardan video indirebilirim?',
        a: 'Şu anda TikTok, Instagram (Reels, hikayeler, gönderiler), YouTube, Twitter/X ve Facebook platformlarından video indirebilirsiniz.',
      },
      {
        q: 'TikTok videosunu filigransız nasıl indiririm?',
        a: '1. TikTok uygulamasını açın ve indirmek istediğiniz videoyu bulun. 2. "Paylaş" tuşuna basıp linki kopyalayın. 3. LuxSocial\'in TikTok sayfasına gelin ve linki yapıştırın. 4. "İndir" butonuna tıklayın. Video filigransız olarak cihazınıza inecektir.',
      },
      {
        q: 'Instagram Reels nasıl indirilir?',
        a: 'Instagram Reels paylaşım linkini kopyalayın (örn: instagram.com/reel/...), LuxSocial\'in Instagram sayfasına yapıştırın ve İndir butonuna tıklayın.',
      },
      {
        q: 'YouTube videoları indirilebiliyor mu?',
        a: 'Evet, YouTube video linkleri desteklenmektedir. Uzun videolar, kısa videolar (Shorts) ve normal yayınlar indirilebilir.',
      },
      {
        q: 'Video indirme işlemi ne kadar sürer?',
        a: 'Çoğu video birkaç saniye içinde indirilir. Video kalitesine ve internet hızınıza bağlı olarak bu süre değişebilir.',
      },
      {
        q: 'Özel (gizli) hesapların videolarını indirebilir miyim?',
        a: 'Hayır, yalnızca herkese açık (public) hesapların videoları indirilebilir. Gizli hesaplara erişim teknik olarak mümkün değildir.',
      },
    ],
  },
  {
    category: 'Kalite ve Format',
    items: [
      {
        q: 'İndirilen videolar hangi kalitede olur?',
        a: 'LuxSocial, mümkün olan en yüksek kaliteyi sunar. Genellikle orijinal platformun sunduğu maksimum çözünürlük (720p, 1080p veya daha yüksek) elde edilir.',
      },
      {
        q: 'Hangi formatlarda video indirebilirim?',
        a: 'Videolar genellikle MP4 formatında indirilir. Bu format tüm cihazlarla uyumludur ve herhangi bir dönüştürme işlemine gerek kalmaz.',
      },
      {
        q: 'Filigran (watermark) nedir ve neden kaldırılır?',
        a: 'Filigran, TikTok gibi platformların videolara eklediği logo/kullanıcı adı damgasıdır. LuxSocial, videoyu platformun orijinal sunucusundan filigransız olarak çektiği için temiz bir kopya elde edersiniz.',
      },
    ],
  },
  {
    category: 'Güvenlik ve Gizlilik',
    items: [
      {
        q: 'LuxSocial güvenli mi?',
        a: 'Evet, LuxSocial güvenlidir. Kişisel bilgilerinizi toplamaz, cihazınıza zararlı yazılım yüklemez ve yalnızca girilen video URL\'sini işler.',
      },
      {
        q: 'İndirdiğim videolar kayıt ediliyor mu?',
        a: 'Hayır, LuxSocial sunucularında herhangi bir video depolanmaz. İşlem anlık gerçekleşir ve veriler saklanmaz.',
      },
      {
        q: 'İndirdiğim videoyu paylaşabilir miyim?',
        a: 'İndirdiğiniz videoyu kişisel kullanım için saklayabilirsiniz. Ancak başkasına ait içerikleri izinsiz olarak ticari amaçla paylaşmak telif hakkı ihlali oluşturabilir. İçerik sahibinin haklarına saygı göstermenizi öneririz.',
      },
      {
        q: 'Kişisel verilerim korunuyor mu?',
        a: 'Evet. Gizlilik Politikamız kapsamında kişisel verileriniz toplanmaz ve üçüncü taraflarla paylaşılmaz. Detaylar için Gizlilik Politikası sayfamızı inceleyebilirsiniz.',
      },
    ],
  },
  {
    category: 'Sorun Giderme',
    items: [
      {
        q: 'Video indirilmiyor, ne yapmalıyım?',
        a: '1. Linkin doğru kopyalandığından emin olun. 2. Videonun herkese açık olduğunu kontrol edin. 3. Sayfayı yenileyip tekrar deneyin. 4. Farklı bir tarayıcı kullanmayı deneyin. Sorun devam ederse iletisim sayfamızdan bize ulaşın.',
      },
      {
        q: 'Desteklenmeyen platform hatası alıyorum?',
        a: 'Şu anda yalnızca TikTok, Instagram, YouTube, Twitter/X ve Facebook desteklenmektedir. Diğer platformlar için destek yakında eklenecektir.',
      },
      {
        q: 'Mobil cihazımda indirme çalışmıyor?',
        a: 'İndirilen dosya otomatik olarak "İndirilenler" klasörüne kaydedilir. iOS\'ta Safari tarayıcısında bazı kısıtlamalar olabilir; Chrome veya Firefox kullanmayı deneyin.',
      },
    ],
  },
]

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpenIndex(prev => (prev === key ? null : key))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10" />

      <SiteHeader />

      <main className="container mx-auto px-4 py-8 sm:py-14 max-w-3xl">
        {/* Başlık */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-sky-100 rounded-2xl mb-4">
            <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3">
            Sık Sorulan Sorular
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            LuxSocial hakkında merak ettiklerinizin cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        {/* FAQ Kategoriler */}
        <div className="space-y-6 sm:space-y-8">
          {faqs.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-xs sm:text-sm font-bold text-sky-600 uppercase tracking-widest mb-3 px-1">
                {cat.category}
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`
                  const isOpen = openIndex === key
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-semibold text-gray-800 pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-sky-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Alt bilgi */}
        <div className="mt-10 sm:mt-14 bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center">
          <p className="text-sm sm:text-base text-gray-700 mb-3">
            Aradığınız cevabı bulamadınız mı?
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <span>Bize Ulaşın</span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2026 LuxSocial. Tüm hakları saklıdır.
          </p>
        </div>
      </main>
    </div>
  )
}
