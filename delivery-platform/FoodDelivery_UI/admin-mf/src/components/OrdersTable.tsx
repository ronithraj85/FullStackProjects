import { useEffect, useState } from "react";
import { getAllOrders } from "../api/adminApi";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.userEmail}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">₹{o.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
