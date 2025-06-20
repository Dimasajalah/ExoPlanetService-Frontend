// AdminLogActivity.jsx
import React, { useEffect, useState } from "react";

const AdminLogActivity = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      logs.filter(
        (log) =>
          log.admin?.toLowerCase().includes(q) ||
          log.action?.toLowerCase().includes(q) ||
          log.target?.toLowerCase().includes(q)
      )
    );
  }, [search, logs]);

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        🛡️ Log Aktivitas Admin
      </h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari admin, aksi, atau target..."
        className="w-full px-4 py-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">Tidak ada log ditemukan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <th className="px-4 py-2 text-left">Waktu</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left">Aksi</th>
                <th className="px-4 py-2 text-left">Target</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="px-4 py-2">
                    {new Date(log.timestamp).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2">{log.admin}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLogActivity;
