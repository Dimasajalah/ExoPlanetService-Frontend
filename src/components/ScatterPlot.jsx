// ✅ Updated ScatterPlot.jsx for correct chartjs-chart-error-bars usage

import React, { useEffect, useState, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ScatterWithErrorBarsController } from "chartjs-chart-error-bars";
import regression from "regression";
import { usePlotSettings } from "./PlotSettingsContext";
import { useCsvData } from "./CsvDataContext";

// ✅ Register correct controller
ChartJS.register(ScatterWithErrorBarsController);

const ScatterPlot = () => {
  const chartRef = useRef();
  const { csvData, csvColumns } = useCsvData();
  const { scatterSettings, setScatterSettings } = usePlotSettings();

  const [xKey, setXKey] = useState(scatterSettings.xColumn || "");
  const [yKey, setYKey] = useState(scatterSettings.yColumn || "");
  const [pointColor, setPointColor] = useState(scatterSettings.pointColor || "#00f");
  const [pointSize, setPointSize] = useState(scatterSettings.pointSize || 4);
  const [showErrorBars, setShowErrorBars] = useState(scatterSettings.showErrorBars || false);
  const [showRegression, setShowRegression] = useState(scatterSettings.showRegression || false);

  useEffect(() => {
    setXKey(scatterSettings.xColumn || "");
    setYKey(scatterSettings.yColumn || "");
    setPointColor(scatterSettings.pointColor || "#00f");
    setPointSize(scatterSettings.pointSize || 4);
    setShowErrorBars(scatterSettings.showErrorBars || false);
    setShowRegression(scatterSettings.showRegression || false);
  }, [scatterSettings]);

  useEffect(() => {
    setScatterSettings({
      xColumn: xKey,
      yColumn: yKey,
      pointColor,
      pointSize,
      showErrorBars,
      showRegression,
    });
  }, [xKey, yKey, pointColor, pointSize, showErrorBars, showRegression]);

  const filteredData = Array.isArray(csvData)
    ? csvData.filter(
        (d) =>
          d[xKey] !== undefined &&
          d[yKey] !== undefined &&
          !isNaN(parseFloat(d[xKey])) &&
          !isNaN(parseFloat(d[yKey]))
      )
    : [];

  const baseData = filteredData.map((d) => ({
    x: parseFloat(d[xKey]),
    y: parseFloat(d[yKey]),
    xMin: showErrorBars && d[xKey + "_err"] ? parseFloat(d[xKey]) - parseFloat(d[xKey + "_err"]) : undefined,
    xMax: showErrorBars && d[xKey + "_err"] ? parseFloat(d[xKey]) + parseFloat(d[xKey + "_err"]) : undefined,
    yMin: showErrorBars && d[yKey + "_err"] ? parseFloat(d[yKey]) - parseFloat(d[yKey + "_err"]) : undefined,
    yMax: showErrorBars && d[yKey + "_err"] ? parseFloat(d[yKey]) + parseFloat(d[yKey + "_err"]) : undefined,
  }));

  const regressionData = showRegression
    ? regression.linear(
        filteredData.map((d) => [parseFloat(d[xKey]), parseFloat(d[yKey])])
      ).points.map(([x, y]) => ({ x, y }))
    : [];

  const chartData = {
    datasets: [
      {
        type: "scatter",
        label: `${yKey} vs ${xKey}`,
        data: baseData,
        backgroundColor: pointColor,
        pointRadius: pointSize,
      },
      ...(showRegression
        ? [
            {
              type: "line",
              label: "Regression Line",
              data: regressionData,
              borderColor: "#888",
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
            },
          ]
        : []),
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: {
        type: "linear",
        title: { display: !!xKey, text: xKey },
      },
      y: {
        type: "linear",
        title: { display: !!yKey, text: yKey },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current?.destroy) chartRef.current.destroy();
    };
  }, []);
  // (continued from earlier update)

  const handleExportImage = () => {
    if (!chartRef.current) return;
    const base64 = chartRef.current.toBase64Image();
    const link = document.createElement("a");
    link.download = "scatterplot.png";
    link.href = base64;
    link.click();
  };

  const handleExportCSV = () => {
    if (!xKey || !yKey || filteredData.length === 0) {
      alert("Please select valid X and Y columns and ensure data is loaded.");
      return;
    }

    const csv = [
      [xKey, yKey],
      ...filteredData.map((d) => [d[xKey], d[yKey]]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "scatterplot.csv";
    link.click();
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      {/* Controls Panel */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">Scatter Plot Controls</h2>

        {/* X-Axis Selector */}
        <div>
          <label className="block mb-1 font-medium">X Axis:</label>
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="">Select X</option>
            {csvColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Y-Axis Selector */}
        <div>
          <label className="block mb-1 font-medium">Y Axis:</label>
          <select
            value={yKey}
            onChange={(e) => setYKey(e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="">Select Y</option>
            {csvColumns.length > 0 ? (
              csvColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))
            ) : (
              <option disabled>No columns available</option>
            )}
          </select>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block mb-1 font-medium">Point Color:</label>
          <input
            type="color"
            value={pointColor}
            onChange={(e) => setPointColor(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Point Size */}
        <div>
          <label className="block mb-1 font-medium">Point Size:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={pointSize}
            onChange={(e) => setPointSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showErrorBars}
              onChange={() => setShowErrorBars((v) => !v)}
            />
            <label>Show Error Bars</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showRegression}
              onChange={() => setShowRegression((v) => !v)}
            />
            <label>Show Regression Line</label>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleExportImage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export Image
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Chart Panel */}
      <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-4">
        {xKey && yKey ? (
          <Scatter
            ref={chartRef}
            key={`${xKey}-${yKey}-${pointColor}-${pointSize}-${showErrorBars}-${showRegression}`}
            data={chartData}
            options={chartOptions}
          />
        ) : (
          <div className="text-gray-600 italic">
            Select X and Y axes to render the plot.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScatterPlot;







