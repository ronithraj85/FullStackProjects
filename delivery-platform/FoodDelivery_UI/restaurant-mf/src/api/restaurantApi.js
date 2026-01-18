import api from "../../../shell-ui/src/api/axios";

export const getRestaurants = () => api.get("/restaurants");

export const fetchMyRestaurant = () => api.get("/restaurants/owner/me");
