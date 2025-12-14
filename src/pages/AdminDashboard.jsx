import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [cats, setCats] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cats");
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catForm, setCatForm] = useState({
    name: "",
    age: "",
    gender: "",
    isAdopted: false,
    desc: "",
  });

  const API_BASE = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (!storedToken) {
      navigate("/admin/login");
      return;
    }
    setToken(storedToken);
  }, [navigate]);

  useEffect(() => {
    if (!token) return;
    if (activeTab === "cats") fetchCats();
    if (activeTab === "adoptions") fetchAdoptions();
  }, [token, activeTab]);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/cats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cats");
      const data = await res.json();
      setCats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdoptions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/adoptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch adoptions");
      const data = await res.json();
      setAdoptions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const openCatModal = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setCatForm({
        name: cat.name,
        age: cat.age,
        gender: cat.gender || "",
        isAdopted: cat.isAdopted,
        desc: cat.desc || "",
      });
    } else {
      setEditingCat(null);
      setCatForm({ name: "", age: "", gender: "", isAdopted: false, desc: "" });
    }
    setShowCatModal(true);
  };

  const closeCatModal = () => {
    setShowCatModal(false);
    setEditingCat(null);
  };

  const saveCat = async (e) => {
    e.preventDefault();
    try {
      const url = editingCat
        ? `${API_BASE}/admin/cats/${editingCat._id}`
        : `${API_BASE}/admin/cats`;
      const method = editingCat ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catForm),
      });
      if (!res.ok) throw new Error("Failed to save cat");
      closeCatModal();
      fetchCats();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCat = async (id) => {
    if (!confirm("Delete this cat?")) return;
    try {
      const res = await fetch(`${API_BASE}/admin/cats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete cat");
      fetchCats();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAdoptionStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/admin/adoptions/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchAdoptions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffff6] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-3xl font-black text-[#add3fa]"
            style={{ textShadow: "0px 3px 0px #464646" }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("cats")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "cats"
                ? "bg-[#add3fa] text-white"
                : "bg-white text-[#464646]"
            }`}
          >
            Cats
          </button>
          <button
            onClick={() => setActiveTab("adoptions")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "adoptions"
                ? "bg-[#add3fa] text-white"
                : "bg-white text-[#464646]"
            }`}
          >
            Adoptions
          </button>
        </div>

        {activeTab === "cats" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#464646]">Manage Cats</h2>
              <button
                onClick={() => openCatModal()}
                className="px-4 py-2 rounded-full bg-[#fadfaa] text-[#464646] font-semibold hover:scale-105 transition"
              >
                + Add Cat
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-gray-600">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Name
                      </th>
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Age
                      </th>
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Gender
                      </th>
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Adopted
                      </th>
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Description
                      </th>
                      <th className="text-left p-3 font-semibold text-[#464646]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cats.map((cat) => (
                      <tr key={cat._id} className="border-b">
                        <td className="p-3">{cat.name}</td>
                        <td className="p-3">{cat.age}</td>
                        <td className="p-3">{cat.gender || "—"}</td>
                        <td className="p-3">{cat.isAdopted ? "Yes" : "No"}</td>
                        <td className="p-3">{cat.desc || "—"}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => openCatModal(cat)}
                            className="px-3 py-1 rounded-full bg-[#add3fa] text-white text-sm font-semibold hover:scale-105 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCat(cat._id)}
                            className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-semibold hover:scale-105 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {cats.length === 0 && (
                  <p className="text-sm text-gray-500 mt-4">No cats found.</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "adoptions" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">
              Adoption Applications
            </h2>
            {loading ? (
              <p className="text-sm text-gray-600">Loading...</p>
            ) : (
              <div className="space-y-4">
                {adoptions.map((app) => (
                  <div key={app._id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <p className="text-sm">
                        <strong>Applicant:</strong> {app.fullName}
                      </p>
                      <p className="text-sm">
                        <strong>Email:</strong> {app.email}
                      </p>
                      <p className="text-sm">
                        <strong>Contact:</strong> {app.contact}
                      </p>
                      <p className="text-sm">
                        <strong>Cat:</strong> {app.chosenCat?.name || "Unknown"}
                      </p>
                      <p className="text-sm">
                        <strong>Status:</strong> {app.status}
                      </p>
                      <p className="text-sm">
                        <strong>Submitted:</strong>{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateAdoptionStatus(app._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Interview Scheduled">
                          Interview Scheduled
                        </option>
                        <option value="Approved">Approved</option>
                      </select>
                    </div>
                  </div>
                ))}
                {adoptions.length === 0 && (
                  <p className="text-sm text-gray-500">No applications yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showCatModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              onClick={closeCatModal}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#464646] mb-4">
              {editingCat ? "Edit Cat" : "Add Cat"}
            </h3>
            <form onSubmit={saveCat} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#464646]">
                  Name *
                </label>
                <input
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  value={catForm.name}
                  onChange={(e) =>
                    setCatForm({ ...catForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#464646]">
                  Age *
                </label>
                <input
                  type="number"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  value={catForm.age}
                  onChange={(e) =>
                    setCatForm({ ...catForm, age: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#464646]">
                  Gender *
                </label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  value={catForm.gender}
                  onChange={(e) =>
                    setCatForm({ ...catForm, gender: e.target.value })
                  }
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#464646]">
                  Description
                </label>
                <textarea
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  value={catForm.desc}
                  onChange={(e) =>
                    setCatForm({ ...catForm, desc: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={catForm.isAdopted}
                  onChange={(e) =>
                    setCatForm({ ...catForm, isAdopted: e.target.checked })
                  }
                />
                <label className="text-sm font-semibold text-[#464646]">
                  Adopted
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCatModal}
                  className="px-4 py-2 rounded-full border border-gray-300 text-[#464646] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#add3fa] text-white font-semibold hover:scale-105 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
