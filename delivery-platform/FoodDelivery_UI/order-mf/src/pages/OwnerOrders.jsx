import { updateOrderStatus } from "../api/orderApi";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  CREATED: "bg-gray-200 text-gray-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-yellow-100 text-yellow-800",
  READY: "bg-green-100 text-green-800",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
};

export default function OwnerOrders({ orders }) {
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order updated");
      window.location.reload();
    } catch {
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🍽 Restaurant Orders</h1>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow border p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="font-semibold">{order.userEmail}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  STATUS_COLORS[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2">Items</p>
              <ul className="text-sm space-y-1">
                {order.items?.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-bold text-lg">₹ {order.totalAmount}</p>
              </div>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="CREATED">CREATED</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="PREPARING">PREPARING</option>
                <option value="READY">READY</option>
                <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
