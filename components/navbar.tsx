'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import MagneticButton from './magnetic-button'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[51] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(to right, #D4A574, #B8956A)',
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-[#D6D3D1]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
          <Link href="/" className="font-display text-2xl tracking-[0.15em] uppercase text-[#1C1917]">
            Luxe
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#57534E] transition-colors duration-400 hover:text-[#1C1917]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="#contact" className="text-sm px-5 py-2.5">
              Enquire
            </MagneticButton>
          </div>

          <button
            className="md:hidden relative w-11 h-11 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                className="block w-6 h-px bg-[#1C1917] origin-center"
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-[#1C1917] origin-center"
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#FAFAF9] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-4xl text-[#1C1917] hover:text-[#D4A574] transition-colors duration-400 py-2 px-4 inline-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
