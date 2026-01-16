import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
