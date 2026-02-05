'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    name: 'JACKES SMITH',
    role: 'Market Manager',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1',
    text:
      'Website development begins with the fact that a specialist professionally studies your market, target audience and competitors.',
  },
  {
    name: 'ANGILINA MARKER',
    role: 'Business CEO',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    text:
      'Website development begins with the fact that a specialist professionally studies your market, target audience and competitors.',
  },
  {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },

   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },


   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },


   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },


   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },


   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },


   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },

   {
    name: 'DAVID WARNER',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text:
      'For each customer, we draw up detailed instructions and build scalable digital solutions.',
  },
]

export default function TestimonialsSection() {
  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)

  const slideTo = (i) => {
    const width = 560
    gsap.to(containerRef.current, {
      x: -width * i,
      duration: 0.8,
      ease: 'power3.out',
    })
    setIndex(i)
  }

  const next = () => slideTo((index + 1) % testimonials.length)
  const prev = () => slideTo((index - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold">
          What Says Our <br />
          <span className="text-[#19b9f1]">Student </span> Response
        </h2>
      </div>

      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2">
        ‹
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2">
        ›
      </button>

      <div className="overflow-hidden px-24">
        <div ref={containerRef} className="flex gap-10" style={{ width: testimonials.length * 560 }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
