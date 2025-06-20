import React, { useState, useRef } from "react";
import Data from "../db.json";
import Douglas from "../assets/crew/image-douglas-hurley.png";
import Mark from "../assets/crew/image-mark-shuttleworth.png";
import Victor from "../assets/crew/image-victor-glover.png";
import Anousheh from "../assets/crew/image-anousheh-ansari.png";

const crewImages = [Douglas, Mark, Victor, Anousheh];

const Crew = () => {
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);
  const tabRef = useRef();
  const crew = Data.crew[selected];

  const handleKeyNav = (e) => {
    const direction = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (direction !== 0) {
      e.preventDefault();
      const next = (selected + direction + Data.crew.length) % Data.crew.length;
      setSelected(next);
      tabRef.current?.children[next]?.focus();
    }
  };

  const handleTabClick = (index) => {
    if (index === selected) return;
    setAnimating(true);
    setTimeout(() => {
      setSelected(index);
      setAnimating(false);
    }, 300);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-poppins text-gray-800">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
          <span className="text-blue-600 mr-3">02</span> Kenali Kru Anda
        </h1>
        <p className="mt-2 text-sm text-gray-500">Pilih kru menggunakan tombol titik atau keyboard</p>
      </header>

      {/* Card Container */}
      <section className="bg-white rounded-2xl shadow-xl px-6 py-10 md:p-12 transition-all duration-500">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Image */}
          <div className="w-full max-w-md flex justify-center">
            <img
              src={crewImages[selected]}
              alt={`Foto ${crew.name}`}
              className={`transition-all duration-500 w-full max-h-[500px] object-contain rounded-xl shadow-md ${
                animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />
          </div>

          {/* Crew Details */}
          <div
            className={`flex-1 max-w-xl text-center lg:text-left transition-all duration-500 ${
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
            role="tabpanel"
            aria-labelledby={`crew-tab-${selected}`}
          >
            <h2 className="uppercase text-sm text-blue-600 tracking-wider mb-1">{crew.role}</h2>
            <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4">{crew.name}</h3>
            <p className="text-base leading-relaxed text-gray-700 mb-6">{crew.bio}</p>

            {/* Tab Selector */}
            <div
              ref={tabRef}
              role="tablist"
              aria-label="Navigasi Kru"
              onKeyDown={handleKeyNav}
              className="flex justify-center lg:justify-start gap-4 mt-4"
            >
              {Data.crew.map((member, index) => (
                <button
                  key={index}
                  role="tab"
                  tabIndex={selected === index ? 0 : -1}
                  aria-selected={selected === index}
                  onClick={() => handleTabClick(index)}
                  aria-label={member.name}
                  className={`w-4 h-4 rounded-full transition ${
                    selected === index ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Crew;
