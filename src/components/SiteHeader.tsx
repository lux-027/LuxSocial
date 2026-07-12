'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Share2, Shield, FileText, Info, Mail, HelpCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import ShareModal from '@/components/ShareModal'

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
      className={`px-2 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
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
          <div className="hidden md:flex items-center justify-between py-3 lg:py-6 gap-2">
            <Link href="/" className="flex items-center space-x-2 lg:space-x-3 shrink-0">
              <Logo className="w-8 h-8 lg:w-12 lg:h-12" />
              <span className="text-2xl lg:text-4xl font-black tracking-tight">
                <span className="text-sky-600">Lux</span>
                <span className="text-gray-900">Social</span>
              </span>
            </Link>
            <div className="flex items-center gap-0.5 lg:gap-1 flex-wrap justify-end">
              {navLink('/', 'Ana Sayfa')}
              {navLink('/tiktok', 'TikTok')}
              {navLink('/instagram', 'Instagram')}
              {navLink('/youtube', 'YouTube')}
              {navLink('/twitter', 'Twitter / X')}
              {navLink('/facebook', 'Facebook')}
              {navLink('/sss', 'SSS')}
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-1.5 lg:p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors ml-0.5 shrink-0"
                aria-label="Paylaş"
              >
                <Share2 className="w-4 h-4 lg:w-5 lg:h-5" />
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
                  className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label="Paylaş"
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  aria-label={isDrawerOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                >
                  {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Paylaşım Modal */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

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
