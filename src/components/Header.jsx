import React from "react";
import { NavLink } from "react-router-dom";
import nuposaLogo from "../assets/nuposaLogo.png";

export default function Header() {
  return (
    <header className="relative w-full bg-[#fffff6] px-4 sm:px-8 lg:px-[100px] pt-0">
      <div className="max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="w-[80px] h-[80px] lg:w-[104px] lg:h-[104px]">
          <img
            src={nuposaLogo}
            alt="NU Posa Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[48px] text-sm sm:text-base lg:text-[20px] text-[#464646]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "font-bold text-[#b9ebfa]" : "font-bold"
              } hover:text-[#b9ebfa] transition-all`
            }
            end
          >
            HOME
          </NavLink>
          <NavLink
            to="/cats"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#b9ebfa]" : "font-medium"
              } hover:text-[#b9ebfa] transition-all`
            }
          >
            CATS
          </NavLink>
          <NavLink
            to="/volunteer"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#b9ebfa]" : "font-medium"
              } hover:text-[#b9ebfa] transition-all`
            }
          >
            VOLUNTEER
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#b9ebfa]" : "font-medium"
              } hover:text-[#b9ebfa] transition-all`
            }
          >
            DONATE
          </NavLink>
          <NavLink
            to="/care"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#b9ebfa]" : "font-medium"
              } hover:text-[#b9ebfa] transition-all`
            }
          >
            CARE
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-[1241px] mx-auto h-[2px] bg-[#d1d5db] mt-4 lg:mt-[-10px]" />
      </div>
    </header>
  );
}
