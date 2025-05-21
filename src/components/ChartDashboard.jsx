import React from 'react';
import ScatterPlotWrapper from './ScatterPlotWrapper'; // <-- import the wrapper
import HistogramPlot from './HistogramPlot';

const ChartDashboard = () => (
  <div className="p-4 grid gap-6 md:grid-cols-2">
    <ScatterPlotWrapper />  {/* now ScatterPlot gets csvData */}
    <HistogramPlot />
  </div>
);

export default ChartDashboard;

