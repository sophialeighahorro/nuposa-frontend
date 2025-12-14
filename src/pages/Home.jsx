import React from "react";
import Hero from "../components/Hero";
import LandingImage from "../components/LandingImage";
import Stories from "../components/Stories";
import Mission from "../components/Mission";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-posa-yellow overflow-x-hidden">
      <main className="relative w-full px-4 sm:px-8 lg:px-0 mt-8 lg:mt-0 min-h-[800px] lg:min-h-[900px]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-0">
          <Hero />
          <LandingImage />  
        </div>
      </main>

      <Stories />
      <Mission />
    </div>
  );
}
