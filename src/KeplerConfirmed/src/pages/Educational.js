import React from 'react';
import video from '../assets/expo_FINAL.mp4';

const Educational = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4 py-10 font-poppins">
      <div className="max-w-5xl w-full text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Edukasi Exoplanet</h1>
        <p className="text-lg md:text-xl leading-relaxed text-slate-200">
          Exoplanet adalah planet yang berada di luar Tata Surya kita, mengorbit bintang selain Matahari. Dalam beberapa dekade terakhir, ribuan exoplanet telah ditemukan melalui misi seperti <strong>Kepler</strong> dan <strong>TESS</strong>. Video ini menyajikan penjelasan interaktif tentang bagaimana exoplanet ditemukan, diklasifikasikan, dan apa yang membuatnya menarik untuk diteliti sebagai calon tempat tinggal alternatif di masa depan.
        </p>
      </div>

     <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border border-white/20 bg-black">
  <video
    controls
    className="w-full object-cover"
    style={{
      borderRadius: 'inherit',
      display: 'block',
      backgroundColor: 'black',
    }}
    poster="https://cdn.pixabay.com/photo/2022/02/01/17/01/planet-6989492_1280.jpg"
    preload="metadata"
  >
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
 

      <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-3xl text-left text-slate-200">
        <h2 className="text-2xl font-semibold mb-2">Kenapa Exoplanet Penting?</h2>
        <p className="text-base leading-relaxed">
          Studi tentang exoplanet membuka peluang baru untuk memahami asal-usul tata surya, kemungkinan kehidupan di luar Bumi, dan evolusi planet di seluruh galaksi. Ilmuwan menggunakan metode seperti <strong>transit</strong> dan <strong>radial velocity</strong> untuk mendeteksi keberadaan planet-planet ini. Dengan teknologi terbaru, kita bahkan dapat mengkaji atmosfer mereka dan mencari tanda-tanda kehidupan.
        </p>
      </div>
    </div>
  );
};

export default Educational;
