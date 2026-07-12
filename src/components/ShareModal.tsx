'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Link as LinkIcon, Copy, X } from 'lucide-react'
import Logo from '@/components/Logo'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const shareOptions = [
    {
      name: 'WhatsApp',
      color: 'bg-green-500',
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.522 5.849L.057 23.617a.75.75 0 0 0 .921.921l5.768-1.465A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.386l-.372-.214-3.862.981.999-3.763-.234-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      ),
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent('LuxSocial - ' + url)}`, '_blank')
        onClose()
      },
    },
    {
      name: 'Telegram',
      color: 'bg-sky-500',
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.02 9.52c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.92 14.367l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.838.218z"/>
        </svg>
      ),
      onClick: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank')
        onClose()
      },
    },
    {
      name: 'X',
      color: 'bg-black',
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=LuxSocial`, '_blank')
        onClose()
      },
    },
    {
      name: 'Diğer',
      color: 'bg-gray-700',
      icon: <Share2 className="w-5 h-5 text-white" />,
      onClick: () => {
        if (navigator.share) navigator.share({ title: 'LuxSocial', url })
        onClose()
      },
    },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            {/* Üst başlık - logo + isim */}
            <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Logo className="w-11 h-11" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-black text-xl tracking-tight">LuxSocial</p>
                  <p className="text-sky-100 text-sm mt-0.5">Ücretsiz Video İndirme</p>
                  <p className="text-sky-200/80 text-xs mt-1 truncate max-w-[220px]">{url}</p>
                </div>
              </div>
            </div>

            {/* Paylaşma seçenekleri */}
            <div className="p-5">
              <p className="text-xs text-gray-400 font-semibold mb-4 uppercase tracking-wider text-center">
                Paylaş
              </p>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.onClick}
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                    >
                      {option.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{option.name}</span>
                  </button>
                ))}
              </div>

              {/* Link kopyalama alanı */}
              <button
                onClick={copyLink}
                className="w-full flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5 transition-colors group"
              >
                <LinkIcon className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-sm text-gray-600 truncate flex-1 text-left">{url}</span>
                <Copy className="w-4 h-4 text-sky-500 shrink-0 group-hover:text-sky-600" />
              </button>
            </div>

            {/* Kapat butonu */}
            <div className="px-5 pb-5">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
