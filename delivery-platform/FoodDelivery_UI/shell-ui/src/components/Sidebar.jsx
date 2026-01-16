import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MENU = {
  ROLE_ADMIN: [
    { label: "Dashboard", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Users", path: "/users" },
  ],
  ROLE_USER: [{ label: "Orders", path: "/orders" }],
};

export default function Sidebar() {
  const { user } = useAuth();

  // Safety check
  if (!user || !user.authorities || user.authorities.length === 0) {
    return null;
  }

  const role = user.authorities[0]; // 🔥 ROLE_ADMIN
  const menus = MENU[role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Food Admin</h1>

      {menus.length === 0 && (
        <p className="text-sm text-gray-400">
          No menu available for role: {role}
        </p>
      )}

      {menus.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block p-2 rounded mb-2 ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
