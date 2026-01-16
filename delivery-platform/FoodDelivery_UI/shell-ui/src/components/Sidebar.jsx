import { Link, useLocation } from "react-router-dom";
import { hasRole } from "../utils/auth";

export default function Sidebar() {
  const isAdmin = hasRole("ROLE_ADMIN");
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      {/* HEADER */}
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Food Delivery
      </div>

      {/* NAV */}
      <nav className="p-4 space-y-2">
        {/* DASHBOARD */}
        <Link to="/" className={linkClass("/")}>
          📊 Dashboard
        </Link>

        {/* RESTAURANTS (restaurant-mf) */}
        <Link to="/restaurants" className={linkClass("/restaurants")}>
          🍔 Restaurants
        </Link>

        {/* ORDERS */}
        <Link to="/orders" className={linkClass("/orders")}>
          📦 {isAdmin ? "All Orders" : "My Orders"}
        </Link>

        {/* ADMIN */}
        {isAdmin && (
          <Link to="/admin" className={linkClass("/admin")}>
            🛠 Admin Panel
          </Link>
        )}
      </nav>
    </aside>
  );
}
