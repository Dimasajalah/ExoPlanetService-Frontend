// ButtonRow.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { routes } from '../data/routes'; // ← routes dipisahkan ke file lain

// Animasi masuk
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container utama
const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 4rem 2rem;
  text-align: center;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

// Judul
const Heading = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #eaeaea;
  text-shadow: 1px 1px 4px #000;
`;

// Subteks
const SubText = styled.p`
  margin-bottom: 2rem;
`;

// Grid tombol
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const RouteButton = styled.button`
  padding: 1rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${({ gradient }) => gradient};
  border: none;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: 3px dashed #fff;
    outline-offset: 4px;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ButtonRow = () => {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState(null);

  const handleClick = (path) => {
    setLoadingRoute(path);
    setTimeout(() => navigate(path), 100); // Simulasi delay
  };

  return (
    <nav aria-label="Navigasi Eksplorasi">
      <Container role="region" aria-labelledby="nav-eksplorasi">
        <Heading id="nav-eksplorasi">🌠 Siap Menjelajah?</Heading>
        <SubText>
          Mulailah perjalananmu hanya dengan satu klik. Pilih apa yang ingin kamu eksplorasi di bawah ini!
        </SubText>
        <Grid>
          {routes.map((route) => (
            <RouteButton
              key={route.path}
              onClick={() => handleClick(route.path)}
              gradient={route.gradient}
              aria-label={`Navigasi ke ${route.label}`}
              title={`Navigasi ke ${route.label}`}
            >
              {loadingRoute === route.path ? 'Loading...' : <>
                {route.icon}
                {route.label}
              </>}
            </RouteButton>
          ))}
        </Grid>
      </Container>
    </nav>
  );
};

export default ButtonRow;




