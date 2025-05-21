import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [exoplanets, setExoplanets] = useState([]);
  const [planetaryData, setPlanetaryData] = useState([]);
  const [tessCandidates, setTessCandidates] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("exoplanets");

  const slugify = (name) =>
    name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exoRes, sysRes, tessRes] = await Promise.all([
          axios.get("/api/exoplanets"),
          axios.get("/api/planetary-systems"),
          axios.get("/api/tess-candidates"),
        ]);
        setExoplanets(exoRes.data);
        setPlanetaryData(sysRes.data);
        setTessCandidates(tessRes.data);
      } catch (err) {
        setError("Failed to load some datasets.");
      }
    };

    fetchData();
  }, []);

  const discoveryMethods = [
    ...new Set(exoplanets.map((p) => p.discoverymethod).filter(Boolean)),
  ];
  const planetTypes = [
    ...new Set(exoplanets.map((p) => p.pl_type || p.type).filter(Boolean)),
  ];

  const filteredExoplanets = exoplanets.filter((planet) => {
    const matchesSearch =
      planet.pl_name?.toLowerCase().includes(search.toLowerCase());
    const matchesMethod =
      !methodFilter || planet.discoverymethod === methodFilter;
    const matchesType =
      !typeFilter || (planet.pl_type || planet.type) === typeFilter;
    return matchesSearch && matchesMethod && matchesType;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-4">Filter & Search</h2>
        {/* Search */}
        <input
          type="text"
          placeholder="Cari exoplanet..."
          className="mb-4 px-3 py-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Filter Metode Penemuan */}
        <div>
          <label className="font-semibold">Metode Penemuan</label>
          <select
            className="mt-1 block w-full border rounded px-2 py-1"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="">Semua</option>
            {discoveryMethods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        {/* Filter Tipe Planet */}
        <div>
          <label className="font-semibold">Tipe Planet</label>
          <select
            className="mt-1 block w-full border rounded px-2 py-1"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Semua</option>
            {planetTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#736262] p-6 text-white text-center text-4xl font-bold shadow">
          ADMIN PANEL
        </header>

        <main className="flex-1 px-8 py-8">
          <div className="text-center my-10">
            <Link
              to="/explore-data"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              Explore Planetary Data (Scatter + Histogram)
            </Link>
          </div>

          {/* Dataset Toggle */}
          <div className="text-center mb-8">
            <label className="mr-3 font-semibold text-lg">Tampilkan Dataset:</label>
            <select
              className="px-4 py-2 border rounded"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              <option value="exoplanets">Eksoplanet</option>
              <option value="planetary">Planetary Systems</option>
              <option value="tess">TESS Candidates</option>
            </select>
          </div>

          {/* EXOPLANETS */}
          {selectedDataset === "exoplanets" && (
            <section className="my-8">
              <h2 className="text-2xl font-bold mb-4">Eksoplanet Terkonfirmasi</h2>
              {error && <p className="text-red-600">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExoplanets.slice(0, 15).map((planet, index) => (
                  <div key={index} className="border border-gray-300 p-4 rounded shadow-md bg-gray-50">
                    <img
                      src="/images/exoplanet-placeholder.jpg"
                      alt="Exoplanet"
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      <Link
                        to={`/planet/${slugify(planet.pl_name)}`}
                        className="text-blue-600 hover:underline"
                      >
                        {planet.pl_name}
                      </Link>
                    </h3>
                    <p><strong>Metode Penemuan:</strong> {planet.discoverymethod}</p>
                    <p><strong>Periode Orbit:</strong> {planet.pl_orbper || "N/A"} hari</p>
                    <p><strong>Radius:</strong> {planet.pl_radj || "N/A"} Jupiter</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PLANETARY SYSTEMS */}
          {selectedDataset === "planetary" && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-4">Planetary Systems Composite Parameters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {planetaryData.slice(0, 15).map((item, index) => (
                  <div key={index} className="border border-gray-300 p-4 rounded shadow-md bg-gray-50">
                    <img
                      src="/images/exoplanet-placeholder.jpg"
                      alt="Planetary System"
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-xl font-bold mb-2">{item.pl_name}</h3>
                    <p><strong>Host Star:</strong> {item.hostname}</p>
                    <p><strong>Metode Penemuan:</strong> {item.discoverymethod}</p>
                    <p><strong>Periode Orbit:</strong> {item.pl_orbper || "N/A"} hari</p>
                    <p><strong>Radius:</strong> {item.pl_radj || "N/A"} Jupiter</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TESS CANDIDATES */}
          {selectedDataset === "tess" && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-4">TESS Planet Candidates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tessCandidates.slice(0, 15).map((item, index) => (
                  <div key={index} className="border border-gray-300 p-4 rounded shadow-md bg-gray-50">
                    <img
                      src="/images/exoplanet-placeholder.jpg"
                      alt="TESS Candidate"
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-xl font-bold mb-2">{item.pl_name || `TOI ${item.toi}`}</h3>
                    <p><strong>TIC ID:</strong> {item.tid}</p>
                    <p><strong>TOI:</strong> {item.toi}</p>
                    <p><strong>Periode Orbit:</strong> {item.pl_orbper || "N/A"} hari</p>
                    <p><strong>Radius:</strong> {item.pl_rade || "N/A"} Bumi</p>
                    <p><strong>Temperatur Bintang:</strong> {item.st_teff || "N/A"} K</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-[#898080] text-white p-6 text-center">
          <p className="text-lg font-semibold">
            Menampilkan {filteredExoplanets.length} eksoplanet, {planetaryData.length} sistem planet, dan {tessCandidates.length} kandidat TESS
          </p>
          <p>Berdasarkan NASA Exoplanet Archive</p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;










