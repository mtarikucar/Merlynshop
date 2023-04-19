import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

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
import Hero from "./Layout/Hero";
import Admin from "./pages/admin/Admin";
import { ToastContainer } from "react-toastify";
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

function App() {
  let location = useLocation();

  useEffect(() => {}, [location]);

  const [open, setOpen] = useState(false);
  return (
    <>
      {!location.pathname.includes("admin") ? (
        <>
          <ToastContainer />
          <CartButton setOpen={setOpen} open={open} />
          {/* <Hero /> */}
          <Navbar setOpen={setOpen} open={open} />
          {open && <ShoppingCarts open={open} setOpen={setOpen} />}
        </>
      ) : (
        <>
        
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/order" element={<AdminOrder />} />
        <Route path="/admin/message" element={<AdminMessage />} />
        <Route path="/admin/order/:id" element={<AdminOrderDetail />} />
      </Routes>
    </>
  );
}

export default App;
