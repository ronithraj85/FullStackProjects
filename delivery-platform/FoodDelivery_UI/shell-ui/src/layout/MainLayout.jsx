import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
