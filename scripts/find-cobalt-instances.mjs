import axios from 'axios'

async function findCobaltInstances() {
  try {
    console.log('🚀 Cobalt directory API aranıyor...')
    const res = await axios.get('https://cobalt.directory/api/working?type=api', { timeout: 15000 })
    console.log('✅ Çalışan API sayısı:', res.data?.data?.length || 0)
    const apis = res.data?.data || []
    for (const api of apis.slice(0, 10)) {
      console.log(api)
    }
  } catch (e) {
    console.error('❌', e.message)
  }
}

findCobaltInstances()
