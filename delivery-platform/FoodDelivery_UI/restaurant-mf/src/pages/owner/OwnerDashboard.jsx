import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerRestaurants } from "../../api/restaurantApi";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnerRestaurants()
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading restaurants...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Restaurants</h1>

          <button
            onClick={() => navigate("/owner/add-restaurant")}
            className="bg-black text-white px-5 py-2 rounded"
          >
            + Add Restaurant
          </button>
        </div>

        {/* EMPTY STATE */}
        {restaurants.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-600 mb-4">
              You haven’t added any restaurants yet.
            </p>
            <button
              onClick={() => navigate("/owner/add-restaurant")}
              className="bg-black text-white px-5 py-2 rounded"
            >
              Add your first restaurant
            </button>
          </div>
        )}

        {/* RESTAURANT LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.city}</p>

              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                  r.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : r.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {r.status}
              </span>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate(`/owner/restaurants/${r.id}`)}
                  className="border px-4 py-1 rounded text-sm"
                >
                  Manage Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
