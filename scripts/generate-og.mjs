import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '../public/og-image.png')

// 1200x630 SVG template
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="logoGrad" x1="0" y1="0" x2="130" y2="130" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="socialGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="glow1" cx="960" cy="100" r="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="240" cy="530" r="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#0ea5e9" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Arka plan -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Dekoratif grid çizgileri -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>

  <!-- Logo kutusu - merkez -->
  <rect x="385" y="145" width="130" height="130" rx="30" fill="url(#logoGrad)" filter="url(#shadow)"/>

  <!-- Dalga 1 (en parlak) -->
  <path d="M400 198 C416 172, 436 172, 450 184 C464 196, 484 196, 500 172"
        stroke="white" stroke-width="9.5" stroke-linecap="round" fill="none" opacity="1"/>
  <!-- Dalga 2 -->
  <path d="M400 216 C416 190, 436 190, 450 202 C464 214, 484 214, 500 190"
        stroke="white" stroke-width="9.5" stroke-linecap="round" fill="none" opacity="0.6"/>
  <!-- Dalga 3 -->
  <path d="M400 234 C416 208, 436 208, 450 220 C464 232, 484 232, 500 208"
        stroke="white" stroke-width="9.5" stroke-linecap="round" fill="none" opacity="0.28"/>

  <!-- "Lux" - beyaz -->
  <text x="538" y="228"
        font-family="Arial Black, Arial, sans-serif"
        font-size="84" font-weight="900"
        fill="white" letter-spacing="-3">Lux</text>

  <!-- "Social" - mavi -->
  <text x="670" y="228"
        font-family="Arial Black, Arial, sans-serif"
        font-size="84" font-weight="900"
        fill="url(#socialGrad)" letter-spacing="-3">Social</text>

  <!-- URL altında -->
  <text x="600" y="275"
        font-family="Arial, sans-serif" font-size="23"
        fill="#475569" text-anchor="middle">luxsocialtr.com</text>

  <!-- İnce yatay çizgi -->
  <rect x="440" y="308" width="320" height="1.5" rx="1" fill="#334155"/>

  <!-- Platform listesi -->
  <text x="600" y="365"
        font-family="Arial, sans-serif" font-size="26"
        fill="#64748b" text-anchor="middle">
    TikTok · Instagram · YouTube · Twitter · Facebook
  </text>

  <!-- Rozet arka planı -->
  <rect x="330" y="400" width="540" height="56" rx="28"
        fill="#0ea5e9" fill-opacity="0.1"
        stroke="#0ea5e9" stroke-opacity="0.4" stroke-width="1.5"/>

  <!-- Rozet metni -->
  <text x="600" y="436"
        font-family="Arial, sans-serif" font-size="21" font-weight="600"
        fill="#38bdf8" text-anchor="middle">✦  Ücretsiz &amp; Filigransız Video İndirme</text>
</svg>`

const buf = Buffer.from(svg)

sharp(buf)
  .png({ quality: 95 })
  .toFile(outPath)
  .then(() => console.log('✅ og-image.png oluşturuldu:', outPath))
  .catch(e => { console.error('❌ Hata:', e.message); process.exit(1) })
