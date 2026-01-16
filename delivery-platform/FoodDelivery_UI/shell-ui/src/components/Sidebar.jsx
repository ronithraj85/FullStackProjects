import { Link, useLocation } from "react-router-dom";
import { hasRole } from "../utils/auth";

export default function Sidebar() {
  const isAdmin = hasRole("ROLE_ADMIN");
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded ${
      location.pathname === path ? "bg-gray-700" : "hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Food Delivery
      </div>

      <nav className="p-4 space-y-2">
        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/orders" className={linkClass("/orders")}>
          {isAdmin ? "All Orders" : "My Orders"}
        </Link>

        {isAdmin && (
          <Link to="/admin" className={linkClass("/admin")}>
            Admin Panel
          </Link>
        )}
      </nav>
    </aside>
  );
}
