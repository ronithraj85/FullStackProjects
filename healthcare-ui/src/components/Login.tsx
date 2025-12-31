import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Auth.service";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { usernameOrEmail, password });
    setError(""); // reset error before new attempt
    // TODO: call backend login API
    try {
      await login(usernameOrEmail, password);
      navigate("/home"); // redirect after successful login
    } catch (err) {
      console.error("Invalid credentials or server error", err);
      if (err.message === "Network Error") {
        setError("Backend is down, Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-amber-100 to-blue-400">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="ml-4 text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username or Email:
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-300 via-amber-100 to-blue-400 
             py-2 rounded-lg font-semibold transition 
            hover:bg-red-500"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
