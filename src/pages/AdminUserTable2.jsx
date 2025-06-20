// ✅ Final AdminUserTable.jsx with user management, search, filter, export
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    filterAndSort(val, roleFilter);
  };

  const handleRoleFilter = (val) => {
    setRoleFilter(val);
    filterAndSort(search, val);
  };

  const filterAndSort = (q, role) => {
    let data = users.filter((u) =>
      (u.name || "").toLowerCase().includes(q.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(q.toLowerCase())
    );
    if (role) data = data.filter((u) => (u.role || "user") === role);
    data.sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() || "";
      const valB = b[sortKey]?.toLowerCase?.() || "";
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    setFiltered(data);
  };

  const toggleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    filterAndSort(search, roleFilter);
  };

  const changeRole = async (id, newRole) => {
    try {
      const res = await fetch(`/api/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        const updated = users.map((u) =>
          u._id === id ? { ...u, role: newRole } : u
        );
        setUsers(updated);
        filterAndSort(search, roleFilter);
      }
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Hapus user ini secara permanen?")) {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        const updated = users.filter((u) => u._id !== id);
        setUsers(updated);
        filterAndSort(search, roleFilter);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">👥 Daftar Pengguna</h2>
        {filtered.length > 0 && (
          <CSVLink
            filename="users.csv"
            data={filtered.map(({ _id, password, ...rest }) => rest)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export CSV
          </CSVLink>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Cari nama/email"
          className="w-full md:w-1/2 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <select
          value={roleFilter}
          onChange={(e) => handleRoleFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Semua Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Tidak ada pengguna ditemukan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                {["name", "email", "role"].map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => toggleSort(key)}
                  >
                    {key.toUpperCase()}
                    {sortKey === key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                  </th>
                ))}
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user._id} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="px-4 py-2">{user.name || "-"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role || "user"}
                      onChange={(e) => changeRole(user._id, e.target.value)}
                      className="bg-transparent border-none focus:outline-none dark:bg-gray-800"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
