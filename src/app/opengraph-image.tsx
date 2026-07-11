import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LuxSocial - Ücretsiz Filigransız Video İndirme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// Bu dosya Next.js tarafından /opengraph-image adresinde otomatik servis edilir.

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Arka plan dekoratif daireler */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Ana içerik */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Logo + İsim satırı */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {/* Logo SVG */}
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(14,165,233,0.4)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="70"
                height="70"
                fill="none"
              >
                <path
                  d="M14 52 C24 28, 44 28, 50 38 C56 48, 76 48, 86 28"
                  stroke="white"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 62 C24 38, 44 38, 50 48 C56 58, 76 58, 86 38"
                  stroke="white"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                  strokeOpacity="0.65"
                />
                <path
                  d="M14 72 C24 48, 44 48, 50 58 C56 68, 76 68, 86 48"
                  stroke="white"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                  strokeOpacity="0.35"
                />
              </svg>
            </div>

            {/* Site adı */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '72px',
                  fontWeight: '800',
                  color: 'white',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                Lux
                <span
                  style={{
                    background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Social
                </span>
              </span>
              <span
                style={{
                  fontSize: '22px',
                  color: '#94a3b8',
                  letterSpacing: '0px',
                  fontWeight: '400',
                }}
              >
                luxsocialtr.com
              </span>
            </div>
          </div>

          {/* Açıklama */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <p
              style={{
                fontSize: '30px',
                color: '#cbd5e1',
                margin: '0',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              TikTok · Instagram · YouTube · Twitter · Facebook
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(14,165,233,0.15)',
                border: '1px solid rgba(14,165,233,0.3)',
                borderRadius: '50px',
                padding: '10px 28px',
              }}
            >
              <span style={{ fontSize: '22px', color: '#0ea5e9', fontWeight: '600' }}>
                ✦ Ücretsiz &amp; Filigransız Video İndirme
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
