import { useId } from 'react'

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const uid = useId()
  const id = `logo${uid.replace(/:/g, '-')}`
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* Arka plan */}
        <rect x="0" y="0" width="100" height="100" rx="24" fill={`url(#${id}-bg)`} />

        {/* Üst dalga */}
        <path
          d="M14 52 C24 28, 44 28, 50 38 C56 48, 76 48, 86 28"
          stroke="white"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />

        {/* Orta dalga */}
        <path
          d="M14 62 C24 38, 44 38, 50 48 C56 58, 76 58, 86 38"
          stroke="white"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* Alt dalga */}
        <path
          d="M14 72 C24 48, 44 48, 50 58 C56 68, 76 68, 86 48"
          stroke="white"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />

      </svg>
    </div>
  )
}
