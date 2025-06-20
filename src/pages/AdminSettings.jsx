// AdminSettings.jsx
import React, { useEffect, useState } from "react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({ appName: "", theme: "dark", apiKey: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then(setSettings)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Gagal menyimpan pengaturan");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow font-['Poppins']">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">⚙️ Pengaturan Aplikasi</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Aplikasi</label>
          <input
            name="appName"
            value={settings.appName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mode Tema</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="light">Terang</option>
            <option value="dark">Gelap</option>
            <option value="system">Sesuai Sistem</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">API Key (readonly)</label>
          <input
            type="text"
            value={settings.apiKey}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={status === "saving"}
        >
          {status === "saving" ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>

        {status === "success" && <p className="text-green-600">✅ Pengaturan berhasil disimpan.</p>}
        {status === "error" && <p className="text-red-600">❌ Gagal menyimpan. Coba lagi.</p>}
      </form>
    </div>
  );
};

export default AdminSettings;
