import React from "react";
import GithubLogo from "../assets/shared/githubLogo.svg";
import LinkedinLogo from "../assets/shared/linkedinLogo.svg";
import SpaceLogo from "../assets/shared/log.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-tagline">For Space Enthusiasts</p>
      <p className="footer-credit">
        Dimas Anggoro Sakti
        <span className="separator">|</span>
        <span className="role">React Frontend Developer</span>
      </p>
      <div className="footer-social">
        <a
          href="https://github.com/Dimasajalah"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <img src={GithubLogo} alt="GitHub" className="footer-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/dimas-anggoro-sakti-a1ab92225/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <img src={LinkedinLogo} alt="LinkedIn" className="footer-icon" />
        </a>
        <a href="/nasa-photo" aria-label="NASA Photo Page">
          <img src={SpaceLogo} alt="Space Logo" className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
