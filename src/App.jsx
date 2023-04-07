import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Contact from './pages/Contact'
import ShoppingCarts from './components/ShoppingCarts'
function App() {

  const [open, setOpen]=useState(false)
  return (
    <div className="">
      <Hero />
      <Navbar setOpen={setOpen} open={open} />
       {open && <ShoppingCarts open={open} setOpen={setOpen} /> } 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />}  />
        <Route path="/about" element={<About />}  />
        <Route path="/contact" element={<Contact />}  />

        
        
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
