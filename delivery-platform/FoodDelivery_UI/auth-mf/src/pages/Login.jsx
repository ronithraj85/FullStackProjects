import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data);
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* 🔵 LEFT BRANDING PANEL */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Food Delivery</h1>
        <p className="text-lg text-center max-w-sm opacity-90">
          Order smarter, faster, and manage everything from one place.
        </p>

        <div className="mt-10 text-sm opacity-75">
          Built with Micro-Frontends ⚡
        </div>
      </div>

      {/* ⚪ RIGHT LOGIN FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 animate-fade-up"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome back 👋
          </h2>
          <p className="text-sm text-gray-500 mb-6">Login to continue</p>

          <div className="mb-4">
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            No account?{" "}
            <Link
              to="/login/register"
              className="text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
