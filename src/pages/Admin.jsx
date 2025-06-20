// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import DatasetCard from "../components/DatasetCard";
import FilterSidebar from "../components/FilterSidebar";
import DatasetSelector from "../components/DatasetSelector";
import TessCard from "../components/TessCard";

const Admin = () => {
  const [exoplanets, setExoplanets] = useState([]);
  const [planetaryData, setPlanetaryData] = useState([]);
  const [tessCandidates, setTessCandidates] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedDatasets, setSelectedDatasets] = useState([
    "exoplanets",
    "planetary",
    "tess",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const slugify = (name) =>
    name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const parseTess = (resData) => {
    if (resData.metadata && resData.data) {
      const keys = resData.metadata.map((col) => col.name);
      return resData.data.map((row) => {
        const obj = Object.fromEntries(row.map((val, i) => [keys[i], val]));
        return obj; // biarkan tampil apa adanya
      });
    }
    return resData;
  };


  useEffect(() => {
    const fetchDataset = async (endpoint, setter, parseFn) => {
      try {
        const res = await axios.get(endpoint);
        const data = parseFn ? parseFn(res.data) : res.data;
        setter(data);
      } catch {
        setError((prev) => prev + `\nGagal mengambil data dari ${endpoint}`);
      }
    };

    Promise.all([
      fetchDataset("/api/exoplanets", setExoplanets),
      fetchDataset("/api/planetary-systems", setPlanetaryData),
      fetchDataset("/api/tess-candidates", setTessCandidates, parseTess),
    ]).finally(() => setIsLoading(false));
  }, []);

  const discoveryMethods = [
    ...new Set(exoplanets.map((p) => p.discoverymethod).filter(Boolean)),
  ];
  const planetTypes = [
    ...new Set(
      [...exoplanets, ...planetaryData]
        .map((p) => (p.pl_type || p.type || "").trim())
        .filter((val) => val && val.toLowerCase() !== "unknown")
    ),
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

  const filteredPlanetary = planetaryData.filter((item) => {
    const matchesSearch =
      item.pl_name?.toLowerCase().includes(search.toLowerCase());
    const matchesMethod =
      !methodFilter || item.discoverymethod === methodFilter;
    const matchesType =
      !typeFilter || (item.pl_type || item.type) === typeFilter;
    return matchesSearch && matchesMethod && matchesType;
  });

  const filteredTess = tessCandidates.filter((planet) => {
    const name = planet.pl_name || `TOI ${planet.toi}` || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

    // Karena TESS tidak punya discoverymethod atau pl_type
    const matchesMethod = true; // Jangan filter, atau buat opsi baru khusus
    const matchesType = true;   // Jangan filter, atau buat opsi baru khusus

    return matchesSearch && matchesMethod && matchesType;
  });


  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(","),
      ...data.map((row) =>
        keys.map((key) => JSON.stringify(row[key] ?? "")).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-auto">
  <div className="sticky left-0 top-0 z-10 min-w-[260px] bg-white shadow-md">
    <FilterSidebar
      search={search}
      setSearch={setSearch}
      methodFilter={methodFilter}
      setMethodFilter={setMethodFilter}
      discoveryMethods={discoveryMethods}
    />
  </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-[#736262] p-6 text-white text-center text-4xl font-bold shadow">
          Katalog Exoplanet
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

          <DatasetSelector
            selectedDatasets={selectedDatasets}
            setSelectedDatasets={setSelectedDatasets}
          />

          {selectedDatasets.includes("exoplanets") && (
            <section className="my-8">
              <h2 className="text-2xl font-bold mb-4">Eksoplanet Terkonfirmasi</h2>
              <div className="text-right mb-4">
                <button
                  onClick={() =>
                    exportToCSV(filteredExoplanets, "exoplanets_filtered")
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Export CSV
                </button>
              </div>
              {error && (
                <p className="text-red-600 whitespace-pre-line">{error}</p>
              )}
              {isLoading ? (
                <p className="text-center text-gray-500">
                  Memuat data eksoplanet...
                </p>
              ) : filteredExoplanets.length === 0 ? (
                <p className="text-center text-gray-500">
                  Tidak ada eksoplanet yang cocok dengan filter.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExoplanets.slice(0, 15).map((planet, index) => (
                    <DatasetCard
                      key={index}
                      type="exoplanets"
                      data={planet}
                      slugify={slugify}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {selectedDatasets.includes("planetary") && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-4">
                Planetary Systems Composite Parameters
              </h2>
              <div className="text-right mb-4">
                <button
                  onClick={() =>
                    exportToCSV(filteredPlanetary, "planetary_filtered")
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Export CSV
                </button>
              </div>
              {isLoading ? (
                <p className="text-center text-gray-500">
                  Memuat data sistem planet...
                </p>
              ) : filteredPlanetary.length === 0 ? (
                <p className="text-center text-gray-500">
                  Tidak ada sistem planet yang cocok dengan filter.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlanetary.slice(0, 15).map((item, index) => (
                    <DatasetCard key={index} type="planetary" data={item} slugify={slugify} />
                  ))}
                </div>
              )}

            </section>
          )}

          {selectedDatasets.includes("tess") && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-4">TESS Planet Candidates</h2>
              <div className="text-right mb-4">
                <button
                  onClick={() => exportToCSV(filteredTess, "tess_filtered")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Export CSV
                </button>
              </div>
              {isLoading ? (
                <p className="text-center text-gray-500">
                  Memuat data kandidat TESS...
                </p>
              ) : filteredTess.length === 0 ? (
                <p className="text-center text-gray-500">
                  Tidak ada kandidat TESS yang cocok dengan filter.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTess.slice(0, 15).map((item, index) => (
                    <TessCard key={index} data={item} />
                  ))}
                </div>
              )}


            </section>
          )}
        </main>

        <footer className="bg-[#898080] text-white p-6 text-center">
          <p className="text-lg font-semibold">
            Menampilkan {filteredExoplanets.length} eksoplanet, {planetaryData.length} sistem planet, dan {filteredTess.length} kandidat TESS
          </p>

          <p>Berdasarkan NASA Exoplanet Archive</p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;








