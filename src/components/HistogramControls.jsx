import React, { useState, useEffect } from "react";
import { usePlotSettings } from "./PlotSettingsContext";

const HistogramControls = ({ isOpen, onClose, columns }) => {
  const { histogramSettings, setHistogramSettings } = usePlotSettings();

  const [localSettings, setLocalSettings] = useState(histogramSettings);

  useEffect(() => {
    if (isOpen) {
      setLocalSettings(histogramSettings);
    }
  }, [histogramSettings, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: name === "bins" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    setHistogramSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg space-y-4">
        <h3 className="text-xl font-semibold mb-4">Histogram Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Column</label>
            <select
              name="column"
              value={localSettings.column}
              onChange={handleChange}
              className="form-select w-full border rounded p-2"
            >
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Bins</label>
            <input
              type="number"
              name="bins"
              value={localSettings.bins}
              onChange={handleChange}
              min={1}
              max={50}
              className="form-input w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Histogram Label</label>
            <input
              type="text"
              name="label"
              value={localSettings.label}
              onChange={handleChange}
              className="form-input w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">X-Axis Label</label>
            <input
              type="text"
              name="xLabel"
              value={localSettings.xLabel}
              onChange={handleChange}
              className="form-input w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bar Color</label>
            <input
              type="color"
              name="fillColor"
              value={localSettings.fillColor}
              onChange={handleChange}
              className="form-input w-full p-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Border Color</label>
            <input
              type="color"
              name="borderColor"
              value={localSettings.borderColor}
              onChange={handleChange}
              className="form-input w-full p-1"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistogramControls;
