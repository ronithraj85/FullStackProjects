import api from "../../../shell-ui/src/api/axios";

// OWNER – get menu for restaurant
export const getMenuByRestaurant = (restaurantId) =>
  api.get(`/restaurants/${restaurantId}/menu`);

// OWNER – add menu item
export const addMenuItem = (restaurantId, data) =>
  api.post(`/restaurants/${restaurantId}/menu`, data);
