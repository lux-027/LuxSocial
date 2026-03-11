import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LuxSocial - Filigransız Video İndirme',
  description: 'TikTok, Instagram ve diğer sosyal medya platformlarından filigransız video indirin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
