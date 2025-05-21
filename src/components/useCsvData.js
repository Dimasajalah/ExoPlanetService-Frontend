import { useEffect } from "react";
import Papa from "papaparse";
import { usePlotSettings } from "./PlotSettingsContext";

export function useCsvData(file, xColumn, yColumn, errorCols = {}) {
  const { setCsvColumns } = usePlotSettings();

  const [dataPoints, setDataPoints] = React.useState([]);
  const [csvData, setCsvData] = React.useState([]);
  const [errorData, setErrorData] = React.useState({});

  useEffect(() => {
    if (!file) {
      // Load default CSV from public folder
      fetch("/data/PS_2025.05.15_06.38.49.csv")
        .then((res) => res.text())
        .then((csvText) => {
          const results = Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          });
          setCsvData(results.data);
          setCsvColumns(results.meta.fields); // update context
        });
      return;
    }

    // If file uploaded:
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvDataText = event.target.result;
      const results = Papa.parse(csvDataText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
      setCsvData(results.data);
      setCsvColumns(results.meta.fields); // update context
    };
    reader.readAsText(file);
  }, [file, setCsvColumns]);

  // Build scatter data points when csvData and columns are ready
  useEffect(() => {
    if (!csvData.length || !xColumn || !yColumn) {
      setDataPoints([]);
      setErrorData({});
      return;
    }

    // Map to points with error if any
    const points = csvData
      .filter(
        (row) =>
          row[xColumn] !== undefined &&
          row[yColumn] !== undefined &&
          row[xColumn] !== null &&
          row[yColumn] !== null
      )
      .map((row) => ({
        x: row[xColumn],
        y: row[yColumn],
      }));

    setDataPoints(points);

    // Map error data if columns specified (optional)
    const errors = {
      xPlus: [],
      xMinus: [],
      yPlus: [],
      yMinus: [],
    };

    csvData.forEach((row) => {
      errors.xPlus.push(row[errorCols.xPlus] ?? 0);
      errors.xMinus.push(row[errorCols.xMinus] ?? 0);
      errors.yPlus.push(row[errorCols.yPlus] ?? 0);
      errors.yMinus.push(row[errorCols.yMinus] ?? 0);
    });

    setErrorData(errors);
  }, [csvData, xColumn, yColumn, errorCols]);

  return { csvData, csvColumns, dataPoints, errorData };
}


