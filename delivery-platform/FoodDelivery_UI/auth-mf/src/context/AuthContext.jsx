import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const login = (authData) => {
    localStorage.setItem("token", authData.accessToken);
    localStorage.setItem("authUser", JSON.stringify(authData));
    setUser(authData);

    toast.success("Login successful");

    // 🔥 THIS IS THE MISSING PIECE
    setTimeout(() => {
      window.location.replace("/");
    }, 300);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
