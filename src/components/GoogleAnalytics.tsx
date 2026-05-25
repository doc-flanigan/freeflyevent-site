'use client'
import Script from 'next/script'
import { useEffect } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  useEffect(() => {
    const consent = localStorage.getItem('ga_consent')
    if (consent === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
      window.gtag?.('event', 'page_view')
    }
  }, [])

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          wait_for_update: 500
        });
        gtag('config', '${GA_ID}', { send_page_view: false });
      `}</Script>
    </>
  )
}
