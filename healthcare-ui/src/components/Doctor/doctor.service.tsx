import axios from "axios";
import type DoctorResponseDto from "../../types/DoctorResponseDto";

const API_DOCTOR_URL = "http://localhost:8181/api/doctors";

//Adding a doctor
export const registerDoctor = async (
  name: string,
  specialization: string,
  active: boolean
) => {
  try {
    const result = await axios.post(
      `${API_DOCTOR_URL}`,
      {
        name,
        specialization,
        active,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error while registering the doctor-", err);
    throw err;
  }
};

// Get all doctors
export const getAllDoctors = async (): Promise<DoctorResponseDto[]> => {
  try {
    const res = await axios.get<DoctorResponseDto[]>(`${API_DOCTOR_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error while fetching all the doctors-", error);
    throw error;
  }
};

// Delete doctor service
export const deleteDoctor = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_DOCTOR_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.error("Error occurred while deleting user:", err);
    throw err;
  }
};
