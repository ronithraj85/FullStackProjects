import { useEffect, useState } from "react";
import { getRestaurants, getRestaurantMenu } from "../api/restaurantApi";
import MenuItemCard from "../components/MenuItemCard";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load restaurants
  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  const loadMenu = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setLoading(true);
    const menuData = await getRestaurantMenu(restaurant.id);
    setMenu(menuData);
    setLoading(false);
  };

  return (
    <div className="flex gap-6 p-6">
      {/* LEFT — RESTAURANT LIST */}
      <div className="w-1/3 border-r pr-4">
        <h2 className="text-xl font-bold mb-4">Restaurants</h2>

        {restaurants.map((r) => (
          <div
            key={r.id}
            onClick={() => loadMenu(r)}
            className={`p-3 rounded cursor-pointer mb-2 
              ${
                selectedRestaurant?.id === r.id
                  ? "bg-orange-100"
                  : "hover:bg-gray-100"
              }`}
          >
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-500">{r.city}</p>
          </div>
        ))}
      </div>

      {/* RIGHT — MENU */}
      <div className="w-2/3 pl-4">
        {loading && <p>Loading menu...</p>}

        {!selectedRestaurant && (
          <p className="text-gray-500">Select a restaurant to view menu</p>
        )}

        {selectedRestaurant && (
          <>
            <h2 className="text-xl font-bold mb-4">
              {selectedRestaurant.name} Menu
            </h2>

            <div className="space-y-4">
              {menu.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
