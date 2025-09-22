import ridinggearbg from "../assets/ridinggears.webp"

export default function RidingGear() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${ridinggearbg})`, 
      }}
    >
      {/* Overlay for dark effect */}
       <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6 drop-shadow-lg">
      RIDING GEAR
        </h1>
        <a
          href="https://store.mototrekkin.com.au/riding-gear/?_gl=1*8rd9bn*_gcl_au*NjI1OTAzNTYzLjE3NTgwODI2NzQuMzA3MDA4OTEyLjE3NTgxMDY1MjYuMTc1ODEwNjY4Mg.."
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-md text-lg shadow-lg transition"
        >
          CLICK TO SHOP
        </a>
      </div>
    </section>
  );
}
