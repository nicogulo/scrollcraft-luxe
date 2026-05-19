'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(track, {
        x: -(scrollWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth - viewportWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <div className={`grid grid-cols-2 gap-4 px-6 ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={className}>
      <div ref={trackRef} className="flex gap-8 pl-[max(2rem,calc((100vw-80rem)/2+1.5rem))]">
        {children}
      </div>
    </div>
  )
}
