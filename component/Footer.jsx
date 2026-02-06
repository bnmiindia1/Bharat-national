'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      footerRef.current.querySelectorAll('.footer-anim'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-[#1e1e1e] text-white overflow-hidden">

   {/* ===== CTA STRIP ===== */}
<div className="relative bg-[#19b9f1] py-10 px-10 overflow-hidden">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row
    items-center justify-between gap-6">

    {/* Wave */}
    <svg
      className="absolute bottom-0 left-0 w-full h-full opacity-20"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#ffffff"
        d="M0,224L80,202.7C160,181,320,139,480,133.3C640,128,800,160,960,170.7C1120,181,1280,171,1360,165.3L1440,160L1440,0L0,0Z"
      />
    </svg>

    <h3 className="relative text-xl md:text-2xl font-bold text-black max-w-xl">
      Fabricate A Superior Site A LOT Faster WITH Moran
    </h3>

    {/* CTA Button */}
    <div className="relative">
      <div className="absolute -bottom-2 -left-2 w-full h-full bg-black" />
      <button className="relative bg-[#222] text-white px-6 py-3
        font-semibold tracking-wide hover:bg-black transition">
        CONTACT NOW
      </button>
    </div>

  </div>
</div>


      {/* ===== MAIN FOOTER ===== */}
      <div className="max-w-7xl mx-auto py-10 px-10 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* ABOUT */}
        <div className="footer-anim">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-[#19b9f1]">B</span>NMI
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            BHARAT NATIONAL MULTIMEDIA INSTITUTE is a well-established organization specializing in offering franchise opportunities to computer training institutes and skill development centers.
          </p>

          <div className="flex gap-4 mt-6 text-lg">
            {['f', 't', 'p', '◯'].map((i) => (
              <span
                key={i}
                className="cursor-pointer hover:text-[#19b9f1] transition"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-anim">
          <h4 className="font-bold text-lg mb-5">LINKS EXPLORE</h4>
          <ul className="space-y-3 text-gray-300 text-sm">
            {[
              'About us',
              'Meet Our Team',
              'Our Portfolio',
              'Latest News',
              'Contact Us',
              'Our Service',
            ].map((item) => (
              <li
                key={item}
                className="hover:text-[#19b9f1] cursor-pointer transition"
              >
                » {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-anim">
          <h4 className="font-bold text-lg mb-5">CONTACT</h4>

          <p className="text-[#19b9f1] font-semibold mb-1">Address</p>
          <p className="text-gray-300 text-sm mb-4">
            rukmuni gaon beltola <br />
            guwahati - 781028
          </p>

          <p className="text-[#19b9f1] font-semibold mb-1">CALL ANYTIME :</p>
          <p className="text-gray-300 mb-4">666 999 0000</p>

          <p className="text-[#19b9f1] font-semibold mb-1">Email Address</p>
          <p className="text-gray-300">needhelp@bnmi.com</p>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-anim">
          <h4 className="font-bold text-lg mb-5">Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4">
            Sign up for our latest news & articles. We won’t give spam mails.
          </p>

          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-transparent border border-gray-500 px-4 py-3
              mb-4 text-sm outline-none focus:border-[#19b9f1] transition"
          />

          <button className="bg-[#19b9f1] text-black px-6 py-3
            font-semibold hover:bg-white transition">
            Send Now
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © Copyright 2026 BNMI
      </div>
    </footer>
  )
}
