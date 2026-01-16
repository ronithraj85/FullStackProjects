import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../src/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
