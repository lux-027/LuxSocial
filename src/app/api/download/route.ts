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

// Instagram — embed sayfasından og:video scrape et
async function trySaveInsta(url: string) {
  try {
    // URL'yi temizle: sadece post/reel kısmını al
    const cleanUrl = url.split('?')[0].replace(/\/$/, '')
    const embedUrl = `${cleanUrl}/embed/`
    console.log('🚀 INSTAGRAM_EMBED_DENENIYOR:', embedUrl)

    const response = await axios.get(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
      maxRedirects: 5,
    })

    const html: string = typeof response.data === 'string' ? response.data : ''
    console.log('✅ EMBED_HTML slice:', html.slice(0, 600))

    // video_url veya src'yi bul
    const videoMatch =
      html.match(/"video_url":"([^"]+)"/) ||
      html.match(/property="og:video"[^>]+content="([^"]+)"/) ||
      html.match(/<video[^>]+src="([^"]+)"/)

    const thumbMatch =
      html.match(/"display_url":"([^"]+)"/) ||
      html.match(/property="og:image"[^>]+content="([^"]+)"/)

    const titleMatch = html.match(/property="og:title"[^>]+content="([^"]+)"/)

    const rawVideoUrl = videoMatch?.[1]
    if (rawVideoUrl) {
      const videoUrl = rawVideoUrl.replace(/\\u0026/g, '&').replace(/\\/g, '')
      const thumbnail = thumbMatch?.[1]?.replace(/\\u0026/g, '&').replace(/\\/g, '') || ''
      return {
        success: true,
        downloadUrl: videoUrl,
        thumbnail,
        title: titleMatch?.[1] || 'Instagram Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'Instagram',
        api: 'InstaEmbed'
      }
    }
    throw new Error('Embed: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 INSTAGRAM_EMBED_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// Instagram yedek — picnob.com scraping
async function trySnapInsta(url: string) {
  try {
    console.log('🚀 PICNOB_DENENIYOR:', url)
    const shortcode = url.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1]
    if (!shortcode) throw new Error('Instagram shortcode bulunamadı')

    const response = await axios.get(
      `https://www.picnob.com/post/${shortcode}/`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html',
          'Referer': 'https://www.picnob.com/'
        },
        timeout: 15000
      }
    )
    const html: string = typeof response.data === 'string' ? response.data : ''
    console.log('✅ PICNOB_RAW slice:', html.slice(0, 400))
    const videoMatch = html.match(/<video[^>]+src="([^"]+\.mp4[^"]*)"/) ||
      html.match(/data-src="([^"]+\.mp4[^"]*)"/)
    if (videoMatch?.[1]) {
      return {
        success: true,
        downloadUrl: videoMatch[1],
        thumbnail: '',
        title: 'Instagram Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'Instagram',
        api: 'Picnob'
      }
    }
    throw new Error('Picnob: video linki bulunamadı')
  } catch (error: any) {
    console.error('🚨 PICNOB_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// Facebook API — getfvid.com
async function tryFacebook(url: string) {
  try {
    console.log('🚀 FACEBOOK_API_DENEMESI_BASLADI:', url)
    const formData = new URLSearchParams()
    formData.append('url', url)
    const response = await axios.post(
      'https://getfvid.com/downloader',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://getfvid.com',
          'Referer': 'https://getfvid.com/'
        },
        timeout: 15000
      }
    )
    console.log('✅ GETFVID_RAW:', String(response.data).slice(0, 400))
    const html: string = typeof response.data === 'string' ? response.data : ''
    // HD veya SD mp4 linki çek
    const hdMatch = html.match(/href=["'](https?:\/\/[^"']*\.mp4[^"']*)["'][^>]*>[^<]*(?:HD|High)/i)
    const sdMatch = html.match(/href=["'](https?:\/\/[^"']*\.mp4[^"']*)["']/i)
    const link = hdMatch?.[1] || sdMatch?.[1]
    if (link) {
      return {
        success: true,
        downloadUrl: link,
        thumbnail: '',
        title: 'Facebook Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'Facebook',
        api: 'GetFVid'
      }
    }
    throw new Error('GetFVid: video linki bulunamadı')
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

// YouTube API — Invidious (açık kaynak, key yok)
const INVIDIOUS_INSTANCES = [
  'https://inv.tux.pizza',
  'https://invidious.nerdvpn.de',
  'https://invidious.privacyredirect.com',
  'https://iv.datura.network',
]

async function tryYouTube(url: string) {
  try {
    console.log('🚀 YOUTUBE_API_DENEMESI_BASLADI:', url)
    const videoId = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1]
    if (!videoId) throw new Error('YouTube video ID bulunamadı')

    for (const instance of INVIDIOUS_INSTANCES) {
      try {
        console.log('🔄 INVIDIOUS_DENENIYOR:', instance)
        const res = await axios.get(
          `${instance}/api/v1/videos/${videoId}`,
          {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000
          }
        )
        const data = res.data
        console.log('✅ INVIDIOUS_RAW title:', data?.title)

        // mp4 formatlarını al, en yüksek kaliteli olanı seç
        const formats: any[] = (data?.formatStreams || []).filter((f: any) =>
          f.container === 'mp4' && f.url
        )
        const best = formats.sort((a: any, b: any) =>
          parseInt(b.resolution || '0') - parseInt(a.resolution || '0')
        )[0]

        if (best?.url) {
          const seconds = data?.lengthSeconds || 0
          const dur = seconds > 0
            ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
            : '0:00'
          return {
            success: true,
            downloadUrl: best.url,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            title: data?.title || 'YouTube Video',
            duration: dur,
            size: best.resolution || 'Bilinmiyor',
            platform: 'YouTube',
            api: `Invidious(${instance.replace('https://', '')})`
          }
        }
      } catch (instErr: any) {
        console.warn('⚠️ INVIDIOUS_INSTANCE_HATASI:', instance, instErr.message)
      }
    }
    throw new Error('Tüm Invidious instance\'ları başarısız')
  } catch (error: any) {
    console.error('🚨 YOUTUBE_API_HATASI:', error.message)
    return { success: false, error: error.message }
  }
}

// X/Twitter API — twittervideodownloader.com
async function tryXTwitter(url: string) {
  try {
    console.log('🚀 X_TWITTER_API_DENEMESI_BASLADI:', url)
    // twitsave API
    const res1 = await axios.get(
      `https://twitsave.com/info?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Referer': 'https://twitsave.com/'
        },
        timeout: 15000
      }
    )
    const html1: string = typeof res1.data === 'string' ? res1.data : ''
    console.log('✅ TWITSAVE_RAW:', html1.slice(0, 500))
    // mp4 linklerini bul (en yüksek kalite)
    const mp4Re = /href=["'](https?:\/\/video\.twimg\.com[^"']*\.mp4[^"']*)["']/gi
    const mp4Urls: string[] = []
    let mp4Match: RegExpExecArray | null
    while ((mp4Match = mp4Re.exec(html1)) !== null) {
      mp4Urls.push(mp4Match[1])
    }
    const thumbMatch = html1.match(/property="og:image"[^>]+content=["'](https?:\/\/[^"']+)["']/i)
      || html1.match(/<img[^>]+src=["'](https?:\/\/pbs\.twimg\.com[^"']+)["']/i)
    const titleMatch = html1.match(/property="og:title"[^>]+content=["']([^"']+)["']/i)
      || html1.match(/<title>([^<]+)<\/title>/i)
    if (mp4Urls.length > 0) {
      // En yüksek çözünürlüklü olanı al (genellikle son)
      const bestUrl = mp4Urls[mp4Urls.length - 1]
      return {
        success: true,
        downloadUrl: bestUrl,
        thumbnail: thumbMatch?.[1] || '',
        title: titleMatch?.[1]?.replace(/\s*[-|]\s*TwitSave.*/i, '').trim() || 'Twitter Video',
        duration: '0:00',
        size: 'Bilinmiyor',
        platform: 'X / Twitter',
        api: 'TwitSave'
      }
    }
    throw new Error('TwitSave: mp4 linki bulunamadı')
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
