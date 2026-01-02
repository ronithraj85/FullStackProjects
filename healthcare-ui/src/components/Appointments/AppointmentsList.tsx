// src/components/AppointmentList.tsx
import React, { useEffect, useState } from "react";
import { getAllAppointments } from "./appointment.service";
import type AppointmentResponseDto from "../../types/AppointmentResponseDto";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<AppointmentResponseDto[]>(
    []
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAllAppointments();
        setAppointments(appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      <ul className="space-y-3">
        {appointments.map((a) => (
          <li key={a.id} className="p-4 bg-gray-400 rounded shadow">
            <p>
              <strong>Patient:</strong> {a.patientName}
            </p>
            <p>
              <strong>Doctor:</strong> {a.doctorName}
            </p>
            <p>
              <strong>Start:</strong> {new Date(a.startTime).toLocaleString()}
            </p>
            <p>
              <strong>Duration:</strong> {a.durationMinutes} mins
            </p>
            {a.notes && (
              <p>
                <strong>Notes:</strong> {a.notes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
