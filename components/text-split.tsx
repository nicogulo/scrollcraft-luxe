'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextSplitProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
}

export default function TextSplit({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 0.85,
}: TextSplitProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll<HTMLElement>('[data-word]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '110%', rotateX: 45 },
        {
          y: '0%',
          rotateX: 0,
          duration,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [delay, stagger, duration])

  const words = text.split(' ')

  return (
    <div ref={ref} className={className} aria-label={text} style={{ perspective: '500px' }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
        >
          <span
            data-word
            className="inline-block"
            style={{ transform: 'translateY(110%) rotateX(45deg)', transformOrigin: 'bottom' }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  )
}
