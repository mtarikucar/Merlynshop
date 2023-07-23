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
import CartButton from "./Layout/CartButton";
import Navbar from "./Layout/Navbar";

import Footer from "./Layout/Footer";
import AdminNavbar from "./Layout/Admin/AdminNavbar";
import AdminSidebar from "./Layout/Admin/AdminSidebar";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCarts from "./components/ShoppingCarts";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUser from "./pages/admin/AdminUser";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminMessage from "./pages/admin/AdminMessage";
import Profile from "./pages/Profile";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import Checkout from "./pages/Checkout";

import RequireAuth from "./features/RequireAuth";
import { useSelector } from "react-redux";
import CheckoutSuccess from "./pages/Checkout-success";
import LandingPage from "./pages/LandingPage";

import Layout from "./Layout/Layout";

function App() {
  const [open, setOpen] = useState(false);
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
        <Route element={<RequireAuth />}>
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
        </Route>
       {/*  <Route element={<RequireAuth />}>
          <Route path="admin/*" element={<Admin />} />
          <Route path="admin" element={<Admin />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
