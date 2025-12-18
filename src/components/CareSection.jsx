import React from "react";
import do1 from "../assets/do1.jpg";
import do2 from "../assets/do2.webp";
import do3 from "../assets/do3.jpg";
import do4 from "../assets/do4.webp";
import do5 from "../assets/do5.jpg";
import do6 from "../assets/do6.jpg";
import dont1 from "../assets/dont1.jpg";
import dont2 from "../assets/dont2.jpg";
import dont33 from "../assets/dont33.jpg";
import dont4 from "../assets/dont4.png";
import dont5 from "../assets/dont5.jpeg";
import dont6 from "../assets/dont6.jpg";

const Placeholder = ({
  label = "Image placeholder",
  src,
  alt = "Care image",
  contain = false,
}) => (
  <div className="w-full rounded-xl bg-white/70 border border-white/60 shadow-inner flex items-center justify-center text-gray-500 overflow-hidden aspect-[4/3]">
    {src ? (
      <img
        src={src}
        alt={alt}
        className={`${
          contain ? "object-contain" : "object-cover"
        } w-full h-full`}
      />
    ) : (
      label
    )}
  </div>
);

export default function CareSection() {
  // Optional: add images matching each item below. You can import files or use URLs.
  // Example:
  // import do1 from "../assets/care/do1.jpg";
  // const doImages = [do1, /* do2, do3, ... */];
  // For now these are empty – the component will show labels until you fill them.
  const doImages = [do1, do2, do3, do4, do5, do6];
  const dontImages = [dont1, dont2, dont33, dont4, dont5, dont6];

  const doItems = [
    "Observe and respect boundaries—let cats approach you on their own.",
    "Provide clean water when possible, especially during hot weather.",
    "Report injured or sick cats to the proper campus unit or POSA admins.",
    "Keep the area clean after interacting or feeding cats.",
    "Wash your hands after interacting with cats.",
    "Educate others by sharing correct information about proper cat care.",
  ];

  const dontItems = [
    "Do not force interaction or carry cats unless necessary.",
    "Do not feed harmful food such as chocolate, milk, bones, or leftovers.",
    "Do not disturb sleeping or nursing cats.",
    "Do not chase, scare, or tease the cats.",
    "Do not abandon pets or leave kittens on campus.",
    "Do not harm or tolerate harm toward any campus cat.",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12 space-y-12">
      {/* Intro: unified beige container with left title card and right paragraph */}
      {/* Intro: single beige container with centered title and paragraph */}
      <section className="relative bg-[#fafad5] rounded-3xl p-8 md:p-10 border-2 border-[#464646]">
        {/* Paperclip accent */}
        <div className="absolute -top-6 left-8 h-12 w-8 rounded-full border-4 border-[#9ec9ff] rotate-12" />
        <h2
          className="text-6xl md:text-7xl font-black text-[#b9ebfa] text-center"
          style={{ WebkitTextStroke: "1.5px #464646" }}
        >
          DO'S <span className="text-[#FADFAA]">&</span>{" "}
          <span className="text-[#ADD3FA]">DON'TS</span>
        </h2>
        <p className="mt-4 text-[#464646] text-sm md:text-base text-center max-w-3xl mx-auto">
          Our campus cats are part of the NU community and deserve respect,
          safety, and proper care. This section serves as a guide to help
          students, staff, and visitors interact responsibly with them. By
          following these simple do’s and don’ts, we can ensure a safe
          environment where both people and cats can peacefully coexist on
          campus.
        </p>
      </section>

      {/* DO's Section */}
      <section className="rounded-3xl bg-[#add3fa]/30 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <h2
          className="text-6xl md:text-7xl font-black text-[#CFE7FF] text-center"
          style={{ WebkitTextStroke: "1.5px #464646" }}
        >
          DO'S
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doItems.map((text, i) => (
            <div key={text} className="bg-[#cfe7ff] rounded-2xl p-5 shadow-lg">
              <p className="text-[#1f2937] font-semibold text-center mb-4">
                {text}
              </p>
              <Placeholder src={doImages[i]} alt={`Do: ${text}`} />
            </div>
          ))}
        </div>
      </section>

      {/* DON'TS Section */}
      <section className="rounded-3xl bg-[#fadfaa]/60 p-6 md:p-8 space-y-6">
        <h2
          className="text-6xl md:text-7xl font-black text-[#FFF7E3] text-center"
          style={{ WebkitTextStroke: "1.5px #464646" }}
        >
          DON'TS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dontItems.map((text, i) => (
            <div
              key={text}
              className="bg-[#fff7e3] rounded-2xl p-6 shadow-lg flex flex-col items-center"
            >
              <Placeholder src={dontImages[i]} alt={`Don't: ${text}`} contain />
              <p className="text-[#1f2937] font-semibold text-center mt-4">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
