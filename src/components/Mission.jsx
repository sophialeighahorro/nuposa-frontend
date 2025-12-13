import React from "react";
import missionCat from "../assets/missionCat.png";

export default function Mission() {
  return (
    <section className="relative w-full bg-white py-16 lg:py-20 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={missionCat}
              alt="Campus cats being cared for"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Mission Text */}
          <div className="w-full lg:w-1/2">
            {/* Mission Heading */}
            <h2
              className="font-black text-5xl sm:text-6xl lg:text-[80px] leading-[1.1] mb-6 lg:mb-8"
              style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
            >
              <span className="text-[#fadfaa]">Our</span>{" "}
              <span className="text-[#add3fa]">Mission</span>
            </h2>

            {/* Mission Text */}
            <p className="text-[#464646] text-base sm:text-lg lg:text-xl leading-relaxed">
              To build a compassionate, informed, and unified community by
              providing a comprehensive digital platform dedicated to the
              welfare of our campus cats. Through organized profiles, accurate
              documentation, and accessible information, we aim to support
              responsible care, promote awareness, and encourage student
              involvement in ensuring the safety, health, and visibility of
              every cat on campus. By combining technology, empathy, and
              community collaboration, NU POSA strives to create an environment
              where humans and cats coexist harmoniously, fostering a culture of
              respect, responsibility, and kindness within the NU campus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
