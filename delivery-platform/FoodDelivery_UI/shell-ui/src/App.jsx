import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import { isAuthenticated } from "./utils/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/login/*"
          element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/register/*"
          element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
