import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import { isAuthenticated, getRole } from "./utils/auth";

// MFEs
const RestaurantApp = React.lazy(() => import("restaurant/App"));
const OrderApp = React.lazy(() => import("order/App"));

export default function App() {
  const role = getRole();

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          {/* AUTH */}
          <Route
            path="/login/*"
            element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/register/*"
            element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
          />

          {/* PROTECTED */}
          <Route
            path="/"
            element={
              isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />
            }
          >
            <Route index element={<Dashboard />} />

            {/* USER */}
            {role === "ROLE_USER" && (
              <Route path="orders" element={<Orders />} />
            )}

            {/* OWNER */}
            {role === "ROLE_OWNER" && (
              <Route path="owner/orders" element={<OrderApp />} />
            )}

            {/* RESTAURANT MFE */}
            <Route path="restaurants/*" element={<RestaurantApp />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
