/**
 * IndexNow submitter — pings Bing/IndexNow with this site's URLs so new and
 * updated pages get crawled within minutes instead of days.
 *
 * Runs automatically as `postbuild` on Vercel PRODUCTION builds, and can be
 * run manually:
 *   node scripts/indexnow.mjs            -> submits every URL in /sitemap.xml
 *   node scripts/indexnow.mjs <url> ...  -> submits exactly those URLs
 *
 * Never throws / always exits 0 so it can never break a deploy.
 */

const KEY = '1f937507869e28cb04d21eaffbe38b09';
const FALLBACK_HOST = 'https://freeflyevent.com';

function resolveBase() {
  const env = process.env;
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, '');
  }
  return FALLBACK_HOST;
}

async function getSitemapUrls(base) {
  try {
    const res = await fetch(`${base}/sitemap.xml`, {
      headers: { 'User-Agent': 'indexnow-submit' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    return [...new Set(urls)];
  } catch {
    return [];
  }
}

async function main() {
  // Only ping on production — skip Vercel preview/development builds.
  if (process.env.VERCEL === '1' && process.env.VERCEL_ENV !== 'production') {
    console.log('[indexnow] skipped (non-production Vercel build)');
    return;
  }

  const base = resolveBase();
  const host = new URL(base).host;

  let urlList = process.argv.slice(2).filter(Boolean);
  if (urlList.length === 0) urlList = await getSitemapUrls(base);
  if (urlList.length === 0) urlList = [`${base}/`];

  const body = { host, key: KEY, keyLocation: `${base}/${KEY}.txt`, urlList };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`[indexnow] ${res.status} — submitted ${urlList.length} URL(s) for ${host}`);
  } catch (err) {
    console.log('[indexnow] submission error (ignored):', err && err.message ? err.message : err);
  }
}

main().finally(() => process.exit(0));
