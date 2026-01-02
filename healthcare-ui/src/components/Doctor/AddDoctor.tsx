import { useState } from "react";
import { registerDoctor } from "./doctor.service";

export default function AddDoctorPage({ onDoctorAdded }) {
  const [form, setForm] = useState({
    docName: "",
    specialization: "",
    active: true,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerDoctor(form.docName, form.specialization, form.active);
      if (onDoctorAdded) {
        onDoctorAdded();
      }
      setForm({ docName: "", specialization: "", active: true });
    } catch {
      console.log("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Add Admin</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="docName"
          placeholder="Enter Doctor name"
          value={form.docName}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Enter Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-300 to-blue-500 text-white font-semibold px-4 py-2 rounded w-full hover:opacity-90"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}
