import "./index.css"; // 🔥 REQUIRED FOR MFE

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />

      <Routes>
        {/* index route → /login */}
        <Route index element={<Login />} />

        {/* /login/register */}
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}
