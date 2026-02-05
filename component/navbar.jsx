'use client'
import { useEffect, useState } from 'react'
import Dropdown from '../component/dropdown'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${scrolled ? 'fixed' : 'absolute'} top-0 left-0 w-full z-50`}>
      
      {/* TOP INFO BAR */}
      <div className={`bg-black text-white text-sm transition-all duration-300
        ${scrolled ? 'opacity-100 py-2' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="flex justify-between px-16">
          <span>Welcome To Bharat National Multimedia Institute</span>
          <div className="flex gap-8">
            <span>MON - SAT 10AM - 6PM</span>
            <span>CALL ANYTIME : 000 888 0000</span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="relative flex w-full">
        
        {/* BLUE BAR */}
        <div className={`bg-[#19b9f1] h-[90px] flex items-center px-16 relative
          transition-all duration-500 ${scrolled ? 'w-full' : 'w-[60%]'}`}>

          {/* LOGO */}
          <div className="text-white font-bold text-xl">
            BNMI
            <div className="text-sm font-normal">Multimedia Institute  </div>
          </div>

          {/* MENU */}
         <nav className="ml-auto hidden lg:flex gap-10 text-white font-semibold">

  <Dropdown
    title="HOME"
    items={[
      { label: 'Home 1' },
      { label: 'Home 2' },
      { label: 'Home 3' },
    ]}
  />

  <Dropdown
    title="ABOUT US"
    items={[
      { label: 'About BNMI' },
      { label: 'Our Faculty' },
      { label: 'Infrastructure' },
    ]}
  />

  <Dropdown
    title="COURSES"
    items={[
      { label: 'Web Development' },
      { label: 'Graphic Design' },
      { label: 'Digital Marketing' },
      { label: 'Video Editing' },
    ]}
  />

  <Dropdown
    title="CERTIFICATION"
    items={[
      { label: 'Government Certified' },
      { label: 'Industry Certification' },
    ]}
  />

  <Dropdown
    title="VERIFICATION"
    items={[
      { label: 'Student Verification' },
      { label: 'Certificate Verification' },
    ]}
  />

</nav>

          {/* CTA BUTTONS */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex gap-4
            transition-all duration-500
            ${scrolled ? 'right-200' : '-right-[520px]'}`}
          >
            {['CONTACT NOW', 'FRANCHISE FORM' , 'LOGIN'].map((text) => (
              <div key={text} className="relative">
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-gray-600 "></div>
                <button className="relative bg-white text-black px-6 py-3 font-semibold
                  hover:bg-black hover:text-white transition">
                  {text}
                </button>
              </div>
            ))}
          </div>
        </div>

        {!scrolled && <div className="w-[40%]" />}
      </div>
    </header>
  )
}
