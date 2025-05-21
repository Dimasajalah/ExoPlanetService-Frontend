import React from 'react';
import { Link } from 'react-router-dom';

const base = "/kepler";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to={`${base}/`} style={styles.navLink}>Home</Link></li>
        <li><Link to={`${base}/about`} style={styles.navLink}>About</Link></li>
        <li><Link to={`${base}/contact`} style={styles.navLink}>Contact</Link></li>
        <li><Link to={`${base}/system-list`} style={styles.navLink}>Systems</Link></li>
        <li><Link to={`${base}/resources`} style={styles.navLink}>Resources</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    padding: '10px 0',
    backgroundColor: 'white',
    textAlign: 'center',
    zIndex: 10,
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navLink: {
    color: 'black',
    padding: '0 20px',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
