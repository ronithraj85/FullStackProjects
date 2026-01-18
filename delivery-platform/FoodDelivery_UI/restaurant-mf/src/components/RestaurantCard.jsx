export default function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={restaurant.imageUrl || "https://via.placeholder.com/300x200"}
          alt={restaurant.name}
          className="h-40 w-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          Free Delivery
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>

        <p className="text-sm text-gray-600 mt-1">
          ⭐ {restaurant.rating || 4.2} • {restaurant.deliveryTime || 30} mins
        </p>

        <p className="text-sm text-gray-400 truncate">
          {restaurant.cuisine || "Biryani, Indian"}
        </p>

        <p className="text-sm text-gray-400">{restaurant.city}</p>
      </div>
    </div>
  );
}
