import React from "react";

const TessCard = ({ data }) => {
  const {
    pl_name,
    toi,
    tid,
    pl_orbper,
    pl_rade,
    st_teff
  } = data;

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition">
      <img
        src="/images/exoplanet-placeholder.jpg"
        alt={`TESS Candidate ${pl_name || toi}`}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-xl font-bold mb-2 text-blue-700">
        {pl_name || `TOI ${toi}`}
      </h3>
      <div className="text-sm space-y-1 text-gray-700">
        <p><strong>TIC ID:</strong> {tid || "N/A"}</p>
        <p><strong>TOI:</strong> {toi || "N/A"}</p>
        <p><strong>Periode Orbit:</strong> {pl_orbper || "N/A"} hari</p>
        <p><strong>Radius:</strong> {pl_rade || "N/A"} Bumi</p>
        <p><strong>Temperatur Bintang:</strong> {st_teff || "N/A"} K</p>
      </div>
    </div>
  );
};

export default TessCard;
