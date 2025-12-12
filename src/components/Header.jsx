import React from "react";
import nuposaLogo from "../assets/nuposaLogo.png";

export default function Header() {
  return (
    <header className="relative w-full px-4 sm:px-8 lg:px-[92px] pt-4 lg:pt-0">
      {/* Logo */}
      <div className="w-[80px] h-[80px] lg:w-[108px] lg:h-[108px] mx-auto lg:mx-0">
        <img
          src={nuposaLogo}
          alt="NU Posa Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[48px] text-sm sm:text-base lg:text-[20px] text-[#464646]">
        <a
          href="#home"
          className="font-bold hover:text-[#b9ebfa] transition-all"
        >
          HOME
        </a>
        <a
          href="#cats"
          className="font-normal hover:text-[#b9ebfa] transition-all"
        >
          CATS
        </a>
        <a
          href="#volunteer"
          className="font-normal hover:text-[#b9ebfa] transition-all"
        >
          VOLUNTEER
        </a>
        <a
          href="#donate"
          className="font-normal hover:text-[#b9ebfa] transition-all"
        >
          DONATE
        </a>
        <a href="#care" className="font-normal hover:text-[#b9ebfa] transition-all">
          CARE
        </a>
      </nav>

      {/* Divider */}
      <div className="w-full max-w-[1241px] mx-auto h-[1px] bg-gray-400 mt-4 lg:mt-[-15px]" />
    </header>
  );
}
