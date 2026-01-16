import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success("Registration successful");
      window.location.replace("/login");
    } catch {
      toast.error("Registration failed");
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
          Create your account and start ordering instantly.
        </p>
      </div>

      {/* ⚪ RIGHT REGISTER FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 animate-fade-up"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create account 🚀
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            It takes less than a minute
          </p>

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
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
