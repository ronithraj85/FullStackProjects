import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import { isAuthenticated } from "./utils/auth";

// 🔥 MFEs
const RestaurantApp = React.lazy(() => import("restaurant/App"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          {/* ================= AUTH ================= */}
          <Route
            path="/login/*"
            element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/register/*"
            element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
          />

          {/* ================= PROTECTED ================= */}
          <Route
            path="/"
            element={
              isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />
            }
          >
            {/* CHILD ROUTES */}
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />

            {/* 🔥 RESTAURANT MFE ROUTE */}
            <Route path="restaurants" element={<RestaurantApp />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
