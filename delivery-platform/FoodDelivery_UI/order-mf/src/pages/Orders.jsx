import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import Table from "../components/Table";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8585/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then(setOrders)
      .catch(() => setError("Unable to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader text="Loading orders..." />;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <Table
          columns={["Order ID", "Status", "Amount", "Created At"]}
          data={orders}
          renderRow={(order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{order.id}</td>
              <td className="px-4 py-2 border-b">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-4 py-2 border-b">₹{order.totalAmount}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          )}
        />
      )}
    </div>
  );
}
