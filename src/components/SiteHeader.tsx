'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Share2, Shield, FileText, Info, Mail, HelpCircle, Copy, Link as LinkIcon } from 'lucide-react'
import Logo from '@/components/Logo'

interface SiteHeaderProps {
  onHeightChange?: (h: number) => void
}

export default function SiteHeader({ onHeightChange }: SiteHeaderProps) {
  const [activePath, setActivePath] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setActivePath(window.location.pathname)
    if (headerRef.current) {
      const h = headerRef.current.offsetHeight
      setHeaderHeight(h)
      onHeightChange?.(h)
    }
  }, [onHeightChange])

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
        activePath === href ? 'bg-sky-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  )

  const drawerLink = (href: string, icon: React.ReactNode, label: string) => (
    <Link
      href={href}
      onClick={() => setIsDrawerOpen(false)}
      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors text-sm ${
        activePath === href ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )

  return (
    <>
      <header ref={headerRef} className="bg-white shadow-lg sticky top-0 z-[60] overflow-visible">
        <div className="container mx-auto px-4 relative z-10 overflow-visible">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between py-6">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <span className="text-4xl font-black tracking-tight">
                <span className="text-sky-600">Lux</span>
                <span className="text-gray-900">Social</span>
              </span>
            </Link>
            <div className="flex items-center space-x-1">
              {navLink('/', 'Ana Sayfa')}
              {navLink('/tiktok', 'TikTok')}
              {navLink('/instagram', 'Instagram')}
              {navLink('/youtube', 'YouTube')}
              {navLink('/twitter', 'Twitter / X')}
              {navLink('/facebook', 'Facebook')}
              {navLink('/sss', 'SSS')}
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors ml-1"
                aria-label="Paylaş"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden overflow-visible">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="w-9 h-9" />
                <span className="text-2xl font-black tracking-tight leading-none">
                  <span className="text-sky-600">Lux</span>
                  <span className="text-gray-900">Social</span>
                </span>
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
                  aria-label={isDrawerOpen ? 'Menüyü kapat' : 'Menüyü aç'}
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200] flex items-end sm:items-center justify-center p-4"
            onClick={() => setIsShareOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-5 flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Logo className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">LuxSocial</p>
                  <p className="text-sky-100 text-sm mt-0.5">Ücretsiz Video İndirme</p>
                  <p className="text-sky-200 text-xs mt-1 truncate max-w-[180px]">
                    {typeof window !== 'undefined' ? window.location.href : ''}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">Paylaş</p>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent('LuxSocial - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`, '_blank'); setIsShareOpen(false) }} className="flex flex-col items-center space-y-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.522 5.849L.057 23.617a.75.75 0 0 0 .921.921l5.768-1.465A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.386l-.372-.214-3.862.981.999-3.763-.234-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">WhatsApp</span>
                  </button>
                  <button onClick={() => { window.open(`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank'); setIsShareOpen(false) }} className="flex flex-col items-center space-y-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.02 9.52c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.92 14.367l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.838.218z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">Telegram</span>
                  </button>
                  <button onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=LuxSocial`, '_blank'); setIsShareOpen(false) }} className="flex flex-col items-center space-y-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow">
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">X</span>
                  </button>
                  <button onClick={() => { if (navigator.share) navigator.share({ title: 'LuxSocial', url: window.location.href }); setIsShareOpen(false) }} className="flex flex-col items-center space-y-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-gray-700 flex items-center justify-center shadow">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium">Diğer</span>
                  </button>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); setIsShareOpen(false) }}
                  className="w-full flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-600 truncate flex-1 text-left">{typeof window !== 'undefined' ? window.location.href : ''}</span>
                  <Copy className="w-4 h-4 text-sky-500 shrink-0" />
                </button>
              </div>
              <div className="px-4 pb-4">
                <button onClick={() => setIsShareOpen(false)} className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors">
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobil Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ paddingTop: headerHeight }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {drawerLink('/', <Info className="w-4 h-4" />, 'Ana Sayfa')}
                  {drawerLink('/tiktok', <span className="w-4 h-4 text-center text-xs font-bold">TT</span>, 'TikTok')}
                  {drawerLink('/instagram', <span className="w-4 h-4 text-center text-xs font-bold">IG</span>, 'Instagram')}
                  {drawerLink('/youtube', <span className="w-4 h-4 text-center text-xs font-bold">YT</span>, 'YouTube')}
                  {drawerLink('/twitter', <span className="w-4 h-4 text-center text-xs font-bold">X</span>, 'Twitter / X')}
                  {drawerLink('/facebook', <span className="w-4 h-4 text-center text-xs font-bold">FB</span>, 'Facebook')}
                  <div className="border-t border-gray-100 my-2" />
                  {drawerLink('/sss', <HelpCircle className="w-4 h-4" />, 'SSS')}
                  {drawerLink('/hakkinda', <Info className="w-4 h-4" />, 'Hakkımızda')}
                  {drawerLink('/iletisim', <Mail className="w-4 h-4" />, 'İletişim')}
                  <div className="border-t border-gray-100 my-2" />
                  {drawerLink('/gizlilik-politikasi', <Shield className="w-4 h-4" />, 'Gizlilik Politikası')}
                  {drawerLink('/kullanim-sartlari', <FileText className="w-4 h-4" />, 'Kullanım Şartları')}
                </nav>
              </div>
              <p className="text-[10px] text-gray-400 text-center py-3 border-t border-gray-100">
                © 2026 LuxSocial. Tüm hakları saklıdır.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
