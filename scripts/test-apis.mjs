import axios from 'axios'

const TEST_URLS = {
  Instagram: 'https://www.instagram.com/reel/DbB01aIS9qH/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
  YouTube: 'https://youtu.be/T4NKkKK1OJ8?si=Qy74wLI-JS1MRNNL',
  Twitter: 'https://x.com/Fenerbahce/status/2079896160072876249?s=20',
  Facebook: 'https://www.facebook.com/share/r/1JXfNhnmw8/?mibextid=wwXIfr',
}

async function testCobalt() {
  const instances = [
    'https://cobaltapi.cjs.nz',
  ]

  for (const instance of instances) {
    for (const [platform, url] of Object.entries(TEST_URLS)) {
      try {
        console.log(`\n🚀 Cobalt test: ${instance} / ${platform}`)
        const res = await axios.post(
          instance,
          { url, downloadMode: 'auto' },
          { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, timeout: 30000 }
        )
        console.log('✅', platform, '→', JSON.stringify(res.data).slice(0, 300))
      } catch (e) {
        console.error('❌', platform, '→', e.message, e.response?.data ? JSON.stringify(e.response.data).slice(0, 200) : '')
      }
    }
  }
}

async function testReelsaver() {
  try {
    console.log('\n🚀 Reelsaver Instagram test')
    const res = await axios.get('https://reelsaver.vercel.app/api/video', {
      params: { postUrl: TEST_URLS.Instagram },
      timeout: 30000
    })
    console.log('✅ Reelsaver:', JSON.stringify(res.data).slice(0, 300))
  } catch (e) {
    console.error('❌ Reelsaver:', e.message, e.response?.data ? JSON.stringify(e.response.data).slice(0, 200) : '')
  }
}

async function testTwitSave() {
  try {
    console.log('\n🚀 TwitSave Twitter test')
    const res = await axios.get(`https://twitsave.com/info?url=${encodeURIComponent(TEST_URLS.Twitter)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 30000
    })
    const html = typeof res.data === 'string' ? res.data : ''
    const mp4Re = /href=["'](https?:\/\/video\.twimg\.com[^"']*\.mp4[^"']*)["']/gi
    const urls = []
    let m
    while ((m = mp4Re.exec(html)) !== null) urls.push(m[1])
    console.log('✅ TwitSave mp4 URLs:', urls.length, urls[0]?.slice(0, 150) || 'yok')
  } catch (e) {
    console.error('❌ TwitSave:', e.message)
  }
}

async function testPiped() {
  const videoId = 'T4NKkKK1OJ8'
  const instances = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.projectsegfault.com',
    'https://pipedapi.adminforge.de',
    'https://pipedapi.moomoo.me',
  ]
  for (const instance of instances) {
    try {
      console.log(`\n🚀 Piped test: ${instance}`)
      const res = await axios.get(`${instance}/streams/${videoId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000,
      })
      const videoStream = res.data?.videoStreams?.find((s) => s.videoOnly === false && s.codec?.includes('avc'))
        || res.data?.videoStreams?.[0]
      console.log('✅ Piped video URL:', videoStream?.url?.slice(0, 200) || 'bulunamadı')
      console.log('✅ Piped title:', res.data?.title || 'yok')
    } catch (e) {
      console.error('❌ Piped:', e.message, e.response?.data ? JSON.stringify(e.response.data).slice(0, 150) : '')
    }
  }
}

async function testInvidious() {
  const videoId = 'T4NKkKK1OJ8'
  const instances = [
    'https://inv.tux.pizza',
    'https://invidious.nerdvpn.de',
    'https://invidious.privacyredirect.com',
    'https://iv.datura.network',
  ]
  for (const instance of instances) {
    try {
      console.log(`\n🚀 Invidious test: ${instance}`)
      const res = await axios.get(`${instance}/api/v1/videos/${videoId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000,
      })
      const formats = (res.data?.formatStreams || []).filter((f) => f.container === 'mp4' && f.url)
      const best = formats.sort((a, b) => parseInt(b.resolution || '0') - parseInt(a.resolution || '0'))[0]
      console.log('✅ Invidious:', best?.url?.slice(0, 200) || 'mp4 bulunamadı')
    } catch (e) {
      console.error('❌ Invidious:', e.message)
    }
  }
}

async function testGetFVid() {
  try {
    console.log('\n🚀 GetFVid Facebook test')
    const form = new URLSearchParams()
    form.append('url', TEST_URLS.Facebook)
    const res = await axios.post('https://getfvid.com/downloader', form.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://getfvid.com',
        'Referer': 'https://getfvid.com/'
      },
      timeout: 30000
    })
    const html = typeof res.data === 'string' ? res.data : ''
    const hdMatch = html.match(/href=["'](https?:\/\/[^"']*\.mp4[^"']*)["'][^>]*>[^<]*(?:HD|High)/i)
    const sdMatch = html.match(/href=["'](https?:\/\/[^"']*\.mp4[^"']*)["']/i)
    console.log('✅ GetFVid link:', (hdMatch?.[1] || sdMatch?.[1])?.slice(0, 200) || 'bulunamadı')
  } catch (e) {
    console.error('❌ GetFVid:', e.message)
  }
}

;(async () => {
  await testCobalt()
  await testReelsaver()
  await testTwitSave()
  await testPiped()
  await testInvidious()
  await testGetFVid()
})()
