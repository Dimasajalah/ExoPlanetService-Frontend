// src/components/Footer.jsx

import React from "react";
import GithubLogo from "./shared/githubLogo.svg";
import LinkedinLogo from "./shared/linkedinLogo.svg";
import SpaceLogo from "./shared/log.svg";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-amber-200 text-center py-8 px-4 font-sans">
      <p className="text-lg font-semibold mb-2">Untuk Para Penggemar Antariksa</p>
      <p className="text-gray-400 text-sm mb-4">
        Dimas Anggoro Sakti
        <span className="mx-2 text-black font-bold">|</span>
        <span className="text-gray-400">React Frontend Developer</span>
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/Dimasajalah"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <img
            src={GithubLogo}
            alt="GitHub"
            className="w-8 h-8 rounded-full bg-white p-1 transition-transform hover:scale-110 hover:shadow-md focus:outline-none"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/dimas-anggoro-sakti-a1ab92225/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <img
            src={LinkedinLogo}
            alt="LinkedIn"
            className="w-8 h-8 rounded-full bg-white p-1 transition-transform hover:scale-110 hover:shadow-md focus:outline-none"
          />
        </a>
        <a href="/nasa-photo" aria-label="NASA Photo Page">
          <img
            src={SpaceLogo}
            alt="Space Logo"
            className="w-8 h-8 rounded-full bg-white p-1 transition-transform hover:scale-110 hover:shadow-md focus:outline-none"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
