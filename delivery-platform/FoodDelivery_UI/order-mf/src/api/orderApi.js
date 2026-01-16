const BASE_URL = "http://localhost:8585";

export async function placeOrder() {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return res.json();
}

export async function getMyOrders() {
  const res = await fetch(`${BASE_URL}/api/orders/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}
