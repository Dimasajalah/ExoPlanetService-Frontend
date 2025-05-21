import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home.js";
import NasaData from "./components/NasaAPI/nasaData.js";
import MarsDataPage from "./Page/Nasa.js";
import Destination from "./components/destination.js";
import Crew from "./components/crew.js";
import Technology from "./components/technology.js";
import Footer from "./components/footer.js";
import Header from "./components/header.js";

function Services() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="nasa-photo" element={<NasaData />} />
        <Route path="nasa-apod" element={<MarsDataPage />} />
        <Route path="destination" element={<Destination />} />
        <Route path="crew" element={<Crew />} />
        <Route path="technology" element={<Technology />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Services;

