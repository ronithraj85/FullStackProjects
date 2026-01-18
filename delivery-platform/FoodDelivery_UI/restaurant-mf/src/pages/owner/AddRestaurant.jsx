import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../../api/restaurantApi";

export default function AddRestaurant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    city: "",
    cuisine: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.city) {
      alert("Name and city are required");
      return;
    }

    try {
      setLoading(true);
      await createRestaurant(form);
      navigate("/owner/dashboard");
    } catch (e) {
      alert("Failed to add restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Add Restaurant</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <input
            name="name"
            placeholder="Restaurant Name"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="cuisine"
            placeholder="Cuisine (e.g. Biryani, Chinese)"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded"
          >
            {loading ? "Saving..." : "Save Restaurant"}
          </button>
        </div>
      </div>
    </div>
  );
}
