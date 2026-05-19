'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

const clipFrom: Record<string, string> = {
  up: 'inset(0 0 100% 0)',
  down: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

const yFrom: Record<string, number> = {
  up: 40,
  down: -40,
  left: 0,
  right: 0,
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: clipFrom[direction],
          y: yFrom[direction],
        },
        {
          clipPath: 'inset(0% 0 0% 0)',
          y: 0,
          duration: 1.0,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [direction, delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: clipFrom[direction], transform: `translateY(${yFrom[direction]}px)` }}
    >
      {children}
    </div>
  )
}
