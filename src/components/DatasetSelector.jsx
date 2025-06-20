// src/components/DatasetSelector.jsx
import React from "react";

const DatasetSelector = ({ selectedDatasets, setSelectedDatasets }) => {
  const datasetOptions = [
    { label: "Exoplanet", value: "exoplanets" },
    { label: "Planetary System", value: "planetary" },
    { label: "TESS Candidate", value: "tess" },
  ];

  const toggleDataset = (value) => {
    if (selectedDatasets.includes(value)) {
      setSelectedDatasets(selectedDatasets.filter((item) => item !== value));
    } else {
      setSelectedDatasets([...selectedDatasets, value]);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Pilih Dataset</h2>
      <div className="flex flex-col gap-2">
        {datasetOptions.map(({ label, value }) => (
          <label key={value} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              value={value}
              checked={selectedDatasets.includes(value)}
              onChange={() => toggleDataset(value)}
              aria-label={`Tampilkan data ${label}`}
              className="form-checkbox text-blue-600"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DatasetSelector;
