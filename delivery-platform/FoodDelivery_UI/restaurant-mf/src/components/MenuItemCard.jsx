export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="flex justify-between bg-white rounded-xl p-4 shadow hover:shadow-md transition">
      {/* LEFT — INFO */}
      <div className="flex flex-col gap-1 pr-4">
        <span className="text-xs text-red-500 font-semibold">★ Bestseller</span>

        <h3 className="font-semibold text-lg">{item.name}</h3>

        <p className="text-gray-700 font-medium">₹ {item.price}</p>

        <p className="text-sm text-gray-400">★ {item.rating || 4.2}</p>
      </div>

      {/* RIGHT — IMAGE + ADD */}
      <div className="relative w-32 h-28 flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />

        <button
          onClick={onAdd}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 
                     bg-white border border-green-600 
                     text-green-600 text-sm font-semibold
                     px-4 py-1 rounded shadow"
        >
          ADD
        </button>
      </div>
    </div>
  );
}
