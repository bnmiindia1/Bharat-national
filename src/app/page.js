import Navbar from '../../component/navbar'
import Hero from '../../component/hero'
import ServicesSection from '../../component/ServicesSection'

import StatsSection from '../../component/stateSection'

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <StatsSection />
      <div className="h-[200vh] bg-white" /> {/* scroll content */}
    </>
  )
}
