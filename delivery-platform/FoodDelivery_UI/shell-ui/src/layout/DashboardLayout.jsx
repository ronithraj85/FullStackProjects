import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <Outlet /> {/* 🔥 THIS IS WHERE ROUTES RENDER */}
        </main>
      </div>
    </div>
  );
}
