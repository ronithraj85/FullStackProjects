export default function MenuItemCard({ item }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="text-right">
        <p className="font-bold">₹{item.price}</p>
        {!item.available && (
          <p className="text-red-500 text-sm">Not Available</p>
        )}
      </div>
    </div>
  );
}
