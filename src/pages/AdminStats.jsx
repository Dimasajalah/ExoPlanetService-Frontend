import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow font-['Poppins']">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Statistik Sistem</h2>

      {!stats ? (
        <p className="text-gray-500">Memuat statistik...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total Overview */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Data</h3>
            <ul className="text-gray-700 dark:text-gray-300">
              <li>👥 Pengguna: {stats.totalUsers}</li>
              <li>📬 Pesan Kontak: {stats.totalMessages}</li>
              <li>🪐 Dataset Eksoplanet: {stats.totalDatasets}</li>
            </ul>
          </div>

          {/* Pie Chart: User Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Peran Pengguna</h3>
            <Pie
              data={{
                labels: stats.userRoles.map((r) => r.name),
                datasets: [
                  {
                    label: 'Jumlah',
                    data: stats.userRoles.map((r) => r.value),
                    backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          </div>

          {/* Bar Chart: Contact Messages */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Aktivitas Pesan (7 Hari Terakhir)
            </h3>
            <Bar
              data={{
                labels: stats.contactActivity.map((d) => d.date),
                datasets: [
                  {
                    label: 'Jumlah Pesan',
                    data: stats.contactActivity.map((d) => d.count),
                    backgroundColor: '#8884d8',
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;

