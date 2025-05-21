import React from 'react';

import { Link } from 'react-router-dom';

const ButtonRow = () => {
  return (
    <div style={styles.buttonRow}>
      <Link to="/educational" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Exoplanet Story</button>
      </Link>
      <Link to="/hologram" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Launch the Hologram</button>
      </Link>
      <Link to="/system-list" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Explore the systems of our universe</button>
      </Link>
      <Link to="/quiz-list" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Planetary Quiz</button>
      </Link>
    </div>
  );
};


const styles = {
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px',
    zIndex: 2,
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#a44fb5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ButtonRow;
