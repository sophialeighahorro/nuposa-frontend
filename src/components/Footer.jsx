import React from "react";
import nuposaLogo from "../assets/nuposaLogo.png";
import catFooter from "../assets/catFooter.png";
import instagram from "../assets/Instagram.png";
import facebook from "../assets/Facebook.png";
import email from "../assets/Email.png";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#faefc3] overflow-hidden py-8 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto relative h-[150px]">
        {/* Cat Image - Left Side */}
        <div className="relative left-0 bottom-28 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px]">
          <img
            src={catFooter}
            alt="Campus cat"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[150px]">
          <img
            src={nuposaLogo}
            alt="NU Posa Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Social Icons - Right Side */}
        <div className="absolute right-0 top-[40%] flex items-center gap-4 sm:gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] hover:scale-110 transition-transform"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-full h-full object-contain"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] hover:scale-110 transition-transform"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="w-full h-full object-contain"
            />
          </a>
          <a
            href="mailto:nuposa@example.com"
            className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] hover:scale-110 transition-transform"
          >
            <img
              src={email}
              alt="Email"
              className="w-full h-full object-contain"
            />
          </a>
        </div>

        {/* Copyright - Bottom Center */}
        <p className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[#464646] text-xs sm:text-sm font-normal whitespace-nowrap">
          © 2025 NU POSA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
