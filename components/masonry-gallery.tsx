'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  src: string
  alt: string
  aspect?: 'portrait' | 'landscape' | 'square'
}

interface MasonryGalleryProps {
  images: GalleryImage[]
}

const aspectMap = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.gallery-item', {
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.08 }
          )
        },
        start: 'top 85%',
        once: true,
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6">
      {images.map((img, i) => (
        <div
          key={i}
          className="gallery-item break-inside-avoid mb-4 lg:mb-6 opacity-0"
          data-cursor="View"
          style={{ opacity: 0 }}
        >
          <div className={`relative overflow-hidden ${aspectMap[img.aspect || 'portrait']}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
