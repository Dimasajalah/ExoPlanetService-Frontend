import {
  FaRocket, FaLock, FaUser, FaStar, FaGlobe,
  FaInfoCircle, FaFlask, FaSolarPanel, FaBookOpen,
  FaUserAstronaut, FaImage, FaSatellite, FaQuestionCircle,
  FaPhone, FaServer, FaDatabase, FaMapMarkedAlt
} from 'react-icons/fa';

export const routes = [
  { path: '/explore-data', label: 'Jelajahi Data', gradient: 'linear-gradient(to right, #9333ea, #6366f1)', icon: <FaRocket /> },
  { path: '/login', label: 'Login', gradient: 'linear-gradient(to right, #e11d48, #f43f5e)', icon: <FaLock /> },
  { path: '/signup', label: 'Signup', gradient: 'linear-gradient(to right, #10b981, #34d399)', icon: <FaUser /> },
  { path: '/profile', label: 'Profile', gradient: 'linear-gradient(to right, #f59e0b, #fbbf24)', icon: <FaStar /> },
  { path: '/nasamain', label: 'NASA Main', gradient: 'linear-gradient(to right, #0f172a, #1e293b)', icon: <FaGlobe /> },
  { path: '/about', label: 'Tentang Kita', gradient: 'linear-gradient(to right, #3b0764, #9333ea)', icon: <FaInfoCircle /> },
  { path: '/system-list', label: 'Eksplorasi Sistem Exoplanet', gradient: 'linear-gradient(to right, #0ea5e9, #38bdf8)', icon: <FaSolarPanel /> },
  { path: '/educational', label: 'Cerita Tentang Exoplanet', gradient: 'linear-gradient(to right, #6366f1, #818cf8)', icon: <FaBookOpen /> },
  { path: '/system-details', label: 'Detail Sistem', gradient: 'linear-gradient(to right, #0284c7, #06b6d4)', icon: <FaDatabase /> },
  { path: '/quiz-list', label: 'Kuis Tentang Astronomi', gradient: 'linear-gradient(to right, #d97706, #fbbf24)', icon: <FaQuestionCircle /> },
  { path: '/hologram', label: 'Fitur Hologram', gradient: 'linear-gradient(to right, #8b5cf6, #a78bfa)', icon: <FaSatellite /> },
  { path: '/contact', label: 'Kontak Kita', gradient: 'linear-gradient(to right, #14b8a6, #2dd4bf)', icon: <FaPhone /> },
  { path: '/resources', label: 'Referensi Website', gradient: 'linear-gradient(to right, #4ade80, #86efac)', icon: <FaBookOpen /> },
  { path: '/admin', label: 'Katalog Exoplanet', gradient: 'linear-gradient(to right, #ef4444, #f87171)', icon: <FaServer /> },
  { path: '/nasa-photo', label: 'Foto dari NASA', gradient: 'linear-gradient(to right, #3b82f6, #60a5fa)', icon: <FaImage /> },
  { path: '/destination', label: 'Fitur Exploratif untuk destinasi', gradient: 'linear-gradient(to right, #7c3aed, #8b5cf6)', icon: <FaMapMarkedAlt /> },
  { path: '/crew', label: 'Informasi Astronaut NASA', gradient: 'linear-gradient(to right, #f43f5e, #fb7185)', icon: <FaUserAstronaut /> },
  { path: '/technology', label: 'Info Teknologi', gradient: 'linear-gradient(to right, #06b6d4, #67e8f9)', icon: <FaFlask /> },
];
