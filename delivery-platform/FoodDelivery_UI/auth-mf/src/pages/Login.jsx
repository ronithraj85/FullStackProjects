import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8585/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data.accessToken);

      toast.success("Login successful");
      window.location.href = "/";
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Login">
        <Input
          label="Email"
          type="email"
          placeholder="ron@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin} loading={loading}>
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600">
            Register
          </a>
        </p>
      </Card>
    </div>
  );
}
