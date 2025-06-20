import React, { useState } from "react";
import logo from "../assets/shared/nasa-logo.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `ff-sans-cond uppercase text-white letter-spacing-2 underline-indicator ${
      isActive ? "active" : ""
    }`;

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      <header className="primary-header flex pa" role="banner" aria-label="Main navigation">
        <div className="logo-container">
          <img src={logo} alt="NASA Astronomy Picture of the Day logo" className="logo" />
        </div>

        <button
          className={`mobile-nav-toggle ${menuOpen ? "close" : "open"}`}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          id="primary-navigation"
          className={`navbar ${menuOpen ? "open" : "closed"}`}
          role="navigation"
        >
          <ul className="primary-navigation flex" onClick={closeMenu}>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/destination" className={navLinkClass}>
                <span aria-hidden="true">01</span> Destination
              </NavLink>
            </li>
            <li>
              <NavLink to="/crew" className={navLinkClass}>
                <span aria-hidden="true">02</span> Crew
              </NavLink>
            </li>
            <li>
              <NavLink to="/technology" className={navLinkClass}>
                <span aria-hidden="true">03</span> Technology
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

