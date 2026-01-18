import axios from "axios";
import { getToken } from "../utils/auth";
import api from "../../../shell-ui/src/api/axios";

export const fetchAllOrders = () => api.get("/orders/all");

export const fetchMyOrders = () => api.get("/orders/me");

export const fetchRestaurantOrders = (restaurantId) =>
  api.get(`/orders/restaurant/${restaurantId}`);

export const updateOrderStatus = (orderId, status) =>
  api.put(`/orders/${orderId}/status`, null, {
    params: { status },
  });

export const fetchMyRestaurant = () => api.get("/restaurants/owner/me");
export const placeOrder = (orderRequest) => api.post("/orders", orderRequest);
