'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Download, Play, Loader2, ArrowLeft, DownloadCloud, Instagram, Youtube, Twitter, Facebook, Music2, Zap, Shield, FileText, Info, Mail, ChevronDown, Link as LinkIcon, Copy, LayoutGrid, Menu, X, Share2, HelpCircle } from 'lucide-react'
import Logo from '@/components/Logo'

interface DownloadAppProps {
  platform: string
  platformColor: string
  platformIcon: string
  platformRegex: string
  placeholder: string
  title: string
  description: string
}

const TikTokLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a72.59,72.59,0,1,0,72.59,71.18V0h90a208.91,208.91,0,0,0,51,10.15,209,209,0,0,0,49.46,9.1v90.66Z"/>
  </svg>
)

const getPlatformIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram': return Instagram
    case 'youtube': return Youtube
    case 'twitter': return Twitter
    case 'facebook': return Facebook
    case 'tiktok': return TikTokLogo
    default: return Music2
  }
}

export default function DownloadApp({ 
  platform, 
  platformColor, 
  platformIcon, 
  platformRegex, 
  placeholder, 
  title, 
  description 
}: DownloadAppProps) {
  const PlatformIcon = getPlatformIcon(platformIcon)
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [downloadCount, setDownloadCount] = useState(1823)
  const [activePath, setActivePath] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
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
  }, [])

  const updateDownloadCount = () => {
    const newCount = downloadCount + 1
    setDownloadCount(newCount)
    localStorage.setItem('downloadCount', newCount.toString())
  }
  const [urlError, setUrlError] = useState('')
  const [videoPreview, setVideoPreview] = useState<any>(null)
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setUrlError('Lütfen bir video linki giriniz')
      return
    }

    if (!validateUrl(videoUrl, platformRegex)) {
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
        body: JSON.stringify({ url: videoUrl, platform })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Video indirilemedi')
      }

      if (data.success && data.downloadUrl) {
        try {
          console.log('📱 MOBIL_PROXY_INDIRME_BASLADI:', data.downloadUrl)
          
          const proxyUrl = `/api/download-file?url=${encodeURIComponent(data.downloadUrl)}`
          console.log('🔗 PROXY_URL:', proxyUrl)
          
          const link = document.createElement('a')
          link.href = proxyUrl
          link.style.display = 'none'
          
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          console.log('🎉 MOBIL_INDIRME_BASARILI!')
          
        } catch (mobileError: any) {
          console.error('🚨 MOBIL_INDIRME_HATASI:', mobileError)
          
          console.log('⚠️ DESKTOP_YONTEM_DENENIYOR...')
          
          try {
            console.log('🚀 BLOB_INDIRME_BASLADI:', data.downloadUrl)
            
            const videoResponse = await fetch(data.downloadUrl)
            
            if (!videoResponse.ok) {
              throw new Error('Video indirilemedi')
            }
            
            const blob = await videoResponse.blob()
            console.log('✅ BLOB_OLUSTURULDU:', blob.size, 'bytes')
            
            const blobUrl = window.URL.createObjectURL(blob)
            
            const blobLink = document.createElement('a')
            blobLink.href = blobUrl
            blobLink.download = data.title || 'luxsocial-video.mp4'
            blobLink.style.display = 'none'
            
            document.body.appendChild(blobLink)
            blobLink.click()
            document.body.removeChild(blobLink)
            
            window.URL.revokeObjectURL(blobUrl)
            
            console.log('🎉 DESKTOP_INDIRME_BASARILI!')
            
          } catch (blobError: any) {
            console.error('🚨 BLOB_INDIRME_HATASI:', blobError)
            
            console.log('⚠️ ESKI_YONTEM_DENENIYOR...')
            const oldLink = document.createElement('a')
            oldLink.href = data.downloadUrl
            oldLink.download = data.title || 'luxsocial-video.mp4'
            oldLink.style.display = 'none'
            document.body.appendChild(oldLink)
            oldLink.click()
            document.body.removeChild(oldLink)
          }
        }

        updateDownloadCount()
        setDownloadError('')
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

  const validateUrl = (url: string, regexString: string) => {
    const regex = new RegExp(regexString, 'i')
    
    if (!url.trim()) {
      setUrlError('')
      return true
    }
    
    if (regex && regex.test(url)) {
      setUrlError('')
      return true
    } else {
      if (url.length < 10 || !url.includes('.')) {
        setUrlError(`Lütfen geçerli bir ${platform} linki giriniz`)
        return false
      }
      setUrlError('')
      return true
    }
  }

  const fetchVideoPreview = async (url: string, platform: string) => {
    setIsPreviewLoading(true)
    setIsPreviewLoaded(false)
    setDownloadError('')
    
    try {
      const encodedUrl = encodeURIComponent(url)
      
      console.log('🚀 FRONTEND_ISTEK_GONDERILIYOR:', { url, encodedUrl, platform })
      
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: encodedUrl,
          platform,
          preview: true
        })
      })
      
      const data = await response.json()
      
      console.log('📥 FRONTEND_YANIT_ALINDI:', { status: response.status, data })
      
      if (!response.ok) {
        throw new Error(data.error || 'Ön izleme alınamadı')
      }
      
      setVideoPreview(data)
      
    } catch (error: any) {
      console.error('🚨 FRONTEND_ON_IZLEME_HATASI:', error)
      
      if (error.message.includes('400')) {
        setDownloadError('Geçersiz link formatı. Lütfen linki kontrol edip tekrar deneyin.')
      } else if (error.message.includes('500')) {
        setDownloadError('Bu platform şu an yanıt vermiyor. Lütfen daha sonra tekrar deneyin.')
      } else {
        setDownloadError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
      }
      
    } finally {
      setIsPreviewLoading(false)
    }
  }

  const handleUrlChangeWithDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setVideoUrl(url)
    setIsPreviewLoaded(false)
    validateUrl(url, platformRegex)
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    if (url && !urlError) {
      debounceTimerRef.current = setTimeout(() => {
        fetchVideoPreview(url, platform)
      }, 500)
    } else {
      setVideoPreview(null)
    }
  }

  const clearUrl = () => {
    setVideoUrl('')
    setUrlError('')
    setVideoPreview(null)
    setIsPreviewLoaded(false)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 animated-gradient-bg opacity-10 -z-10"></div>
      
      <header ref={headerRef} className="bg-white shadow-lg sticky top-0 z-[60] overflow-visible">
        <div className="container mx-auto px-4 relative z-10 overflow-visible">
          <div className="hidden md:flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-sky-600">Lux</span>
                <span className="text-gray-900">Social</span>
              </h1>
            </div>
            
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
                Twitter / X
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
          
          <div className="md:hidden overflow-visible">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="w-9 h-9" />
                <h1 className="text-2xl font-black tracking-tight leading-none flex items-center">
                  <span className="text-sky-600">Lux</span>
                  <span className="text-gray-900">Social</span>
                </h1>
              </Link>
              
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label="Paylaş"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label={isDrawerOpen ? "Menüyü kapat" : "Menüyü aç"}
                >
                  {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Paylaşım Modal */}
      <AnimatePresence>
        {isShareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200] flex items-end sm:items-center justify-center p-4"
            onClick={() => setIsShareOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            >
              {/* Önizleme kartı */}
              <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-5 flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Logo className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">LuxSocial</p>
                  <p className="text-sky-100 text-sm mt-0.5">{title}</p>
                  <p className="text-sky-200 text-xs mt-1 truncate max-w-[180px]">{typeof window !== 'undefined' ? window.location.href : ''}</p>
                </div>
              </div>

              {/* Paylaşım seçenekleri */}
              <div className="p-4">
                <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">Paylaş</p>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <button
                    onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`, '_blank'); setIsShareOpen(false) }}
                    className="flex flex-col items-center space-y-1.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.522 5.849L.057 23.617a.75.75 0 0 0 .921.921l5.768-1.465A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.386l-.372-.214-3.862.981.999-3.763-.234-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => { window.open(`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(title)}`, '_blank'); setIsShareOpen(false) }}
                    className="flex flex-col items-center space-y-1.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.02 9.52c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.92 14.367l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.838.218z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">Telegram</span>
                  </button>
                  <button
                    onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(title)}`, '_blank'); setIsShareOpen(false) }}
                    className="flex flex-col items-center space-y-1.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">X</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title, text: description, url: window.location.href })
                      }
                      setIsShareOpen(false)
                    }}
                    className="flex flex-col items-center space-y-1.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gray-700 flex items-center justify-center shadow">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">Diğer</span>
                  </button>
                </div>

                {/* Link kopyala */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setIsShareOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-600 truncate flex-1 text-left">{typeof window !== 'undefined' ? window.location.href : ''}</span>
                  <Copy className="w-4 h-4 text-sky-500 shrink-0" />
                </button>
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <span>Twitter / X</span>
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Platform Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative mb-8 sm:mb-12 rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)' }}
          >
            {/* Subtle glow */}
            <div className={`absolute inset-0 ${platformColor} opacity-10`} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 blur-3xl opacity-20 bg-sky-400 rounded-full" />

            <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14 flex flex-col items-center text-center">

              {/* İkon + Platform adı yan yana */}
              <div className="flex items-center space-x-4 sm:space-x-5 mb-5">
                {/* 3D App ikonu */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-60 scale-110"
                    style={{ background: 'inherit' }}
                  />
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${platformColor} flex items-center justify-center`}
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)' }}
                  >
                    <PlatformIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    {/* Parlama */}
                    <div className="absolute top-1 left-2 w-8 h-2 bg-white/20 rounded-full blur-sm" />
                    {/* Küçük rozet */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Download className="w-3 h-3 text-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Platform adı */}
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                  {platform}
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl font-bold mb-3">
                <span className="text-white">Filigransız </span>
                <span className="text-sky-400">Video </span>
                <span className="text-white">İndirme</span>
              </p>

              {/* Açıklama */}
              <p className="text-slate-400 text-sm sm:text-base max-w-sm sm:max-w-md leading-relaxed">
                {platform} videolarını saniyeler içinde, ücretsiz ve filigransız olarak indirin
              </p>
            </div>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-gray-200">
            <div className="mb-6">
              <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3">
                Video URL'sini Yapıştırın
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={handleUrlChangeWithDebounce}
                  placeholder={placeholder}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 pr-24 sm:pr-32 text-base sm:text-lg border-2 rounded-2xl focus:outline-none transition-colors duration-300 bg-white md:truncate md:overflow-hidden md:whitespace-nowrap ${
                    urlError 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-sky-500 focus:border-sky-600'
                  }`}
                />
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
                  onClick={() => {
                    if (navigator.clipboard && navigator.clipboard.readText) {
                      navigator.clipboard.readText().then(text => {
                        if (text.trim()) {
                          setVideoUrl(text)
                          validateUrl(text, platformRegex)
                          
                          if (debounceTimerRef.current) {
                            clearTimeout(debounceTimerRef.current)
                          }
                          
                          if (!urlError) {
                            debounceTimerRef.current = setTimeout(() => {
                              fetchVideoPreview(text, platform)
                            }, 500)
                          }
                        }
                      })
                    }
                  }}
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

            <div className="text-center">
              <button
                onClick={handleDownload}
                disabled={!videoUrl.trim() || !!urlError || isLoading || (videoPreview && !isPreviewLoaded)}
                className={`
                  py-3 sm:py-4 px-8 sm:px-16 rounded-2xl text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 mx-auto font-bold w-full sm:w-auto justify-center
                  ${
                    !videoUrl.trim() || !!urlError || isLoading || (videoPreview && !isPreviewLoaded)
                      ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
                      : 'animated-gradient-bg text-white shadow-[0_0_25px_rgba(103,22,223,1),0_0_50px_rgba(103,22,223,0.8),0_0_75px_rgba(103,22,223,0.6),inset_0_0_20px_rgba(255,255,255,0.3)] transition duration-200 ease-in-out'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                    <span className="text-white">İndiriliyor...</span>
                  </div>
                ) : videoPreview && !isPreviewLoaded ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                    <span className="text-white">Yükleniyor...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <span className="text-white">Videoyu İndir</span>
                  </div>
                )}
              </button>
            </div>

            <AnimatePresence>
              {isPreviewLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 border-2 border-sky-500 shadow-lg mt-6"
                >
                  <div className="flex items-center justify-center space-x-3 py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
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
                  className="bg-white rounded-2xl p-4 md:p-6 border-2 border-sky-500 shadow-lg mt-6 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={videoPreview.thumbnail}
                        alt={videoPreview.title}
                        className="w-full h-32 md:w-32 md:h-32 object-cover rounded-lg"
                        onLoad={() => setIsPreviewLoaded(true)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
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
                        <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-medium">
                          {videoPreview.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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

          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Neden {platform} İçin LuxSocial?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Size en iyi video indirme deneyimini sunmak için çalışıyoruz
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              <div className="bg-white rounded-xl p-3 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg">
                    <Download className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Filigransız</h3>
                  <p className="text-gray-600 text-[10px] sm:text-sm hidden sm:block">Videoları orijinal kalitesinde ve filigransız indirin</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg">
                    <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Hızlı İndirme</h3>
                  <p className="text-gray-600 text-[10px] sm:text-sm hidden sm:block">Saniyeler içinde videoları cihazınıza indirin</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg">
                    <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Yüksek Kalite</h3>
                  <p className="text-gray-600 text-[10px] sm:text-sm hidden sm:block">En yüksek çözünürlükte video indirme</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-10 border border-gray-200 shadow-lg mt-8">
            <h3 className="text-base sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-10 text-center">
              Nasıl Çalışır?
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-8">

              {/* Adım 1 */}
              <div className="flex flex-col">
                <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm">
                  <div className="bg-gray-100 border-b border-gray-200 px-1.5 sm:px-3 py-1 sm:py-2 flex items-center space-x-1 sm:space-x-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                    <div className="flex-1 ml-1 sm:ml-2 bg-white rounded sm:rounded-md px-1 sm:px-2 py-0.5 sm:py-1 flex items-center space-x-1 border border-gray-200">
                      <LinkIcon className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400 shrink-0" />
                      <span className="text-[8px] sm:text-[10px] text-gray-500 truncate">tiktok.com/...</span>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-4 h-14 sm:h-28 flex items-center justify-center relative">
                    <div className="w-full h-full bg-gray-200 rounded sm:rounded-lg flex items-center justify-center">
                      <Play className="w-3 h-3 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                    <div className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-sky-500 text-white text-[7px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-lg shadow flex items-center space-x-0.5 sm:space-x-1">
                      <Copy className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5" />
                      <span>Kopyala</span>
                    </div>
                  </div>
                </div>
                <p className="text-[9px] sm:text-sm font-bold text-gray-900 mb-0.5">1. URL Kopyala</p>
                <p className="text-[8px] sm:text-sm text-gray-500 leading-relaxed hidden sm:block">İndirmek istediğiniz videoyu açın, linkini kopyalayın ve LuxSocial'e gelin.</p>
              </div>

              {/* Adım 2 */}
              <div className="flex flex-col">
                <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm">
                  <div className="bg-gray-100 border-b border-gray-200 px-1.5 sm:px-3 py-1 sm:py-2 flex items-center space-x-1 sm:space-x-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                    <div className="flex-1 ml-1 sm:ml-2 bg-white rounded sm:rounded-md px-1 sm:px-2 py-0.5 sm:py-1 border border-gray-200">
                      <span className="text-[8px] sm:text-[10px] text-sky-600 font-medium">LuxSocial</span>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-4 h-14 sm:h-28 flex flex-col justify-center space-y-1 sm:space-y-2">
                    <div className="flex items-center bg-white border border-sky-400 sm:border-2 rounded sm:rounded-lg px-1.5 sm:px-3 py-1 sm:py-2 shadow-sm">
                      <span className="text-[7px] sm:text-[10px] text-gray-400 flex-1 truncate">tiktok.com/...</span>
                      <div className="bg-sky-500 rounded p-0.5 sm:p-1 ml-1 sm:ml-2 shrink-0">
                        <Download className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                    <div className="w-3/4 h-1.5 sm:h-2.5 bg-gray-200 rounded-full" />
                    <div className="w-1/2 h-1.5 sm:h-2.5 bg-gray-100 rounded-full" />
                  </div>
                </div>
                <p className="text-[9px] sm:text-sm font-bold text-gray-900 mb-0.5">2. URL Yapıştır</p>
                <p className="text-[8px] sm:text-sm text-gray-500 leading-relaxed hidden sm:block">Kopyaladığınız video linkini sitemizin giriş alanına yapıştırın.</p>
              </div>

              {/* Adım 3 */}
              <div className="flex flex-col">
                <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm">
                  <div className="bg-gray-100 border-b border-gray-200 px-1.5 sm:px-3 py-1 sm:py-2 flex items-center space-x-1 sm:space-x-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                    <div className="flex-1 ml-1 sm:ml-2 bg-white rounded sm:rounded-md px-1 sm:px-2 py-0.5 sm:py-1 border border-gray-200">
                      <span className="text-[8px] sm:text-[10px] text-sky-600 font-medium">LuxSocial</span>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-4 h-14 sm:h-28 flex flex-col justify-center space-y-1 sm:space-y-2">
                    <div className="w-full h-7 sm:h-14 bg-gray-200 rounded sm:rounded-lg flex items-center justify-center">
                      <Play className="w-3 h-3 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <button className="w-full bg-sky-500 text-white text-[7px] sm:text-xs font-bold py-1 sm:py-2 rounded sm:rounded-lg flex items-center justify-center space-x-0.5 sm:space-x-1.5 shadow">
                      <Download className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span>İndir</span>
                    </button>
                  </div>
                </div>
                <p className="text-[9px] sm:text-sm font-bold text-gray-900 mb-0.5">3. İndir'e Tıkla</p>
                <p className="text-[8px] sm:text-sm text-gray-500 leading-relaxed hidden sm:block">"İndir" butonuna tıklayarak videoyu filigransız ve yüksek kalitede kaydedin.</p>
              </div>

            </div>
          </div>

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
        </div>
      </main>
    </div>
  )
}
