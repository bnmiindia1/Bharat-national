'use client'
import { useEffect, useState } from 'react'
import Dropdown from '../component/dropdown'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`top-0 left-0 z-50 transition-all duration-500
        ${scrolled ? 'fixed w-full' : 'absolute w-full'}
      `}
    >
      {/* TOP INFO BAR (only after scroll) */}
      <div
        className={` text-white text-sm transition-all duration-300
        ${scrolled ? 'opacity-100 py-2' : 'opacity-0 h-0 overflow-hidden'}
        `}
      >
        <div className="flex justify-between px-16">
          <span>Welcome To Bharat National Multimedia Institute</span>
          <div className="flex gap-8">
            <span>MON - SAT 10AM - 6PM</span>
            <span>CALL ANYTIME : 000 888 0000</span>
          </div>
        </div>
      </div>

      {/* NAVBAR ROW */}
      <div className="relative w-full flex">
        
        {/* BLUE BAR */}
        <div
          className={`bg-[#19b9f1] h-[90px] flex items-center px-16 relative
          transition-all duration-500 ease-in-out
          ${scrolled ? 'w-full' : 'w-[60%]'}
          `}
        >
          {/* LOGO */}
          <div className="text-white font-bold text-xl leading-tight">
            BNMI <br />
            <span className="text-sm font-normal">Multimedia Institute</span>
          </div>

          {/* MENU */}
          <nav className="ml-auto hidden lg:flex gap-8 text-white font-semibold">
            <Dropdown title="HOME" />
            <Dropdown title="ABOUT US" />
            <Dropdown title="SERVICES" />
            <Dropdown title="PROJECTS" />
            <Dropdown title="PAGES" />
            <Dropdown title="BLOG" />
            <Dropdown title="SHOP" />
            <Dropdown title="CONTACT US" />
          </nav>

          {/* CONTACT BUTTON */}
          <div
            className={`absolute top-1/2 -translate-y-1/2
            transition-all duration-500
            ${scrolled ? 'right-16' : 'right-6'}
            `}
          >
            <button className="bg-white text-black font-semibold px-6 py-3 shadow-xl">
              CONTACT NOW
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (only visible when NOT scrolled) */}
        {!scrolled && <div className="w-[40%]" />}
      </div>
    </header>
  )
}
