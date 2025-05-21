// LineControls.jsx
import React from "react";
import { usePlotSettings } from "./PlotSettingsContext";

const LineControls = () => {
  const { lineSettings, setLineSettings } = usePlotSettings();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLineSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
      <h2 className="font-semibold mb-2 text-lg">Line Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Line Style</label>
          <select
            name="lineStyle"
            value={lineSettings.lineStyle}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Line Color</label>
          <input
            type="color"
            name="lineColor"
            value={lineSettings.lineColor}
            onChange={handleChange}
            className="w-full h-10 p-1 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Line Width</label>
          <input
            type="range"
            name="lineWidth"
            min={1}
            max={10}
            value={lineSettings.lineWidth}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LineControls;
