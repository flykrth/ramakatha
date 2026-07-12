'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function TransitionSplash() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('Loading...')
  const pathname = usePathname()

  useEffect(() => {
    // Automatically hide splash screen when route change completes
    setIsVisible(false)
  }, [pathname])

  useEffect(() => {
    const handleShow = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.message) {
        setMessage(customEvent.detail.message)
      }
      setIsVisible(true)
    }

    const handleHide = () => {
      setIsVisible(false)
    }

    window.addEventListener('show-splash', handleShow)
    window.addEventListener('hide-splash', handleHide)

    return () => {
      window.removeEventListener('show-splash', handleShow)
      window.removeEventListener('hide-splash', handleHide)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#fff8f6] flex flex-col items-center justify-center animate-fade-in-fast">
      <div className="flex flex-col items-center max-w-md px-6 text-center">
        {/* Pulsing logo wrapper */}
        <div className="w-24 h-24 mb-6 rounded-full bg-white flex items-center justify-center shadow-level-2 border border-outline-variant p-2 scale-up">
          <img src="/logo.png" alt="Ramakatha Logo" className="w-full h-full object-contain" />
        </div>
        
        {/* Calligraphic title */}
        <h2 className="text-4xl text-primary font-hindi tracking-wider mb-2">Ramakatha 2026</h2>
        <p className="text-body-md text-on-surface-variant mb-6 font-serif">{message}</p>
        
        {/* Golden loading bar */}
        <div className="w-48 h-1 bg-surface-container-highest rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary-container rounded-full" 
            style={{
              animation: 'progress-fill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
