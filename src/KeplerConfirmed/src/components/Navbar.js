// src/components/Navbar.jsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const base = "/kepler";

// Tambahkan fungsi untuk menambahkan timestamp di URL
function appendTimestamp(url) {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
}

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    console.log('Navbar rerendered. currentUser.avatar:', currentUser?.avatar);
  }, [currentUser?.avatar]);

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to={`${base}/`} style={styles.navLink}>Home</Link></li>
        <li><Link to={`${base}/about`} style={styles.navLink}>About</Link></li>
        <li><Link to={`${base}/contact`} style={styles.navLink}>Contact</Link></li>
        <li><Link to={`${base}/system-list`} style={styles.navLink}>Systems</Link></li>
        <li><Link to={`${base}/resources`} style={styles.navLink}>Resources</Link></li>

        <li style={styles.profileItem}>
          {currentUser ? (
            <Link to="/profile" style={styles.avatarLink}>
              <img
                key={appendTimestamp(currentUser.avatar)}
                src={
                  currentUser.avatar
                    ? appendTimestamp(currentUser.avatar)
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt="profile"
                style={styles.avatar}
              />
            </Link>
          ) : (
            <Link to="/login" style={styles.navLink}>Sign in</Link>
          )}
        </li>
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 12px',
    transition: 'color 0.2s',
  },
  profileItem: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarLink: {
    display: 'inline-block',
    padding: '4px',
    borderRadius: '50%',
    transition: 'transform 0.2s',
  },
  avatar: {
    height: 40,
    width: 40,
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #ccc',
  },
};

export default Navbar;
