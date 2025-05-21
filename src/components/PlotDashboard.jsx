import React, { useState } from "react";
import { useCsvData } from "./useCsvData";
import HistogramPlot from "./HistogramPlot";
import ScatterPlot from "./ScatterPlot"; // your scatter plot component
import HistogramControls from "./HistogramControls";
import ScatterControls from "./ScatterControls";

const PlotDashboard = () => {
  // CSV, columns, points, error data
  const {
    csvData,
    csvColumns,
    dataPoints,
    errorData,
  } = useCsvData(
    null, // no file uploaded, default fetch
    null, // xColumn from scatterSettings below
    null, // yColumn from scatterSettings below
    {} // errorCols if needed
  );

  const [showHistogramControls, setShowHistogramControls] = useState(false);
  const [showScatterControls, setShowScatterControls] = useState(false);

  const [viewMode, setViewMode] = useState("histogram"); // "histogram", "scatter", "split"

  // Context hooks to get current settings (or lift state here if preferred)
  // For demo, let's assume hooks inside the plots read their settings

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Plot Dashboard</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">View Mode</label>
          <select
            className="form-select w-full"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="histogram">Histogram Only</option>
            <option value="scatter">Scatter Only</option>
            <option value="split">Split View</option>
          </select>
        </div>

        <button
          className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowHistogramControls(true)}
        >
          Histogram Settings
        </button>

        <button
          className="w-full mb-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowScatterControls(true)}
        >
          Scatter Settings
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">
        {viewMode === "histogram" && <HistogramPlot csvData={csvData} />}
        {viewMode === "scatter" && (
          <ScatterPlot
            dataPoints={dataPoints}
            errorData={errorData}
          />
        )}
        {viewMode === "split" && (
          <div className="grid grid-cols-2 gap-4">
            <HistogramPlot csvData={csvData} />
            <ScatterPlot
              dataPoints={dataPoints}
              errorData={errorData}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <HistogramControls
        isOpen={showHistogramControls}
        onClose={() => setShowHistogramControls(false)}
        columns={csvColumns}
      />

      <ScatterControls
        isOpen={showScatterControls}
        onClose={() => setShowScatterControls(false)}
        columns={csvColumns}
      />
    </div>
  );
};

export default PlotDashboard;
