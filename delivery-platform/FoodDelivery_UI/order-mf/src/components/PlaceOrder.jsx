import { placeOrder } from "../api/orderApi";

export default function PlaceOrder({ onOrderPlaced }) {
  async function handleOrder() {
    try {
      await placeOrder();
      onOrderPlaced();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      onClick={handleOrder}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Place Order
    </button>
  );
}
