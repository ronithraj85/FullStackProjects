const BASE_URL = "http://localhost:8585";

export async function getAllOrders() {
  const res = await fetch(`${BASE_URL}/api/admin/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Forbidden / Not Admin");
  }

  return res.json();
}
