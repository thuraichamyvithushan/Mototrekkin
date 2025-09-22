import SafetySystembg from "../assets/safetysystem.webp"

export default function SafetySystem() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${SafetySystembg})`, 
      }}
    >
      {/* Overlay for dark effect */}
       <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6 drop-shadow-lg">
     SAFETY SYSTEMS
        </h1>
        <a
          href="https://store.mototrekkin.com.au/protections/?_gl=1*11b5g4n*_gcl_au*NjI1OTAzNTYzLjE3NTgwODI2NzQuMzA3MDA4OTEyLjE3NTgxMDY1MjYuMTc1ODEwNjY4Mg.."
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-md text-lg shadow-lg transition"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
