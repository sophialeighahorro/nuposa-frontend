import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cats from "./pages/Cats";
import Care from "./pages/Care";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-posa-yellow overflow-x-hidden">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/care" element={<Care />} />
      </Routes>

      <Footer />
    </div>
  );
}
