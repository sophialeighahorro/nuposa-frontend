import React from "react";
import donateQr from "../assets/donateQr.png";
import pawsPrint from "../assets/pawPrints.png";

export default function DonateSection() {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6"
            style={{ WebkitTextStroke: "2px #464646" }}
          >
            <span style={{ color: "#fadfaa" }}>Support</span>{" "}
            <span style={{ color: "#add3fa" }}>Our Campus</span>{" "}
            <span style={{ color: "#fafad5" }}>Cats</span>
          </h1>
          <p className="text-[#464646] text-base md:text-lg max-w-2xl leading-relaxed">
            Every donation goes straight to caring for our campus cats—providing food, medical support,
            and essential supplies to keep them safe and healthy.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <img
              src={pawsPrint}
              alt="Paw prints"
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl bg-white">
            <img
              src={donateQr}
              alt="Donate QR"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="mt-4 text-[#464646] text-sm">Scan to donate via QR</p>
        </div>
      </div>
    </div>
  );
}
