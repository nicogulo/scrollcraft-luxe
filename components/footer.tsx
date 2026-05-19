'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative border-t border-[#D6D3D1] bg-[#FAFAF9]">
      <div className="absolute bottom-8 left-6 pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[clamp(3rem,8vw,6rem)] tracking-[0.2em] uppercase text-[#1C1917]/[0.02] leading-none">
          Luxe
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="font-display text-xl tracking-[0.15em] uppercase text-[#1C1917]">
              Luxe
            </Link>
            <p className="mt-4 text-sm text-[#57534E] leading-relaxed max-w-xs">
              Timeless luxury, redefined. Curated collections for the discerning eye.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {['About', 'Collections', 'Story', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-[#57534E] hover:text-[#1C1917] transition-colors duration-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Pinterest', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#57534E] hover:text-[#1C1917] transition-colors duration-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 border-t border-[#D6D3D1] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#A8A29E]">
          &copy; {new Date().getFullYear()} Luxe. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-[#A8A29E] hover:text-[#57534E] transition-colors duration-400">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-[#A8A29E] hover:text-[#57534E] transition-colors duration-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
