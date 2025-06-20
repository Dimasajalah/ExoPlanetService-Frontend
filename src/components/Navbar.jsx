// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserSuccess } from '../redux/user/userSlice';
import { useTheme } from '../KeplerConfirmed/src/context/ThemeContext2';

const base = "/kepler";

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user);
  console.log("🔍 currentUser dari Redux:", currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    fetch('/api/auth/signout', { method: 'POST', credentials: 'include' });
    dispatch(signOutUserSuccess());
    navigate('/login');
  };

  return (
    <nav className={`sticky top-0 z-50 px-4 py-3 font-['Roboto Mono'] border-b shadow-sm ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={`${base}/`} className="text-xl font-bold text-blue-800 dark:text-white">
          ExoPlorers
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-2xl"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav Links */}
        <ul className={`flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 absolute md:static top-16 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} md:bg-transparent px-4 py-3 md:p-0 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
          <NavItem to={`${base}/`} label="Home" />
          <NavItem to={`${base}/about`} label="Tentang Kita" />
          <NavItem to={`${base}/contact`} label="Kontak" />
          <NavItem to={`${base}/system-list`} label="Sistem" />
          <NavItem to={`${base}/resources`} label="Resources" />
        </ul>

        {/* Right Section: Toggle & Auth */}
        <div className="flex items-center space-x-4">
          {/* Toggle Dark Mode */}
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border hover:scale-105 transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className={`absolute right-0 mt-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg border w-48 text-sm overflow-hidden`}>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      👤 Profile
                    </Link>

                    {/* Admin Panel (Only for Admins) */}
                    {isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        🛠️ Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-slate-700 px-4 py-2 rounded-full hover:bg-slate-800 text-sm md:text-base transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Navbar;
