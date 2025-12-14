import React, { useState, useRef } from "react";
import vol1 from "../assets/vol1.png";
import vol2 from "../assets/vol2.png";

const timeSlots = [
  "Monday 10:00 AM - 12:00 PM",
  "Monday 2:00 PM - 4:00 PM",
  "Tuesday 10:00 AM - 12:00 PM",
  "Tuesday 2:00 PM - 4:00 PM",
  "Wednesday 10:00 AM - 12:00 PM",
  "Wednesday 2:00 PM - 4:00 PM",
  "Thursday 10:00 AM - 12:00 PM",
  "Thursday 2:00 PM - 4:00 PM",
  "Friday 10:00 AM - 12:00 PM",
  "Friday 2:00 PM - 4:00 PM",
];

export default function VolunteerForm() {
  const [form, setForm] = useState({
    userName: "",
    courseAndSection: "",
    nuEmail: "",
    hasCatFood: false,
    catFoodName: "",
    selectedSlot: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const API_BASE = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.userName.trim()) newErrors.userName = "Name is required";
    if (!form.courseAndSection.trim())
      newErrors.courseAndSection = "Course and section required";
    if (!form.nuEmail.trim()) newErrors.nuEmail = "NU email is required";
    if (!form.nuEmail.includes("@"))
      newErrors.nuEmail = "Please enter a valid email";
    if (!form.selectedSlot)
      newErrors.selectedSlot = "Please select a time slot";
    if (form.hasCatFood && !form.catFoodName.trim()) {
      newErrors.catFoodName = "Please specify cat food name";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${API_BASE}/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName,
          courseAndSection: form.courseAndSection,
          nuEmail: form.nuEmail,
          hasCatFood: form.hasCatFood,
          catFoodName: form.hasCatFood ? form.catFoodName : undefined,
          selectedSlot: form.selectedSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit");
      }
      setSubmitted(true);
      setForm({
        userName: "",
        courseAndSection: "",
        nuEmail: "",
        hasCatFood: false,
        catFoodName: "",
        selectedSlot: "",
      });
    } catch (err) {
      setSubmitError(
        err?.message || "There was an issue submitting. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Reference for scrolling to form
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section with Flower Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:justify-between justify-items-center mb-70 px-6 sm:px-10 md:px-16 lg:px-24 py-30 relative">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"></div>

        {/* LEFT COLUMN: Image with Paw/Blob Shape */}
        <div className="relative z-10 transform -rotate-3 transition-transform hover:rotate-0 duration-300">
          <div className="w-full max-w-sm rounded-[3rem] overflow-hidden shadow-lg border-8 border-[#BDE0FE]">
            <img
              src={vol1}
              alt="Volunteer feeding cat"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>

        {/* CENTER COLUMN: Typography & Button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 space-y-4">
          <h1 className="text-8xl md:text-10xl font-black tracking-wide leading-tight">
            {/* "Lend a" - Beige/Orange Text with Outline */}
            <span className="block text-[#add3fa]">Lend a</span>
            {/* "Paw" - Blue Text with Outline */}
            <span className="block text-center text-[#faefc3]">Paw</span>
          </h1>

          <p
            className="text-gray-700 font-medium text-sm md:text-base max-w-xs"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            By volunteering, you help create a safer and more caring environment
            for the campus cats of NU.
          </p>

          <button
            onClick={scrollToForm}
            className="self-center mt-4 px-8 py-2 bg-white border-2 border-[#add3fa] rounded-full font-bold text-[#fadfaa] shadow-[4px_4px_0px_0px_rgba(173,211,250,1)] hover:translate-y-1 hover:shadow-none transition-all"
          >
            Apply Now
          </button>
        </div>

        {/* RIGHT COLUMN: Flower/Cloud Shaped Image */}
        <div className="relative z-10 transform rotate-3 transition-transform hover:rotate-0 duration-300">
          <div className="w-full max-w-sm rounded-[40px] rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-lg border-8 border-[#BDE0FE]">
            <img
              src={vol2}
              alt="Volunteers with cats"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Form Section */}
        <div
          ref={formRef}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-[#464646] mb-6">
            Volunteer Application Form
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800 font-semibold">
                Thank you for volunteering! We'll contact you soon via email.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#464646] mb-1">
                  Full Name *
                </label>
                <input
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Juan Dela Cruz"
                />
                {errors.userName && (
                  <p className="text-xs text-red-500 mt-1">{errors.userName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#464646] mb-1">
                  Course & Section *
                </label>
                <input
                  name="courseAndSection"
                  value={form.courseAndSection}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="BSCS 3-1"
                />
                {errors.courseAndSection && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.courseAndSection}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#464646] mb-1">
                NU Email Address *
              </label>
              <input
                type="email"
                name="nuEmail"
                value={form.nuEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="your.name@students.national-u.edu.ph"
              />
              {errors.nuEmail && (
                <p className="text-xs text-red-500 mt-1">{errors.nuEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#464646] mb-2">
                Select Your Volunteer Time Slot *
              </label>
              <select
                name="selectedSlot"
                value={form.selectedSlot}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">-- Choose a time slot --</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.selectedSlot && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.selectedSlot}
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasCatFood"
                  checked={form.hasCatFood}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm font-semibold text-[#464646]">
                  I can bring cat food to donate
                </span>
              </label>

              {form.hasCatFood && (
                <div className="mt-3">
                  <label className="block text-sm font-semibold text-[#464646] mb-1">
                    Cat Food Name/Brand *
                  </label>
                  <input
                    name="catFoodName"
                    value={form.catFoodName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="e.g., Whiskas, Purina, Special Cat"
                  />
                  {errors.catFoodName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.catFoodName}
                    </p>
                  )}
                </div>
              )}
            </div>

            {submitError && (
              <div className="p-3 bg-red-100 border border-red-400 rounded-lg">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#add3fa] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-[#fadfaa] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#464646] mb-3">
            What You'll Do
          </h3>
          <ul className="space-y-2 text-[#464646]">
            <li className="flex items-start gap-2">
              <span className="text-[#add3fa] font-bold">•</span>
              <span>Feed campus cats during your scheduled time slot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#add3fa] font-bold">•</span>
              <span>Monitor cat health and report any concerns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#add3fa] font-bold">•</span>
              <span>Help maintain feeding stations and water bowls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#add3fa] font-bold">•</span>
              <span>
                Document cat activities and share updates with the team
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
