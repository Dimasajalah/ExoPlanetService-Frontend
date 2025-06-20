// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import ButtonRow from '../components/ButtonRow';
import WelcomeSection from '../components/WelcomeSection';
import background1 from '../assets/background1.jpg';
import background0 from '../assets/background0.jpg';

const sectionStyle = (bgImage) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: '4rem 0',
  position: 'relative',
  zIndex: 1,
});

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // transparan, tidak menutupi
  zIndex: 1,
};

const contentStyle = {
  position: 'relative',
  zIndex: 2,
};

const Home = () => {
  return (
    <main>
      <section style={sectionStyle(background1)} aria-label="Hero and navigation section">
        <div style={overlayStyle} />
        <div style={contentStyle}>
          <HeroSection />
          <ButtonRow />
        </div>
      </section>

      <section style={sectionStyle(background0)} aria-label="Welcome section">
        <div style={overlayStyle} />
        <div style={contentStyle}>
          <WelcomeSection />
        </div>
      </section>
    </main>
  );
};

export default Home;
