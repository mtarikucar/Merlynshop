import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ user, role, setUser }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ToastContainer />
      {open && <ShoppingCarts open={open} setOpen={setOpen} />}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
