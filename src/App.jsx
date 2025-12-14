import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cats from "./pages/Cats";
import Care from "./pages/Care";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/admin");
  return (
    <div className="relative w-full min-h-screen bg-posa-yellow overflow-x-hidden">
      {!hideChrome && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/care" element={<Care />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>

      {!hideChrome && <Footer />}
    </div>
  );
}
