import { useAuth } from "../context/AuthContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <h2 className="font-semibold">{user.sub}</h2>
        <p className="text-sm text-gray-500">{user.authorities?.[0]}</p>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
}
