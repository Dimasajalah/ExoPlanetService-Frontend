import React, { useState } from "react";

export default function Observation() {
  const [diameter, setDiameter] = useState(6);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  // Dummy exoplanet options, bisa diganti sesuai kebutuhan
  const exoplanets = [
    { value: "", label: "Select Exoplanet" },
    // { value: "planet1", label: "Planet 1" },
    // { value: "planet2", label: "Planet 2" },
  ];

  return (
    <>
      <style>{`
        body { margin: 0; }
        canvas { display: block; }
        .label {
            color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 12px;
            position: absolute;
            background: rgba(0,0,0,0.6);
            padding: 2px 5px;
            border-radius: 3px;
        }
        #css-renderer {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
        }
        #controls {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 100;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #diameterRange {
            -webkit-appearance: none;
            appearance: none;
            width: 250px;
            height: 10px;
            background: #ddd;
            border-radius: 5px;
            outline: none;
            opacity: 0.9;
            transition: opacity .2s ease;
        }
        #diameterRange:hover {
            opacity: 1;
        }
        #diameterRange::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
            transition: background .3s ease;
        }
        #diameterRange::-webkit-slider-thumb:hover {
            background: #0578d7;
        }
        #diameterRange::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0578d7;
            cursor: pointer;
            transition: background .3s ease;
        }
        #diameterRange::-moz-range-thumb:hover {
            background: #0578d7;
        }
        #diameterValue {
            font-size: 18px;
            font-weight: bold;
            margin-left: 10px;
        }
        input[type="number"] {
            font-size: 16px;
            padding: 5px;
            width: 70px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f8f8f8;
        }
        select {
            font-size: 16px;
            padding: 5px;
            border-radius: 5px;
        }
        #charPlanetDropdown {
            background-color: #2e2e2e;
            border: 1px solid #0578d7;
            border-radius: 10px;
            color: white;
            padding: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            outline: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            transition: box-shadow 0.3s ease;
        }
        #charPlanetDropdown option {
            background-color: #2e2e2e;
            color: white;
            padding: 5px;
        }
        #charPlanetDropdown:hover {
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
        }
        #charPlanetDropdown:focus {
            border-color: #3ca2d4;
            box-shadow: 0 0 10px rgba(102, 204, 255, 0.8);
        }
        #charPlanetDropdown::-webkit-scrollbar {
            width: 10px;
        }
        #charPlanetDropdown::-webkit-scrollbar-thumb {
            background-color: #0578d7;
            border-radius: 10px;
        }
        #charPlanetDropdown::-webkit-scrollbar-track {
            background: #2e2e2e;
            border-radius: 10px;
        }
        #charPlanetContainer label {
            margin-bottom: 5px;
        }
      `}</style>
      <div id="controls">
        {/* Slider untuk diameter */}
        <label htmlFor="diameterRange">Diameter:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="range"
            id="diameterRange"
            min="5"
            max="15"
            step="0.1"
            value={diameter}
            onChange={e => setDiameter(e.target.value)}
          />
          <span id="diameterValue">{diameter}</span>
        </div>
      </div>
      <div
        id="charPlanetContainer"
        style={{ position: "absolute", top: 100, left: 10 }}
      >
        <select
          id="charPlanetDropdown"
          size={5}
          style={{ overflowY: "auto", width: 160, height: 70 }}
          value={selectedPlanet}
          onChange={e => setSelectedPlanet(e.target.value)}
        >
          {exoplanets.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}