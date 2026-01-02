import React, { useState } from "react";
import { addPatient } from "./patient.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AddPatient = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
  });
  const [patientAdded, setPatientAdded] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //:API call
      await addPatient(form.name, form.email, form.mobile, form.dateOfBirth);
      setPatientAdded(`Patient added successfully!`);
      setTimeout(() => {
        setPatientAdded("");
        window.location.reload();
      }, 3000);
    } catch {
      console.log("Adding patient failed. Please try again after sometime!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      {patientAdded && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {patientAdded}
        </div>
      )}
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Add Patient</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Enter mobile no."
          value={form.mobile}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <DatePicker
          selected={form.dateOfBirth}
          onChange={(date) =>
            setForm({ ...form, dateOfBirth: format(date, "yyyy-MM-dd") })
          }
          placeholderText="Enter DOB - MM/DD/YYYY"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-300 to-blue-500 text-white font-semibold px-4 py-2 rounded w-full hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
