// src/components/ScatterHistogramLayout.jsx
import React, { useState } from "react";
import HistogramPlot from "./HistogramPlot";
import ScatterPlot from "./ScatterPlot";
import { useCsvData } from "./CsvDataContext";
import HistogramControls from "./HistogramControls";
import ScatterControls from "./ScatterControls";

const ScatterHistogramLayout = () => {
  const [viewMode, setViewMode] = useState("scatter");
  const [showScatterControls, setShowScatterControls] = useState(false);
  const [showHistogramControls, setShowHistogramControls] = useState(false);

  const { csvData, setCsvData, csvColumns, setCsvColumns } = useCsvData();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text
        .split("\n")
        .filter((l) => l.trim() && !l.startsWith("#")); // Filter out comments and empty lines

      if (lines.length === 0) return;

      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1).map((line) => {
        const values = line.split(",");
        return headers.reduce((obj, h, i) => ({ ...obj, [h]: values[i] }), {});
      });

      setCsvData(rows);
      setCsvColumns(headers);
      console.log("CSV Headers:", headers);
      console.log("CSV Rows:", rows);
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Plot Views</h2>
        <button
          onClick={() => setViewMode("scatter")}
          className={`w-full text-left px-4 py-2 rounded ${
            viewMode === "scatter" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Scatter Plot
        </button>
        <button
          onClick={() => setViewMode("histogram")}
          className={`w-full text-left px-4 py-2 rounded ${
            viewMode === "histogram" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Histogram
        </button>
        <button
          onClick={() => setViewMode("split")}
          className={`w-full text-left px-4 py-2 rounded ${
            viewMode === "split" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Split View
        </button>

        <div className="mt-6">
          <label className="block font-semibold mb-1">Upload CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </aside>

      {/* Main Plot Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {(viewMode === "scatter" || viewMode === "split") && (
          <div className="relative bg-white p-4 rounded shadow-md">
            <ScatterPlot csvData={csvData} />
            <button
              onClick={() => setShowScatterControls(true)}
              className="absolute top-4 right-4 px-2 py-1 bg-gray-100 border rounded text-sm"
            >
              ⚙️ Scatter Settings
            </button>
          </div>
        )}

        {(viewMode === "histogram" || viewMode === "split") && (
          <div className="relative bg-white p-4 rounded shadow-md">
            <HistogramPlot csvData={csvData} />
            <button
              onClick={() => setShowHistogramControls(true)}
              className="absolute top-4 right-4 px-2 py-1 bg-gray-100 border rounded text-sm"
            >
              ⚙️ Histogram Settings
            </button>
          </div>
        )}
      </main>

      {/* Scatter Controls Modal */}
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

      {/* Histogram Controls Modal */}
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

export default ScatterHistogramLayout;




