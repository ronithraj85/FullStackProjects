import { Link } from "react-router-dom";
import { hasRole, logout } from "../utils/auth";

export default function Sidebar() {
  const isAdmin = hasRole("ROLE_ADMIN");

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Food Delivery
      </div>

      <nav className="p-4 space-y-2">
        <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>

        <Link
          to="/orders"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          {isAdmin ? "All Orders" : "My Orders"}
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={logout}
          className="w-full text-left px-3 py-2 rounded hover:bg-red-600 mt-4"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
