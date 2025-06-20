import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import aboutImage from '../assets/about1.jpg';
import visionImage from '../assets/vision1.jpg';
import missionImage from '../assets/mission1.jpg';
import teamImage from '../assets/team.jpg';

const AboutUs = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? '#111' : '#f9f9f9';
  const textColor = isDarkMode ? '#f1f1f1' : '#111';

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, fontFamily: 'Poppins', padding: '2rem' }}>
      <Helmet>
        <title>About Us | ExoPlanet Explorer</title>
        <meta
          name="Deskripsi"
          content="Aplikasi interaktif berbasis ReactJS dan Flask untuk visualisasi data exoplanet secara edukatif dan eksploratif."
        />
      </Helmet>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}
      >
        Tentang Aplikasi
      </motion.h1>

      <Section
        title="Apa itu Exoplorers?"
        text="Exoplorers adalah aplikasi website interaktif yang dikembangkan untuk membantu pengguna, termasuk pelajar dan masyarakat umum, dalam memahami data exoplanet secara visual. Aplikasi ini menampilkan data ilmiah dari NASA Exoplanet Archive melalui visualisasi seperti tabel, scatter plot, dan histogram, serta mendukung fitur pencarian, filter, dan eksplorasi parameter planet secara real-time."
        image={aboutImage}
        reverse={false}
        textColor={textColor}
      />
      <Section
        title="Visi Pengembangan"
        text="Visi kami adalah menciptakan platform edukatif berbasis web yang responsif, mudah diakses, dan dapat menjembatani data ilmiah dengan pengalaman pengguna yang intuitif. Dengan teknologi ReactJS dan Flask, kami ingin memperkenalkan astronomi modern melalui visualisasi data yang dapat diakses oleh siapa pun, kapan pun."
        image={visionImage}
        reverse={true}
        textColor={textColor}
      />
      <Section
        title="Misi Aplikasi Ini"
        text="Aplikasi ini bertujuan menyediakan cara baru untuk mempelajari exoplanet menggunakan pendekatan Software Engineering modern: mulai dari pemisahan frontend-backend berbasis komponen, API berbasis REST, hingga fitur interaktif yang disusun dalam arsitektur modular. Misi utama adalah membuat sains terasa menyenangkan dan bisa dijelajahi secara mandiri oleh pengguna melalui antarmuka yang ramah."
        image={missionImage}
        reverse={false}
        textColor={textColor}
      />
      <Section
        title="Tim Pengembang"
        text="Proyek ini dikembangkan sebagai bagian dari penelitian skripsi di Program Studi Informatika, UPN 'Veteran' Jakarta. Aplikasi ini memanfaatkan metodologi SDLC hybrid, memadukan pendekatan Waterfall dan Agile dalam pengembangan, serta mengintegrasikan teknologi modern seperti ReactJS, Flask, MongoDB, dan D3.js untuk mendukung visualisasi data yang kompleks dan interaktif."
        image={teamImage}
        reverse={true}
        textColor={textColor}
      />
    </div>
  );
};

const Section = ({ title, text, image, reverse, textColor }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '4rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, minWidth: '280px' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        />
      </div>
      <article style={{ flex: 1, minWidth: '280px', color: textColor }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{title}</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
      </article>
    </motion.section>
  );
};

export default AboutUs;
