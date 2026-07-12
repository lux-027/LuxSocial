'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Download, Play, Loader2, DownloadCloud, Instagram, Youtube, Twitter, Facebook, Music2, Palette, Zap, Shield, FileText, Info, Mail, ChevronDown, Link as LinkIcon, LayoutGrid, Menu, X, Share2, HelpCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import ShareModal from '@/components/ShareModal'

const allFaqs = [
  { q: 'LuxSocial nedir?', a: 'LuxSocial, TikTok, Instagram, YouTube, Twitter (X) ve Facebook gibi sosyal medya platformlarından videoları ücretsiz ve filigransız olarak indirmenizi sağlayan bir web uygulamasıdır.' },
  { q: 'LuxSocial kullanmak için üyelik gerekli mi?', a: 'Hayır, herhangi bir üyelik veya hesap oluşturmanıza gerek yoktur. Siteye girerek direkt video indirmeye başlayabilirsiniz.' },
  { q: 'LuxSocial ücretsiz mi?', a: 'Evet, LuxSocial tamamen ücretsizdir. Gizli ödeme, abonelik veya premium üyelik bulunmamaktadır.' },
  { q: 'Hangi cihazlarda çalışır?', a: 'Tüm modern cihazlarda çalışır: Android, iOS, tablet, dizüstü ve masaüstü bilgisayarlar. Sadece tarayıcınız yeterlidir.' },
  { q: 'Hangi platformlardan video indirebilirim?', a: 'TikTok, Instagram (Reels, hikayeler), YouTube, Twitter/X ve Facebook platformlarından video indirebilirsiniz.' },
  { q: 'TikTok videosunu filigransız nasıl indiririm?', a: 'TikTok\'ta videoyu paylaş → linki kopyala → LuxSocial\'e yapıştır → İndir butonuna tıkla. Video filigransız gelir.' },
  { q: 'Instagram Reels nasıl indirilir?', a: 'Reels paylaşım linkini kopyalayın, LuxSocial\'in Instagram sayfasına yapıştırın ve İndir butonuna tıklayın.' },
  { q: 'İndirilen videolar hangi kalitede olur?', a: 'Mümkün olan en yüksek kalite sunulur. Genellikle 720p, 1080p veya üzeri çözünürlük elde edilir.' },
  { q: 'Video indirme işlemi ne kadar sürer?', a: 'Çoğu video birkaç saniye içinde indirilir. İnternet hızınıza bağlı olarak bu süre değişebilir.' },
  { q: 'Özel (gizli) hesapların videolarını indirebilir miyim?', a: 'Hayır, yalnızca herkese açık (public) hesapların videoları indirilebilir.' },
  { q: 'LuxSocial güvenli mi?', a: 'Evet, kişisel bilgilerinizi toplamaz, cihazınıza zararlı yazılım yüklemez ve yalnızca girilen video URL\'sini işler.' },
  { q: 'İndirdiğim videolar kayıt ediliyor mu?', a: 'Hayır, sunucularımızda herhangi bir video depolanmaz. İşlem anlık gerçekleşir ve veriler saklanmaz.' },
  { q: 'Kişisel verilerim korunuyor mu?', a: 'Evet. Gizlilik Politikamız kapsamında kişisel verileriniz toplanmaz ve üçüncü taraflarla paylaşılmaz.' },
  { q: 'Hangi formatlarda video indirebilirim?', a: 'Videolar genellikle MP4 formatında indirilir. Bu format tüm cihazlarla uyumludur.' },
  { q: 'Filigran (watermark) nedir?', a: 'Filigran, TikTok gibi platformların videolara eklediği logo/kullanıcı adı damgasıdır. LuxSocial bu damgayı kaldırarak temiz bir kopya sunar.' },
  { q: 'Video indirilmiyor, ne yapmalıyım?', a: 'Linkin doğru kopyalandığından ve videonun herkese açık olduğundan emin olun. Sayfayı yenileyip tekrar deneyin.' },
  { q: 'YouTube Shorts indirebilir miyim?', a: 'Evet, YouTube Shorts linkleri de desteklenmektedir.' },
  { q: 'Mobil cihazımda indirme çalışmıyor?', a: 'İndirilen dosya "İndirilenler" klasörüne kaydedilir. iOS\'ta Chrome veya Firefox kullanmayı deneyin.' },
  { q: 'Günde kaç video indirebilirim?', a: 'Herhangi bir limit bulunmamaktadır. İstediğiniz kadar video indirebilirsiniz.' },
  { q: 'Ses dosyası (MP3) olarak indirebilir miyim?', a: 'Şu anda yalnızca video formatı desteklenmektedir. Ses indirme özelliği yakında eklenecektir.' },
]

const platforms = [
  {
    name: 'TikTok',
    icon: Music2,
    color: 'from-black to-gray-800',
    href: '/tiktok',
    description: 'TikTok videolarını saniyeler içinde indirin'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'from-purple-600 to-pink-500',
    href: '/instagram',
    description: 'Instagram reels ve videoları filigransız indirin'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'from-red-600 to-red-700',
    href: '/youtube',
    description: 'YouTube videolarını ve shorts\'ları indirin'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'from-sky-500 to-sky-600',
    href: '/twitter',
    description: 'X/Twitter videolarını saniyeler içinde indirin'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'from-blue-600 to-blue-700',
    href: '/facebook',
    description: 'Facebook videolarını filigransız indirin'
  }
]

export default function HomePage() {
  const [downloadCount, setDownloadCount] = useState(1823)
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [activePath, setActivePath] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [randomFaqs, setRandomFaqs] = useState(allFaqs.slice(0, 5))
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const savedCount = localStorage.getItem('downloadCount')
    if (savedCount) {
      setDownloadCount(parseInt(savedCount, 10))
    }
    setActivePath(window.location.pathname)
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
    const shuffled = [...allFaqs].sort(() => Math.random() - 0.5)
    setRandomFaqs(shuffled.slice(0, 5))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>
      
      {/* Hero Section */}
      <header ref={headerRef} className="bg-white shadow-lg sticky top-0 z-[60] overflow-visible">
        <div className="container mx-auto px-4 relative z-10 overflow-visible">
          {/* Masaüstü Header */}
          <div className="hidden md:flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-sky-600">Lux</span>
                <span className="text-gray-900">Social</span>
              </h1>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              <Link href="/" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                Ana Sayfa
              </Link>
              <Link href="/tiktok" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/tiktok' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                TikTok
              </Link>
              <Link href="/instagram" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/instagram' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                Instagram
              </Link>
              <Link href="/youtube" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/youtube' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                YouTube
              </Link>
              <Link href="/twitter" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/twitter' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                Twitter
              </Link>
              <Link href="/facebook" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/facebook' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                Facebook
              </Link>
              <Link href="/sss" className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activePath === '/sss' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                SSS
              </Link>
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                aria-label="Paylaş"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobil Header */}
          <div className="md:hidden overflow-visible">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-2">
                <Logo className="w-9 h-9" />
                <h1 className="text-2xl font-black tracking-tight leading-none flex items-center">
                  <span className="text-sky-600">Lux</span>
                  <span className="text-gray-900">Social</span>
                </h1>
              </div>
              
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label="Paylaş"
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label={isDrawerOpen ? "Menüyü kapat" : "Menüyü aç"}
                >
                  {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil Drawer Menü */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-5 flex flex-col h-full" style={{ paddingTop: headerHeight + 20 }}>

                {/* Ana Sayfa */}
                <div className="mb-4">
                  <Link
                    href="/"
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                      activePath === '/' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <DownloadCloud className="w-4 h-4" />
                    <span className="font-medium">Ana Sayfa</span>
                  </Link>
                </div>

                {/* Platformlar */}
                <div className="mb-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-3">Platformlar</p>
                  <nav className="space-y-0.5">
                    <Link
                      href="/tiktok"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/tiktok' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Music2 className="w-4 h-4" />
                      <span>TikTok</span>
                    </Link>
                    <Link
                      href="/instagram"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/instagram' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </Link>
                    <Link
                      href="/youtube"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/youtube' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Youtube className="w-4 h-4" />
                      <span>YouTube</span>
                    </Link>
                    <Link
                      href="/twitter"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/twitter' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </Link>
                    <Link
                      href="/facebook"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/facebook' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </Link>
                  </nav>
                </div>

                {/* Yasal */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-3">Yasal</p>
                  <nav className="space-y-0.5">
                    <Link
                      href="/gizlilik-politikasi"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/gizlilik-politikasi' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Gizlilik Politikası</span>
                    </Link>
                    <Link
                      href="/kullanim-sartlari"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/kullanim-sartlari' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Kullanım Şartları</span>
                    </Link>
                    <Link
                      href="/hakkinda"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/hakkinda' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Info className="w-4 h-4" />
                      <span>Hakkımızda</span>
                    </Link>
                    <Link
                      href="/iletisim"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/iletisim' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>İletişim</span>
                    </Link>
                    <Link
                      href="/sss"
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
                        activePath === '/sss' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>SSS</span>
                    </Link>
                  </nav>
                </div>
                <p className="text-[10px] text-gray-400 text-center pt-4 pb-1">
                  © 2026 LuxSocial. Tüm hakları saklıdır.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Paylaşım Modal */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-700">Hızlı ve Filigransız Video İndirme</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="text-sky-600">LuxSocial</span>
              <br />
              <span className="text-gray-800">Tüm Sosyal Medya Videolarını İndirin</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed px-2">
              TikTok, Instagram, YouTube, Twitter ve Facebook videolarını saniyeler içinde, 
              <span className="font-semibold text-sky-600"> filigransız</span> ve 
              <span className="font-semibold text-sky-600"> ücretsiz</span> olarak indirin.
            </p>
            
            {/* CTA Butonları */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-2">
              <button
                onClick={() => document.getElementById('platformlar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                <DownloadCloud className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Hemen İndir</span>
              </button>
              <Link 
                href="/hakkinda"
                className="inline-flex items-center space-x-2 bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Daha Fazla Bilgi</span>
              </Link>
            </div>
            
            {/* Özellikler */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-2 bg-white rounded-xl px-2 py-4 sm:py-6 shadow-md border border-gray-100">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <span className="text-gray-700 font-semibold text-xs sm:text-base text-center">Hızlı İndirme</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-white rounded-xl px-2 py-4 sm:py-6 shadow-md border border-gray-100">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <span className="text-gray-700 font-semibold text-xs sm:text-base text-center">Filigransız</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-white rounded-xl px-2 py-4 sm:py-6 shadow-md border border-gray-100">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <span className="text-gray-700 font-semibold text-xs sm:text-base text-center">Ücretsiz</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Platform Kartları Grid */}
        <section id="platformlar" className="mb-20 scroll-mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Desteklenen Platformlar</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">Tüm popüler sosyal medya platformlarından videoları filigransız olarak indirin</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6"
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setIsHovered(platform.name)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <Link 
                    href={platform.href}
                    className="block h-full"
                  >
                    <div className={`
                      bg-white rounded-2xl p-4 sm:p-6 h-full shadow-lg border border-gray-200 
                      hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer
                      ${isHovered === platform.name ? 'scale-105 shadow-2xl border-sky-300' : ''}
                    `}>
                      <div className="text-center">
                        <div className={`
                          w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center
                          bg-gradient-to-br ${platform.color} shadow-lg
                       `}>
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                          {platform.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                          {platform.description}
                        </p>
                        <div className="inline-flex items-center space-x-1 text-sky-600 text-xs sm:text-sm font-medium">
                          <span>İndir</span>
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Nasıl Çalışır Section */}
        <section className="mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Nasıl Çalışır?</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">Sadece 3 basit adımda videolarınızı indirin</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-10 border border-gray-200 shadow-lg"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-8">
              <div className="text-center relative">
                <div className="w-9 h-9 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-2xl mx-auto mb-2 sm:mb-4 shadow-lg">
                  1
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <LinkIcon className="w-4 h-4 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <h4 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">URL Kopyala</h4>
                <p className="text-gray-600 text-[10px] sm:text-base hidden sm:block">
                  İndirmek istediğiniz video linkini sosyal medya uygulamasından kopyalayın
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-sky-200"></div>
                </div>
              </div>
              <div className="text-center relative">
                <div className="w-9 h-9 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-2xl mx-auto mb-2 sm:mb-4 shadow-lg">
                  2
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <LayoutGrid className="w-4 h-4 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <h4 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Platform Seç</h4>
                <p className="text-gray-600 text-[10px] sm:text-base hidden sm:block">
                  Aşağıdan platform kartına tıklayın ve linki yapıştırın
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-sky-200"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-2xl mx-auto mb-2 sm:mb-4 shadow-lg">
                  3
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Download className="w-4 h-4 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <h4 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">İndir</h4>
                <p className="text-gray-600 text-[10px] sm:text-base hidden sm:block">
                  İndirme butonuna tıklayarak videoyu cihazınıza kaydedin
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* İstatistikler Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              LuxSocial İle Neler Yapabilirsiniz?
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Hızlı İndirme</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Saniyeler içinde videoları cihazınıza indirin
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Filigransız</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Videoları orijinal kalitesinde ve filigransız indirin
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Kolay Kullanım</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Tek tıkla video indirme, basit arayüz
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Ücretsiz</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Tamamen ücretsiz ve sınırsız video indirme
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SSS Bölümü */}
        <section className="mt-12 sm:mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-sky-600" />
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Sık Sorulan Sorular</h2>
              </div>
              <Link href="/sss" className="text-xs sm:text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors whitespace-nowrap">
                Tümünü gör →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {randomFaqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left group"
                  >
                    <span className="text-sm sm:text-base font-semibold text-gray-800 pr-4 group-hover:text-sky-600 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-sky-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pb-4 -mt-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="container mx-auto px-2 sm:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">LuxSocial</h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                    <p className="text-gray-600 text-sm sm:text-base mb-4">
                      Tüm sosyal medya platformlarından videoları saniyeler içinde, filigransız ve ücretsiz olarak indirin.
                    </p>
                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-3 border border-sky-200 relative overflow-hidden shadow-md">
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Download className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">Toplam İndirme</div>
                            <div className="text-lg font-bold text-white">{downloadCount.toLocaleString('tr-TR')}+</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-[10px] text-white/90 font-medium">Canlı</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6">Platformlar</h4>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                    <ul className="space-y-3 sm:space-y-4">
                      <li>
                        <Link href="/tiktok" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Music2 className="w-4 h-4" />
                          <span>TikTok İndir</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/instagram" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Instagram className="w-4 h-4" />
                          <span>Instagram İndir</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/youtube" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Youtube className="w-4 h-4" />
                          <span>YouTube İndir</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/twitter" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Twitter className="w-4 h-4" />
                          <span>Twitter İndir</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/facebook" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Facebook className="w-4 h-4" />
                          <span>Facebook İndir</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="sm:col-span-2 lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6">Yasal</h4>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                    <ul className="space-y-3 sm:space-y-4">
                      <li>
                        <Link href="/gizlilik-politikasi" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Shield className="w-4 h-4" />
                          <span>Gizlilik Politikası</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/kullanim-sartlari" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <FileText className="w-4 h-4" />
                          <span>Kullanım Şartları</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/hakkinda" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Info className="w-4 h-4" />
                          <span>Hakkımızda</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/iletisim" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <Mail className="w-4 h-4" />
                          <span>İletişim</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sss" className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                          <HelpCircle className="w-4 h-4" />
                          <span>SSS</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                  © 2026 LuxSocial. Tüm hakları saklıdır. 
                  <span className="mx-2">•</span>
                  <span className="text-sky-600 font-medium">Filigransız Video İndirme</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
