import axios from "axios";
import type UserResponseDto from "../types/UserResponseDto";

const API_AUTH_URL = "http://localhost:8181/api/auth";

const API_USER_URL = "http://localhost:8181/api/users";

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
  if (role === "user") {
    roles = [{ name: "ROLE_USER" }];
  } else {
    roles = [{ name: "ROLE_ADMIN" }];
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
