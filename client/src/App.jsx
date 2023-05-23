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

import { useSelector } from "react-redux";
import CheckoutSuccess from "./pages/Checkout-success";
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./components/LoadingPage";

function Admin() {
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  return user?.user.role === "admin" ? (
    <div>
      <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 antialiased bg-white  text-black">
        <AdminNavbar />
        <AdminSidebar />
        <Routes>
          <Route path="product" element={<AdminProduct />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="message" element={<AdminMessage />} />
          <Route path="order/:id" element={<AdminOrderDetail />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 justify-center items-center antialiased bg-white  text-black">
        hele uyanığa bak önce giriş yap
        <NavLink to="/login" className={"bg-green-500 rounded hover:boder-2 hover:p-3 p-2 ease-in-out duration-300 m-4 text-white"}> log in</NavLink>
      </div>
    </div>
  );
}

function App() {
  let location = useLocation();

  useEffect(() => { }, [location]);

  const [open, setOpen] = useState(false);
  return (
    <>
     {/*  {!location.pathname.includes("admin") && (
        <>
          <ToastContainer />
          <CartButton setOpen={setOpen} open={open} />

          <Navbar setOpen={setOpen} open={open} />
          {open && <ShoppingCarts open={open} setOpen={setOpen} />}
        </>
      )} */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
       {/*  <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />

        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="admin/*" element={<Admin />} />
        <Route path="admin" element={<Admin />} /> */}
      </Routes>

      {/* {!location.pathname.includes("admin") && <Footer />} */}
    </>
  );
}

export default App;
