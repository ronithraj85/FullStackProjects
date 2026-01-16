import { useState } from "react";
import { Home, ShoppingBag, Users, Menu } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../context/AuthContext";

const MENU = {
  ROLE_ADMIN: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Orders", path: "/orders", icon: ShoppingBag },
    { label: "Users", path: "/users", icon: Users },
  ],
  ROLE_USER: [{ label: "My Orders", path: "/orders", icon: ShoppingBag }],
};

export default function Sidebar() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || !user.authorities?.length) return null;

  const role = user.authorities[0];
  const menus = MENU[role] || [];

  return (
    <aside
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && <h1 className="text-lg font-bold">Food Admin</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {menus.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            collapsed={collapsed}
          />
        ))}
      </nav>
    </aside>
  );
}
