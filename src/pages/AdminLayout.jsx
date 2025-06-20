// frontend/src/pages/admin/AdminLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Contacts", path: "/admin-dashboard/contacts" },
    { name: "Users", path: "/admin-dashboard/users" },
    { name: "Data", path: "/admin-dashboard/data" },
    { name: "Logs", path: "/admin-dashboard/logs" },
    { name: "Stats", path: "/admin-dashboard/stats" },
  ];

  return (
    <div className="flex min-h-screen font-['Poppins']">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-600">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 transition-all ${
                location.pathname === item.path ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
