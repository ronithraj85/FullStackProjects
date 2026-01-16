export default function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{restaurant.name}</h3>
        <p className="text-sm text-gray-500">{restaurant.cuisine}</p>

        <div className="flex justify-between items-center mt-3 text-sm">
          <span>⭐ {restaurant.rating}</span>
          <span className={restaurant.open ? "text-green-600" : "text-red-500"}>
            {restaurant.open ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
}
