import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderApi";

export default function OrderList({ refresh }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, [refresh]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow p-3 mb-2 rounded">
          <p>Status: {order.status}</p>
          <p>Amount: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
