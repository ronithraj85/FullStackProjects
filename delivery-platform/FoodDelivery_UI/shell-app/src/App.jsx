import React, { Suspense } from "react";
import { jwtDecode } from "jwt-decode";

const AuthApp = React.lazy(() => import("auth/App"));
const OrderApp = React.lazy(() => import("order/App"));
const AdminApp = React.lazy(() => import("admin/App"));

export default function App() {
  const token = localStorage.getItem("token");

  let roles = [];
  if (token) {
    const decoded = jwtDecode(token);
    roles = decoded.authorities || [];
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-4">
        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        {!token && <AuthApp />}

        {token && <OrderApp />}

        {token && roles.includes("ROLE_ADMIN") && <AdminApp />}
      </Suspense>
    </div>
  );
}
