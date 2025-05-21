import React, { useState, useEffect } from "react";
import { usePlotSettings } from "./PlotSettingsContext";
import { useCsvData } from "./CsvDataContext";

const ScatterControls = ({ isOpen, onClose }) => {
  const { scatterSettings, setScatterSettings} = usePlotSettings();
  const { csvColumns } = useCsvData();

  const [localSettings, setLocalSettings] = useState(scatterSettings);

  useEffect(() => {
    setLocalSettings(scatterSettings);
  }, [scatterSettings, isOpen]);

  const handleSave = () => {
    setScatterSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Scatter Settings</h3>

        <label className="block mb-2 font-medium">X Column</label>
        <select
          className="w-full mb-4 border rounded p-2"
          value={localSettings.xColumn}
          onChange={(e) =>
            setLocalSettings({ ...localSettings, xColumn: e.target.value })
          }
        >
          {csvColumns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Y Column</label>
        <select
          className="w-full mb-4 border rounded p-2"
          value={localSettings.yColumn}
          onChange={(e) =>
            setLocalSettings({ ...localSettings, yColumn: e.target.value })
          }
        >
          {csvColumns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Point Color</label>
        <input
          type="color"
          className="w-full mb-4 p-1"
          value={localSettings.pointColor}
          onChange={(e) =>
            setLocalSettings({ ...localSettings, pointColor: e.target.value })
          }
        />

        <label className="block mb-2 font-medium">Point Size</label>
        <input
          type="number"
          min={1}
          max={20}
          className="w-full mb-6 border rounded p-2"
          value={localSettings.pointSize}
          onChange={(e) =>
            setLocalSettings({ ...localSettings, pointSize: Number(e.target.value) })
          }
        />

        <div className="flex justify-end space-x-4">
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

export default ScatterControls;


