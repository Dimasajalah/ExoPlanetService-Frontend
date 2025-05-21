import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/About_Exoplanet';
import Catalog from './pages/catalog';
import Catalog2 from './pages/catalog2';
import First_Tools from './pages/First_Tools';
import Galery from './pages/Galery';
import Home2 from './pages/Home2';
import Login from './pages/Signin';
import Mainpage from './pages/mainpage';
import PeriodogramPage from './pages/Periodogram_page';
import Periodogram from './pages/Periodogram';
import Plot from './pages/Plot';
import Polar from './pages/Polar';
import Signup from './pages/Signup';
import Tools from './pages/Tools';
import Admin from './pages/Admin';
import PlanetarySystems from './pages/PlanetarySystems';
import TESSCandidates from './pages/TESSCandidates';
import Microlensing from './pages/Microlensing';
import StellarHosts from './pages/StellarHosts';
import KeplerNames from './pages/KeplerNames';
import K2Names from './pages/K2Names';
import K2PlanetsCandidates from './pages/K2PlanetsCandidates';
import Ukirt from './pages/Ukirtan';
import Keltian from './pages/Keltian';
import SuperWASP from './pages/SuperWASP';
import HWOStars from './pages/HWOStars';
import TransitingPlanets from './pages/TransitingPlanets';
import KOICumulative from './pages/KOICumulative';
import KOIQ1Q6 from './pages/KOIQ1Q6';
import KOIQ1Q8 from './pages/KOIQ1Q8';
import KOIQ1Q16 from './pages/KOIQ1Q16';
import KOIQ1Q17DR24 from './pages/KOIQ1Q17DR24';
import KOIQ1Q17DR25 from './pages/KOIQ1Q17DR25';
import KOIQ1Q17DR25Supplemental from './pages/KOIQ1Q17DR25Supplemental';
import PredictMass from './components/PredictMass';
import { CsvDataProvider } from "./components/CsvDataContext";
import { PlotSettingsProvider } from "./components/PlotSettingsContext";
import ScatterHistogramLayout from "./components/ScatterHistogramLayout";
import Services from "./service/services";
import Observation from "./Observation/Observation";
import KeplerConfirmedApp from './KeplerConfirmed/src/KeplerConfirmedApp';
import Navbar from './KeplerConfirmed/src/components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <CsvDataProvider>
        <PlotSettingsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/explore-data" element={<ScatterHistogramLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog2" element={<Catalog2 />} />
            <Route path="/first_tools" element={<First_Tools />} />
            <Route path="/galery" element={<Galery />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/periodogramPage" element={<PeriodogramPage />} />
            <Route path="/periodogram" element={<Periodogram />} />
            <Route path="/plot" element={<Plot />} />
            <Route path="/polar" element={<Polar />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/home" element={<Home />} />
            <Route path="/planetary-systems" element={<PlanetarySystems />} />
            <Route path="/tess-candidates" element={<TESSCandidates />} />
            <Route path="/microlensing" element={<Microlensing />} />
            <Route path="/stellar-hosts" element={<StellarHosts />} />
            <Route path="/kepler-names" element={<KeplerNames />} />
            <Route path="/k2-names" element={<K2Names />} />
            <Route path="/k2-planets-candidates" element={<K2PlanetsCandidates />} />
            <Route path="/ukirt" element={<Ukirt />} />
            <Route path="/kelt" element={<Keltian />} />
            <Route path="/superwasp" element={<SuperWASP />} />
            <Route path="/hwo-stars" element={<HWOStars />} />
            <Route path="/transiting-planets" element={<TransitingPlanets />} />
            <Route path="/koi-cumulative" element={<KOICumulative />} />
            <Route path="/koi-q1q6" element={<KOIQ1Q6 />} />
            <Route path="/koi-q1q8" element={<KOIQ1Q8 />} />
            <Route path="/koi-q1q16" element={<KOIQ1Q16 />} />
            <Route path="/koi-q1q17-dr24" element={<KOIQ1Q17DR24 />} />
            <Route path="/koi-q1q17-dr25" element={<KOIQ1Q17DR25 />} />
            <Route path="/koi-q1q17-dr25-supplemental" element={<KOIQ1Q17DR25Supplemental />} />
            <Route path="/predict-mass" element={<PredictMass />} />
            <Route path="/service/*" element={<Services />} />
            <Route path="/observation" element={<Observation />} />
            <Route path="/kepler/*" element={<KeplerConfirmedApp />} />
          </Routes>
        </PlotSettingsProvider>
      </CsvDataProvider>
    </BrowserRouter>
  );
}

