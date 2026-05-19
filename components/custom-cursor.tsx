'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const dotX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.5 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.5 })

  const ringX = useSpring(rawX, { stiffness: 150, damping: 25, mass: 0.8 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 25, mass: 0.8 })

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element
      const interactive = target.closest('a, button, [data-cursor]')
      if (interactive) {
        setHovered(true)
        const label = interactive.getAttribute('data-cursor') || ''
        setCursorLabel(label)
      }
    }

    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [data-cursor]')) {
        setHovered(false)
        setCursorLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [rawX, rawY, visible])

  if (!visible) return null

  const dotSize = hovered ? 6 : 10
  const ringSize = hovered ? 60 : 32

  return (
    <>
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          backgroundColor: '#1C1917',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderWidth: hovered ? 1.5 : 1,
          borderColor: hovered ? 'rgba(212,165,116,0.8)' : 'rgba(28,25,23,0.15)',
          backgroundColor: hovered ? 'rgba(212,165,116,0.08)' : 'rgba(28,25,23,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-medium text-[#1C1917] uppercase tracking-wider pointer-events-none select-none"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
