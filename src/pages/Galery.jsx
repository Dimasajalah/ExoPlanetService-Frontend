import React from 'react';

const Galery = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="w-[1512px] h-[1318px] absolute left-[-1px] top-[-1px] bg-white" />
      <div className="w-[1511px] h-[95px] absolute left-[-1px] top-2.5 bg-[#a08383]" />
      <p className="w-[650px] h-7 absolute left-[60px] top-44 text-[32px] font-bold text-left text-black">
        Galeri Exoplanet
      </p>
      
      {/* Header */}
      <div className="w-[1512px] h-[120px]">
        <div className="w-[1512px] h-[120px] absolute left-[-0.5px] top-[-0.5px] bg-neutral-50" />
        <div className="w-[1511px] h-[84px] absolute left-[-0.5px] top-[16.5px] bg-[#736262]" />
        <svg
          width={496}
          height={84}
          viewBox="0 0 496 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[507.5px] top-[17.5px]"
          preserveAspectRatio="none"
        >
          <ellipse cx={248} cy={42} rx={248} ry={42} fill="#443C3C" />
        </svg>
        <p className="w-[452px] h-7 absolute left-[536px] top-8 text-[40px] font-bold text-left text-white">
          KATALOG EXOPLANET
        </p>
        <p className="absolute left-[200px] top-[46px] text-xl font-bold text-left text-[#c0acac]">Home</p>
        <p className="absolute left-[272px] top-[46px] text-xl font-bold text-left text-white">Katalog</p>
        <p className="absolute left-[368px] top-[46px] text-xl font-bold text-left text-white">Plot</p>
        <p className="absolute left-[430px] top-[46px] text-xl font-bold text-left text-white">Tools</p>
        <p className="absolute left-[1035px] top-[46px] text-xl font-bold text-left text-white">Login</p>
      </div>

      {/* Gallery Images */}
      {[
        { src: 'rectangle-169.png', left: 59, top: 283 },
        { src: 'rectangle-170.jpeg', left: 410, top: 283 },
        { src: 'rectangle-171.png', left: 761, top: 283 },
        { src: 'rectangle-172.jpeg', left: 1112, top: 283 },
        { src: 'rectangle-173.jpeg', left: 59, top: 617 },
        { src: 'rectangle-174.jpeg', left: 410, top: 617 },
        { src: 'rectangle-175.jpeg', left: 761, top: 617 },
        { src: 'rectangle-176.jpeg', left: 1112, top: 617 },
        { src: 'rectangle-177.png', left: 59, top: 951 },
        { src: 'rectangle-178.png', left: 410, top: 951 },
      ].map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={`Exoplanet ${idx + 1}`}
          className={`w-[294px] h-[264px] absolute left-[${img.left}px] top-[${img.top}px] object-cover`}
        />
      ))}

      {/* Footer */}
      <div className="w-[1512px] h-[286px] absolute left-[-1px] top-[1317px] bg-[#898080]" />
      <svg
        width={496}
        height={84}
        viewBox="0 0 496 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[49px] top-[1355px]"
        preserveAspectRatio="none"
      >
        <ellipse cx={248} cy={42} rx={248} ry={42} fill="#443C3C" />
      </svg>
      <p className="absolute left-[82px] top-[1370px] text-[40px] font-bold text-left text-white">
        KATALOG EXOPLANET
      </p>
      <p className="absolute left-[86px] top-[1454px] text-2xl font-bold text-left text-white">
        Katalog dengan data 7387 Exoplanet
      </p>
      <p className="absolute left-[120px] top-[1492px] text-2xl font-bold text-left text-white">
        Untuk Menggunakan Katalog ini
      </p>
      <p className="absolute left-[235px] top-[1534px] text-2xl text-left text-[#2d42df]">
        README first
      </p>
      <p className="absolute left-[580px] top-[1370px] text-2xl font-bold text-left text-[#ebfa12]">
        Siapa Kita?
      </p>
      <p className="absolute left-[580px] top-[1416px] text-2xl font-bold text-left text-white">
        Tentang Katalog Ini
      </p>
      <p className="absolute left-[580px] top-[1454px] text-2xl font-bold text-left text-white">
        Help - FAQ
      </p>
      <p className="absolute left-[982px] top-[1372px] text-2xl font-bold text-left text-[#ebfa12]">
        Komunitas Kita
      </p>
      <p className="absolute left-[982px] top-[1410px] text-2xl font-bold text-left text-white">
        Laporkan Masalah
      </p>
      <p className="absolute left-[982px] top-[1450px] text-2xl font-bold text-left text-white">
        Kontak kita
      </p>
    </div>
  );
};

export default Galery;

