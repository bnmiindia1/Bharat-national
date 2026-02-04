'use client'
import { useState } from 'react'

const services = [
  { title: 'Computer Science', icon: '💻' },
  { title: 'Beauty Parlour', icon: '👧' },
  { title: 'Interior Design', icon: '🎨' },
  { title: 'SEO & CONTENT WRITING', icon: '⚙️' },
  { title: 'Graphic Design', icon: '🖌️' },
  { title: 'Digital Marketing', icon: '📢' },
  { title: 'Web Development', icon: '🌐' },
  { title: 'UI / UX Design', icon: '📱' },
]

export default function ServicesSection() {
  const [index, setIndex] = useState(0)

  const itemsPerView = 4
  const maxIndex = Math.ceil(services.length / itemsPerView) - 1

  return (
    <section className="w-full bg-[#1c1c1c] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Professional & <span className="text-[#19b9f1]">Trust-Focused</span>
        </h2>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
          We provide effective learning solutions, committed to delivering exceptional education.
        </p>

        {/* Slider */}
        <div className="relative mt-20">

          <div
            className="flex gap-8 transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {services.map((item, i) => (
              <div
                key={i}
                className="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%]"
              >
                <ServiceCard
                  title={item.title}
                  icon={item.icon}
                  text="We are committed to providing our customers with service while offering..."
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setIndex(Math.max(index - 1, 0))}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2"
          >
            ‹
          </button>

          <button
            onClick={() => setIndex(Math.min(index + 1, maxIndex))}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`cursor-pointer h-1 ${
                i === index ? 'w-8 bg-[#19b9f1]' : 'w-3 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= SERVICE CARD (hover added only) ================= */

function ServiceCard({ title, text, icon }) {
  return (
    <div className="group relative overflow-hidden h-full
      bg-gradient-to-b from-black to-[#111]
      p-8 text-center border border-white/5
      transition-all duration-500 hover:border-[#19b9f1]">

      {/* White hover overlay (top → bottom) */}
      <div className="absolute inset-0 bg-white -translate-y-full
        group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

      {/* Content */}
      <div className="relative z-10 transition-colors duration-500 group-hover:text-black">

        <div className="text-5xl text-[#19b9f1] mb-6 transition-colors duration-500 group-hover:text-black">
          {icon}
        </div>

        <h3 className="font-bold text-lg mb-4">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-500 group-hover:text-gray-700">
          {text}
        </p>
      </div>
    </div>
  )
}
