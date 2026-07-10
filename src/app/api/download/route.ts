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

// SaveInsta API (Instagram için)
async function trySaveInsta(url: string) {
  try {
    console.log('🚀 SAVEINSTA_API_DENEMESI_BASLADI:', url)
    const formData = new URLSearchParams()
    formData.append('url', url)
    const response = await axios.post(
      'https://v3.saveig.app/api/ajaxSearch',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Origin': 'https://saveig.app',
          'Referer': 'https://saveig.app/'
        },
        timeout: 15000
      }
    )
    console.log('✅ SAVEINSTA_RAW:', JSON.stringify(response.data).slice(0, 200))
    const data = response.data
    if (data?.status === 'ok' && data?.data) {
      // HTML parse yerine video linkini bul
      const html: string = data.data
      const videoMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/)
      const thumbMatch = html.match(/src="(https:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/)
      if (videoMatch) {
        return {
          success: true,
          downloadUrl: videoMatch[1],
          thumbnail: thumbMatch ? thumbMatch[1] : '',
          title: 'Instagram Video',
          duration: '0:00',
          size: 'Bilinmiyor',
          platform: 'Instagram',
          api: 'SaveInsta'
        }
      }
    }
    throw new Error('SaveInsta: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 SAVEINSTA_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// SnapInsta API (Instagram yedek)
async function trySnapInsta(url: string) {
  try {
    console.log('🚀 SNAPINSTA_API_DENEMESI_BASLADI:', url)
    const formData = new URLSearchParams()
    formData.append('url', url)
    formData.append('lang', 'tr')
    const response = await axios.post(
      'https://snapinsta.app/action.php',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://snapinsta.app',
          'Referer': 'https://snapinsta.app/'
        },
        timeout: 15000
      }
    )
    console.log('✅ SNAPINSTA_RAW:', JSON.stringify(response.data).slice(0, 200))
    const html: string = typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    const videoMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/)
    const thumbMatch = html.match(/src="(https:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/)
    if (videoMatch) {
      return {
        success: true,
        downloadUrl: videoMatch[1],
        thumbnail: thumbMatch ? thumbMatch[1] : '',
        title: 'Instagram Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'Instagram',
        api: 'SnapInsta'
      }
    }
    throw new Error('SnapInsta: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 SNAPINSTA_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// Facebook API (Facebook Video)
async function tryFacebook(url: string) {
  try {
    console.log('🚀 FACEBOOK_API_DENEMESI_BASLADI:', url)
    // fdown.net API
    const formData = new URLSearchParams()
    formData.append('id', url)
    const response = await axios.post(
      'https://fdown.net/download.php',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://fdown.net',
          'Referer': 'https://fdown.net/'
        },
        timeout: 15000
      }
    )
    console.log('✅ FDOWN_RAW:', JSON.stringify(response.data).slice(0, 300))
    const html: string = typeof response.data === 'string' ? response.data : ''
    // HD link dene
    const hdMatch = html.match(/a[^>]+href="(https:\/\/[^"]+)"\ [^>]*>[^<]*HD/i)
    const sdMatch = html.match(/a[^>]+href="(https:\/\/[^"]+)"\ [^>]*>[^<]*SD/i)
    const anyMatch = html.match(/href="(https:\/\/video[^"]+)"/)
    const link = hdMatch?.[1] || sdMatch?.[1] || anyMatch?.[1]
    if (link) {
      return {
        success: true,
        downloadUrl: link,
        thumbnail: '',
        title: 'Facebook Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'Facebook',
        api: 'FDown'
      }
    }
    throw new Error('FDown: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 FACEBOOK_API_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// Instagram API — çift motor: SaveInsta → SnapInsta
async function tryInstagram(url: string) {
  const r1 = await trySaveInsta(url)
  if (r1.success) return r1
  console.log('⚠️ SaveInsta başarısız, SnapInsta deneniyor...')
  return await trySnapInsta(url)
}

// YouTube API — y2api + yt1s fallback
async function tryYouTube(url: string) {
  try {
    console.log('🚀 YOUTUBE_API_DENEMESI_BASLADI:', url)
    // yt1s.com API
    const videoId = url.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/)?.[1]
    if (!videoId) throw new Error('YouTube video ID bulunamadı')
    
    // 1. Aşama: analiz isteği
    const analyzeRes = await axios.post(
      'https://yt1s.com/api/ajaxSearch/index',
      new URLSearchParams({ q: url, vt: 'home' }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://yt1s.com',
          'Referer': 'https://yt1s.com/'
        },
        timeout: 15000
      }
    )
    console.log('✅ YT1S_ANALYZE:', JSON.stringify(analyzeRes.data).slice(0, 300))
    const analyzeData = analyzeRes.data
    if (!analyzeData?.vid || !analyzeData?.kc) throw new Error('YT1S analiz başarısız')
    
    // 2. Aşama: indirme linki al (mp4 720p veya en iyi)
    const convertRes = await axios.post(
      'https://yt1s.com/api/ajaxConvert/convert',
      new URLSearchParams({ vid: analyzeData.vid, k: analyzeData.kc }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://yt1s.com',
          'Referer': 'https://yt1s.com/'
        },
        timeout: 20000
      }
    )
    console.log('✅ YT1S_CONVERT:', JSON.stringify(convertRes.data).slice(0, 300))
    const convertData = convertRes.data
    if (convertData?.status === 'ok' && convertData?.dlink) {
      return {
        success: true,
        downloadUrl: convertData.dlink,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        title: analyzeData.title || 'YouTube Video',
        duration: analyzeData.t || '0:00',
        size: 'Bilinmiyor',
        platform: 'YouTube',
        api: 'YT1S'
      }
    }
    throw new Error('YT1S: indirme linki alınamadı')
  } catch (error: any) {
    console.error('🚨 YOUTUBE_API_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// X/Twitter API — twitsave.com
async function tryXTwitter(url: string) {
  try {
    console.log('� X_TWITTER_API_DENEMESI_BASLADI:', url)
    const response = await axios.get(
      `https://twitsave.com/info?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Referer': 'https://twitsave.com/'
        },
        timeout: 15000
      }
    )
    console.log('✅ TWITSAVE_RAW:', String(response.data).slice(0, 400))
    const html: string = typeof response.data === 'string' ? response.data : ''
    // En yüksek kalite mp4 linki bul
    const videoMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/)
    const thumbMatch = html.match(/<img[^>]+src="(https:\/\/pbs\.twimg\.com[^"]+)"/)
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (videoMatch) {
      return {
        success: true,
        downloadUrl: videoMatch[1],
        thumbnail: thumbMatch ? thumbMatch[1] : '',
        title: titleMatch ? titleMatch[1].replace(' - TwitSave', '').trim() : 'Twitter Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'X / Twitter',
        api: 'TwitSave'
      }
    }
    throw new Error('TwitSave: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 X_TWITTER_API_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// TikWM yedek (TikTok fallback)
async function tryCobalt(url: string) {
  // TikTok için sadece TikWM yedek olarak kullan
  return await tryTikWM(url)
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
