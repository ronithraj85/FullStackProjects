import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import UsersTable from "./components/Users/UsersPage";
import AddAdminPage from "./components/Users/AddAdminPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admins/create"
          element={
            <PrivateRoute>
              <AddAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersTable />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
