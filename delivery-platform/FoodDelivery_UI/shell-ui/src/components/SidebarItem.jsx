import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, path, collapsed }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition rounded mx-2 ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-800"
        }`
      }
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
