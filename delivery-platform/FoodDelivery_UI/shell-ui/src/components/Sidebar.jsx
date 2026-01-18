import { Link, NavLink, useLocation } from "react-router-dom";
import { getRole, hasRole } from "../utils/auth";

export default function Sidebar() {
  const role = getRole();
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
        <NavLink to="/" className={linkClass("/")}>
          📊 Dashboard
        </NavLink>

        {/* RESTAURANTS */}
        <NavLink to="/restaurants" className={linkClass("/restaurants")}>
          🍔 Restaurants
        </NavLink>

        {/* USER */}
        {role === "ROLE_USER" && (
          <NavLink to="/orders" className={linkClass("/orders")}>
            📦 My Orders
          </NavLink>
        )}

        {/* OWNER */}
        {role === "ROLE_OWNER" && (
          <NavLink to="/owner/orders" className={linkClass("/owner/orders")}>
            🧾 Restaurant Orders
          </NavLink>
        )}
        {/* OWNER ONLY */}
        {role === "ROLE_OWNER" && (
          <>
            <NavLink
              to="/owner/dashboard"
              className={linkClass("/owner/dashboard")}
            >
              My Restaurants
            </NavLink>

            <NavLink
              to="/owner/add-restaurant"
              className={linkClass("/owner/add-restaurant")}
            >
              Add Restaurant
            </NavLink>
          </>
        )}
        {role === "ROLE_ADMIN" && (
          <NavLink to="/admin/restaurants" className="sidebar-link">
            Restaurant Approvals
          </NavLink>
        )}

        {/* ADMIN */}
        {/* {isAdmin && (
          <NavLink to="/admin" className={linkClass("/admin")}>
            🛠 Admin Panel
          </NavLink>
        )} */}
      </nav>
    </aside>
  );
}
