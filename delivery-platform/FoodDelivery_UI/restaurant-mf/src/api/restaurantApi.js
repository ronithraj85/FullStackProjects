import api from "../../../shell-ui/src/api/axios";

// PUBLIC – list restaurants
export const getRestaurants = () => api.get("/restaurants");

// PUBLIC – get restaurant by id
export const getRestaurantById = (id) => api.get(`/restaurants/${id}`);

// PUBLIC – get menu for restaurant
export const getRestaurantMenu = (restaurantId) =>
  api.get(`/restaurants/${restaurantId}/menu`);
