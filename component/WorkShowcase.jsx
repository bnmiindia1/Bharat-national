'use client'
import { useState } from 'react'

const filters = ['ALL', 'BRANDING', 'ILLUSTRATION', 'PHOTOGRAPHY', 'WEB DESIGN']

const projects = [
  {
    id: 1,
    title: 'WESITE CREATION',
    subtitle: 'New Solutions And Excellent',
    category: 'BRANDING',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  {
    id: 2,
    title: 'COMPUTER TRAINING',
    subtitle: 'Modern Web Interface',
    category: 'WEB DESIGN',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f',
  },
  {
    id: 3,
    title: 'BEAUTY PARLOREUR',
    subtitle: 'Design & Branding',
    category: 'PHOTOGRAPHY',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
  },
  {
    id: 4,
    title: 'DASHBOARD UI',
    subtitle: 'Clean & Simple',
    category: 'ILLUSTRATION',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
  },
  {
    id: 5,
    title: 'ANALYTICS SYSTEM',
    subtitle: 'Business Insights',
    category: 'WEB DESIGN',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
]

export default function WorkShowcase() {
  const [active, setActive] = useState('ALL')

  const filtered =
    active === 'ALL'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold">
            LASTET WORKING PROJECT <br />
            WORK <span className="text-[#19b9f1]">SHOWCASE</span>
          </h2>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center gap-8 mb-14 text-sm font-semibold">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative pb-1 transition
              ${active === f ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              {active === f && (
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#19b9f1]" />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[380px] object-cover"
              />

              {/* HOVER OVERLAY */}
              <div
                className="absolute inset-0 bg-white/80
                translate-x-[-100%] group-hover:translate-x-0
                transition-transform duration-500 ease-in-out"
              >
                <div className="absolute bottom-8 left-8">
                  <h4 className="font-bold tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[#19b9f1] text-sm mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
