import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import { isAuthenticated, getRole } from "./utils/auth";

// MFEs
const Restaurants = React.lazy(() => import("restaurant/Restaurants"));
const RestaurantDetails = React.lazy(
  () => import("restaurant/RestaurantDetails"),
);
const Cart = React.lazy(() => import("restaurant/Cart"));

const OrderApp = React.lazy(() => import("order/App"));
const OwnerDashboard = React.lazy(() => import("restaurant/OwnerDashboard"));
const AddRestaurant = React.lazy(() => import("restaurant/AddRestaurant"));
const ManageMenu = React.lazy(() => import("restaurant/ManageMenu"));
const AddMenuItem = React.lazy(() => import("restaurant/AddMenuItem"));
const RestaurantApprovals = React.lazy(
  () => import("./pages/admin/RestaurantApprovals"),
);

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
            {/* OWNER ROUTES */}
            {role === "ROLE_OWNER" && (
              <>
                <Route path="owner/dashboard" element={<OwnerDashboard />} />
                <Route
                  path="owner/add-restaurant"
                  element={<AddRestaurant />}
                />
                <Route path="owner/restaurants/:id" element={<ManageMenu />} />
                <Route
                  path="owner/restaurants/:id/add-item"
                  element={<AddMenuItem />}
                />
              </>
            )}
            {role === "ROLE_ADMIN" && (
              <Route
                path="admin/restaurants"
                element={<RestaurantApprovals />}
              />
            )}

            {/* RESTAURANT MFE */}
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurants/:id/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
