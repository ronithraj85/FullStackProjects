import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8585/api/auth",
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
