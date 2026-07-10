import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkında | LuxSocial',
  description: 'LuxSocial hakkında bilgi. Sosyal medya platformlarından filigransız video indirme hizmetimiz hakkında detayları öğrenin.',
  keywords: ['hakkında', 'luxsocial', 'video indir', 'sosyal medya indir'],
  openGraph: {
    title: 'Hakkında | LuxSocial',
    description: 'LuxSocial hakkında bilgi. Sosyal medya platformlarından filigransız video indirme hizmetimiz hakkında detayları öğrenin.',
    url: 'https://luxsocialtr.com/hakkinda',
    siteName: 'LuxSocial',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HakkindaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
