import { useEffect, useState } from "react";
import {
  getPendingRestaurants,
  updateRestaurantStatus,
} from "../../api/adminRestaurantApi";

export default function RestaurantApprovals() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRestaurants = async () => {
    try {
      const res = await getPendingRestaurants();
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load pending restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateRestaurantStatus(id, status);
      loadRestaurants(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Restaurant Approvals</h1>

        {restaurants.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            No pending approvals 🎉
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.city}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleAction(r.id, "ACTIVE")}
                  className="bg-green-600 text-white px-4 py-1 rounded text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleAction(r.id, "REJECTED")}
                  className="bg-red-600 text-white px-4 py-1 rounded text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
