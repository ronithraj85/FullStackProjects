import { useEffect, useState } from "react";
import {
  fetchAllOrders,
  fetchMyOrders,
  fetchRestaurantOrders,
  fetchMyRestaurant,
} from "../api/orderApi";
import { getRole, hasRole } from "../utils/auth";
import OrderTable from "../components/OrderTable";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = getRole();
  const isAdmin = hasRole("ROLE_ADMIN");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        let res;

        if (hasRole("ROLE_ADMIN")) {
          res = await fetchAllOrders();
        } else if (hasRole("ROLE_OWNER")) {
          const restaurantRes = await fetchMyRestaurant();
          const restaurantId = restaurantRes.data.id;
          res = await fetchRestaurantOrders(restaurantId);
        } else if (hasRole("ROLE_USER")) {
          res = await fetchMyOrders();
        } else {
          throw new Error("Unsupported role");
        }

        setOrders(res.data);
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin && "All Orders"}
        {role === "ROLE_OWNER" && "Restaurant Orders"}
        {role === "ROLE_USER" && "My Orders"}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
}
