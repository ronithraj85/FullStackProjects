import api from "../../../shell-ui/src/api/axios";

// ==================
// PUBLIC (USER)
// ==================

// List restaurants
export const getRestaurants = () => api.get("/restaurants");

// Get restaurant by id
export const getRestaurantById = (id) => api.get(`/restaurants/${id}`);

// Get menu for restaurant
export const getRestaurantMenu = (restaurantId) =>
  api.get(`/restaurants/${restaurantId}/menu`);

// ==================
// OWNER
// ==================

// Get restaurants owned by logged-in owner
export const getOwnerRestaurants = () => api.get("/restaurants/owner");

// Add new restaurant (OWNER)
export const createRestaurant = (data) => api.post("/restaurants", data);
