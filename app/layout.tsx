import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/navbar'
import CustomCursor from '@/components/custom-cursor'
import SmoothScroll from '@/components/smooth-scroll'
import GridLines from '@/components/grid-lines'

const inter = localFont({
  src: '../public/inter-latin.woff2',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

const playfair = localFont({
  src: '../public/playfair-display-latin.woff2',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const metadata: Metadata = {
  title: 'Luxe — Timeless Luxury, Redefined',
  description: 'Discover the art of refined living. Curated collections for the discerning eye.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF9] font-sans">
        <CustomCursor />
        <Navbar />
        <GridLines />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
