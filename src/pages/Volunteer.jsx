import React from "react";
import Hero from "../components/Hero";
import VolunteerForm from "../components/VolunteerForm";

export default function Volunteer() {
  return (
    <div className="relative w-full min-h-screen bg-posa-yellow overflow-x-hidden">

      {/* Volunteer Form Section */}
      <VolunteerForm />
    </div>
  );
}
