// ✅ Final AdminContacts.jsx with full features
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMessage, setModalMessage] = useState(null);
  const [pdfReady, setPdfReady] = useState(false);

  const messagesPerPage = 10;

  useEffect(() => {
    fetch("/api/contact-messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Failed to load messages:", err));
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setQuery(val);
    filterAndSort(val);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pesan ini?")) {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        const updated = messages.filter((m) => m._id !== id);
        setMessages(updated);
        filterAndSort(query, updated);
      }
    }
  };

  const filterAndSort = (search = query, base = messages) => {
    let result = base.filter(
      (msg) =>
        msg.name.toLowerCase().includes(search) ||
        msg.email.toLowerCase().includes(search) ||
        msg.message.toLowerCase().includes(search)
    );
    result.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortOrder === "asc"
        ? valA.localeCompare ? valA.localeCompare(valB) : valA - valB
        : valB.localeCompare ? valB.localeCompare(valA) : valB - valA;
    });
    setFiltered(result);
    setCurrentPage(1);
  };

  const toggleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    filterAndSort(query);
  };

  const exportPDF = async () => {
    const blob = new Blob([
      filtered.map((m) => `\n${m.name}\n${m.email}\n${m.message}\n${m.timestamp}\n`).join("\n---\n")
    ], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "contact_messages.txt");
  };

  const paginated = filtered.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 font-poppins">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📬 Pesan Kontak
          </h2>
          <div className="flex gap-2">
            {filtered.length > 0 && (
              <CSVLink
                filename="contact_messages.csv"
                data={filtered.map(({ _id, ...rest }) => rest)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Export CSV
              </CSVLink>
            )}
            <button
              onClick={exportPDF}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Export TXT
            </button>
          </div>
        </div>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Cari nama/email/pesan..."
          className="w-full mb-4 px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />

        {filtered.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Tidak ada pesan ditemukan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  {["name", "email", "message", "timestamp"].map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => toggleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortKey === key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                    </th>
                  ))}
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((msg) => (
                  <tr key={msg._id} className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td
                      className="px-4 py-2 truncate max-w-xs cursor-pointer hover:underline"
                      onClick={() => setModalMessage(msg)}
                    >
                      {msg.message.length > 80 ? msg.message.slice(0, 80) + "..." : msg.message}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(msg.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
              <span>
                Menampilkan {paginated.length} dari {filtered.length} pesan
              </span>
              <div className="space-x-2">
                {[...Array(Math.ceil(filtered.length / messagesPerPage))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal untuk detail pesan */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-2">{modalMessage.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{modalMessage.email}</p>
            <p className="text-base text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
              {modalMessage.message}
            </p>
            <div className="text-right mt-4">
              <button
                onClick={() => setModalMessage(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
