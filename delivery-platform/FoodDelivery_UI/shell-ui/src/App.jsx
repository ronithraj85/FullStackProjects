import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "./context/AuthContext";

const AuthApp = lazy(() => import("auth/App"));
const OrderApp = lazy(() => import("order/App"));

function ProtectedLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return <MainLayout />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Suspense fallback={<div>Loading Auth...</div>}>
              <AuthApp />
            </Suspense>
          )
        }
      />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<div className="text-2xl">Dashboard</div>} />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<div>Loading Orders...</div>}>
              <OrderApp />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
