// src/components/WelcomeSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  font-family: 'Poppins', sans-serif;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: #ffffff;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
  position: relative;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

const WelcomeSection = () => {
  return (
    <Section role="region" aria-labelledby="welcome-title">
      <Title id="welcome-title">Selamat Datang di Exoplorers</Title>
      <Paragraph>
        Pernah bertanya-tanya apa yang ada di luar tata surya kita? 🌍✨<br /><br />
        <strong>Exoplorers</strong> adalah pusat interaktif untuk belajar, menjelajah, dan berinteraksi dengan data nyata dari NASA dan badan antariksa lainnya. 
        Baik kamu siswa penasaran atau penggemar luar angkasa, semua bisa mulai di sini.
      </Paragraph>
    </Section>
  );
};

export default WelcomeSection;
