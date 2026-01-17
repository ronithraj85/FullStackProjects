import axios from "axios";
import { getToken } from "../utils/auth";
import api from "../../../shell-ui/src/api/axios";

export const fetchAllOrders = () => api.get("/orders");
export const fetchMyOrders = () => api.get("/orders/my");
