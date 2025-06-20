import React, { useState } from "react";
import Vehicle_portrait from "../assets/technology/image-launch-vehicle-portrait.jpg";
import Capsule_portrait from "../assets/technology/image-space-capsule-portrait.jpg";
import Spaceport_portrait from "../assets/technology/image-spaceport-portrait.jpg";
import Data from "../db.json";

const images = [
  Vehicle_portrait,
  Spaceport_portrait,
  Capsule_portrait,
];

const Technology = () => {
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleToggle = (index) => {
    if (index === selected) return;
    setAnimating(true);
    setTimeout(() => {
      setSelected(index);
      setAnimating(false);
    }, 300);
  };

  const tech = Data.technology[selected];

  return (
    <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto font-poppins text-gray-800">
      {/* Judul */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
          <span className="text-blue-600 mr-3">03</span> Teknologi Peluncuran
        </h1>
        <p className="mt-2 text-sm text-gray-500">Pilih teknologi untuk melihat detail</p>
      </header>

      {/* Selector */}
      <div className="flex justify-center gap-4 mb-8" role="tablist" aria-label="Technology Options">
        {Data.technology.map((item, index) => (
          <button
            key={index}
            onClick={() => handleToggle(index)}
            role="tab"
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            aria-label={item.name}
            className={`w-10 h-10 rounded-full font-semibold transition-all border text-sm ${
              selected === index
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Konten Teknologi */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-lg p-8 rounded-2xl transition-all duration-500">
        {/* Detail */}
        <div
          className={`flex-1 transition-all ${
            animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="text-sm text-blue-600 uppercase tracking-wider mb-1">Terminologi:</h2>
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4">{tech.name}</h3>
          <p className="text-gray-600 leading-relaxed text-base max-w-xl">{tech.description}</p>
        </div>

        {/* Gambar */}
        <div
          className={`flex-1 flex justify-center transition-all ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <img
            src={images[selected]}
            alt={`Ilustrasi ${tech.name}`}
            className="max-w-sm w-full object-contain rounded-xl shadow-md"
          />
        </div>
      </section>
    </main>
  );
};

export default Technology;
