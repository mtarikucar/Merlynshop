import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup";

import "react-toastify/dist/ReactToastify.css";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUser from "./pages/admin/AdminUser";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminMessage from "./pages/admin/AdminMessage";
import Profile from "./pages/Profile";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import Checkout from "./pages/Checkout";

import RequireAuth from "./features/RequireAuth";
import CheckoutSuccess from "./pages/Checkout-success";
import LandingPage from "./pages/LandingPage";

import Layout from "./Layout/Layout";

function Admin() {
  <Route></Route>;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="product" element={<ProductPage />} />
        <Route path="about" element={<About />} />

        <Route path="products/:id" element={<ProductDetail />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={["admin", "member"]} />}>
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/message" element={<AdminMessage />} />
          <Route path="/admin/order/:id" element={<AdminOrderDetail />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
