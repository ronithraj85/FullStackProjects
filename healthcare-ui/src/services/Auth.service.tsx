import axios from "axios";

const API_URL = "http://localhost:8181/api/auth";

// Login service
export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
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
  let roleToSave = [{}];
  if (role === "user") {
    roleToSave = [{ name: "ROLE_USER" }];
  }
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      username,
      email,
      password,
      roleToSave,
    });

    return res.data; // return response data to caller
  } catch (err) {
    console.error("Error occurred in Register:", err);
    throw err;
  }
};
