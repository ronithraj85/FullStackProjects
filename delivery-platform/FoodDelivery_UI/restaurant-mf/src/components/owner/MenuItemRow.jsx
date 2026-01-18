export default function MenuItemRow({ item }) {
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">
          ₹ {item.price} • ★ {item.rating || 4.2}
        </p>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded ${
          item.available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {item.available ? "AVAILABLE" : "UNAVAILABLE"}
      </span>
    </div>
  );
}
