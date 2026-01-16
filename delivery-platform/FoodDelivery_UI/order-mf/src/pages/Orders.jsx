import { useEffect, useState } from "react";
import { fetchAllOrders, fetchMyOrders } from "../api/orderApi";
import { hasRole } from "../utils/auth";
import OrderTable from "../components/OrderTable";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = hasRole("ROLE_ADMIN");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = isAdmin ? await fetchAllOrders() : await fetchMyOrders();

        setOrders(res.data);
        toast.success("Orders loaded");
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin ? "All Orders" : "My Orders"}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
}
