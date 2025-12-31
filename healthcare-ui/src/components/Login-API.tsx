import React, { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8181/api/auth/login", {
        usernameOrEmail,
        password,
      });
      // Save access token in localStorage
      localStorage.setItem("accessToken", res.data.accessToken);
      // Redirect to dashboard
      navigate("/home");
    } catch (err) {
      console.log("Error occured in Login-", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username/Email:</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          Login{" "}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

// export default Login - API;
