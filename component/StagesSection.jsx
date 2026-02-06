'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StagesSection() {
  const [open, setOpen] = useState(2)
  const sectionRef = useRef(null)

  const items = [
    {
      id: 1,
    title: 'OUR MISSION',
      content:
        'When students successfully complete their courses, BNMI provides them with certificates and marksheets.',
    },
    {
      id: 2,
      title: 'OUR VISION',
      content:
        'BNMI is committed to promoting skill development, empowering individuals, and contributing to the growth of the education sector. ',
    },
    {
      id: 3,
      title: 'WE HELP TO ACCOMPLISH COMMON OBJECTIVES',
      content:
        'We PROVIDE A PLATFORM FOR STUDENTS TO LEARN AND GROW, AND WE SUPPORT INSTITUTES IN DELIVERING HIGH-QUALITY EDUCATION AND TRAINING.',
    },
  ]

  // Scroll reveal animation
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:18px_18px] opacity-40" />

      <div
        ref={sectionRef}
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8"
      >
        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Team discussion"
            className="w-full h-[520px] object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Heading */}
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            We Accomplish <br />
            All The More{' '}
            <span className="text-[#19b9f1]">Stages</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-xl">
          THE FOUNDATION OF BHARAT NATIONAL MULTIMEDIA INSTITUTE ( PVT LTD )ITS SISTER CONCERN  IT ACADEMY  ESTABLISHED IN 2014 WITH A GREATER AIM AND VISION OF EXCELLENCE IN IT TECHNOLOGY AND RELATED AREAS. IS BUILT ON A STRONG BELIEF THAT EVERY MOTIVATED LEARNER HAS THE POTENTIAL TO SUCCEED IN THE PROFESSIONAL WORLD WHEN GIVEN THE RIGHT OPPORTUNITIES. WE FIRMLY BELIEVE THAT THE ABSENCE OF FORMAL EDUCATION SHOULD NEVER BE A BARRIER TO GROWTH OR SUCCESS. EVERYONE DESERVES A CHANCE TO RESTART, RESKILL, AND BUILD A MEANINGFUL CAREER.
          </p>

          {/* ACCORDION */}
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 bg-white"
              >
                {/* Header */}
                <button
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#19b9f1] font-bold">
                      {item.id < 10 ? `0${item.id}` : item.id}.
                    </span>
                    <span className="font-bold text-sm tracking-wide">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-[#19b9f1] text-2xl font-bold">
                    {open === item.id ? '−' : '+'}
                  </span>
                </button>

                {/* Animated content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out
                  ${open === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="pb-6 text-gray-600 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
