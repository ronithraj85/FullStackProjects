import axios from "axios";
import type { PatientResponseDto } from "../../types/PatientResponseDto";

const API_PATIENT_URL = "http://localhost:8181/api/patients";

// Get all the patients
export const getPatients = async (): Promise<PatientResponseDto[]> => {
  try {
    const res = await axios.get<PatientResponseDto[]>(`${API_PATIENT_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return res.data; // return response data to caller
  } catch (err) {
    console.error("Error occurred in fetchPatients:", err);
    throw err;
  }
};

//Adding a patient
export const addPatient = async (
  name: string,
  email: string,
  mobile: string,
  dateOfBirth: string
) => {
  try {
    const result = await axios.post(
      `${API_PATIENT_URL}`,
      {
        name,
        email,
        mobile,
        dateOfBirth,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error while registering the patient-", err);
    throw err;
  }
};

// Update patient service
export const updatePatient = async (
  id: number,
  updatedData: Partial<PatientResponseDto>
): Promise<PatientResponseDto> => {
  const res = await axios.put<PatientResponseDto>(
    `${API_PATIENT_URL}/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data; // updated user object
};

// Delete patient service
export const deletePatient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_PATIENT_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.error("Error occurred while deleting user:", err);
    throw err;
  }
};
