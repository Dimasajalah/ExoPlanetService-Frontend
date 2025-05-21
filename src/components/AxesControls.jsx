// AxesControls.jsx
import React from "react";
import { usePlotSettings } from "./PlotSettingsContext";
import { useCsvData } from "./CsvDataContext";

const AxesControls = () => {
  const { axesSettings, setAxesSettings } = usePlotSettings();
  const { csvColumns, loading } = useCsvData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAxesSettings((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading CSV columns...</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
      <h2 className="font-semibold mb-2 text-lg">Axes Controls</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* NEW: Select X and Y columns */}
        <div>
          <label className="block font-medium mb-1">X Axis Column</label>
          <select
            name="xColumn"
            value={axesSettings.xColumn || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select X Column --</option>
            {csvColumns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Y Axis Column</label>
          <select
            name="yColumn"
            value={axesSettings.yColumn || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Y Column --</option>
            {csvColumns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        {/* Existing settings (scaling, labels, etc.) */}
        <div>
          <label className="block font-medium mb-1">X-Axis Scaling</label>
          <select
            name="xScale"
            value={axesSettings.xScale}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="linear">Linear</option>
            <option value="log">Logarithmic</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Y-Axis Scaling</label>
          <select
            name="yScale"
            value={axesSettings.yScale}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="linear">Linear</option>
            <option value="log">Logarithmic</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">X Axis Label</label>
          <input
            name="xLabel"
            value={axesSettings.xLabel}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="X Axis Label"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Y Axis Label</label>
          <input
            name="yLabel"
            value={axesSettings.yLabel}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Y Axis Label"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Plot Title</label>
          <input
            name="title"
            value={axesSettings.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Plot Title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Axis Color</label>
          <input
            type="color"
            name="axisColor"
            value={axesSettings.axisColor}
            onChange={handleChange}
            className="w-full h-10 p-1 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Label Color</label>
          <input
            type="color"
            name="labelColor"
            value={axesSettings.labelColor}
            onChange={handleChange}
            className="w-full h-10 p-1 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Background Color</label>
          <input
            type="color"
            name="backgroundColor"
            value={axesSettings.backgroundColor}
            onChange={handleChange}
            className="w-full h-10 p-1 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AxesControls;
