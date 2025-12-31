import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utility to decode JWT payload
function parseJwt(
  token: string
): { roles?: string[]; authorities?: string[] } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  } catch {
    return null;
  }
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [roles] = useState<string[]>(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = parseJwt(token);
      return decoded?.roles ?? decoded?.authorities ?? [];
    }
    return [];
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Healthcare System</h1>
        <div className="space-x-4">
          {/* Admin-only options */}
          {roles.includes("ROLE_ADMIN") && (
            <>
              <button
                onClick={() => navigate("/doctors/create")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Create Doctor
              </button>
              <button
                onClick={() => navigate("/doctors/delete")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Delete Doctor
              </button>
              <button
                onClick={() => navigate("/patients/create")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Create Patient
              </button>
              <button
                onClick={() => navigate("/patients/delete")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Delete Patient
              </button>
            </>
          )}

          {/* User + Admin can schedule appointments */}
          {(roles.includes("ROLE_USER") || roles.includes("ROLE_ADMIN")) && (
            <button
              onClick={() => navigate("/appointments/schedule")}
              className="hover:bg-blue-700 px-3 py-2 rounded"
            >
              Schedule Appointment
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Healthcare System
        </h2>
        <p className="text-gray-700">
          Use the navigation bar above to manage doctors, patients, and
          appointments.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
