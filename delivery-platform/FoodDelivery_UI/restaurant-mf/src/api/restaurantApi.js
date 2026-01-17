import api from "../../../shell-ui/src/api/axios";

export const getRestaurants = () => api.get("/restaurants");
