// src/components/PlotSettingsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const PlotSettingsContext = createContext();

const defaultScatter = {
  xAxis: "pl_orbper",
  yAxis: "pl_radj",
  showErrorBars: true,
  pointColor: "#3b82f6",
  showRegressionLine: false,
};

const defaultHistogram = {
  axis: "pl_radj",
  bins: 20,
  barColor: "#f87171",
};

export const PlotSettingsProvider = ({ children }) => {
  const [scatterSettings, setScatterSettings] = useState(() => {
    const saved = localStorage.getItem("scatterSettings");
    return saved ? JSON.parse(saved) : defaultScatter;
  });

  const [histogramSettings, setHistogramSettings] = useState(() => {
    const saved = localStorage.getItem("histogramSettings");
    return saved ? JSON.parse(saved) : defaultHistogram;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("scatterSettings", JSON.stringify(scatterSettings));
  }, [scatterSettings]);

  useEffect(() => {
    localStorage.setItem("histogramSettings", JSON.stringify(histogramSettings));
  }, [histogramSettings]);

  const resetScatter = () => setScatterSettings(defaultScatter);
  const resetHistogram = () => setHistogramSettings(defaultHistogram);

  return (
    <PlotSettingsContext.Provider
      value={{
        scatterSettings,
        setScatterSettings,
        histogramSettings,
        setHistogramSettings,
        resetScatter,
        resetHistogram,
      }}
    >
      {children}
    </PlotSettingsContext.Provider>
  );
};

export const usePlotSettings = () => useContext(PlotSettingsContext);
