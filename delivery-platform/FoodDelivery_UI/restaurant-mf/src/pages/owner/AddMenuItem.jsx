import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addMenuItem } from "../../api/menuApi";

export default function AddMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      alert("Name and price required");
      return;
    }

    try {
      await addMenuItem(id, {
        ...form,
        price: Number(form.price),
      });
      navigate(`/owner/restaurants/${id}`);
    } catch {
      alert("Failed to add item");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Add Menu Item</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <input
            name="name"
            placeholder="Item name"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
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
            onClick={handleSave}
            className="bg-black text-white w-full py-3 rounded"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}
