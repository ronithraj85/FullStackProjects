import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByRestaurant } from "../../api/menuApi";
import MenuItemRow from "../../components/owner/MenuItemRow";

export default function ManageMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuByRestaurant(id)
      .then((res) => setMenu(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading menu...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Menu</h1>

          <button
            onClick={() => navigate(`/owner/restaurants/${id}/add-item`)}
            className="bg-black text-white px-5 py-2 rounded"
          >
            + Add Menu Item
          </button>
        </div>

        {/* EMPTY STATE */}
        {menu.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-600">No menu items added yet.</p>
          </div>
        )}

        {/* MENU LIST */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {menu.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
