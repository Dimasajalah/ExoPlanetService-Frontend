import React, { createContext, useContext, useState, useEffect } from "react";
import Papa from "papaparse";

const CsvDataContext = createContext();

export const CsvDataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parse CSV from text or File object
  const parseCsv = (input) => {
    setLoading(true);
    setError(null);

    Papa.parse(input, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.meta.fields) {
          setError("No columns found in CSV.");
          setLoading(false);
          return;
        }

        const trimmedFields = results.meta.fields.map((f) => f.trim());

        // Remap rows with trimmed keys
        const cleanedData = results.data.map((row) =>
          Object.fromEntries(trimmedFields.map((key) => [key, row[key]]))
        );

        setCsvColumns(trimmedFields);
        setCsvData(cleanedData);
        setLoading(false);

        // Debug logs, remove in production
        console.log("✅ Parsed Columns:", trimmedFields);
        console.log("🔍 First Row:", cleanedData[0]);
      },
      error: (err) => {
        setError("Failed to parse CSV: " + err.message);
        setLoading(false);
      },
    });
  };

  // Load default CSV file on mount
  useEffect(() => {
    setLoading(true);
    fetch("/data/PS_2025.05.15_06.38.49.csv")
      .then((res) => {
        if (!res.ok) throw new Error("CSV file not found");
        return res.text();
      })
      .then((text) => {
        // Remove comment lines and empty lines before parsing
        const cleanedText = text
          .split("\n")
          .filter((line) => line.trim() && !line.startsWith("#"))
          .join("\n");

        parseCsv(cleanedText);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <CsvDataContext.Provider
      value={{
        csvData,
        setCsvData,
        csvColumns,
        setCsvColumns,
        loading,
        error,
        parseCsv,
      }}
    >
      {children}
    </CsvDataContext.Provider>
  );
};

export const useCsvData = () => useContext(CsvDataContext);
