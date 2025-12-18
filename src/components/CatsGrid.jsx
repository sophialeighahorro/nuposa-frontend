import React, { useEffect, useMemo, useState } from "react";
import gardenCat from "../assets/gardenCat.jpg";
import mendCat from "../assets/mendCat.jpg";
import arawCat from "../assets/arawCat.jpg";
import catwHand from "../assets/catwHand.jpg";


const fallbackCats = [
  {
    _id: "1",
    name: "Kali",
    gender: "Female",
    breed: "Campus Ginger Mix",
    age: "2",
    image: mendCat,
  },
  {
    _id: "2",
    name: "Jebi",
    gender: "Male",
    breed: "Tabby Mix",
    age: "3",
    image: catwHand,
  },
  {
    _id: "3",
    name: "Araw",
    gender: "Female",
    breed: "Calico Mix",
    age: "1",
    image: arawCat,
  },
  {
    _id: "4",
    name: "Garden",
    gender: "Male",
    breed: "Bicolor Mix",
    age: "4",
    image: gardenCat,
  },
];

const trackingSteps = [
  "Submitted",
  "Under Review",
  "Interview Scheduled",
  "Approved",
];

export default function CatsGrid() {
  const [cats, setCats] = useState(fallbackCats);
  const [loadingCats, setLoadingCats] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    contact: "",
    affiliation: "Student",
    chosenCat: "",
    petsAtHome: "",
    careEnvironment: "",
    reason: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [adoptionId, setAdoptionId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [trackingError, setTrackingError] = useState("");
  const [hasRealCats, setHasRealCats] = useState(false);

  const API_BASE = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCats(true);
      try {
        const res = await fetch(`${API_BASE}/cats`);
        if (!res.ok) throw new Error("Failed to load cats");
        const data = await res.json();
        const withImages = data.map((cat, idx) => ({
          ...cat,
          gender: cat.gender || "Unknown",
          breed: cat.breed || "Campus Cat",
          age: cat.age ? `${cat.age}` : "",
          image: [mendCat, catwHand, arawCat, gardenCat][idx % 4],
        }));
        setCats(withImages);
        setHasRealCats(true);
      } catch {
        setCats(fallbackCats);
        setHasRealCats(false);
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCats();
  }, [API_BASE]);

  const progressIndex = useMemo(() => {
    if (trackingStatus) {
      const idx = trackingSteps.indexOf(trackingStatus);
      return idx >= 0 ? idx : 0;
    }
    return submitted ? 1 : 0;
  }, [trackingStatus, submitted]);

  const openDetail = (cat) => {
    setSelectedCat(cat);
    setShowDetailModal(true);
    setShowAdoptModal(false);
  };

  const openAdopt = () => {
    if (selectedCat) {
      setForm((prev) => ({
        ...prev,
        chosenCat: selectedCat._id || selectedCat.id || "",
      }));
      setShowDetailModal(false);
      setShowAdoptModal(true);
    }
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowAdoptModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "School email is required";
    if (!form.idNumber.trim()) newErrors.idNumber = "ID number is required";
    if (!form.contact.trim()) newErrors.contact = "Contact number is required";
    if (!form.chosenCat.trim()) newErrors.chosenCat = "Select a cat";
    if (!form.petsAtHome.trim()) newErrors.petsAtHome = "Please answer";
    if (!form.careEnvironment.trim())
      newErrors.careEnvironment = "Please answer";
    if (!form.reason.trim()) newErrors.reason = "Please answer";
    if (!form.consent) newErrors.consent = "Consent is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!hasRealCats) {
      setSubmitError("Live cat data is unavailable. Please try again later.");
      return;
    }
    if (form.chosenCat.length !== 24) {
      setSubmitError("Please reselect a cat after the list loads.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${API_BASE}/adoptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          idNumber: form.idNumber,
          contact: form.contact,
          affiliation: form.affiliation,
          chosenCat: form.chosenCat,
          petsAtHome: form.petsAtHome,
          careEnvironment: form.careEnvironment,
          reason: form.reason,
          consent: form.consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || "Failed to submit adoption";
        throw new Error(msg);
      }
      const newId = data?._id || data?.adoption?._id || data?.adoptionId;
      const newStatus = data?.status || data?.adoption?.status || "Submitted";
      setAdoptionId(newId || "");
      setTrackingStatus(newStatus);
      setSubmitted(true);
      setShowAdoptModal(false);
    } catch (err) {
      setSubmitError(
        err?.message ||
          "There was an issue submitting your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const refreshStatus = async () => {
    if (!adoptionId) return;
    setTrackingError("");
    try {
      const res = await fetch(`${API_BASE}/adoptions/${adoptionId}`);
      if (!res.ok) throw new Error("Failed to fetch status");
      const data = await res.json();
      const newStatus = data?.status || data?.adoption?.status;
      if (newStatus) setTrackingStatus(newStatus);
    } catch {
      setTrackingError("Could not refresh status right now.");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-6xl sm:text-7xl font-black mb-8 text-center"
          style={{
            WebkitTextStroke: "1.5px #464646",
          }}
        >
          <span className="text-[#add3fa]">Meet Our</span>{" "}
          <span className="text-[#fadfaa]">Cats</span>
        </h1>

        {loadingCats && (
          <p className="text-sm text-gray-600 mb-4">Loading cats...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((cat) => (
            <div
              key={cat._id || cat.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1 items-center justify-center">
                <h3 className="text-xl font-bold text-[#464646] text-center">
                  {cat.name}
                </h3>
                <button
                  className="mt-auto bg-[#fadfaa] text-[#464646] font-semibold px-4 py-2 rounded-full hover:scale-105 transition"
                  onClick={() => openDetail(cat)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {submitted && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">
              Adoption Tracking
            </h2>
            {adoptionId && (
              <p className="text-sm text-[#464646] mb-2">
                Adoption ID: <span className="font-semibold">{adoptionId}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {trackingSteps.map((step, idx) => {
                const active = idx <= progressIndex;
                return (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        active
                          ? "bg-[#add3fa] border-[#add3fa]"
                          : "border-[#d1d5db]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        active
                          ? "text-[#464646] font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              We'll contact you via the email provided to schedule the short
              interview.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={refreshStatus}
                className="px-4 py-2 rounded-full bg-[#add3fa] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                disabled={!adoptionId}
              >
                Refresh Status
              </button>
              {trackingStatus && (
                <span className="text-sm text-[#464646]">
                  Current status: {trackingStatus}
                </span>
              )}
              {trackingError && (
                <span className="text-sm text-red-500">{trackingError}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {showDetailModal && selectedCat && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              onClick={closeModals}
            >
              ×
            </button>
            <div className="flex flex-col gap-4">
              <img
                src={selectedCat.image}
                alt={selectedCat.name}
                className="w-full h-56 object-contain rounded-xl"
              />
              <h3 className="text-2xl font-bold text-[#464646]">
                {selectedCat.name}
              </h3>
              <p className="text-sm text-[#464646]">Age: {selectedCat.age}</p>
              <p className="text-sm text-[#464646]">
                Gender: {selectedCat.gender}
              </p>
              <p className="text-sm text-[#464646]">
                Breed: {selectedCat.breed}
              </p>
              <button
                className="mt-2 bg-[#add3fa] text-white font-semibold px-4 py-2 rounded-full hover:scale-105 transition"
                onClick={openAdopt}
              >
                Adopt
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdoptModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              onClick={closeModals}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#464646] mb-4">
              Adoption Form
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    School Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    ID Number *
                  </label>
                  <input
                    name="idNumber"
                    value={form.idNumber}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.idNumber && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.idNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Contact Number *
                  </label>
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.contact && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#464646] mb-2">
                  Affiliation *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-[#464646]">
                    <input
                      type="radio"
                      name="affiliation"
                      value="Student"
                      checked={form.affiliation === "Student"}
                      onChange={handleChange}
                    />
                    Student
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#464646]">
                    <input
                      type="radio"
                      name="affiliation"
                      value="Employee"
                      checked={form.affiliation === "Employee"}
                      onChange={handleChange}
                    />
                    Employee
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Cat to Adopt *
                  </label>
                  <select
                    name="chosenCat"
                    value={form.chosenCat}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select a cat</option>
                    {cats.map((cat) => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.chosenCat && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.chosenCat}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Pets at Home (Type & number) *
                  </label>
                  <input
                    name="petsAtHome"
                    value={form.petsAtHome}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.petsAtHome && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.petsAtHome}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Means & Environment to care for a cat *
                  </label>
                  <textarea
                    name="careEnvironment"
                    value={form.careEnvironment}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 min-h-20"
                  />
                  {errors.careEnvironment && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.careEnvironment}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#464646]">
                    Why do you want to adopt this cat? *
                  </label>
                  <textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 min-h-20"
                  />
                  {errors.reason && (
                    <p className="text-xs text-red-500 mt-1">{errors.reason}</p>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-[#464646]">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span>
                  I understand that a short interview will be conducted before
                  approval, and adoption is subject to review.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-500">{errors.consent}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 rounded-full border border-gray-300 text-[#464646] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#add3fa] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitError && (
                <p className="text-sm text-red-500 text-right">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
