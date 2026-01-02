import axios from "axios";
import type UserResponseDto from "../../types/UserResponseDto";

const API_USER_URL = "http://localhost:8181/api/users";

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
