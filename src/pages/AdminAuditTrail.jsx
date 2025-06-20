import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const AdminAuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/audit-trail")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Gagal memuat audit trail:", err));
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    filterLogs(val, actionFilter);
  };

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setActionFilter(val);
    filterLogs(query, val);
  };

  const filterLogs = (search, action) => {
    const lower = search.toLowerCase();
    const result = logs.filter(
      (log) =>
        (log.email?.toLowerCase().includes(lower) ||
          log.action?.toLowerCase().includes(lower) ||
          log.message?.toLowerCase().includes(lower)) &&
        (!action || log.action === action)
    );
    setFiltered(result);
  };

  const actions = [...new Set(logs.map((l) => l.action))];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 font-['Poppins']">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">📝 Audit Trail</h2>
          {filtered.length > 0 && (
            <CSVLink
              data={filtered.map(({ _id, ...rest }) => rest)}
              filename="audit_trail.csv"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export CSV
            </CSVLink>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari email, aksi, pesan..."
            value={query}
            onChange={handleSearch}
            className="flex-1 border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <select
            value={actionFilter}
            onChange={handleFilterChange}
            className="w-full md:w-56 border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">Semua Aksi</option>
            {actions.map((act, i) => (
              <option key={i} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Tidak ada data audit ditemukan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                  <th className="px-4 py-2 text-left">Pesan</th>
                  <th className="px-4 py-2 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                  >
                    <td className="px-4 py-2">{log.email || "-"}</td>
                    <td className="px-4 py-2">{log.action}</td>
                    <td className="px-4 py-2 truncate max-w-sm">{log.message}</td>
                    <td className="px-4 py-2">
                      {new Date(log.timestamp).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAuditTrail;
