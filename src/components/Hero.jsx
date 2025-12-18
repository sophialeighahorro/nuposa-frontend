import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full lg:w-auto lg:absolute lg:left-50 lg:top-37.5 lg:max-w-217.5">
      {/* Hero Heading */}
      <h1 className="font-black text-6xl sm:text-5xl md:text-6xl lg:text-[100px] leading-[0.925] text-[#add3fa] m-0 p-0" 
          style={{ WebkitTextStroke: '2px #464646' }}>
        Where every <span className="text-[#fadfaa]">campus</span>
        <br />
        <span className="text-[#fadfaa]">cat</span> has a{" "}
        <span className="text-[#b9ebfa]">story</span>.
      </h1>

      {/* Subheading */}
      <p className="mt-4 lg:mt-8 text-base sm:text-lg lg:text-[24px] text-[#464646] font-normal">
        Your purr-fect guide to NU's campus cats.
      </p>

      {/* View Cats Button */}
      <div className="mt-4 lg:mt-15">
        <Link
          to="/cats"
          className="bg-[#fadfaa] text-[#464646] font-bold text-lg sm:text-xl lg:text-[24px] px-6 sm:px-8 lg:px-9.25 py-3 sm:py-4 lg:py-4 rounded-full lg:rounded-[117px] border-2 border-[#464646] hover:bg-[#f5d599] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          View Cats
        </Link>
      </div>
    </div>
  );
}
