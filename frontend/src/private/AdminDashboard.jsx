import Navbar from "../PrivateComponents/Navbar";
import HomePage from "../PrivateComponents/HomePage";
import ProductPage from "../PrivateComponents/ProductPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default AdminDashboard;