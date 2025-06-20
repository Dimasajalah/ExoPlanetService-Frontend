import React, { useState } from 'react';
import video from '../assets/Hologram.mp4';
import backgroundLight from '../assets/space-gradient.jpg';
import backgroundDark from '../assets/space-dark.jpg';

const HologramSection = () => {
  const [darkMode, setDarkMode] = useState(true);
  const bgImage = darkMode ? backgroundDark : backgroundLight;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-all duration-500 font-poppins"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.7)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: darkMode ? 'white' : '#1e1e1e',
      }}
    >
      {/* Toggle Mode */}
      <div className="w-full flex justify-end mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm bg-white/10 backdrop-blur hover:bg-white/20 px-4 py-2 rounded-full text-white shadow transition"
        >
          {darkMode ? '🌞 Ganti Background' : '🌙 Ganti Background'}
        </button>
      </div>

      {/* Title & Description */}
      <div className="text-center max-w-3xl mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
          Visualisasi Hologram Exoplanet
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-slate-300">
          Simulasi ini menunjukkan bagaimana teknologi hologram dapat digunakan untuk menyampaikan informasi tentang exoplanet secara visual dan interaktif. Dengan pendekatan ini, pengguna dapat memahami bentuk, orbit, dan karakteristik exoplanet secara lebih imersif.
        </p>
      </div>

      {/* Video Container */}
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black">
        <div className="relative w-full pt-[56.25%]">
          <video
            controls
            className="absolute top-0 left-0 w-full h-full"
            preload="metadata"
            style={{
              borderRadius: '16px',
              backgroundColor: 'black',
              display: 'block',
              clipPath: 'inset(0% round 16px)',
              WebkitMaskImage: 'radial-gradient(white, black)',
              maskImage: 'radial-gradient(white, black)',
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Footer / Caption */}
      <div className="mt-6 text-center text-slate-300 text-sm italic">
        📽️ Aktifkan layar penuh untuk pengalaman maksimal dalam menonton visualisasi hologram.
      </div>
    </section>
  );
};

export default HologramSection;
