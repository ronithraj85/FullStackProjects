import { useEffect, useState } from "react";
import {
  fetchMyRestaurant,
  fetchRestaurantOrders,
  updateOrderStatus,
} from "../api/orderApi";

export default function OwnerOrders() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async (rid) => {
    setLoading(true);
    const res = await fetchRestaurantOrders(rid);
    setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const res = await fetchMyRestaurant();
      const rid = res.data.id;
      setRestaurantId(rid);
      loadOrders(rid);
    };

    init();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    loadOrders(restaurantId);
  };

  if (loading) return <p>Loading orders…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurant Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 shadow">
          <p>
            <b>Order ID:</b> {order.id}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>

          <ul className="ml-4 list-disc">
            {order.items.map((item) => (
              <li key={item.id}>
                Item #{item.menuItemId} × {item.quantity}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex gap-2">
            {order.status === "CREATED" && (
              <>
                <button
                  onClick={() => handleStatusChange(order.id, "ACCEPTED")}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, "REJECTED")}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
