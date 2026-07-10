import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular (SSS)',
  description: 'LuxSocial hakkında sık sorulan sorular ve cevapları. Video indirme, filigran kaldırma, desteklenen platformlar ve güvenlik hakkında merak ettiklerinizi öğrenin.',
  keywords: [
    'luxsocial sss', 'sık sorulan sorular', 'video indirme yardım',
    'tiktok filigransız nasıl indirilir', 'instagram video indirme yardım',
    'video downloader yardım', 'luxsocial nasıl kullanılır'
  ],
  openGraph: {
    title: 'Sık Sorulan Sorular | LuxSocial',
    description: 'LuxSocial hakkında sık sorulan sorular ve cevapları.',
    url: 'https://luxsocialtr.com/sss',
    siteName: 'LuxSocial',
    images: [{ url: 'https://luxsocialtr.com/og-image.jpg', width: 1200, height: 630, alt: 'LuxSocial SSS' }],
    locale: 'tr_TR',
    type: 'website',
  },
  alternates: { canonical: 'https://luxsocialtr.com/sss' },
  robots: { index: true, follow: true },
}

export default function SSSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'LuxSocial nedir?', acceptedAnswer: { '@type': 'Answer', text: 'LuxSocial, TikTok, Instagram, YouTube, Twitter (X) ve Facebook gibi sosyal medya platformlarından videoları ücretsiz olarak indirmenizi sağlayan bir web uygulamasıdır.' } },
              { '@type': 'Question', name: 'LuxSocial kullanmak için üyelik gerekli mi?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır, herhangi bir üyelik veya hesap oluşturmanıza gerek yoktur. Siteye girerek direkt video indirmeye başlayabilirsiniz.' } },
              { '@type': 'Question', name: 'LuxSocial ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, LuxSocial tamamen ücretsizdir. Gizli ödeme, abonelik veya premium üyelik bulunmamaktadır.' } },
              { '@type': 'Question', name: 'Hangi platformlardan video indirebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok, Instagram (Reels, hikayeler, gönderiler), YouTube, Twitter/X ve Facebook platformlarından video indirebilirsiniz.' } },
              { '@type': 'Question', name: 'TikTok videosunu filigransız nasıl indiririm?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok uygulamasını açın, videoyu bulun, paylaş tuşuna basıp linki kopyalayın. LuxSocial\'in TikTok sayfasına gelin, linki yapıştırın ve İndir butonuna tıklayın.' } },
              { '@type': 'Question', name: 'İndirilen videolar hangi kalitede olur?', acceptedAnswer: { '@type': 'Answer', text: 'LuxSocial mümkün olan en yüksek kaliteyi sunar, genellikle 720p veya 1080p ve üzeri çözünürlük.' } },
              { '@type': 'Question', name: 'LuxSocial güvenli mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, LuxSocial güvenlidir. Kişisel bilgilerinizi toplamaz ve yalnızca girilen video URL\'sini işler.' } },
              { '@type': 'Question', name: 'Kişisel verilerim korunuyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Gizlilik Politikamız kapsamında kişisel verileriniz toplanmaz ve üçüncü taraflarla paylaşılmaz.' } },
              { '@type': 'Question', name: 'Video indirilmiyor, ne yapmalıyım?', acceptedAnswer: { '@type': 'Answer', text: 'Linkin doğru kopyalandığından ve videonun herkese açık olduğundan emin olun. Sayfayı yenileyip tekrar deneyin veya farklı bir tarayıcı kullanın.' } },
              { '@type': 'Question', name: 'Hangi cihazlarda çalışır?', acceptedAnswer: { '@type': 'Answer', text: 'Android, iOS, tablet, dizüstü ve masaüstü bilgisayarlarda çalışır. Uygulama indirmenize gerek yoktur.' } },
            ],
          }),
        }}
      />
    </>
  )
}
