import React, { Suspense } from "react";

const AuthApp = React.lazy(() => import("auth/App"));
const OrderApp = React.lazy(() => import("order/App"));
const AdminApp = React.lazy(() => import("admin/App"));

export default function App() {
  const token = localStorage.getItem("token");
  const OrderApp = React.lazy(() => import("order/App"));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-4">
        <button onClick={() => localStorage.removeItem("token")}>Logout</button>
      </nav>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        {!token && <AuthApp />}
        {token && <OrderApp />}
        {token && <AdminApp />}
      </Suspense>
    </div>
  );
}
