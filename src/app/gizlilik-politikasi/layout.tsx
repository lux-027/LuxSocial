import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | LuxSocial',
  description: 'LuxSocial gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.',
  keywords: ['gizlilik politikası', 'kişisel veriler', 'veri güvenliği', 'luxsocial'],
  openGraph: {
    title: 'Gizlilik Politikası | LuxSocial',
    description: 'LuxSocial gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.',
    url: 'https://luxsocialtr.com/gizlilik-politikasi',
    siteName: 'LuxSocial',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function GizlilikPolitikasiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
