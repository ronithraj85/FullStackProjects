import { getAuthUser } from "../utils/auth";
import toast from "react-hot-toast";

export default function Topbar() {
  const user = getAuthUser();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold text-gray-700">Food Delivery Platform</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
