import React, { useEffect, useRef, useState } from "react";
import Data from "../db.json";
import Moon_png from "../assets/destination/image-moon.png";
import Moon_webp from "../assets/destination/image-moon.webp";
import Mars_png from "../assets/destination/image-mars.png";
import Mars_webp from "../assets/destination/image-mars.webp";
import Europa_png from "../assets/destination/image-europa.png";
import Europa_webp from "../assets/destination/image-europa.webp";
import Titan_png from "../assets/destination/image-titan.png";
import Titan_webp from "../assets/destination/image-titan.webp";

const images = [
  { png: Moon_png, webp: Moon_webp },
  { png: Mars_png, webp: Mars_webp },
  { png: Europa_png, webp: Europa_webp },
  { png: Titan_png, webp: Titan_webp },
];

const Destination = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [animation, setAnimation] = useState(false);
  const tabListRef = useRef();
  const [tabFocus, setTabFocus] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    if (tabListRef.current) {
      tabListRef.current.children[0].focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 };
    if (direction[e.key] !== undefined) {
      e.preventDefault();
      let newIndex = (tabFocus + direction[e.key] + images.length) % images.length;
      setTabFocus(newIndex);
      tabListRef.current.children[newIndex].focus();
    }
  };

  const handleTabClick = (index) => {
    if (selectedIndex === index) return;
    setTabFocus(index);
    setAnimation(true);
    setImageLoading(true);
    setTimeout(() => {
      setCurrentImage(images[index]);
      setSelectedIndex(index);
      setAnimation(false);
    }, 300);
  };

  const destination = Data.destinations[selectedIndex];

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto text-gray-900 font-poppins">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          <span className="text-gray-400 mr-2">01</span> Pilih Destinasi Anda
        </h1>
      </header>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="relative w-60 h-60 md:w-72 md:h-72">
          <picture className={`transition-opacity duration-500 ${animation ? "opacity-0" : "opacity-100"}`}>
            <source srcSet={currentImage.webp} type="image/webp" />
            <img
              src={currentImage.png}
              alt={`Gambar ${destination.name}`}
              className="w-full h-full object-contain"
              onLoad={() => setImageLoading(false)}
              loading="lazy"
            />
          </picture>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
              Memuat gambar...
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="flex-1">
          {/* Tabs */}
          <nav
            className="flex justify-center gap-6 mb-6"
            role="tablist"
            aria-label="Destinasi"
            ref={tabListRef}
            onKeyDown={handleKeyDown}
          >
            {Data.destinations.map((item, i) => (
              <button
                key={item.name}
                onClick={() => handleTabClick(i)}
                className={`uppercase text-sm font-semibold tracking-wider border-b-2 pb-1 transition ${
                  tabFocus === i
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-blue-600"
                }`}
                aria-selected={tabFocus === i}
                aria-controls={`destination-panel-${i}`}
                id={`destination-tab-${i}`}
                role="tab"
                tabIndex={tabFocus === i ? 0 : -1}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Description */}
          <section
            className="p-6 border rounded-xl shadow-sm bg-white"
            id={`destination-panel-${selectedIndex}`}
            aria-labelledby={`destination-tab-${selectedIndex}`}
            role="tabpanel"
            tabIndex={0}
            style={{
              transform: animation ? "translateY(20px)" : "none",
              opacity: animation ? 0 : 1,
              transition: "transform 0.4s ease, opacity 0.4s ease",
            }}
          >
            <h2 className="text-3xl font-bold uppercase mb-2">{destination.name}</h2>
            <p className="text-gray-700 mb-6">{destination.description}</p>

            <div className="flex flex-col sm:flex-row gap-8 text-center">
              <div className="flex-1">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Jarak Rata-rata</h3>
                <p className="text-lg font-semibold">{destination.distance}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Waktu Tempuh</h3>
                <p className="text-lg font-semibold">{destination.travel}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Destination;
