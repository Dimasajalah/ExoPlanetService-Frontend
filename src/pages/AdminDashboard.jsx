// AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 font-['Poppins']">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin-dashboard/contacts"
            className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            📬 Pesan Kontak
          </Link>
          <Link
            to="/admin-dashboard/users"
            className="p-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
          >
            👥 Manajemen Pengguna
          </Link>
          <Link
            to="/admin-dashboard/data"
            className="p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow"
          >
            🪐 Eksplorasi Data
          </Link>
          <Link
            to="/admin-dashboard/logs"
            className="p-6 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition shadow"
          >
            📄 Log Aktivitas
          </Link>
          <Link
            to="/admin-dashboard/stats"
            className="p-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition shadow"
          >
            📊 Statistik
          </Link>
          <Link
            to="/admin-dashboard/settings"
            className="p-6 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition shadow"
          >
            ⚙️ Pengaturan
          </Link>
          <Link
            to="/admin-dashboard/audit"
            className="p-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow"
          >
            📝 Audit Trail
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
