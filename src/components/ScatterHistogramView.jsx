// ✅ Combined Scatter + Histogram Layout with Toggle and Modal Controls

import React, { useState } from "react";
import HistogramPlot from "./HistogramPlot";
import ScatterPlot from "./ScatterPlot";
import { useCsvData } from "./CsvDataContext";
import { usePlotSettings } from "./PlotSettingsContext";
import HistogramControls from "./HistogramControls";
import ScatterControls from "./ScatterControls";

const ScatterHistogramView = () => {
  const [viewMode, setViewMode] = useState("scatter"); // scatter | histogram | split
  const [showScatterControls, setShowScatterControls] = useState(false);
  const [showHistogramControls, setShowHistogramControls] = useState(false);

  const { csvData } = useCsvData();

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">Exoplanet Visualizer</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("scatter")}
            className={`px-4 py-2 rounded ${viewMode === "scatter" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Scatter
          </button>
          <button
            onClick={() => setViewMode("histogram")}
            className={`px-4 py-2 rounded ${viewMode === "histogram" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Histogram
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`px-4 py-2 rounded ${viewMode === "split" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Split View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(viewMode === "scatter" || viewMode === "split") && (
          <div className="relative">
            <ScatterPlot csvData={csvData} />
            <button
              onClick={() => setShowScatterControls(true)}
              className="absolute top-2 right-2 px-2 py-1 bg-gray-100 border rounded text-sm"
            >
              ⚙️ Scatter Settings
            </button>
          </div>
        )}

        {(viewMode === "histogram" || viewMode === "split") && (
          <div className="relative">
            <HistogramPlot csvData={csvData} />
            <button
              onClick={() => setShowHistogramControls(true)}
              className="absolute top-2 right-2 px-2 py-1 bg-gray-100 border rounded text-sm"
            >
              ⚙️ Histogram Settings
            </button>
          </div>
        )}
      </div>

      {/* Modal for Scatter Controls */}
      {showScatterControls && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowScatterControls(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Scatter Controls</h3>
            <ScatterControls />
          </div>
        </div>
      )}

      {/* Modal for Histogram Controls */}
      {showHistogramControls && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowHistogramControls(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Histogram Controls</h3>
            <HistogramControls />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterHistogramView;
