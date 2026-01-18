import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="p-6">Cart is empty</p>;

  const { cart: initialCart, restaurant } = state;
  const [cart, setCart] = useState(initialCart);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const itemTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 30;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-sm text-gray-500">{restaurant.city}</p>
        </div>

        {/* CART ITEMS */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹ {item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-8 h-8 border rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BILL DETAILS */}
        <div className="bg-white rounded-xl shadow-sm mt-6 p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Item total</span>
            <span>₹ {itemTotal}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Delivery fee</span>
            <span>₹ {deliveryFee}</span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Grand Total</span>
            <span>₹ {grandTotal}</span>
          </div>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={() => alert("Order placement next step 🚀")}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 
                     bg-black text-white px-10 py-4 
                     rounded-full shadow-lg"
        >
          Place Order • ₹ {grandTotal}
        </button>
      </div>
    </div>
  );
}
