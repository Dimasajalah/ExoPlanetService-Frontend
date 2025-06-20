// src/components/HeroSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  text-align: center;
  padding: 6rem 2rem 2rem;
  z-index: 2;
  animation: ${fadeInUp} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;

const Subtext = styled.p`
  color: #dddddd;
  font-size: 1rem;
  margin-top: 0.75rem;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Exo = styled.span`
  color: #ffffff;
`;

const Plorers = styled.span`
  color: transparent;
  -webkit-text-stroke: 2px white;
  text-stroke: 2px white;
`;

const HeroSection = () => {
  return (
    <Section aria-label="Hero utama dengan judul website dan tips penggunaan">
      <Title>
        <Exo>EXO</Exo>
        <Plorers>PLORERS</Plorers>
      </Title>
      <Subtext>
        Temukan alam semesta di luar tata surya kita. <br />
        Direkomendasikan menggunakan desktop atau laptop.
      </Subtext>
    </Section>
  );
};

export default HeroSection;


