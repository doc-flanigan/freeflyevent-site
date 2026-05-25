'use client'
import { useState, useEffect } from 'react'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('ga_consent')) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('ga_consent', 'granted')
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    window.gtag?.('event', 'page_view')
    setVisible(false)
  }
  function decline() {
    localStorage.setItem('ga_consent', 'denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0f1520]/95 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[#6b7890] flex-1">
          We use cookies to understand how visitors use this site. No personal data is sold or shared.{' '}
          <a href="https://dayonecitizen.com/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-[#ff5500] underline underline-offset-2 hover:text-[#cc4400] transition-colors">
            Cookie policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="px-4 py-2 text-sm text-[#6b7890] border border-white/20 rounded hover:border-white/40 transition-colors">
            No thanks
          </button>
          <button onClick={accept} className="px-4 py-2 text-sm font-semibold bg-[#ff5500] text-white rounded hover:bg-[#cc4400] transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
