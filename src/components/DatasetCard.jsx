// src/components/DatasetCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const DatasetCard = ({ type, data, slugify }) => {
  const title = data.pl_name || (type === "tess" && data.toi ? `TOI ${data.toi}` : "Tidak diketahui");

  const detailLink = `/details/${type}/${slugify(title)}`;

  const imageAlt = {
    exoplanets: "Exoplanet",
    planetary: "Planetary System",
    tess: "TESS Candidate",
  }[type] || "Dataset";

  const radius =
    type === "tess"
      ? `${data.pl_rade ?? "N/A"} R⊕`
      : `${data.pl_radj ?? "N/A"} R♃`;

  // Metadata untuk setiap jenis data
  const metadata = {
    exoplanets: [
      { label: "Metode Penemuan", value: data.discoverymethod },
      { label: "Periode Orbit", value: `${data.pl_orbper ?? "N/A"} hari` },
      { label: "Radius", value: radius },
    ],
    planetary: [
      { label: "Host Star", value: data.hostname },
      { label: "Metode Penemuan", value: data.discoverymethod },
      { label: "Periode Orbit", value: `${data.pl_orbper ?? "N/A"} hari` },
      { label: "Radius", value: radius },
    ],
    tess: [
      { label: "TIC ID", value: data.tid || "N/A" },
      { label: "TOI", value: data.toi || "N/A" },
      { label: "Periode Orbit", value: data.pl_orbper ? `${data.pl_orbper} hari` : "N/A" },
      { label: "Radius", value: data.pl_rade ? `${data.pl_rade} R⊕` : "N/A" },
      { label: "Temperatur Bintang", value: data.st_teff ? `${data.st_teff} K` : "N/A" },
    ],

  };

  return (
    <div className="border border-gray-300 p-4 rounded shadow-md bg-gray-50 hover:shadow-lg transition">
      <img
        src="/images/exoplanet-placeholder.jpg"
        alt={imageAlt}
        className="w-full h-40 object-cover rounded mb-3 aspect-video"
      />

      <h3 className="text-xl font-bold mb-2 text-blue-700 hover:underline">
        <Link to={detailLink}>{title}</Link>
      </h3>

      <div className="text-sm text-gray-700 space-y-1">
        {metadata[type]?.map(({ label, value }, index) => (
          <p key={index}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DatasetCard;
