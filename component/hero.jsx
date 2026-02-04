export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bgimage.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero text */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-xl">
          <p className="text-sky-400 mb-4">
            Welcome To BNMI
          </p>

          <h1 className="text-5xl font-extrabold leading-tight">
            We‘re Fulrange <br /> Franchise Institute
          </h1>

          <button className="mt-8 bg-sky-400 text-black px-8 py-4 font-semibold">
            DISCOVER MORE
          </button>
        </div>
      </div>
    </section>
  )
}
