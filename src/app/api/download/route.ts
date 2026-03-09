import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

// Anti-Bot Header'ları
const ANTI_BOT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

// TikWM API (Birincil Motor)
async function tryTikWM(url: string) {
  try {
    console.log('🚀 TIKWM_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://www.tikwm.com/api/',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ TIKWM_API_BASARILI:', response.data)
    
    if (response.data?.code === 0 && response.data?.data) {
      const videoData = response.data.data
      return {
        success: true,
        downloadUrl: videoData.play,
        thumbnail: videoData.cover || '',
        title: videoData.title || 'TikTok Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'TikTok',
        api: 'TikWM'
      }
    } else {
      throw new Error(response.data?.msg || 'TikWM API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 TIKWM_API_HATASI:', error.message, error.response?.data || error)
    return { success: false, error: error.message }
  }
}

// Cobalt API (Yedek Motor)
async function tryCobalt(url: string) {
  try {
    console.log('🔄 COBALT_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://api.cobalt.tools/api/json',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ COBALT_API_BASARILI:', response.data)
    
    if (response.data?.status === 'ok') {
      const videoData = response.data
      return {
        success: true,
        downloadUrl: videoData.url,
        thumbnail: videoData.thumbnail || '',
        title: videoData.filename || 'TikTok Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'TikTok',
        api: 'Cobalt'
      }
    } else {
      throw new Error(response.data?.error || 'Cobalt API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 COBALT_API_HATASI:', error.message, error.response?.data || error)
    return { success: false, error: error.message }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, platform } = await request.json()

    console.log('📥 INDIRME_ISTEGI_ALINDI:', { url, platform })

    // Gerekli parametre kontrolü
    if (!url || !platform) {
      return NextResponse.json(
        { error: 'URL ve platform parametreleri gereklidir' },
        { status: 400 }
      )
    }

    // Platform regex kontrolü
    const platformRegexes = {
      TikTok: /tiktok\.com/i,
      Instagram: /instagram\.com/i,
      YouTube: /youtube\.com/i,
      Facebook: /facebook\.com/i,
      'X / Twitter': /x\.com|twitter\.com/i
    }

    const regex = platformRegexes[platform as keyof typeof platformRegexes]
    if (!regex || !regex.test(url)) {
      return NextResponse.json(
        { error: `Lütfen geçerli bir ${platform} linki giriniz` },
        { status: 400 }
      )
    }

    // Sadece TikTok için Çift Motorlu Fallback Sistemi
    if (platform === 'TikTok') {
      console.log('🎯 TIKTOK_ISLEMI_BASLATILIYOR...')
      
      // 1. Aşama: TikWM API'yi dene
      const tikwmResult = await tryTikWM(url)
      
      if (tikwmResult.success) {
        console.log('🎉 TIKWM_API_BASARIYLA_CALISTI!')
        return NextResponse.json(tikwmResult)
      }
      
      console.log('⚠️ TIKWM_API_BASARISIZ_OLDU_COBALT_DENENIYOR...')
      
      // 2. Aşama: TikWM başarısız olursa Cobalt API'yi dene
      const cobaltResult = await tryCobalt(url)
      
      if (cobaltResult.success) {
        console.log('🎉 COBALT_API_BASARIYLA_CALISTI!')
        return NextResponse.json(cobaltResult)
      }
      
      console.log('💥 IKI_API_DE_BASARISIZ_OLDU!')
      
      // İki API de başarısız olursa detaylı hata mesajı
      return NextResponse.json(
        { 
          error: 'TikTok videoyu işlenemedi. Linkin doğru olduğundan emin olun.',
          details: {
            tikwmError: tikwmResult.error,
            cobaltError: cobaltResult.error
          }
        },
        { status: 500 }
      )
    }

    // Diğer platformlar için geçici mesaj
    return NextResponse.json(
      { error: `${platform} platformu için henüz indirme desteği bulunmuyor. Sadece TikTok desteklenmektedir.` },
      { status: 501 }
    )

  } catch (error: any) {
    console.error('🚨 GENEL_API_HATASI:', error.message, error.response?.data || error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    )
  }
}
