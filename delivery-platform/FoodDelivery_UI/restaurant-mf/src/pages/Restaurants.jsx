import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {restaurants.length} Restaurants to explore
      </h1>

      {/* 🔥 GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurants/${restaurant.id}`)}
            className="cursor-pointer"
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}
