'use client'
import { useEffect, useRef, useState } from 'react'

const team = [
  {
    name: 'Ember Naksan',
    role: 'UI / UX Designer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  },
  {
    name: 'Mike Jessica',
    role: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  },
  {
    name: 'Kevin Hardson',
    role: 'SEO Content Writer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    name: 'Rose Brown',
    role: 'Web Developer',
    image: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b',
  },
  {
    name: 'John Carter',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },
   {
    name: 'John Carter',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },

   {
    name: 'John Carter',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },
 {
    name: 'John Carter',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },

   {
    name: 'John Carter',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },
]

export default function TeamSlider() {
  const sliderRef = useRef(null)
  const [index, setIndex] = useState(0)

  const slideWidth = 300 // card width + gap

  const next = () => {
    setIndex((prev) => (prev + 1) % team.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + team.length) % team.length)
  }

  // Auto play
  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-28 bg-[#1e1e1e] text-white overflow-hidden">

      {/* Dotted background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] bg-[size:18px_18px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-8 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-4">
          We Make The Perfect{' '}
          <span className="text-[#19b9f1]">Solutions</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          We are committed to providing our customers with exceptional service
          while offering our employees the best training.
        </p>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2
          w-12 h-12 rounded-full bg-black/60 hover:bg-[#19b9f1]
          transition z-10"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2
          w-12 h-12 rounded-full bg-black/60 hover:bg-[#19b9f1]
          transition z-10"
        >
          ›
        </button>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-10 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * slideWidth}px)`,
            }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                className="min-w-[260px] group"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[360px] object-cover
                    transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-bold">
                    {member.name}
                  </h4>
                  <p className="text-[#19b9f1] text-sm mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-14">
          {team.map((_, i) => (
            <span
              key={i}
              className={`w-6 h-1 transition ${
                i === index ? 'bg-[#19b9f1]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
