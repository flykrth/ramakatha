'use client'

import { useState, useEffect, useRef } from 'react'

const POSTERS = [
  '/posters/1.jpeg',
  '/posters/2.jpeg',
  '/posters/3.jpeg',
  '/posters/4.jpeg',
  '/posters/5.jpeg',
  '/posters/6.jpeg',
  '/posters/7.jpeg',
  '/posters/8.jpeg',
  '/posters/9.jpeg',
  '/posters/10.jpeg',
]

export default function PostersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % POSTERS.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + POSTERS.length) % POSTERS.length)
  }

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 4000)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isPlaying, currentIndex])

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'Escape') {
        setLightboxImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="relative px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto pb-xl md:pb-[100px] z-10 select-none">
      <div className="text-center mb-10">
        <h2 className="text-headline-md font-headline-md text-primary font-serif font-bold mb-4">
          Event gallery & updates
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Browse through the official posters of different events and competition categories. Click any active poster to view it in full screen.
        </p>
      </div>

      {/* Main Carousel Stage */}
      <div className="relative h-[480px] md:h-[580px] flex items-center justify-center overflow-hidden w-full">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {POSTERS.map((poster, idx) => {
            const total = POSTERS.length
            // Calculate relative offset of slides
            let offset = idx - currentIndex
            if (offset < -total / 2) offset += total
            if (offset > total / 2) offset -= total

            const isActive = offset === 0
            const isLeft = offset === -1
            const isRight = offset === 1
            const isVisible = Math.abs(offset) <= 1

            // Dynamic styles using standard CSS transforms for hardware acceleration
            let transformClass = 'scale-50 opacity-0 pointer-events-none translate-x-0 z-0'
            if (isActive) {
              transformClass = 'scale-100 opacity-100 z-30 translate-x-0 cursor-zoom-in shadow-level-3'
            } else if (isLeft) {
              transformClass = 'scale-85 opacity-50 z-20 -translate-x-[25%] md:-translate-x-[40%] cursor-pointer shadow-level-1'
            } else if (isRight) {
              transformClass = 'scale-85 opacity-50 z-20 translate-x-[25%] md:translate-x-[40%] cursor-pointer shadow-level-1'
            }

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isActive) setLightboxImage(poster)
                  else setCurrentIndex(idx)
                }}
                className={`absolute w-[240px] sm:w-[320px] md:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-outline-variant/60 bg-surface transition-all duration-500 ease-out ${transformClass}`}
              >
                <img
                  src={poster}
                  alt={`Ramakatha Event Poster ${idx + 1}`}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-3xl drop-shadow-md transition-opacity">
                      zoom_in
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 z-40 bg-surface/90 hover:bg-primary hover:text-white border border-outline-variant text-on-surface w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-level-1 hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 z-40 bg-surface/90 hover:bg-primary hover:text-white border border-outline-variant text-on-surface w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-level-1 hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Controls & Indicators */}
      <div className="flex flex-col items-center gap-6 mt-4">
        {/* Progress indicators (Dots) */}
        <div className="flex gap-2">
          {POSTERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-outline hover:bg-on-surface-variant/40'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause controls */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 border border-outline text-on-surface px-4 py-2 rounded-xl text-body-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
          {isPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
        </button>
      </div>

      {/* Full screen Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          
          <div 
            className="relative max-w-full max-h-[85vh] aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-zoom-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image card itself
          >
            <img
              src={lightboxImage}
              alt="Full Screen Poster"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
