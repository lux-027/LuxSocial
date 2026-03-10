import { NextRequest, NextResponse } from 'next/server'

// 🌊 Mobil Uyumlu Proxy İndirme Route'u
export async function GET(request: NextRequest) {
  try {
    // URL parametresini al
    const { searchParams } = new URL(request.url)
    const videoUrl = searchParams.get('url')
    
    console.log('📱 MOBIL_PROXY_ISTEGI:', videoUrl)
    
    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL parametresi gereklidir' },
        { status: 400 }
      )
    }

    // Videoyu backend üzerinden çek
    console.log('🚀 VIDEO_CEKME_BASLADI:', videoUrl)
    
    const videoResponse = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      }
    })

    if (!videoResponse.ok) {
      throw new Error('Video indirilemedi')
    }

    console.log('✅ VIDEO_CEKME_BASARILI')

    // Video buffer'ını al
    const videoBuffer = await videoResponse.arrayBuffer()
    console.log('📦 BUFFER_OLUSTURULDU:', videoBuffer.byteLength, 'bytes')

    // Mobil uyumlu header'lar ile gönder
    const response = new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="luxsocial-video.mp4"',
        'Content-Length': videoBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })

    console.log('🎉 MOBIL_INDIRME_BASARILI!')
    return response

  } catch (error: any) {
    console.error('🚨 MOBIL_PROXY_HATASI:', error.message)
    return NextResponse.json(
      { error: 'Video indirilemedi. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
