// PlotSwitcher.jsx
import React, { useState } from "react";
import HistogramPlot from "./HistogramPlot";
import ScatterPlot from "./ScatterPlot";
import { useCsvData } from "./CsvDataContext";

const PlotSwitcher = () => {
  const [view, setView] = useState("scatter");
  const { csvData } = useCsvData();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setView("scatter")}
            className={`px-4 py-2 rounded ${view === "scatter" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Scatter Plot
          </button>
          <button
            onClick={() => setView("histogram")}
            className={`px-4 py-2 rounded ${view === "histogram" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Histogram
          </button>
        </div>
      </div>

      {view === "scatter" && <ScatterPlot csvData={csvData} />}
      {view === "histogram" && <HistogramPlot csvData={csvData} />}
    </div>
  );
};

export default PlotSwitcher;
