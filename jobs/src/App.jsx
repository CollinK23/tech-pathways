import React from "react";
import { Home, Navbar, Summer, Offseason, Newgrad } from "./components";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summer" element={<Summer />} />
        <Route path="/offseason" element={<Offseason />} />
        <Route path="/newgrad" element={<Newgrad />} />
      </Routes>
    </>
  );
};

export default App;
