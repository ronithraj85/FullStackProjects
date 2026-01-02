import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import PatientsPage from "./Patients/PatientsPage";
import DoctorsPage from "./Doctor/DoctorsPage";
import UsersPage from "./Users/UsersPage";
import AppointmentsPage from "./Appointments/AppointmentsPAge";

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
  const [activeSection, setActiveSection] = useState<string>("");
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded text-white h-full"
          >
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </button>

          {/* Admin-only options */}
          {roles.includes("ROLE_ADMIN") && (
            <>
              {/* <button
                onClick={() => setActiveSection("admin")}
                className="px-4 py-2 hover:bg-blue-700 rounded text-white"
              >
                Add Admin
              </button> */}

              <button
                onClick={() => setActiveSection("doctors")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Doctors
              </button>
              <button
                onClick={() => setActiveSection("patients")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Patients
              </button>
              <button
                onClick={() => setActiveSection("users")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Users
              </button>
              <button
                onClick={() => setActiveSection("appointments")}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Appointments
              </button>
            </>
          )}

          {/* User + Admin can schedule appointments */}
          {roles.includes("ROLE_USER") && (
            // || roles.includes("ROLE_ADMIN")
            <button
              onClick={() => setActiveSection("appointments")}
              className="hover:bg-blue-700 px-3 py-2 rounded"
            >
              Appointments
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-green-400 hover:bg-green-600 px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {activeSection === "" && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the Healthcare System
          </h2>
          <p className="text-gray-700">
            Use the navigation bar above to manage doctors, patients, and
            appointments.
          </p>
        </div>
      )}
      {/* 👇 Conditional rendering based on activeSection */}
      {activeSection === "users" && <UsersPage />}
      {/* {activeSection === "admin" && <AddAdminPage />} */}
      {activeSection === "doctors" && <DoctorsPage />}
      {activeSection === "patients" && <PatientsPage />}
      {activeSection === "appointments" && <AppointmentsPage />}
    </div>
  );
};

export default HomePage;
