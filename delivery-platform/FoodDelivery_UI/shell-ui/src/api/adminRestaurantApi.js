import api from "./axios";

// ADMIN – get pending restaurants
export const getPendingRestaurants = () =>
  api.get("/restaurants/admin/pending");

// ADMIN – approve / reject restaurant
export const updateRestaurantStatus = (id, status) =>
  api.put(`/restaurants/admin/${id}/status`, {
    status, // MUST be "ACTIVE" or "REJECTED"
  });
