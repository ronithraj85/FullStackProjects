export default function RestaurantCard({ restaurant }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden 
                    shadow-sm hover:shadow-lg 
                    transition-all duration-300 
                    hover:-translate-y-1"
    >
      {/* IMAGE */}
      <div className="relative h-44">
        <img
          src={restaurant.imageUrl || "https://via.placeholder.com/400x300"}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />

        <span
          className="absolute top-3 left-3 
                         bg-orange-500 text-white 
                         text-xs font-semibold 
                         px-2 py-1 rounded-md"
        >
          FREE DELIVERY
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
            ⭐ {restaurant.rating || 4.2}
          </span>
          <span>• {restaurant.deliveryTime || 30} mins</span>
        </div>

        <p className="text-sm text-gray-400 truncate">
          {restaurant.cuisine || "Biryani, Indian"}
        </p>

        <p className="text-xs text-gray-400">{restaurant.city}</p>
      </div>
    </div>
  );
}
