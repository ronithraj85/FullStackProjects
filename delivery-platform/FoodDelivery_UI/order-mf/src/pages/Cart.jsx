import { useLocation } from "react-router-dom";
import { placeOrder } from "../api/orderApi";
import toast from "react-hot-toast";

export default function Cart() {
  const location = useLocation();
  const { cart, restaurant } = location.state || {};

  if (!cart || !restaurant) {
    return <p className="p-6">Cart is empty</p>;
  }

  const handlePlaceOrder = async () => {
    try {
      await placeOrder({
        restaurantId: restaurant.id,
        items: cart.map((i) => ({
          menuItemId: i.id,
          quantity: i.quantity,
        })),
      });

      toast.success("Order placed successfully");
    } catch {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Cart – {restaurant.name}</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹ {item.price * item.quantity}</span>
        </div>
      ))}

      <button
        onClick={handlePlaceOrder}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
