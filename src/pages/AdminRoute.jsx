// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * AdminRoute adalah komponen pelindung yang memastikan
 * hanya pengguna dengan role "admin" yang dapat mengakses halaman admin.
 */
const AdminRoute = ({ children }) => {
  // Ambil user dari Redux state
  const { currentUser } = useSelector((state) => state.user);

  // Cek role: dari Redux atau localStorage
  const role = currentUser?.role || localStorage.getItem("role");

  if (role !== "admin") {
    // Redirect ke login jika bukan admin
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
