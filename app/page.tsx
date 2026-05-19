'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSplit from '@/components/text-split'
import ScrollReveal from '@/components/scroll-reveal'
import MagneticButton from '@/components/magnetic-button'
import ParallaxImage from '@/components/parallax-image'
import HorizontalScroll from '@/components/horizontal-scroll'
import MasonryGallery from '@/components/masonry-gallery'
import Footer from '@/components/footer'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'The Heritage Collection', price: '$2,400', image: '/images/product-1.jpg' },
  { name: 'Midnight Noir', price: '$1,800', image: '/images/product-2.jpg' },
  { name: 'Atelier Rouge', price: '$3,200', image: '/images/product-3.jpg' },
  { name: 'Riviera Gold', price: '$2,100', image: '/images/product-4.jpg' },
  { name: 'Maison Blanche', price: '$2,800', image: '/images/product-5.jpg' },
]

const storyImages = [
  { src: '/images/story-1.jpg', alt: 'Craftsmanship', caption: 'Every piece begins with intention — hand-selected materials meet centuries of technique.' },
  { src: '/images/story-2.jpg', alt: 'Materials', caption: 'Sourced from the finest ateliers across Europe, each material tells its own story.' },
  { src: '/images/story-3.jpg', alt: 'Heritage', caption: 'A legacy spanning generations, carried forward with unwavering devotion to craft.' },
]

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Detail shot', aspect: 'portrait' as const },
  { src: '/images/gallery-2.jpg', alt: 'Lifestyle', aspect: 'landscape' as const },
  { src: '/images/gallery-3.jpg', alt: 'Product close-up', aspect: 'portrait' as const },
  { src: '/images/gallery-4.jpg', alt: 'Editorial', aspect: 'landscape' as const },
  { src: '/images/gallery-5.jpg', alt: 'Texture', aspect: 'square' as const },
  { src: '/images/gallery-6.jpg', alt: 'Craftsmanship', aspect: 'portrait' as const },
  { src: '/images/gallery-7.jpg', alt: 'Atmosphere', aspect: 'landscape' as const },
  { src: '/images/gallery-8.jpg', alt: 'Collection', aspect: 'portrait' as const },
]

export default function Home() {
  const heroLineRef = useRef<HTMLDivElement>(null)
  const statsDividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroLineRef.current) {
        gsap.fromTo(heroLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, delay: 0.8, ease: 'power3.inOut' }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* ===== SECTION 1: HERO — Split Layout ===== */}
      <section className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-32 lg:py-0 order-2 lg:order-1">
          <div className="max-w-lg">
            <TextSplit
              text="Timeless"
              className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[#1C1917]"
              stagger={0.10}
              duration={1.2}
            />
            <TextSplit
              text="Elegance"
              className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[#1C1917] mt-1"
              delay={0.15}
              stagger={0.10}
              duration={1.2}
            />

            <div
              ref={heroLineRef}
              className="w-16 h-px bg-[#D4A574] mt-8 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />

            <p className="mt-6 text-lg text-[#57534E] leading-relaxed">
              Discover the art of refined living. Curated collections for those who appreciate the extraordinary.
            </p>

            <div className="mt-10">
              <MagneticButton href="#collections">
                Discover
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full order-1 lg:order-2">
          <Image
            src="/images/hero.jpg"
            alt="Luxury collection hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ===== SECTION 2: ABOUT — Image + Text Split ===== */}
      <section id="about" className="py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="left">
              <ParallaxImage
                src="/images/about.jpg"
                alt="Our atelier"
                speed={-40}
                className="aspect-[3/4] w-full"
              />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <span className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium">
                Our Story
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#1C1917] mt-4 leading-[1.0]">
                A Legacy of<br />Refined Craft
              </h2>
              <div className="w-12 h-px bg-[#D4A574] mt-6" />
              <p className="text-[#57534E] leading-relaxed mt-6">
                For over three decades, we have dedicated ourselves to the pursuit of perfection. Each creation is an homage to timeless artistry — where tradition meets contemporary vision.
              </p>
              <p className="text-[#57534E] leading-relaxed mt-4">
                Our atelier brings together master craftspeople whose expertise spans generations, creating pieces that transcend the ordinary and become cherished heirlooms.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: COLLECTIONS — Horizontal Scroll ===== */}
      <section id="collections" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 mb-16">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium">
                Collections
              </span>
              <h2 className="font-display text-5xl lg:text-6xl text-[#1C1917] mt-4 leading-[1.0]">
                Curated Pieces
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <HorizontalScroll>
          {products.map((product) => (
            <div
              key={product.name}
              className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[28vw]"
              data-cursor="View"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 28vw"
                />
              </div>
              <h3 className="font-display text-xl text-[#1C1917] mt-4">
                {product.name}
              </h3>
              <p className="text-sm text-[#78716C] mt-1">
                {product.price}
              </p>
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* ===== SECTION 4: STORY — Sticky Text + Scrolling Images ===== */}
      <section id="story" className="py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="lg:sticky lg:top-[30vh] lg:self-start">
              <ScrollReveal>
                <span className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium">
                  The Story
                </span>
                <h2 className="font-display text-4xl lg:text-5xl text-[#1C1917] mt-4 leading-[1.0]">
                  Where Heritage<br />Meets Vision
                </h2>
                <p className="text-[#57534E] leading-relaxed mt-6">
                  Behind every collection lies a narrative — of discovery, of meticulous attention, of the relentless pursuit of beauty in its purest form.
                </p>
                <blockquote className="font-display italic text-2xl text-[#1C1917] border-l-2 border-[#D4A574] pl-6 mt-8 leading-snug">
                  &ldquo;True luxury is not about possession, but about the experience of beauty.&rdquo;
                </blockquote>
              </ScrollReveal>
            </div>

            <div className="space-y-12">
              {storyImages.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <ParallaxImage
                    src={img.src}
                    alt={img.alt}
                    speed={-30}
                    className="aspect-[4/3] w-full"
                  />
                  <p className="text-sm text-[#78716C] mt-3 italic">
                    {img.caption}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: GALLERY — Masonry Grid ===== */}
      <section id="gallery" className="py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <span className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium">
              Gallery
            </span>
            <h2 className="font-display text-5xl lg:text-6xl text-[#1C1917] mt-4 leading-[1.0]">
              Visual Journal
            </h2>
          </ScrollReveal>

          <MasonryGallery images={galleryImages} />
        </div>
      </section>

      {/* ===== SECTION 6: CONTACT — Elegant Form ===== */}
      <section id="contact" className="py-32 lg:py-40 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ScrollReveal>
              <span className="text-xs uppercase tracking-[0.2em] text-[#78716C] font-medium">
                Get in Touch
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#1C1917] mt-4 leading-[1.0]">
                Let&apos;s Connect
              </h2>

              <form className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-[#78716C] font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    className="w-full border-0 border-b border-[#D6D3D1] bg-transparent py-3 text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#D4A574] focus:ring-0 focus:outline-none transition-colors duration-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-[#78716C] font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full border-0 border-b border-[#D6D3D1] bg-transparent py-3 text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#D4A574] focus:ring-0 focus:outline-none transition-colors duration-400"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-[0.15em] text-[#78716C] font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help?"
                    className="w-full border-0 border-b border-[#D6D3D1] bg-transparent py-3 text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#D4A574] focus:ring-0 focus:outline-none transition-colors duration-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-[#78716C] font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your vision..."
                    className="w-full border-0 border-b border-[#D6D3D1] bg-transparent py-3 text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#D4A574] focus:ring-0 focus:outline-none transition-colors duration-400 resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="!bg-[#D4A574] !text-white hover:!bg-[#B8956A]"
                >
                  Send Message
                </MagneticButton>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-10 lg:pt-16">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                    Visit Us
                  </h3>
                  <p className="text-[#57534E] mt-2 leading-relaxed">
                    123 Rue de Rivoli<br />
                    Paris, France 75001
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                    Write to Us
                  </h3>
                  <a
                    href="mailto:hello@luxe.com"
                    className="text-[#1C1917] underline underline-offset-4 decoration-[#D6D3D1] hover:decoration-[#D4A574] transition-colors duration-400 mt-2 inline-block"
                  >
                    hello@luxe.com
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                    Call Us
                  </h3>
                  <p className="text-[#57534E] mt-2">
                    +33 1 23 45 67 89
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                    Hours
                  </h3>
                  <p className="text-[#57534E] mt-2 leading-relaxed">
                    Mon — Fri: 10:00 — 19:00<br />
                    Sat: 11:00 — 18:00<br />
                    Sun: By appointment
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FOOTER ===== */}
      <Footer />
    </main>
  )
}
