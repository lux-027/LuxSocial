import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
        {/* Arka plan parlama efektleri */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Ana içerik */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          {/* Logo + İsim */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Logo kutusu */}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="68" height="68" fill="none">
                <path d="M14 52 C24 28, 44 28, 50 38 C56 48, 76 48, 86 28" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                <path d="M14 62 C24 38, 44 38, 50 48 C56 58, 76 58, 86 38" stroke="white" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.65"/>
                <path d="M14 72 C24 48, 44 48, 50 58 C56 68, 76 68, 86 48" stroke="white" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.35"/>
              </svg>
            </div>

            {/* İsim */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
                <span style={{ fontSize: '76px', fontWeight: '800', color: 'white', letterSpacing: '-3px', lineHeight: 1 }}>
                  Lux
                </span>
                <span style={{ fontSize: '76px', fontWeight: '800', color: '#0ea5e9', letterSpacing: '-3px', lineHeight: 1 }}>
                  Social
                </span>
              </div>
              <span style={{ fontSize: '22px', color: '#64748b', letterSpacing: '0px' }}>
                luxsocialtr.com
              </span>
            </div>
          </div>

          {/* Platformlar */}
          <p style={{ fontSize: '28px', color: '#94a3b8', margin: '0', textAlign: 'center', fontWeight: '400' }}>
            TikTok · Instagram · YouTube · Twitter · Facebook
          </p>

          {/* Rozet */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(14,165,233,0.12)',
              border: '1.5px solid rgba(14,165,233,0.3)',
              borderRadius: '50px',
              padding: '12px 32px',
            }}
          >
            <span style={{ fontSize: '22px', color: '#38bdf8', fontWeight: '600' }}>
              ✦ Ücretsiz &amp; Filigransız Video İndirme
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
