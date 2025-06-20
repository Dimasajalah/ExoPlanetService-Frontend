// components/FilterSidebar.jsx
import React from "react";

const FilterSidebar = ({
  search,
  setSearch,
  methodFilter,
  setMethodFilter,
  // typeFilter,            // ⛔ Hapus
  // setTypeFilter,         // ⛔ Hapus
  discoveryMethods = [],
  // planetTypes = [],      // ⛔ Hapus
}) => {
  return (
    <aside className="w-64 h-full p-6 space-y-6">
  {/* Pencarian */}
  <div>
    <label className="block text-sm font-medium mb-1">Cari nama planet:</label>
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Contoh: Kepler-22b"
      className="w-full border border-gray-300 p-2 rounded"
    />
  </div>

  {/* Filter Metode Penemuan */}
  <div>
    <label className="block text-sm font-medium mb-1">Metode Penemuan:</label>
    <select
      value={methodFilter}
      onChange={(e) => setMethodFilter(e.target.value)}
      className="w-full border border-gray-300 p-2 rounded"
    >
      <option value="">Semua</option>
      {discoveryMethods.map((m, i) => (
        <option key={i} value={m}>
          {m}
        </option>
      ))}
    </select>
  </div>
</aside>

  );
};

export default FilterSidebar;

