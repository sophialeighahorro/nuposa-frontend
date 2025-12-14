import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/nuposaLogo.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffff6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="NUPOSA" className="h-16 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-[#464646] text-center mb-4">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#464646]">
              Username
            </label>
            <input
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#464646]">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-[#add3fa] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          For authorized administrators only.
        </p>
      </div>
    </div>
  );
}
