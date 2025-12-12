import React from "react";

// --- IMAGES ---
import nuposaLogo from "./assets/nuposaLogo.png";
import posaLanding from "./assets/posaLanding.png"; // The single image for the right side

export default function App() {
  return (
    <div className="min-h-screen bg-posa-cream font-sans overflow-x-hidden relative">
      {/* Decorative paw prints */}
      <div className="absolute top-20 right-[15%] w-20 h-20 opacity-30">
        <div className="text-posa-blue-light text-8xl">🐾</div>
      </div>
      <div className="absolute bottom-32 left-[10%] w-32 h-32 opacity-20">
        <div className="text-posa-yellow text-9xl">🐾</div>
      </div>
      {/* --- NAVBAR --- */}
      <header className="container mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-4">
          {/* Logo */}
          <div className="mb-3 md:mb-0">
            <img
              src={nuposaLogo}
              alt="NU Posa Logo"
              className="h-10 object-contain"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-10 md:space-x-12">
            {["HOME", "CATS", "VOLUNTEER", "DONATE", "CARE"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 font-semibold uppercase tracking-wide text-xs hover:text-posa-gray transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="container mx-auto px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-16">
        {/* LEFT: Text Content */}
        <div className="flex-1 text-left z-10 max-w-xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight">
            <span className="text-posa-blue">Where every</span>
            <br />
            <span className="text-posa-peach">campus</span>
            <br />
            <span className="text-posa-peach">cat </span>
            <span className="text-posa-blue">has a story.</span>
          </h1>

          <p className="text-posa-gray text-base md:text-lg mb-10 font-normal">
            Your purr-fect guide to NU's campus cats.
          </p>

          <button className="bg-posa-blue text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
            View Cats
          </button>
        </div>

        {/* RIGHT: Landing Image with decorative elements */}
        <div className="flex-1 w-full flex justify-center md:justify-end relative">
          <img
            src={posaLanding}
            alt="Campus Cats Collage"
            className="w-full max-w-[550px] h-auto object-contain relative z-10"
          />
        </div>
      </main>
    </div>
  );
}
