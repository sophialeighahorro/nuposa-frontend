import React from "react";
import gardenCat from "../assets/gardenCat.jpg";
import mendCat from "../assets/mendCat.jpg";
import arawCat from "../assets/arawCat.jpg";
import catwHand from "../assets/catwHand.jpg";

export default function Stories() {
  const stories = [
    {
      image: gardenCat,
      text: "Everytime we have PE classes in mendiola, the first thing I'd look for is this oranj cat no super lambing. Nakakawala ng pagod tahat ng cats here sa campus <33",
      author: "-Marygail",
      rotation: "-6deg",
      clipType: "blue",
      cardColor: "#b9ebfa", // light blue
    },
    {
      image: mendCat,
      text: "Kali's favorite spot is sa canteen. She loves climbing on top of tables and keeping students company x She's very sweet and chill lang hehe",
      author: "-Iya",
      rotation: "2deg",
      clipType: "paper",
      cardColor: "#fadfaa", // peach
    },
    {
      image: arawCat,
      text: "This catto used to be pregnant all the time before. now, kaponed, she loves exploring every corner of the school, even joining classes sometimes",
      author: "-JB",
      rotation: "-6deg",
      clipType: "paper",
      cardColor: "#add3fa", // blue
    },
    {
      image: catwHand,
      text: "Hindi ka tunay na nationalian kung di mo pinepet si Jebi sa may main entrance bago pumasok",
      author: "-Casper",
      rotation: "2deg",
      clipType: "paper",
      cardColor: "#f7cfa2", // warm tan
    },
  ];

  return (
    <section className="relative w-full pt-16 pb-20 px-4 sm:px-8 bg-[#fafad5] overflow-hidden min-h-225 lg:min-h-250">
      {/* Stories Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2
          className="font-black text-6xl sm:text-7xl lg:text-8xl text-[#add3fa] relative inline-block"
          style={{
            WebkitTextStroke: "4px #464646",
            paintOrder: "stroke fill",
          }}
        >
          Community Stories
        </h2>
      </div>

      {/* Clothesline with Stories */}
      <div className="max-w-6xl mx-auto relative">
        {/* Story Cards on Clothesline */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-16 pt-[50px] relative">
          {stories.map((story, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{ transform: `rotate(${story.rotation})` }}
            >
              {/* Card */}
              <div
                className="rounded-3xl shadow-xl p-6 w-[280px] lg:w-[340px] transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: story.cardColor || "#b9ebfa" }}
              >
                {/* Photo */}
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-5 shadow-lg border-4 border-white">
                  <img
                    src={story.image}
                    alt="Campus cat"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Story Text */}
                <p className="text-[#464646] text-sm leading-relaxed mb-4 font-medium">
                  {story.text}
                </p>

                {/* Author */}
                <p className="text-[#464646] text-sm font-bold text-right">
                  {story.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
