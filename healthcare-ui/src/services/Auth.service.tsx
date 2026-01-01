import axios from "axios";
import type UserResponseDto from "../types/UserResponseDto";
import type DoctorResponseDto from "../types/DoctorResponseDto";
import type { PatientResponseDto } from "../types/PatientResponseDto";

const API_AUTH_URL = "http://localhost:8181/api/auth";

const API_USER_URL = "http://localhost:8181/api/users";

const API_DOCTOR_URL = "http://localhost:8181/api/doctors";

const API_PATIENT_URL = "http://localhost:8181/api/patients";

// Login service
export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const res = await axios.post(`${API_AUTH_URL}/login`, {
      usernameOrEmail,
      password,
    });

    // Save access token in localStorage
    localStorage.setItem("accessToken", res.data.accessToken);

    return res.data; // return response data to caller
  } catch (err) {
    console.error("Error occurred in Login:", err);
    throw err;
  }
};

// Register service
export const register = async (
  name: string,
  username: string,
  email: string,
  password: string,
  role: string
) => {
  let roles = [{}];
  if (role === "user" || role === "User") {
    roles = [{ name: "ROLE_USER" }];
  } else if (role === "admin" || role === "Admin") {
    roles = [{ name: "ROLE_ADMIN" }];
  } else {
    roles = [{ name: "ROLE_STAFF" }];
  }

  try {
    console.log("Role to be added is=", roles);
    const res = await axios.post(`${API_AUTH_URL}/register`, {
      name,
      username,
      email,
      password,
      roles,
    });

    return res.data; // return response data to caller
  } catch (err) {
    console.error("Error occurred in Register:", err);
    throw err;
  }
};

// Get Users service
export const getUsers = async (): Promise<UserResponseDto[]> => {
  try {
    const res = await axios.get<UserResponseDto[]>(`${API_USER_URL}/getUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return res.data; // return response data to caller
  } catch (err) {
    console.error("Error occurred in getUsers:", err);
    throw err;
  }
};

// Delete user service
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_USER_URL}/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.error("Error occurred while deleting user:", err);
    throw err;
  }
};

// Update user service
export const updateUser = async (
  id: number,
  updatedData: Partial<UserResponseDto>
): Promise<UserResponseDto> => {
  const res = await axios.put<UserResponseDto>(
    `${API_USER_URL}/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data; // updated user object
};

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
export const getAllDoctors = async (): Promise<DoctorResponseDto> => {
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

// Update user service
export const updatePatient = async (
  id: number,
  updatedData: Partial<PatientResponseDto>
): Promise<PatientResponseDto> => {
  const res = await axios.put<UserRespoPatientResponseDtonseDto>(
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
