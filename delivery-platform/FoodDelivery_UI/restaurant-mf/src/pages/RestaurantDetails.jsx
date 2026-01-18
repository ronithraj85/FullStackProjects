import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById, getRestaurantMenu } from "../api/restaurantApi";
import MenuItemCard from "../components/MenuItemCard";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getRestaurantById(id).then((res) => setRestaurant(res.data));
    getRestaurantMenu(id).then((res) => setMenu(res.data));
  }, [id]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  if (!restaurant) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          ⭐ {restaurant.rating || 4.2} • {restaurant.city}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {menu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={() => addToCart(item)}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <button
          onClick={() =>
            navigate(`/restaurants/${id}/cart`, {
              state: { cart, restaurant },
            })
          }
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg"
        >
          View Cart ({cart.length}) items
        </button>
      )}
    </div>
  );
}
