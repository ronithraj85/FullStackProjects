import axios from "axios";
import type AppointmentResponseDto from "../../types/AppointmentResponseDto";

const API_APPOINTMENT_URL = "http://localhost:8181/api/appointments";

export const getAllAppointments = async (): Promise<
  AppointmentResponseDto[]
> => {
  try {
    const res = await axios.get<AppointmentResponseDto[]>(
      `${API_APPOINTMENT_URL}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error while fetching all the appointments-", error);
    throw error;
  }
};

export const scheduleAppointment = async (form) => {
  try {
    const result = await axios.post(
      API_APPOINTMENT_URL,
      {
        patientId: form.patientId,
        doctorId: form.doctorId,
        startTime: form.startTime,
        durationMinutes: form.durationMinutes,
        notes: form.notes,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.error("Error while scheduling an appointment:", err);
    throw err;
  }
};
