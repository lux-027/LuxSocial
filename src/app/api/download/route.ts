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

// Facebook API (Facebook Video)
async function tryFacebook(url: string) {
  try {
    console.log('🚀 FACEBOOK_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://api.cobalt.tools/api/json',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ FACEBOOK_API_BASARILI:', response.data)
    
    if (response.data?.status === 'ok') {
      const videoData = response.data
      return {
        success: true,
        downloadUrl: videoData.url,
        thumbnail: videoData.thumbnail || '',
        title: videoData.filename || 'Facebook Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'Facebook',
        api: 'Cobalt'
      }
    } else {
      throw new Error(response.data?.error || 'Facebook API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 FACEBOOK_API_HATASI:', error.message, error.response?.data || error)
    return { success: false, error: error.message }
  }
}

// Instagram API (Instagram Video/Reels)
async function tryInstagram(url: string) {
  try {
    console.log('🚀 INSTAGRAM_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://api.cobalt.tools/api/json',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ INSTAGRAM_API_BASARILI:', response.data)
    
    if (response.data?.status === 'ok') {
      const videoData = response.data
      return {
        success: true,
        downloadUrl: videoData.url,
        thumbnail: videoData.thumbnail || '',
        title: videoData.filename || 'Instagram Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'Instagram',
        api: 'Cobalt'
      }
    } else {
      throw new Error(response.data?.error || 'Instagram API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 INSTAGRAM_API_HATASI:', error.message, error.response?.data || error)
    return { success: false, error: error.message }
  }
}

// YouTube API (YouTube Shorts/Video)
async function tryYouTube(url: string) {
  try {
    console.log('🚀 YOUTUBE_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://api.cobalt.tools/api/json',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ YOUTUBE_API_BASARILI:', response.data)
    
    if (response.data?.status === 'ok') {
      const videoData = response.data
      return {
        success: true,
        downloadUrl: videoData.url,
        thumbnail: videoData.thumbnail || '',
        title: videoData.filename || 'YouTube Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'YouTube',
        api: 'Cobalt'
      }
    } else {
      throw new Error(response.data?.error || 'YouTube API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 YOUTUBE_API_HATASI:', error.message, error.response?.data || error)
    return { success: false, error: error.message }
  }
}

// X/Twitter API
async function tryXTwitter(url: string) {
  try {
    console.log('🚀 X_TWITTER_API_DENEMESI_BASLADI:', url)
    
    const response = await axios.post(
      'https://api.cobalt.tools/api/json',
      { url: url },
      {
        headers: ANTI_BOT_HEADERS,
        timeout: 15000
      }
    )

    console.log('✅ X_TWITTER_API_BASARILI:', response.data)
    
    if (response.data?.status === 'ok') {
      const videoData = response.data
      return {
        success: true,
        downloadUrl: videoData.url,
        thumbnail: videoData.thumbnail || '',
        title: videoData.filename || 'X/Twitter Video',
        duration: videoData.duration || '0:00',
        size: videoData.size ? `${(videoData.size / 1024 / 1024).toFixed(1)} MB` : 'Bilinmiyor',
        platform: 'X / Twitter',
        api: 'Cobalt'
      }
    } else {
      throw new Error(response.data?.error || 'X/Twitter API geçersiz yanıt döndürdü')
    }
  } catch (error: any) {
    console.error('🚨 X_TWITTER_API_HATASI:', error.message, error.response?.data || error)
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

    console.log('📥 BACKEND_ISTEGI_ALINDI:', { url, platform })

    // Gerekli parametre kontrolü
    if (!url || !platform) {
      console.error('🚨 BACKEND_PARAMETRE_HATASI: Eksik parametre', { url, platform })
      return NextResponse.json(
        { error: 'URL ve platform parametreleri gereklidir' },
        { status: 400 }
      )
    }

    // URL'i decode et (frontend'den encode gelmiş olabilir)
    let decodedUrl
    try {
      decodedUrl = decodeURIComponent(url)
      console.log('🔓 URL_DECODE_EDILDI:', { original: url, decoded: decodedUrl })
    } catch (decodeError) {
      console.error('🚨 URL_DECODE_HATASI:', decodeError)
      decodedUrl = url // Decode başarısızsa orijinal URL kullan
    }

    // Platform regex kontrolü
    const platformRegexes = {
      TikTok: /tiktok\.com/i,
      Instagram: /instagram\.com\/reel|instagram\.com\/p|instagram\.com/i,
      YouTube: /youtube\.com\/shorts|youtube\.com\/watch|youtu\.be|youtube\.com/i,
      Facebook: /facebook\.com\/watch|facebook\.com\/videos|facebook\.com/i,
      'X / Twitter': /x\.com|twitter\.com/i,
      Pinterest: /pinterest\.com/i
    }

    const regex = platformRegexes[platform as keyof typeof platformRegexes]
    if (!regex || !regex.test(decodedUrl)) {
      console.error('🚨 BACKEND_REGEX_HATASI: Geçersiz URL formatı', { platform, url: decodedUrl, regex })
      return NextResponse.json(
        { error: `Lütfen geçerli bir ${platform} linki giriniz` },
        { status: 400 }
      )
    }
    
    console.log('✅ BACKEND_REGEX_KONTROLU_GECERLI:', { platform, url: decodedUrl })

    // Çok Motorlu Platform İşlem Sistemi
    console.log(`🎯 ${platform}_ISLEMI_BASLATILIYOR...`)
    
    let result: any = { success: false, error: 'Platform işlenemedi' }
    
    // Platform'a göre uygun API'yi çağır
    switch (platform) {
      case 'TikTok':
        // TikTok için çift motorlu sistem
        console.log('🚀 TIKTOK_CIFT_MOTOR_BASLATILIYOR...')
        
        // 1. Aşama: TikWM API'yi dene
        const tikwmResult = await tryTikWM(decodedUrl)
        
        if (tikwmResult.success) {
          console.log('🎉 TIKWM_API_BASARIYLA_CALISTI!')
          result = tikwmResult
        } else {
          console.log('⚠️ TIKWM_API_BASARISIZ_OLDU_COBALT_DENENIYOR...')
          
          // 2. Aşama: TikWM başarısız olursa Cobalt API'yi dene
          const cobaltResult = await tryCobalt(decodedUrl)
          
          if (cobaltResult.success) {
            console.log('🎉 COBALT_API_BASARIYLA_CALISTI!')
            result = cobaltResult
          } else {
            console.log('💥 TIKTOK_ICIN_IKI_API_DE_BASARISIZ_OLDU!')
            result = {
              success: false,
              error: 'TikTok videoyu işlenemedi. Linkin doğru olduğundan emin olun.',
              details: {
                tikwmError: tikwmResult.error,
                cobaltError: cobaltResult.error
              }
            }
          }
        }
        break
        
      case 'Instagram':
        console.log('🚀 INSTAGRAM_MOTOR_BASLATILIYOR...')
        result = await tryInstagram(decodedUrl)
        break
        
      case 'YouTube':
        console.log('🚀 YOUTUBE_MOTOR_BASLATILIYOR...')
        result = await tryYouTube(decodedUrl)
        break
        
      case 'X / Twitter':
        console.log('🚀 X_TWITTER_MOTOR_BASLATILIYOR...')
        result = await tryXTwitter(decodedUrl)
        break
        
      case 'Facebook':
        console.log('🚀 FACEBOOK_MOTOR_BASLATILIYOR...')
        result = await tryFacebook(decodedUrl)
        break
        
      default:
        console.log('⚠️ BILINMEYEN_PLATFORM:', platform)
        return NextResponse.json(
          { error: `${platform} platformu için henüz indirme desteği bulunmuyor.` },
          { status: 501 }
        )
    }
    
    // Sonucu kontrol et ve yanıt döndür
    if (result.success) {
      console.log(`🎉 ${platform}_BASARIYLA_ISLENDI!`)
      return NextResponse.json(result)
    } else {
      console.log(`💥 ${platform}_ISLENIRKEN_HATA_OLUSTU:`, result.error)
      return NextResponse.json(
        result.details ? result : { error: result.error },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('🚨 GENEL_API_HATASI:', error.message, error.response?.data || error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    )
  }
}
