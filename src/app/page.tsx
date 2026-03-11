'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Download, Play, Instagram, Youtube, Facebook, Twitter, DownloadCloud, Eye, Loader2, ArrowLeft, Shield, Info, FileText, Home as HomeIcon, Menu, X } from 'lucide-react'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false) // Ön izleme yükleniyor
  const [selectedPlatform, setSelectedPlatform] = useState('TikTok') // Başlangıçta TikTok seçili
  const [downloadCount, setDownloadCount] = useState(1823)
  const [urlError, setUrlError] = useState('') // Hata mesajı için state
  const [videoPreview, setVideoPreview] = useState<any>(null) // Video ön izleme için state
  const [downloadError, setDownloadError] = useState('') // İndirme hatası için state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobil menü durumu
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null) // Debounce timer

  // Canlı indirme sayacı
  useEffect(() => {
    // Başlangıçta localStorage'dan sayacı al veya varsayılan değeri kullan
    const savedCount = localStorage.getItem('downloadCount')
    if (savedCount) {
      setDownloadCount(parseInt(savedCount, 10))
    }
  }, [])

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setUrlError('Lütfen bir video linki giriniz')
      return
    }

    if (!validateUrl(videoUrl, selectedPlatform)) {
      return
    }

    setIsLoading(true)
    setDownloadError('')

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl, platform: selectedPlatform })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Video indirilemedi')
      }

      if (data.success && data.downloadUrl) {
        // 🌊 Mobil Uyumlu Proxy İndirme!
        try {
          console.log('📱 MOBIL_PROXY_INDIRME_BASLADI:', data.downloadUrl)
          
          // Backend proxy URL'i oluştur
          const proxyUrl = `/api/download-file?url=${encodeURIComponent(data.downloadUrl)}`
          console.log('🔗 PROXY_URL:', proxyUrl)
          
          // Mobil cihaz için doğrudan yönlendirme
          const link = document.createElement('a')
          link.href = proxyUrl
          link.style.display = 'none'
          
          // DOM'a ekle ve tıkla
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          console.log('🎉 MOBIL_INDIRME_BASARILI!')
          
        } catch (mobileError: any) {
          console.error('🚨 MOBIL_INDIRME_HATASI:', mobileError)
          
          // Mobil başarısız olursa masaüstü yöntemine geri dön
          console.log('⚠️ DESKTOP_YONTEM_DENENIYOR...')
          
          try {
            console.log('🚀 BLOB_INDIRME_BASLADI:', data.downloadUrl)
            
            // Videoyu arka planda çek
            const videoResponse = await fetch(data.downloadUrl)
            
            if (!videoResponse.ok) {
              throw new Error('Video indirilemedi')
            }
            
            // Blob oluştur (veri paketi)
            const blob = await videoResponse.blob()
            console.log('✅ BLOB_OLUSTURULDU:', blob.size, 'bytes')
            
            // Geçici obje URL'si oluştur
            const blobUrl = window.URL.createObjectURL(blob)
            
            // Görünmez a etiketi oluştur
            const blobLink = document.createElement('a')
            blobLink.href = blobUrl
            blobLink.download = data.title || 'luxsocial-tiktok-video.mp4'
            blobLink.style.display = 'none'
            
            // DOM'a ekle, tıkla ve temizle
            document.body.appendChild(blobLink)
            blobLink.click()
            document.body.removeChild(blobLink)
            
            // Belleği temizle
            window.URL.revokeObjectURL(blobUrl)
            
            console.log('🎉 DESKTOP_INDIRME_BASARILI!')
            
          } catch (blobError: any) {
            console.error('🚨 BLOB_INDIRME_HATASI:', blobError)
            
            // En son çare: eski yöntem
            console.log('⚠️ ESKI_YONTEM_DENENIYOR...')
            const oldLink = document.createElement('a')
            oldLink.href = data.downloadUrl
            oldLink.download = data.title || 'luxsocial-tiktok-video.mp4'
            oldLink.style.display = 'none'
            document.body.appendChild(oldLink)
            oldLink.click()
            document.body.removeChild(oldLink)
          }
        }

        // İndirme sayacını artır
        setDownloadCount(prev => prev + 1)
        
        // Başarı mesajı
        setDownloadError('')
        
        // Input'u temizle
        setVideoUrl('')
      } else {
        throw new Error(data.error || 'Video linki alınamadı')
      }

    } catch (error: any) {
      console.error('İndirme hatası:', error)
      setDownloadError(error.message || 'Video indirilemedi. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  // Rüzgar Sörfü TikTok Nota İkonu
  const TikTokLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a72.59,72.59,0,1,0,72.59,71.18V0h90a208.91,208.91,0,0,0,51,10.15,209,209,0,0,0,49.46,9.1v90.66Z"/>
    </svg>
  )

  const platforms = [
    { name: 'TikTok', icon: TikTokLogo, color: 'bg-black', placeholder: 'https://tiktok.com/@kullanici/video/...', regex: /tiktok\.com/i },
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 to-pink-500', placeholder: 'https://instagram.com/p/...', regex: /instagram\.com/i },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-600', placeholder: 'https://youtube.com/watch?v=...', regex: /youtube\.com/i },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', placeholder: 'https://facebook.com/watch/...', regex: /facebook\.com/i },
    { name: 'X / Twitter', icon: Twitter, color: 'bg-sky-500', placeholder: 'https://x.com/user/status/...', regex: /x\.com|twitter\.com/i },
  ]

  // Platform'a göre placeholder döndüren fonksiyon
  const getPlaceholderForPlatform = (platform: string) => {
    const found = platforms.find(p => p.name === platform)
    return found ? found.placeholder : 'Video linkini yapıştırın...'
  }

  // Platform'a göre regex döndüren fonksiyon
  const getRegexForPlatform = (platform: string) => {
    const found = platforms.find(p => p.name === platform)
    return found ? found.regex : null
  }

  // URL doğrulama fonksiyonu
  const validateUrl = (url: string, platform: string) => {
    if (!url.trim()) {
      setUrlError('')
      return true
    }
    
    const regex = getRegexForPlatform(platform)
    if (regex && regex.test(url)) {
      setUrlError('')
      return true
    } else {
      setUrlError(`Lütfen geçerli bir ${platform} linki giriniz`)
      return false
    }
  }

  // Anında ön izleme için debounce fonksiyonu
  const fetchVideoPreview = async (url: string, platform: string) => {
    if (!url || !platform || urlError) return
    
    setIsPreviewLoading(true)
    setDownloadError('')
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          platform,
          preview: true // Ön izleme modu
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Ön izleme alınamadı')
      }
      
      setVideoPreview(data)
      
    } catch (error: any) {
      console.error('Ön izleme hatası:', error)
      // Ön izleme hatasında sessizce geç, sadece indirme butonuna basınca göster
    } finally {
      setIsPreviewLoading(false)
    }
  }

  // Debounce ile URL değişiklik handler'ı
  const handleUrlChangeWithDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setVideoUrl(url)
    validateUrl(url, selectedPlatform)
    
    // Mevcut timer'ı temizle
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    // URL geçerliyse ve 500ms sonra ön izleme yap
    if (url && !urlError) {
      debounceTimerRef.current = setTimeout(() => {
        fetchVideoPreview(url, selectedPlatform)
      }, 500) // 500ms debounce
    } else {
      setVideoPreview(null)
    }
  }

  // Hızlı yapıştırma fonksiyonu
  const handleQuickPaste = async () => {
    try {
      // Mobil cihazlarda clipboard izni kontrolü
      if (navigator.clipboard && navigator.clipboard.readText) {
        // Clipboard'dan metni al
        const text = await navigator.clipboard.readText()
        if (text.trim()) {
          // URL'i ayarla ve doğrula
          setVideoUrl(text)
          validateUrl(text, selectedPlatform)
          
          // Debounce ile ön izleme yap
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
          }
          
          if (!urlError) {
            debounceTimerRef.current = setTimeout(() => {
              fetchVideoPreview(text, selectedPlatform)
            }, 500)
          }
        }
      } else {
        // Mobil fallback: input'a focus ve yapıştırma isteği
        const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
        if (inputElement) {
          inputElement.focus()
          // Mobil klavyeyi aç
          inputElement.click()
          // Kısa bir gecikme ile focus tekrar
          setTimeout(() => {
            inputElement.focus()
          }, 100)
        }
      }
    } catch (error) {
      console.error('Yapıştırma hatası:', error)
      // Clipboard erişimi yoksa, manuel giriş için input'a focus
      const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
      if (inputElement) {
        inputElement.focus()
        inputElement.click()
        setTimeout(() => {
          inputElement.focus()
        }, 100)
      }
    }
  }

  // URL'i temizleme fonksiyonu
  const clearUrl = () => {
    setVideoUrl('')
    setUrlError('')
    setVideoPreview(null)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
  }

  // Metin kırpma fonksiyonu
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  // Platform değişiklik handler'ı
  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform)
    setUrlError('') // Platform değişince hatayı temizle
    validateUrl(videoUrl, platform) // Mevcut URL'i yeni platform için kontrol et
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Background */}
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>
      
      {/* Mobil Menu Overlay - Tüm Sayfayı Kaplar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[998]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header className="header-gradient shadow-lg relative overflow-visible">
        {/* Masaüstü: Çapraz Kesim */}
        <div className="hidden md:block absolute inset-0 bg-white transform -skew-x-12 origin-top-left" style={{width: '45%', left: '-15%'}}></div>
        
        {/* Mobil: Çapraz Kesim */}
        <div className="md:hidden absolute inset-0 bg-white transform -skew-x-12 origin-top-left" style={{width: '45%', left: '-10%'}}></div>
        
        <div className="container mx-auto px-4 relative z-10 overflow-visible">
          {/* Masaüstü Header */}
          <div className="hidden md:flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              {/* Download İkonlu Logo */}
              <div className="w-12 h-12 animated-gradient-bg rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                <DownloadCloud className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight">
                <span className="animated-gradient-text">Lux</span>
                <span className="animated-gradient-text">Social</span>
              </h1>
            </div>
            
            {/* iPhone Tarzı Segment Kontrol - Masaüstü */}
            <div className="segment-control">
              <div 
                className="segment-slider"
                style={{ 
                  width: `${100 / platforms.length}%`,
                  transform: `translateX(${platforms.findIndex(p => p.name === selectedPlatform) * 100}%)`
                }}
              ></div>
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <button
                    key={platform.name}
                    onClick={() => handlePlatformChange(platform.name)}
                    className={`segment-option ${selectedPlatform === platform.name ? 'active' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{platform.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Mobil Header */}
          <div className="md:hidden overflow-visible">
            {/* Mobil Logo Bar */}
            <div className="flex items-start justify-between py-6">
              {/* Download İkonlu Logo */}
              <div className="flex items-start">
                <div className="w-10 h-10 animated-gradient-bg rounded-xl flex items-center justify-center shadow-lg border border-white/20 mr-3">
                  <DownloadCloud className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-black tracking-tight leading-none flex items-center">
                  <span className="text-lux-purple">Lux</span>
                  <span className="mx-4 text-white">Social</span>
                </h1>
              </div>
              
              {/* Mobil Menu Butonu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
            
            {/* Mobil Menu Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  {/* Menu Penceresi */}
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-16 right-8 left-8 z-[999] animated-gradient-bg rounded-2xl p-4 border border-white/20 backdrop-blur-xl shadow-2xl"
                  >
                    <nav className="space-y-3">
                      <Link
                        href="/gizlilik-politikasi"
                        className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors duration-300 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        <span className="font-medium text-sm">Gizlilik Politikası</span>
                      </Link>
                      <Link
                        href="/hakkinda"
                        className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors duration-300 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Info className="w-4 h-4" />
                        <span className="font-medium text-sm">Hakkında</span>
                      </Link>
                      <Link
                        href="/kullanim-sartlari"
                        className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors duration-300 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FileText className="w-4 h-4" />
                        <span className="font-medium text-sm">Kullanım Şartları</span>
                      </Link>
                    </nav>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Mobil Platform Seçici - Toolbar Altında */}
            <div className="pb-6 pt-2">
              <div className="segment-control">
                <div 
                  className="segment-slider"
                  style={{ 
                    width: `${100 / platforms.length}%`,
                    transform: `translateX(${platforms.findIndex(p => p.name === selectedPlatform) * 100}%)`
                  }}
                ></div>
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <button
                      key={platform.name}
                      onClick={() => handlePlatformChange(platform.name)}
                      className={`segment-option ${selectedPlatform === platform.name ? 'active' : 'text-white/70'}`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            {/* Masaüstü: Tek Satır Başlık */}
            <h2 className="hidden md:block text-5xl font-bold text-gray-900 mb-4">
              {selectedPlatform} Filigransız Video İndirme
            </h2>
            
            {/* Mobil: Bölünmüş Başlık */}
            <div className="md:hidden">
              {/* Ana Platform Başlığı */}
              <h2 className="text-4xl font-bold text-gray-900 mb-1">
                {selectedPlatform}
              </h2>
            </div>
            
            {/* Açıklama Metni */}
            <p className="text-xl text-gray-600 mt-2">
              {selectedPlatform} ve diğer platformlardan videoları filigransız indirin
            </p>
          </div>

          {/* URL Input Section */}
          <div className="animated-gradient-bg rounded-3xl shadow-xl p-6 mb-8 border border-white/20">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-white mb-3">
                Video URL'sini Yapıştırın
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={handleUrlChangeWithDebounce}
                  placeholder={getPlaceholderForPlatform(selectedPlatform)}
                  className={`w-full px-6 py-4 pr-32 text-lg border-2 rounded-2xl focus:outline-none transition-colors duration-300 bg-white md:truncate md:overflow-hidden md:whitespace-nowrap ${
                    urlError 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-lux-purple focus:border-lux-purple-dark'
                  }`}
                />
                {/* Masaüstü Çarpı Butonu */}
                {videoUrl && (
                  <button
                    onClick={clearUrl}
                    className="hidden md:flex absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {/* Mobil Çarpı Butonu */}
                {videoUrl && (
                  <button
                    onClick={clearUrl}
                    className="md:hidden absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleQuickPaste}
                  className="md:absolute md:right-2 md:top-1/2 md:transform md:-translate-y-1/2 animated-gradient-bg md:text-white md:px-4 md:py-2 md:rounded-lg md:hover:scale-105 md:transition-all md:duration-300 md:text-sm md:font-medium md:flex md:items-center md:space-x-2 absolute right-2 top-1/2 transform -translate-y-1/2 animated-gradient-bg text-white p-2 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="md:w-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="hidden md:inline">Yapıştır</span>
                </button>
              </div>
              {urlError && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {urlError}
                </p>
              )}
            </div>

            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={handleDownload}
                disabled={!videoUrl.trim() || !!urlError || isLoading}
                className={`
                  py-4 px-16 rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 mx-auto font-bold
                  ${
                    !videoUrl.trim() || !!urlError || isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'animated-gradient-bg text-white shadow-[0_0_25px_rgba(103,22,223,1),0_0_50px_rgba(103,22,223,0.8),0_0_75px_rgba(103,22,223,0.6),inset_0_0_20px_rgba(255,255,255,0.3)]'
                  }
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                    <span className="text-white">Video İndiriliyor...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Download className="w-6 h-6 text-white" />
                    <span className="text-white">Videoyu İndir</span>
                  </div>
                )}
              </button>
            </div>

            {/* Video Ön İzleme Kartı */}
            <AnimatePresence>
              {isPreviewLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 border-2 border-lux-purple shadow-lg mt-6"
                >
                  <div className="flex items-center justify-center space-x-3 py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-lux-purple" />
                    <span className="text-gray-600 font-medium">Video bilgileri yükleniyor...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {videoPreview && !isPreviewLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-white rounded-2xl p-4 md:p-6 border-2 border-lux-purple shadow-lg mt-6 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={videoPreview.thumbnail}
                        alt={videoPreview.title}
                        className="w-full h-32 md:w-32 md:h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Video Bilgileri */}
                    <div className="flex-1 md:mt-0">
                      <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                        {truncateText(videoPreview.title, 50)}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Play className="w-4 h-4" />
                          <span>{videoPreview.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{videoPreview.size}</span>
                        </span>
                        <span className="px-2 py-1 bg-lux-plum text-lux-purple rounded-full text-xs font-medium">
                          {videoPreview.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hata Mesajı */}
            <AnimatePresence>
              {downloadError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-6"
                >
                  <div className="flex items-center space-x-3 text-red-700">
                    <span className="text-xl">⚠️</span>
                    <p className="text-sm font-medium">{downloadError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hizmetlerimiz
              </h2>
              <p className="text-lg text-gray-600">
                Size en iyi video indirme deneyimini sunmak için çalışıyoruz
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
            <div className="animated-gradient-bg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105 hover:-translate-y-1 cursor-pointer">
              <div className="md:flex md:items-center flex items-center">
                <div className="md:w-12 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center md:mb-4 mr-3">
                  <Download className="md:w-6 w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="md:text-xl text-lg font-semibold text-white md:mb-2">Filigransız</h3>
                  <p className="text-white/80 md:text-base text-sm">Videoları orijinal kalitesinde ve filigransız indirin</p>
                </div>
              </div>
            </div>

            <div className="animated-gradient-bg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105 hover:-translate-y-1 cursor-pointer">
              <div className="md:flex md:items-center flex items-center">
                <div className="md:w-12 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center md:mb-4 mr-3">
                  <Play className="md:w-6 w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="md:text-xl text-lg font-semibold text-white md:mb-2">Hızlı İndirme</h3>
                  <p className="text-white/80 md:text-base text-sm">Saniyeler içinde videoları cihazınıza indirin</p>
                </div>
              </div>
            </div>

            <div className="animated-gradient-bg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105 hover:-translate-y-1 cursor-pointer">
              <div className="md:flex md:items-center flex items-center">
                <div className="md:w-12 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center md:mb-4 mr-3">
                  <div className="md:w-6 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lux-purple text-xs font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="md:text-xl text-lg font-semibold text-white md:mb-2">Ücretsiz</h3>
                  <p className="text-white/80 md:text-base text-sm">Tamamen ücretsiz ve sınırsız video indirme</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="animated-gradient-bg rounded-3xl p-6 text-center border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Nasıl Çalışır?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex md:space-x-4 space-x-3">
                <div className="md:w-8 w-6 h-6 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  1
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl md:p-4 p-3">
                  <h4 className="font-semibold text-white mb-1 md:text-base text-sm">URL Kopyala</h4>
                  <p className="text-white/80 md:text-sm text-xs">İndirmek istediğiniz video linkini kopyalayın</p>
                </div>
              </div>
              <div className="flex md:space-x-4 space-x-3">
                <div className="md:w-8 w-6 h-6 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  2
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl md:p-4 p-3">
                  <h4 className="font-semibold text-white mb-1 md:text-base text-sm">URL Yapıştır</h4>
                  <p className="text-white/80 md:text-sm text-xs">Linki yukarıdaki alana yapıştırın</p>
                </div>
              </div>
              <div className="flex md:space-x-4 space-x-3">
                <div className="md:w-8 w-6 h-6 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  3
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl md:p-4 p-3">
                  <h4 className="font-semibold text-white mb-1 md:text-base text-sm">İndir</h4>
                  <p className="text-white/80 md:text-sm text-xs">İndirme butonuna tıklayarak videoyu indirin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* LuxConvert Tarzı Footer */}
      <footer className="lux-footer">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo ve Bilgi + Sayacı */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <DownloadCloud className="w-5 h-5 text-lux-purple" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-lux-purple to-lux-purple-light bg-clip-text text-transparent">LuxSocial</span>
              </div>
              <div className="bg-gray-800/10 backdrop-blur-md rounded-xl p-4 mb-6">
                <p className="text-gray-700 text-sm">
                  Sosyal medya platformlarından filigransız video indirme hizmeti.
                </p>
              </div>
              
              {/* Canlı İndirme Sayacı */}
              <div className="animated-gradient-bg rounded-2xl px-4 py-3 shadow-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-sm font-medium text-white opacity-90">Toplam İndirilen Dosya</div>
                    <div className="text-2xl font-bold text-white">{downloadCount.toLocaleString('tr-TR')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h4 className="bg-gradient-to-r from-lux-purple to-lux-purple-light bg-clip-text text-transparent font-semibold mb-4">Hızlı Linkler</h4>
              <div className="bg-gray-800/10 backdrop-blur-md rounded-xl p-4">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => {
                        handlePlatformChange('TikTok')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`text-left w-full transition-colors duration-300 ${
                        selectedPlatform === 'TikTok' 
                          ? 'text-gray-900 font-semibold' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      TikTok Video İndirme
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handlePlatformChange('Instagram')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`text-left w-full transition-colors duration-300 ${
                        selectedPlatform === 'Instagram' 
                          ? 'text-gray-900 font-semibold' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Instagram Video İndirme
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handlePlatformChange('YouTube')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`text-left w-full transition-colors duration-300 ${
                        selectedPlatform === 'YouTube' 
                          ? 'text-gray-900 font-semibold' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      YouTube Video İndirme
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Yasal ve Bilgi */}
            <div>
              <h4 className="bg-gradient-to-r from-lux-purple to-lux-purple-light bg-clip-text text-transparent font-semibold mb-4">Yasal</h4>
              <div className="bg-gray-800/10 backdrop-blur-md rounded-xl p-4">
                <ul className="space-y-2">
                  <li>
                    <Link href="/gizlilik-politikasi" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Gizlilik Politikası</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/hakkinda" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2">
                      <Info className="w-4 h-4" />
                      <span>Hakkında</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kullanim-sartlari" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Kullanım Şartları</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="animated-gradient-bg rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-center">
              <p className="text-white text-sm font-medium">
                © 2026 LuxSocial. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
