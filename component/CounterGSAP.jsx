'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CounterGSAP({ end, suffix = '+', duration = 2 }) {
  const numberRef = useRef(null)

  useEffect(() => {
    const el = numberRef.current

    gsap.fromTo(
      el,
      { innerText: 0, opacity: 0, y: 30 },
      {
        innerText: end,
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reset', // 🔁 re-trigger
        },
        snap: { innerText: 1 },
        onUpdate: function () {
          el.innerText =
            Math.floor(el.innerText).toLocaleString() + suffix
        },
      }
    )
  }, [end, suffix, duration])

  return (
    <span
      ref={numberRef}
      className="text-[#19b9f1] text-6xl font-bold block"
    >
      0{suffix}
    </span>
  )
}
