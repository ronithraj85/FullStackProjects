import httpClient from "./httpClient";

// GET all restaurants
export const getRestaurants = async () => {
  const res = await httpClient.get("/api/restaurants");
  return res.data;
};

// GET menu for a restaurant
export const getRestaurantMenu = async (restaurantId) => {
  const res = await httpClient.get(`/api/restaurants/${restaurantId}/menu`);
  return res.data;
};
