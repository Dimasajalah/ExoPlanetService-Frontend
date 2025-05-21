import React, { useState } from "react";
import { PlotSettingsProvider, usePlotSettings } from "./PlotSettingsContext";
import AxesControls from "./AxesControls";
import LineControls from "./LineControls";
import ErrorControls from "./ErrorControls";
import Plot from "./Plot";
import { useCsvData } from "./useCsvData";
import HistogramControls from "./HistogramControls";
import HistogramPlot from "./HistogramPlot";

const ControlsPanel = () => {
  const [csvFile, setCsvFile] = useState(null);
  const { dataSettings, errorSettings } = usePlotSettings();

  // Assuming useCsvData takes csvFile and returns csvData + columns
  const { csvData, csvColumns, errorData } = useCsvData(
    csvFile,
    dataSettings.xColumn,
    dataSettings.yColumn,
    errorSettings
  );

  return (
    <PlotSettingsProvider>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Planetary Systems Plot Controls</h1>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
          className="mb-4"
        />

        <AxesControls />
        <LineControls />
        <ErrorControls />
        {/* Use csvColumns for columns */}
        <HistogramControls columns={csvColumns || []} />
        {/* Pass csvData to HistogramPlot */}
        <HistogramPlot csvData={csvData || []} />

        {/* Plot with dataPoints and errorData */}
        <Plot data={csvData || []} errors={errorData || []} />
      </div>
    </PlotSettingsProvider>
  );
};

export default ControlsPanel;



