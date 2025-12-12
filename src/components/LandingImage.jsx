import React from "react";
import posaLanding from "../assets/posaLanding.png";

export default function LandingImage() {
  return (
    <div className="w-full lg:w-auto lg:absolute lg:left-[1060px] lg:w-[623px] lg:h-[860px] mt-8 lg:mt-0">
      <img
        src={posaLanding}
        alt="Campus Cats Collage"
        className="w-full h-auto lg:h-full object-cover rounded-lg lg:rounded-none"
      />
    </div>
  );
}
