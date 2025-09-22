import roadeventbg from "../assets/roadevent.webp"

export default function OffroadEvent() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${roadeventbg})`, 
      }}
    >
      {/* Overlay for dark effect */}
       <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6 drop-shadow-lg">
          ULTIMATE OFF ROAD EVENTS
        </h1>
        <a
          href="/motorcycle-adventures"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-md text-lg shadow-lg transition"
        >
          LET’S EXPLORE
        </a>
      </div>
    </section>
  );
}
