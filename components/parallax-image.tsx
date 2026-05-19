'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  priority?: boolean
}

export default function ParallaxImage({ src, alt, speed = -50, className = '', priority = false }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const ctx = gsap.context(() => {
      gsap.fromTo(image,
        { y: speed },
        {
          y: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <div ref={imageRef} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    </div>
  )
}
