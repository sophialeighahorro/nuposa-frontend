import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import nuposaLogo from "../assets/nuposaLogo.png";

export default function Header() {
  const location = useLocation();
  const isVolunteer = location.pathname === "/volunteer";
  const bgClass = isVolunteer ? "bg-[#fafad5]" : "bg-[#fffff6]";
  return (
    <header
      className={`relative w-full ${bgClass} px-4 sm:px-8 lg:px-[100px] pt-0`}
    >
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
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-12 text-sm sm:text-base lg:text-[20px] text-[#464646]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#add3fa]" : "font-medium"
              } hover:text-[#add3fa] transition-all`
            }
            end
          >
            HOME
          </NavLink>
          <NavLink
            to="/cats"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#add3fa]" : "font-medium"
              } hover:text-[#add3fa] transition-all`
            }
          >
            CATS
          </NavLink>
          <NavLink
            to="/volunteer"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#add3fa]" : "font-medium"
              } hover:text-[#add3fa] transition-all`
            }
          >
            VOLUNTEER
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#add3fa]" : "font-medium"
              } hover:text-[#add3fa] transition-all`
            }
          >
            DONATE
          </NavLink>
          <NavLink
            to="/care"
            className={({ isActive }) =>
              `${
                isActive ? "font-medium text-[#add3fa]" : "font-medium"
              } hover:text-[#add3fa] transition-all`
            }
          >
            CARE
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-310.25 mx-auto h-0.5 bg-[#d1d5db] mt-4 lg:-mt-2.5" />
      </div>
    </header>
  );
}
