import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Signup from './pages/Signup'

import CartButton from "./Layout/CartButton"
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import Hero from './Layout/Hero'


import ShoppingCarts from './components/ShoppingCarts'

function App() {

  const [open, setOpen] = useState(false)
  return (
    <>
      
        <CartButton setOpen={setOpen} open={open}/>
        <Hero />
        <Navbar setOpen={setOpen} open={open} />
        {open && <ShoppingCarts open={open} setOpen={setOpen} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />


        </Routes>

        <Footer />
      </>
  
  )
}

export default App
