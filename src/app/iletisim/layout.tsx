import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim - Bize Ulaşın',
  description: 'LuxSocial ile iletişime geçin. Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşabilirsiniz.',
  keywords: ['luxsocial iletişim', 'destek', 'bize ulaşın', 'yardım'],
  openGraph: {
    title: 'İletişim | LuxSocial',
    description: 'LuxSocial ile iletişime geçin.',
    url: 'https://luxsocialtr.com/iletisim',
    siteName: 'LuxSocial',
    locale: 'tr_TR',
    type: 'website',
  },
  alternates: { canonical: 'https://luxsocialtr.com/iletisim' },
  robots: { index: true, follow: true },
}

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children
}
