import React, { useState } from "react";
import HistogramPlot from "./HistogramPlot";
import ScatterPlot from "./ScatterPlot";
import HistogramControls from "./HistogramControls";
import ScatterControls from "./ScatterControls";
import { useCsvData } from "./useCsvData"; // shared hook to fetch CSV and columns

const PlotPanel = () => {
  const [view, setView] = useState("scatter"); // "scatter" | "histogram" | "split"
  const [showHistogramControls, setShowHistogramControls] = useState(false);
  const [showScatterControls, setShowScatterControls] = useState(false);

  const { csvData, csvColumns } = useCsvData();

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-x-2">
          <button
            className={`btn ${view === "scatter" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setView("scatter")}
          >
            Scatter Plot
          </button>
          <button
            className={`btn ${view === "histogram" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setView("histogram")}
          >
            Histogram
          </button>
          <button
            className={`btn ${view === "split" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setView("split")}
          >
            Split View
          </button>
        </div>

        <div className="space-x-2">
          {(view === "scatter" || view === "split") && (
            <button
              className="btn btn-outline"
              onClick={() => setShowScatterControls(true)}
            >
              Scatter Settings
            </button>
          )}
          {(view === "histogram" || view === "split") && (
            <button
              className="btn btn-outline"
              onClick={() => setShowHistogramControls(true)}
            >
              Histogram Settings
            </button>
          )}
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          view === "split" ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {(view === "scatter" || view === "split") && (
          <div className="bg-white p-4 rounded shadow">
            <ScatterPlot csvData={csvData} />
          </div>
        )}

        {(view === "histogram" || view === "split") && (
          <div className="bg-white p-4 rounded shadow">
            <HistogramPlot csvData={csvData} />
          </div>
        )}
      </div>

      <HistogramControls
        isOpen={showHistogramControls}
        onClose={() => setShowHistogramControls(false)}
        csvColumns={csvColumns}
      />
      <ScatterControls
        isOpen={showScatterControls}
        onClose={() => setShowScatterControls(false)}
        csvColumns={csvColumns}
      />
    </div>
  );
};

export default PlotPanel;
