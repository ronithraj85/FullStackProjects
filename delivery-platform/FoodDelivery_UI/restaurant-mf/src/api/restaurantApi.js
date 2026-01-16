import axios from "axios";

export const getRestaurants = () =>
  axios.get("http://localhost:8585/api/restaurants");
