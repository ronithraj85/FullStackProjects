import { useState } from "react";
import PlaceOrder from "./components/PlaceOrder";
import OrderList from "./components/OrderList";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <PlaceOrder onOrderPlaced={() => setRefresh((r) => r + 1)} />
      <OrderList refresh={refresh} />
    </div>
  );
}
