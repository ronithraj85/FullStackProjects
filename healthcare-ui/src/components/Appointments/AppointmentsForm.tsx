// src/components/AppointmentForm.tsx
import React, { useEffect, useState } from "react";
import { getAllDoctors } from "../Doctor/doctor.service";
import { getPatients } from "../Patients/patient.service";
import type DoctorResponseDto from "../../types/DoctorResponseDto";
import type { PatientResponseDto } from "../../types/PatientResponseDto";
import { scheduleAppointment } from "./appointment.service";

export default function AppointmentsForm() {
  const [doctors, setDoctors] = useState<DoctorResponseDto[]>([]);
  const [patients, setPatients] = useState<PatientResponseDto[]>([]);
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    startTime: "",
    durationMinutes: 30,
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getAllDoctors();
        const pats = await getPatients();
        setDoctors(docs);
        setPatients(pats);
      } catch (err) {
        console.error("Error fetching doctors/patients:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await scheduleAppointment(form);
    alert("Appointment scheduled successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Dropdown */}
        <div>
          <label className="block text-sm font-medium">Patient</label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            {Array.isArray(patients) &&
            patients.filter((pat) => pat.active).length > 0 ? (
              <>
                {" "}
                <option value="">Select Patient</option>{" "}
                {patients
                  .filter((pat) => pat.active)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {" "}
                      {p.name}{" "}
                    </option>
                  ))}{" "}
              </>
            ) : (
              <option value="" disabled>
                {" "}
                No patients available{" "}
              </option>
            )}
          </select>
        </div>

        {/* Doctor Dropdown */}
        <div>
          <label className="block text-sm font-medium">Doctor</label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Doctor</option>
            {doctors?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={15}
            step={15}
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-gradient-to-r from-green-300 to-blue-500 text-white font-semibold px-4 py-2 rounded w-full hover:opacity-90"
        >
          Schedule
        </button>
      </form>
    </div>
  );
}
