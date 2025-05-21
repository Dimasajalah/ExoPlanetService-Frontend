// ✅ Final Merged HistogramPlot.jsx (Context-based + Modal Controls + Export)

import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useCsvData } from "./CsvDataContext";
import { usePlotSettings } from "./PlotSettingsContext";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const HistogramPlot = () => {
  const { data, csvColumns } = useCsvData();
  const { histogramSettings, setHistogramSettings } = usePlotSettings();

  const [axisKey, setAxisKey] = useState(histogramSettings?.axis || "");
  const [binCount, setBinCount] = useState(histogramSettings?.bins || 20);
  const [barColor, setBarColor] = useState(histogramSettings?.barColor || "#f87171");
  const [showControls, setShowControls] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {
    setHistogramSettings({
      axis: axisKey,
      bins: binCount,
      barColor,
    });
  }, [axisKey, binCount, barColor]);

  const numericValues = data
    ?.map((d) => parseFloat(d[axisKey]))
    .filter((v) => !isNaN(v));

  if (!axisKey || !numericValues.length) return <div>No numeric data available.</div>;

  const min = Math.min(...numericValues);
  const max = Math.max(...numericValues);
  const binSize = (max - min) / binCount;

  const bins = Array.from({ length: binCount }, (_, i) => ({
    binStart: min + i * binSize,
    count: 0,
  }));

  numericValues.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
    bins[binIndex].count++;
  });

  const chartData = {
    labels: bins.map((b) => b.binStart.toFixed(2)),
    datasets: [
      {
        label: `${axisKey} Histogram`,
        data: bins.map((b) => b.count),
        backgroundColor: barColor,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: axisKey },
      },
      y: {
        title: { display: true, text: "Count" },
      },
    },
  };

  const exportToCSV = () => {
    const rows = [["BinStart", "Count"], ...bins.map((b) => [b.binStart, b.count])];
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `histogram_${axisKey}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPNG = () => {
    const chart = chartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const a = document.createElement("a");
    a.href = url;
    a.download = `histogram_${axisKey}.png`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Histogram</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowControls(true)}
            className="btn btn-sm bg-gray-200"
          >
            Settings
          </button>
          <button
            onClick={exportToPNG}
            className="btn btn-sm bg-blue-500 text-white"
          >
            Export PNG
          </button>
          <button
            onClick={exportToCSV}
            className="btn btn-sm bg-green-500 text-white"
          >
            Export CSV
          </button>
        </div>
      </div>

      <Bar ref={chartRef} data={chartData} options={chartOptions} />

      {showControls && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setShowControls(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Histogram Settings</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Select Column</label>
                <select
                  value={axisKey}
                  onChange={(e) => setAxisKey(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Column</option>
                  {csvColumns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Bin Count</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={binCount}
                  onChange={(e) => setBinCount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm">{binCount} bins</div>
              </div>
              <div>
                <label className="block font-medium mb-1">Bar Color</label>
                <input
                  type="color"
                  value={barColor}
                  onChange={(e) => setBarColor(e.target.value)}
                  className="w-full h-10 p-1 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistogramPlot;




