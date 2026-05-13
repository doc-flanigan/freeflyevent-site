// Submit all site URLs to Bing via IndexNow
// Usage: node scripts/indexnow.mjs

const KEY = '856b89a45bbf6cef50a573ea8fddb98a'
const HOST = 'freeflyevent.com'

const urls = [
  `https://${HOST}/`,
  `https://${HOST}/event-guide`,
  `https://${HOST}/event-history`,
]

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
})

if (res.ok) {
  console.log(`✅ IndexNow: submitted ${urls.length} URLs (HTTP ${res.status})`)
} else {
  const body = await res.text()
  console.error(`❌ IndexNow failed: HTTP ${res.status} — ${body}`)
  process.exit(1)
}
