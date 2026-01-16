import { httpClient } from "./httpClient";

export const orderApi = {
  getAllOrders() {
    return httpClient("/orders"); // 👉 Gateway route
  },

  createOrder(order) {
    return httpClient("/orders", {
      method: "POST",
      body: order,
    });
  },
};
