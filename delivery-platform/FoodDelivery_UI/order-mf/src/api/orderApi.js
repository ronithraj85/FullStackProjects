import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: "http://localhost:8585/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAllOrders = () => API.get("/orders");
export const fetchMyOrders = () => API.get("/orders/my");
