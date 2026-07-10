import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kullanım Şartları | LuxSocial',
  description: 'LuxSocial kullanım şartları. Hizmetimizi kullanırken uymanız gereken kuralları ve sorumluluklarınızı öğrenin.',
  keywords: ['kullanım şartları', 'hizmet şartları', 'kullanıcı sorumlulukları', 'luxsocial'],
  openGraph: {
    title: 'Kullanım Şartları | LuxSocial',
    description: 'LuxSocial kullanım şartları. Hizmetimizi kullanırken uymanız gereken kuralları ve sorumluluklarınızı öğrenin.',
    url: 'https://luxsocialtr.com/kullanim-sartlari',
    siteName: 'LuxSocial',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KullanimSartlariLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
