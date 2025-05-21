// Plot.jsx
import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { usePlotSettings } from "./PlotSettingsContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ErrorBarPlugin,
} from "chart.js";
import "chartjs-chart-error-bars"; // Import the plugin

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Note: Chart.js doesn't have native error bars, but you can use a plugin or workaround.
// Here, I provide a minimal example without error bars.

const Plot = ({ data, errors }) => {
  const { axesSettings, lineSettings, errorSettings } = usePlotSettings();

  // Extract axis scale options
  const xScaleType = axesSettings.xScale === "log" ? "logarithmic" : "linear";
  const yScaleType = axesSettings.yScale === "log" ? "logarithmic" : "linear";

  // Build the Chart.js data structure
  // Assume `data` is an array of points: [{ x, y }, ...]
  // For demonstration, map the points to Chart.js format
  const dataset = data.map((point, i) => ({
    x: point.x,
    y: point.y,
    xMin: point.x - (errors.xMinus[i] || 0),
    xMax: point.x + (errors.xPlus[i] || 0),
    yMin: point.y - (errors.yMinus[i] || 0),
    yMax: point.y + (errors.yPlus[i] || 0),
  }));

  const chartData = {
    datasets: [
      {
        label: axesSettings.title,
        data: data.map((point) => ({ x: point.x, y: point.y })),
        borderColor: lineSettings.lineColor,
        borderWidth: lineSettings.lineWidth,
        fill: false,
        borderDash:
          lineSettings.lineStyle === "dashed"
            ? [10, 5]
            : lineSettings.lineStyle === "dotted"
            ? [2, 5]
            : [],
        pointRadius: 3,
        pointBackgroundColor: lineSettings.lineColor,
        errorBarColor: "rgba(255, 99, 132, 0.8)", // Customize error bar color
        errorBarWhiskerLength: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: !!axesSettings.title,
        text: axesSettings.title,
        color: axesSettings.labelColor,
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        labels: {
          color: axesSettings.labelColor,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: xScaleType,
        title: {
          display: !!axesSettings.xLabel,
          text: axesSettings.xLabel,
          color: axesSettings.axisColor,
          font: {
            size: 14,
          },
        },
        ticks: {
          color: axesSettings.axisColor,
        },
        grid: {
          color: "#ddd",
        },
      },
      y: {
        type: yScaleType,
        title: {
          display: !!axesSettings.yLabel,
          text: axesSettings.yLabel,
          color: axesSettings.axisColor,
          font: {
            size: 14,
          },
        },
        ticks: {
          color: axesSettings.axisColor,
        },
        grid: {
          color: "#ddd",
        },
      },
    },
    layout: {
      padding: 20,
    },
    backgroundColor: axesSettings.backgroundColor,
  };

  return (
    <div style={{ backgroundColor: axesSettings.backgroundColor }} className="p-4 rounded-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Plot;
