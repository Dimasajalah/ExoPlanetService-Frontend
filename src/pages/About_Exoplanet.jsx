import React from 'react';
import { Outlet } from 'react-router-dom';

const About_Exoplanet = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="bg-[#a08383] py-6 mb-8">
        <h1 className="text-4xl text-white font-bold text-center">KATALOG EXOPLANET</h1>
        <nav className="flex justify-center gap-6 mt-4 text-white font-bold text-xl">
          <span className="text-[#c0acac]">Home</span>
          <span>Katalog</span>
          <span>Plot</span>
          <span>Tools</span>
          <span>Login</span>
        </nav>
      </header>

      {/* Hero Image */}
      <img src="video.png" alt="Video banner" className="w-full h-auto mb-12" />

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-5xl font-bold text-black mb-6">APAKAH ITU EXOPLANET?</h2>
        <p className="text-2xl text-black">
          Sejauh ini, para ilmuwan telah mengkategorikan eksoplanet ke dalam beberapa jenis berikut: Raksasa gas, Neptunus, Bumi super, dan Bumi terestrial.
        </p>
        <p className="text-2xl text-black mt-4">
          Planet-planet di luar tata surya kita disebut "eksoplanet", dan ukurannya sangat beragam,
          mulai dari raksasa gas yang lebih besar dari Jupiter hingga planet berbatu kecil yang
          ukurannya kira-kira sebesar Bumi atau Mars. Planet-planet tersebut bisa sangat panas hingga
          dapat mendidihkan logam atau terkunci dalam suhu beku yang sangat dingin. Mereka dapat mengorbit
          bintang-bintangnya dengan sangat rapat, atau bahkan mengorbit dua matahari sekaligus. Beberapa
          eksoplanet tidak memiliki matahari, melayang sendiri di galaksi dalam kegelapan abadi.
        </p>
      </section>

      {/* Galaksi dan Planet */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-black mb-4">Galaksi bintang – dan planet</h3>
        <p className="text-2xl text-black">
          Galaksi kita, Bima Sakti, adalah aliran bintang yang membelah langit malam. Ia berisi sedikitnya 100 miliar bintang,
          termasuk Matahari kita. Jika tiap bintang memiliki sistem planet, maka jumlah planet di galaksi tersebut sangat besar – mungkin triliunan.
        </p>
        <p className="text-2xl text-black mt-4">
          Proxima Centauri, bintang tetangga terdekat kita, memiliki sedikitnya satu planet berbatu. Namun jaraknya 4 tahun cahaya
          (lebih dari 25 triliun mil). Sebagian besar eksoplanet yang ditemukan bahkan lebih jauh. Meskipun kita belum bisa mengunjungi mereka,
          kita dapat mempelajarinya, mengukur suhu dan atmosfernya, dan mencari tanda-tanda kehidupan.
        </p>
      </section>

      {/* Penemuan dan Misteri */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-black mb-4">Penemuan exoplanet – dan misteri</h3>
        <p className="text-2xl text-black">
          Eksoplanet pertama ditemukan pada awal 1990-an. Salah satu yang paling terkenal adalah 51 Pegasi b – "hot Jupiter"
          yang mengorbit bintang mirip Matahari. Sejak 1995, ribuan eksoplanet telah ditemukan.
        </p>
        <p className="text-2xl text-black mt-4">
          Para ilmuwan mengamati "radius valley" – jarak langka antara planet berdiameter 1.5 hingga 2 kali Bumi.
          Planet-planet dalam kisaran ini bisa jadi mengembangkan atmosfer tebal atau tetap berbatu karena ukurannya.
          Untuk memahami fenomena ini, kita harus lebih memahami proses pembentukan sistem planet.
        </p>
      </section>

      {/* Gambar dan Penjelasan */}
      <section className="mb-12">
        <img
          src="rectangle-166.jpeg"
          alt="Ilustrasi eksoplanet"
          className="w-full max-w-4xl mx-auto rounded-lg mb-4"
        />
        <p className="text-base text-black text-center max-w-3xl mx-auto">
          Keragaman adalah tema utama dalam penemuan eksoplanet selama 25 tahun terakhir. Sebagian besar ditemukan dengan metode "transit",
          yaitu mengamati bayangan kecil saat planet melintasi bintangnya.
        </p>
      </section>

      {/* Jenis-jenis Exoplanet */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-black mb-4">Jenis-jenis exoplanet</h3>
        <p className="text-2xl text-black">
          (Tambahkan konten jenis-jenis eksoplanet di sini jika ada)
        </p>
      </section>

      {/* Nested route content appears here */}
      <Outlet />
    </div>
  );
};

export default About_Exoplanet;

