import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8585/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Registration successful");
      window.location.href = "/auth";
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Register">
        <Input
          label="Name"
          placeholder="Ron"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button onClick={handleRegister} loading={loading}>
          Register
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/auth" className="text-blue-600">
            Login
          </a>
        </p>
      </Card>
    </div>
  );
}
