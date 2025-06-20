// src/service/ServiceLayout.jsx
import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";

const ServiceLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default ServiceLayout;


