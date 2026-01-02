import axios from "axios";

const API_AUTH_URL = "http://localhost:8181/api/auth";

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

// Register service, also for adding user.
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
